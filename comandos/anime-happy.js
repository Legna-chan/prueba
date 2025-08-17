module.exports = {
  name: 'happy',
  description: 'Expresa felicidad con un gif de anime',

  async execute(message, args) {
    try {

      const target = message.mentions.users.first();

      const gifs = [
       "https://files.catbox.moe/8cqruf.gif",
        "https://files.catbox.moe/sk4gaq.gif",
        "https://files.catbox.moe/fiu1lx.gif",
        "https://files.catbox.moe/87ir3k.gif"
      ];

      const randomGif = gifs[Math.floor(Math.random() * gifs.length)];

      let content;

      if (target) {

        content = `${target.toString()} 🌸 está feliz por ${message.author.toString()}!`;
      } else {

        content = `${message.author.toString()} 🌸 está feliz hoy!`;
      }

      await message.channel.send({
        content,
        files: [randomGif]
      });

    } catch (error) {
      console.error(error);
      return message.channel.send(`❌ Ocurrió un error: ${error.message}`);
    }
  }
};