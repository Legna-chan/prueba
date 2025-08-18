const fs = require("fs");
const file = "./economy.json";

const cooldowns = {};

module.exports = {
  name: "pescar",
  description: "Pesca peces y gana monedas",
  execute(message) {
    if (!fs.existsSync(file)) {
      fs.writeFileSync(file, "{}");
    }
    const data = JSON.parse(fs.readFileSync(file, "utf8"));

    const id = message.author.id;
    if (!data[id]) data[id] = { balance: 0 };

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
      monedas += Math.floor(Math.random() * 51) + 150; // entre 150 y 200 por pez
    }

    data[id].balance += monedas;

    fs.writeFileSync(file, JSON.stringify(data, null, 2));

    message.reply(
      `🌸 ¡Felicidades! ${message.author.username} pescaste ${peces} pez(es) y ganaste ${monedas} monedas.\n✐ Ahora tienes ${data[id].balance} monedas.`
    );
  },
};