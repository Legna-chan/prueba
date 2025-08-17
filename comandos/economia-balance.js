const { getBalance } = require("../economy.js");

module.exports = {

  name: "balance",

  description: "Muestra tu dinero actual",

  execute(message) {

    const userId = message.author.id;

    const balance = getBalance(userId);

    message.reply(`💰 Tu saldo actual es: ${balance} monedas.`);

  }

};