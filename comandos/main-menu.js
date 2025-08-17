const { EmbedBuilder } = require('discord.js');

module.exports = {

  name: 'menu',

  description: 'Muestra el menú de la bot',

  execute(message, args) {

    const menuEmbed = new EmbedBuilder()

      .setColor('#FF69B4')

      .setTitle('🌸 Menú de la bot')

      .setDescription(`

Hola, bienvenid@ a mi menú! Soy **Konjiki No Yami** 💫

✐ **Comandos generales de la bot**

❀ !menu ➩ muestra el menú de la bot.

✐ **Comandos de descargas**

❀ !tiktok ➩ descarga videos de tiktok.

✐ **Comandos de Economía**

❀ !daily ➩ reclama tu recompensa diaria.

❀ !balance ➩ muestra tu dinero actual.

> Editado y desarrollado por @LegnaAm

      `)

      .setImage('https://files.catbox.moe/aep1ra.jpg'); // Imagen del personaje

    message.reply({ embeds: [menuEmbed] });

  }

};