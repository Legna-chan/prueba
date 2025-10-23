import { smsg } from "./lib/simple.js"
import { fileURLToPath } from "url"
import path, { join } from "path"
import fs, { watchFile, unwatchFile } from "fs"
import chalk from "chalk"

const isNumber = x => typeof x === "number" && !isNaN(x)
const delay = ms => isNumber(ms) && new Promise(resolve => setTimeout(resolve, ms))

export async function handler(chatUpdate) {
    if (!chatUpdate) return
    let m = chatUpdate.messages[chatUpdate.messages.length - 1]
    if (!m) return

    if (global.db.data == null) await global.loadDatabase()
    m = smsg(this, m) || m
    if (!m) return

    // === Users ===
    const user = global.db.data.users[m.sender] || {}
    if (!("name" in user)) user.name = m.name
    if (!("commands" in user) || !isNumber(user.commands)) user.commands = 0
    global.db.data.users[m.sender] = user

    // === Owner checks ===
    const isROwner = global.owner.map(v => v.replace(/[^0-9]/g, "") + "@s.whatsapp.net").includes(m.sender)
    const isOwner = isROwner || m.fromMe
    if (!isOwner) return 

    if (typeof m.text !== "string") m.text = ""

    // === Actualiza nombre ===
    try {
        const nuevo = m.pushName || await this.getName(m.sender)
        if (nuevo && nuevo !== user.name) user.name = nuevo
    } catch {}

    // === Plugins ===
    const ___dirname = path.join(path.dirname(fileURLToPath(import.meta.url)), "./plugins")
    for (const name in global.plugins) {
        const plugin = global.plugins[name]
        if (!plugin || plugin.disabled) continue
        const __filename = join(___dirname, name)

        // Ejecutar plugin global
        if (typeof plugin.all === "function") {
            try {
                await plugin.all.call(this, m, { chatUpdate, __dirname: ___dirname, __filename, user })
            } catch (err) {
                console.error(err)
            }
        }

        // === Comandos ===
        const pluginPrefix = plugin.customPrefix || global.prefix || ""
        const match = typeof pluginPrefix === "string" ? [[new RegExp(pluginPrefix).exec(m.text), new RegExp(pluginPrefix)]] : [[[], new RegExp]]
        let usedPrefix
        if ((usedPrefix = (match[0][0] || "")[0])) {
            const noPrefix = m.text.replace(usedPrefix, "")
            let [command, ...args] = noPrefix.trim().split(" ").filter(Boolean)
            args = args || []
            command = (command || "").toLowerCase()
            const fail = plugin.fail || global.dfail
            const isAccept = plugin.command instanceof RegExp ? plugin.command.test(command) :
                             Array.isArray(plugin.command) ? plugin.command.includes(command) :
                             typeof plugin.command === "string" ? plugin.command === command : false
            if (!isAccept) continue

            // === Permisos plugin ===
            if (plugin.rowner && !isROwner) { fail("rowner", m, this); continue }
            if (plugin.owner && !isOwner) { fail("owner", m, this); continue }
            
            const extra = { match, usedPrefix, noPrefix, args, command, text: args.join(" "), conn: this, user }
            try { await plugin.call(this, m, extra) } catch (err) { console.error(err) }
        }
    }
    // === Print ===
    try {
        if (!opts?.noprint) await (await import("./lib/print.js")).default(m, this)
    } catch (err) {
        console.warn(err)
        console.log(m.message)
    }
}

// === Fail messages ===
global.dfail = (type, m, conn) => {
    const msg = {
        rowner: "『✦』El comando solo puede ser usado por los creadores del bot.",
        owner: "『✦』El comando solo puede ser usado por los desarrolladores del bot."
    }[type]
}

let file = fileURLToPath(import.meta.url)
watchFile(file, () => {
    unwatchFile(file)
    console.log(chalk.magenta("Se actualizó 'handler.js'"))
})