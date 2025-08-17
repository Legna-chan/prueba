module.exports = {

  name: 'menu',

  description: 'Muestra el menú de la bot',

  execute(message, args) {

    const personaje = {

      nombre: 'Konjiki No Yami',

      foto: 'https://files.catbox.moe/aep1ra.jpg'

    };

    const menu = `

🌸 Hola, bienvenid@ a mi menú! Soy **${personaje.nombre}** 💫

✐ **Comandos generales de la bot**

❀ !menu ➩ muestra el menu de la bot. 

✐ **Comandos de descargas**

❀ !tiktok ➩ descarga videos de tiktok. 

✐ **Comandos de Economía**

❀ !daily ➩ reclama tu recompensa diaria.

❀ !balance ➩ 



`;

    message.reply({ content: menu, files: [personaje.foto] });

  }

};