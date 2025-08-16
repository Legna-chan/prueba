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

❀ !tt • !tiktok ➩ descarga videos de tiktok. 

> Editado y desarrollado por @LegnaAm.

`;

    message.reply({ content: menu, files: [personaje.foto] });

  }

};