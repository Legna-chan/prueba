const { exec } = require('child_process');
const { ownerID } = require('../config.js');

module.exports = {
  name: 'exec',
  description: 'Ejecuta comandos del sistema',
  execute(message, args) {
    if (message.author.id !== ownerID) 
      return message.reply('❌ Solo el creador puede usar este comando.');

    if (!args[0]) 
      return message.reply('🌸 Debes ingresar el comando que deseas ejecutar en el servidor/terminal.');

    const comando = args.join(' ');

    exec(comando, (err, stdout, stderr) => {
      let response = '';

      if (err) response += `❌ Error:\n${err}\n`;
      if (stderr) response += `⚠️ Stderr:\n${stderr}\n`;
      if (stdout) response += `🌷 Resultado:\n${stdout}`;

      if (response.length > 2000) {
        response = response.slice(0, 1990) + '\n...Output truncado';
      }

      message.reply(response || '🌸 Comando ejecutado, sin salida visible.');
    });
  },
};