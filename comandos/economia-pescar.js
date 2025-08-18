const fs = require("fs");
const file = "./economy.json";

const cooldowns = {};

module.exports = {
  name: "pescar",
  description: "Pesca peces y gana monedas (cada 10 min)",
  execute(message) {
    let data;
    if (!fs.existsSync(file)) {
      fs.writeFileSync(file, "{}");
    }
    data = JSON.parse(fs.readFileSync(file, "utf8"));

    const id = message.author.id;
    if (!data[id]) data[id] = { balance: 0 };

    (600,000 ms)
    const cooldown = 10 * 60 * 1000;
    const now = Date.now();

    if (cooldowns[id] && now - cooldowns[id] < cooldown) {
      const tiempoRestante = Math.ceil(
        (cooldowns[id] + cooldown - now) / 1000 / 60
      );
      return message.reply(
        `⏰ Debes esperar ${tiempoRestante} minuto(s) antes de volver a pescar.`
      );
    }

    cooldowns[id] = now;

    const peces = Math.floor(Math.random() * 5) + 1;

    let monedas = 0;
    for (let i = 0; i < peces; i++) {
      monedas += Math.floor(Math.random() * 51) + 150;
    }

    data[id].balance += monedas;

    fs.writeFileSync(file, JSON.stringify(data, null, 2));
    message.reply(
      `🌸 ¡Felicidades! ${message.author.username} pescaste ${peces} peces y ganaste ${monedas} monedas.\n✐ Ahora tienes ${data[id].balance} monedas.`
    );
  },
};