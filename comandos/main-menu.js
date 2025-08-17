const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'menu',
  description: 'Muestra el menú de la bot',
  execute(message, args) {
    const menuEmbed = new EmbedBuilder()
      .setColor('#FF4500')
      .setTitle('🌈 🎐 ｡ﾟﾟ･ Menú oficial de la bot ･ﾟﾟ｡ 🎐 🌈')
      .setDescription(`
🌸 ¡Bienvenid@ a **Konjiki No Yami**! 🌸

🎆 **General**
🎐 !menu → Muestra este menú.

🎆 **Descargas**
🎐 !tiktok → Descarga videos de tiktok.

🎆 **Economía**
🎐 !daily → Recompensa diaria.
🎐 !balance → Ver tu dinero actual.

🎆 **Reacciones Anime**
🎐 !happy → Expresa felicidad. 
      `)
      .setImage('https://files.catbox.moe/aep1ra.jpg')
      .setFooter({ text: 'Editado y desarrollado por @LegnaAm' });

    message.reply({ embeds: [menuEmbed] });
  }
};