const chalk = require('chalk');

module.exports = {
  name: 'messageCreate',
  execute(message, client) {

    if (message.author.bot) return;

    if (message.content && message.content.startsWith('!')) {
      const args = message.content.slice(1).split(/ +/);
      const commandName = args.shift().toLowerCase();
      const command = client.commands.get(commandName);
      if (command) {
        console.log(chalk.blue(`[COMANDO] ${message.author.tag} ejecutó: ${commandName}`));
        command.execute(message, args);
      }
    }

    else if (message.content) {
      console.log(chalk.green(`[MENSAJE] ${message.author.tag}: ${message.content}`));
    }

    if (message.stickers.size > 0) {
      console.log(chalk.magenta(`[STICKER] ${message.author.tag} envió un sticker`));
    }

    if (message.attachments.size > 0) {
      message.attachments.forEach(att => {
        const type = att.contentType || '';
        if (type.includes('image')) {
          console.log(chalk.pink(`[IMAGEN] ${message.author.tag} envió una foto`));
        } else if (type.includes('video')) {
          console.log(chalk.cyan(`[VIDEO] ${message.author.tag} envió un video`));
        } else {
          console.log(chalk.red(`[ARCHIVO] ${message.author.tag} envió un archivo`));
        }
      });
    }
  }
};