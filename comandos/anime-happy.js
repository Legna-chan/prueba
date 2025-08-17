module.exports = {
  name: 'happy',
  description: 'Expresa felicidad con un gif de anime',

  async execute(message, args) {
    try {
      // Buscar menciones
      const target = message.mentions.users.first();

      // Lista de gifs
      const gifs = [
       "https://files.catbox.moe/8cqruf.gif",
        "https://files.catbox.moe/8cqruf.gif",
        "https://files.catbox.moe/8cqruf.gif",
        "https://files.catbox.moe/8cqruf.gif"
      ];

      // Gif aleatorio
      const randomGif = gifs[Math.floor(Math.random() * gifs.length)];

      let content;

      if (target) {
        // Caso 1: mencionó a alguien
        content = `${target.toString()} 🌸 está feliz gracias a ${message.author.toString()}!`;
      } else {
        // Caso 2: no mencionó a nadie
        content = `${message.author.toString()} 🌸 está feliz hoy!`;
      }

      // Enviar respuesta
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