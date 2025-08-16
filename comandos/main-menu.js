module.exports = {
  name: 'menu',
  description: 'Muestra el menú del bot con personaje',
  execute(message, args) {
    const personaje = {
      nombre: 'Koniki No Yami',
      foto: 'https://i.imgur.com/ejemplo.png'
    };

    const menu = `
👋 Hola, bienvenid@ a mi menú! Soy **${personaje.nombre}** 💖

📜 **Menú de Comandos**
. no hay disponibles por el momento

Escribe el comando tal como aparece para ejecutarlo.
`;

    message.reply({ content: menu, files: [personaje.foto] });
  }
};
