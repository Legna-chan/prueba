const { claimDaily } = require("../economy.js");

module.exports = {

  name: "daily",

  description: "Reclama tu recompensa diaria",

  execute(message) {

    const result = claimDaily(message.author.id);

    if (!result.success) {

      message.reply(`❌ Ya reclamaste tu daily. Vuelve en ${result.wait} minutos.`);

    } else {

      message.reply(`✅ Reclamaste ${result.reward} monedas hoy. ¡Disfrútalas!`);

    }

  }

};