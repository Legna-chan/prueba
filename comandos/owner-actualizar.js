const { exec } = require('child_process');
const { ownerID } = require('../config.js');

module.exports = {
  name: 'update',
  description: 'Actualiza el bot desde GitHub',
  execute(message, args) {
    if (message.author.id !== ownerID) {
      return message.reply('❌ Solo el owner puede usar este comando.');
    }

    message.reply('🌸 Actualizando la bot...');

    const comando = 'git pull';

    exec(comando, (err, stdout, stderr) => {
      if (err) {
        console.error(err);
        return message.reply(`❌ Error: No se pudo realizar la actualización.\nRazón: ${err.message}`);
      }

      if (stderr) console.warn('Advertencia durante la actualización:', stderr);

      if (stdout.includes('En este momento todo está actualizado.')) {
        message.reply('🌸 La bot ya está actualizada.');
      } else {
        message.reply(`🌺 Actualización realizada con éxito.\n\n${stdout}`);
      }
    });
  },
};