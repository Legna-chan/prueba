const hispamemes = require("hispamemes");

module.exports = {
  name: "meme",
  description: "Envía un meme random",

  async execute(message, args) {
    try {
      const meme = hispamemes.meme(); 
      await message.channel.send({ files: [meme] });
    } catch (err) {
      console.error("Error al obtener el meme:", err);
      message.reply("❌ Ocurrió un error al traer el meme.");
    }
  },
};