const fs = require("fs");
const file = "./economy.json";

function load() {
  if (!fs.existsSync(file)) fs.writeFileSync(file, "{}");
  return JSON.parse(fs.readFileSync(file, "utf8"));
}

function save(data) {
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
}

module.exports = {
  name: "daily",
  description: "Reclama tu recompensa diaria",
  execute(message) {
    const data = load();
    const id = message.author.id;

    if (!data[id]) data[id] = { balance: 0, lastDaily: 0 };

    const now = Date.now();
    const cooldown = 24 * 60 * 60 * 1000;

    if (now - data[id].lastDaily < cooldown) {
      const wait = Math.ceil((cooldown - (now - data[id].lastDaily)) / 60000);
      return message.reply(`❌ Ya reclamaste tu daily. Vuelve en ${wait} minutos.`);
    }

    const reward = Math.floor(Math.random() * 801) + 200;

    data[id].balance += reward;
    data[id].lastDaily = now;

    save(data);

    message.reply(`🌸 Reclamaste ${reward} monedas hoy.`);
  },
};