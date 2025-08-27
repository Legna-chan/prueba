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

    if (message.content) {
      const gifLink = message.content.match(/https?:\/\/\S+\.gif/i);
      if (gifLink) {
        console.log(chalk.cyan(`[GIF-LINK] ${message.author.tag} envió un GIF: ${gifLink[0]}`));
      }
    }

    if (message.stickers.size > 0) {
      message.stickers.forEach(sticker => {
        if (sticker.format === 2) { // Sticker animado (GIF)
          console.log(chalk.cyan(`[GIF-STICKER] ${message.author.tag} envió un sticker animado`));
        } else {
          console.log(chalk.magenta(`[STICKER] ${message.author.tag} envió un sticker`));
        }
      });
    }

    if (message.attachments.size > 0) {
      message.attachments.forEach(att => {
        const type = att.contentType || '';
        const name