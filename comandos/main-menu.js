module.exports = {
  name: 'menu',
  description: 'Muestra el menú del bot con personaje',
  execute(message, args) {
    const personaje = {
      nombre: 'Nino Nakano',
      foto: 'https://i.imgur.com/ejemplo.png'
    };

    const menu = `
👋 Hola, bienvenid@ a mi menú! Soy **${personaje.nombre}** 💖

📜 **Menú de Comandos**
2️⃣ **!hola** - Saluda al usuario

Escribe el comando tal como aparece para ejecutarlo.
`;

    message.reply({ content: menu, files: [personaje.foto] });
  }
};
