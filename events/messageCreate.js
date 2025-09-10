const chalk = require('chalk');

module.exports = {
  name: 'messageCreate',
  execute(message, client) {

    if (message.author.bot) return;

    if (message.content && message.content.startsWith('#')) {
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
        if (sticker.format === 2) { 
          console.log(chalk.magenta(`[STICKER] ${message.author.tag} envió un sticker`));
        }
      });
    }

    if (message.attachments.size > 0) {
      message.attachments.forEach(att => {
        const type = att.contentType || '';
        const name = att.name || '';

        if (type.includes('image') || name.match(/\.(png|jpg|jpeg|gif)$/i)) {
          if (type.includes('gif') || name.endsWith('.gif')) {
            console.log(chalk.cyan(`[GIF] ${message.author.tag} envió un GIF`));
          } else {
            console.log(chalk.magenta(`[IMAGEN] ${message.author.tag} envió una foto`));
          }
        } 
        else if (type.includes('video') || name.match(/\.(mp4|mov|avi|mkv)$/i)) {
          console.log(chalk.cyan(`[VIDEO] ${message.author.tag} envió un video`));
        }
        else if (type.includes('audio') || name.match(/\.(mp3|wav|ogg|m4a)$/i)) {
          if (name.endsWith('.ogg')) {
            console.log(chalk.yellow(`[NOTA DE VOZ] ${message.author.tag} envió una nota de voz`));
          } else {
            console.log(chalk.yellow(`[AUDIO] ${message.author.tag} envió un audio`));
          }
        } 
        else {
          console.log(chalk.white(`[ARCHIVO] ${message.author.tag} envió un archivo`));
        }
      });
    }

  }
};