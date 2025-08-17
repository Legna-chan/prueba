const fs = require("fs");
const file = "./economy.json";

module.exports = {
  name: "pescar",
  description: "Pesca peces y gana monedas",
  execute(message) {
    let data;
    if (!fs.existsSync(file)) {
      fs.writeFileSync(file, "{}");
    }
    data = JSON.parse(fs.readFileSync(file, "utf8"));

    const id = message.author.id;
    if (!data[id]) data[id] = { balance: 0 };

    const peces = Math.floor(Math.random() * 15) + 1;

    const monedas = peces * (Math.floor(Math.random() * 5) + 1);

    data[id].balance += monedas;

    fs.writeFileSync(file, JSON.stringify(data, null, 2));
    message.reply(
      `🎣 ¡Felicidades! ${message.author.username} pescaste ${peces} peces y ganaste ${monedas} monedas.\n💰 Ahora tienes ${data[id].balance} monedas.`
    );
  },
};