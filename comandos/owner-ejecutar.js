const { exec } = require('child_process');

module.exports = {
  name: 'exec',
  description: 'Ejecuta comandos del sistema (solo owner)',
  execute(message, args, client) {
    const { ownerID } = require('./config.js');
    if (message.author.id !== ownerID) return message.reply('❌ Solo el owner puede usar esto.');

    if (!args[0]) return message.reply('Debes ingresar el comando que deseas ejecutar en el servidor/terminal.');

    const comando = args.join(' ');

    exec(comando, (err, stdout, stderr) => {
      if (err) console.error(chalk.red(`[ERROR] ${err}`));
      if (stderr) console.warn(chalk.yellow(`[STDERR] ${stderr}`));
      if (stdout) console.log(chalk.green(`[STDOUT] ${stdout}`));

      message.reply('🌸 Comando ejecutado. Revisa la consola para detalles.');
    });
  },
};