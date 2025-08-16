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

✐ **Menú de Comandos**

❀ !tiktok ➩ descarga videos de tiktok. 

> Escribe el comando tal como aparece para ejecutarlo.

`;

    message.reply({ content: menu, files: [personaje.foto] });

  }

};