const { exec } = require('child_process');
const { ownerID } = require('../config.js');

module.exports = {
  name: 'exec',
  description: 'Ejecuta comandos del sistema',
  execute(message, args) {
    if (message.author.id !== ownerID) return message.reply('❌ Solo el creador puede usar este comando.');
    if (!args[0]) return message.reply('🌸 Debes ingresar el comando que deseas ejecutar en el servidor/terminal.');

    const comando = args.join(' ');

    exec(comando, (err, stdout, stderr) => {
      if (err) console.error(`[ERROR] ${err}`);
      if (stderr) console.warn(`[STDERR] ${stderr}`);
      if (stdout) console.log(`[STDOUT] ${stdout}`);

      message.reply('🌸 Comando ejecutado. Revisa el servidor.');
    });
  },
};