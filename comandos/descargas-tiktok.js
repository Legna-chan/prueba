module.exports = {
  name: 'tiktok',
  description: 'Descarga un video de TikTok desde un enlace',
  
  async execute(message, args) {
    if (!args[0]) {
      return message.channel.send(
        `🌸 Por favor, envía un enlace de TikTok junto con el comando.\n> Ejemplo: \`#tt <link>\``
      );
    }

    try {
      await message.channel.send('⏳ Espera un momento, obteniendo el video...');

      const tiktokData = await tiktokdl(args[0]);
      const result = tiktokData?.data;

      if (!result?.play) {
        return message.channel.send('❌ Error: No se pudo obtener el video.');
      }

      // Enviar solo el video
      await message.channel.send({
        files: [{ attachment: result.play, name: 'tiktok.mp4' }]
      });

    } catch (error) {
      console.error(error);
      return message.channel.send(`❌ Error al descargar: ${error.message}`);
    }
  }
};

async function tiktokdl(url) {
  const api = `https://www.tikwm.com/api/?url=${url}&hd=1`;
  const res = await fetch(api);
  const json = await res.json();
  return json;
}