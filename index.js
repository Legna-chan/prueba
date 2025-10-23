import './config.js'
import './plugins/_allfake.js'
import cfonts from 'cfonts'
import { fileURLToPath, pathToFileURL } from 'url'
import path, { join } from 'path'
import fs, { readdirSync, existsSync, mkdirSync } from 'fs'
import readline from 'readline'
import chalk from 'chalk'
import pino from 'pino'
import NodeCache from 'node-cache'
import { Low, JSONFile } from 'lowdb'
import { makeWASocket, protoType, serialize } from './lib/simple.js'
import { useMultiFileAuthState, fetchLatestBaileysVersion, makeCacheableSignalKeyStore, jidNormalizedUser } from '@whiskeysockets/baileys'
import store from './lib/store.js'
import { PhoneNumberUtil } from 'google-libphonenumber'

protoType()
serialize()

const phoneUtil = PhoneNumberUtil.getInstance()
global.prefix = new RegExp('^[!#./-]')
global.opts = {}
global.db = new Low(new JSONFile('database.json'))
await global.db.read()
global.db.data ||= { users: {}, chats: {}, settings: {} }

// ==== Elegir opción de conexión ====
const rl = readline.createInterface({ input: process.stdin, output: process.stdout })
const question = (txt) => new Promise(res => rl.question(txt, res))

let opcion
if (!fs.existsSync('./sessions/creds.json')) {
    do {
        opcion = await question(
            chalk.bold.white("Seleccione una opción:\n") +
            chalk.blueBright("1. Con código QR\n") +
            chalk.cyan("2. Con número de teléfono / código de 8 dígitos\n--> ")
        )
        if (!/^[1-2]$/.test(opcion)) {
            console.log(chalk.redBright("Por favor solo ingrese 1 o 2"))
        }
    } while (!/^[1-2]$/.test(opcion))
}
rl.close()

// ==== Autenticación ====
const { state, saveState, saveCreds } = await useMultiFileAuthState('./sessions')
const { version } = await fetchLatestBaileysVersion()
const msgRetryCounterCache = new NodeCache({ stdTTL: 0, checkperiod: 0 })

const conn = makeWASocket({
    logger: pino({ level: 'silent' }),
    printQRInTerminal: opcion === '1',
    auth: {
        creds: state.creds,
        keys: makeCacheableSignalKeyStore(state.keys, pino({ level: 'fatal' }).child({ level: 'fatal' })),
    },
    version,
    msgRetryCounterCache,
    userDevicesCache: new Map(),
    getMessage: async key => {
        try {
            const jid = jidNormalizedUser(key.remoteJid)
            const msg = await store.loadMessage(jid, key.id)
            return msg?.message || ""
        } catch { return "" }
    },
})

conn.ev.on('creds.update', saveCreds)

// ==== Cargar plugins ====
global.plugins = {}
const pluginFolder = join(global.__dirname(import.meta.url), './plugins/index')
for (const filename of readdirSync(pluginFolder).filter(f => f.endsWith('.js'))) {
    try {
        const module = await import(join(pluginFolder, filename))
        global.plugins[filename] = module.default || module
    } catch (e) { console.error(`Error cargando plugin ${filename}`, e) }
}

// ==== Handler ====
let handler = await import('./handler.js')
conn.handler = handler.handler.bind(conn)
conn.ev.on('messages.upsert', conn.handler)

// ==== Conexión ====
conn.ev.on('connection.update', async (update) => {
    const { connection, lastDisconnect, qr } = update
    if (qr && opcion === '1') console.log(chalk.blueBright('Escanea este código QR:'))
    if (connection === 'close') {
        console.log(chalk.yellow('→ Reconectando...'))
        await global.reloadHandler?.(true)
    } else if (connection === 'open') {
        console.log(chalk.green(`→ Conectado como: ${conn.user.name || conn.user.id}`))
    }
})

// ==== Validar número de teléfono ====
async function isValidPhoneNumber(number) {
    try {
        const parsed = phoneUtil.parseAndKeepRawInput(number)
        return phoneUtil.isValidNumber(parsed)
    } catch { return false }
}

// ==== Recarga de handler ====
global.reloadHandler = async (restartConn = false) => {
    try {
        const Handler = await import(`./handler.js?update=${Date.now()}`)
        if (Object.keys(Handler || {}).length) handler = Handler
    } catch (e) { console.error(e) }

    if (restartConn) {
        conn.ev.removeAllListeners()
        conn.handler = handler.handler.bind(conn)
        conn.ev.on('messages.upsert', conn.handler)
    }
}