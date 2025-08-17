module.exports = {

  name: 'tiktok',

  description: 'Descarga un video de TikTok desde un enlace',

  async execute(message, args) {


    if (!args[0]) {

      return message.channel.send(

        `🌸 Por favor, envía un enlace de tiktok junto con el comando.\n> Ejemplo: \`#tt <link>\``

      );

    }

    try {

      await message.channel.send('⏳ Espera un momento, obteniendo el video...');

      const tiktokData = await tiktokdl(args[0]);

      const result = tiktokData?.data;

      if (!result?.play) {

        return message.channel.send('❌ Error: No se pudo obtener el video.');

      }

      const caption = `

*T I K T O K - D O W N L O A D*

\`${result.title || 'Sin título'}\`

❐ Autor: ${result.author?.nickname || 'Desconocido'}

❐ Duración: ${result.duration || 0} segundos

❐ Vistas: ${result.play_count || 0}

❐ Likes: ${result.digg_count || 0}

❐ Comentarios: ${result.comment_count || 0}

❐ Compartidos: ${result.share_count || 0}

❐ Publicado: ${formatDate(result.create_time)}

❐ Descargas: ${result.download_count || 0}

`.trim();


      await message.channel.send({

        content: caption,

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


function formatDate(timestamp) {

  const date = new Date(timestamp * 1000);

  return date.toLocaleString('es-ES', { timeZone: 'America/Mexico_City' });

}