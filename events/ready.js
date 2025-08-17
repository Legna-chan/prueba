const chalk = require('chalk');

module.exports = {
  name: 'ready',
  once: true,
  execute(client) {
    console.log(chalk.yellow(`🍭 Bot conectada como ${client.user.tag}`));
  }
};