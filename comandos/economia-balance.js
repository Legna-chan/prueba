const fs = require("fs");
const file = "./economy.json";

function load() {
  if (!fs.existsSync(file)) fs.writeFileSync(file, "{}");
  return JSON.parse(fs.readFileSync(file, "utf8"));
}

module.exports = {
  name: "balance",
  description: "Muestra tu dinero actual",
  execute(message) {
    const data = load();
    const userId = message.author.id;

    if (!data[userId]) data[userId] = { balance: 0, lastDaily: 0 };

    const balance = data[userId].balance;

    message.reply(`🍭 Tu saldo actual es: ${balance} monedas.`);
  },
};