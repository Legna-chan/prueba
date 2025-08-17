const fs = require("fs");
const file = "./economy.json";

function load() {
  if (!fs.existsSync(file)) fs.writeFileSync(file, "{}");
  return JSON.parse(fs.readFileSync(file, "utf8"));
}

function save(data) {
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
}

function getBalance(id) {
  const data = load();
  if (!data[id]) data[id] = { balance: 0, daily: 0 };
  save(data);
  return data[id].balance;
}

function claimDaily(id) {
  const data = load();
  if (!data[id]) data[id] = { balance: 0, daily: 0 };

  const now = Date.now();
  const cooldown = 24 * 60 * 60 * 1000;

  if (now - data[id].daily < cooldown) {
    return { success: false, wait: Math.ceil((cooldown - (now - data[id].daily)) / 60000) };
  }

  const reward = Math.floor(Math.random() * 800) + 200; // random entre 200-1000
  data[id].balance += reward;
  data[id].daily = now;
  save(data);

  return { success: true, reward };
}

module.exports = { getBalance, claimDaily };