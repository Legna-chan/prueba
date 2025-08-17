const chalk = require('chalk');

module.exports = (client) => {

  process.on('uncaughtException', (err) => {
    console.log(chalk.red("─────────────────────────────"));
    console.log(chalk.red("| 💥 ERROR NO CAPTURADO"));
    console.log(chalk.red(`| ${err.name}: ${err.message}`));
    console.log(chalk.red("─────────────────────────────"));
  });

  process.on('unhandledRejection', (reason, promise) => {
    console.log(chalk.magenta("─────────────────────────────"));
    console.log(chalk.red("| ⚠️ RECHAZO NO MANEJADO"));
    console.log(chalk.red(`| Razón: ${reason}`));
    console.log(chalk.magenta("─────────────────────────────"));
  });

  process.on('warning', (warning) => {
    console.log(chalk.yellow("─────────────────────────────"));
    console.log(chalk.red("| ⚠️ ADVERTENCIA"));
    console.log(chalk.yellow(`| ${warning.name}: ${warning.message}`));
    console.log(chalk.yellow("─────────────────────────────"));
  });

  client.on('error', (error) => {
    console.log(chalk.red("─────────────────────────────"));
    console.log(chalk.red("| ⚠️ ERROR DEL CLIENTE"));
    console.log(chalk.red(`| ${error}`));
    console.log(chalk.red("─────────────────────────────"));
  });

  client.on('shardError', (error) => {
    console.log(chalk.red("─────────────────────────────"));
    console.log(chalk.red("| 💥 SHARD ERROR"));
    console.log(chalk.red(`| ${error}`));
    console.log(chalk.red("─────────────────────────────"));
  });

  client.on('warn', (info) => {
    console.log(chalk.yellow("─────────────────────────────"));
    console.log(chalk.red("| ⚠️ WARN DEL CLIENTE"));
    console.log(chalk.yellow(`| ${info}`));
    console.log(chalk.yellow("─────────────────────────────"));
  });

  client.on('messageCreate', async (message) => {
    if (!message.content.startsWith('!') || message.author.bot) return;

    const args = message.content.slice(1).split(/ +/);
    const commandName = args.shift().toLowerCase();
    const command = client.commands.get(commandName);

    if (!command) return;

    try {
      await command.execute(message, args);
    } catch (err) {
      console.log(chalk.red("─────────────────────────────"));
      console.log(chalk.red("| 💥 ERROR EN COMANDO"));
      console.log(chalk.red(`| Usuario: ${message.author.tag}`));
      console.log(chalk.red(`| Comando: ${commandName}`));
      console.log(chalk.red(`| Error: ${err.message}`));
      console.log(chalk.red("─────────────────────────────"));

      message.reply("❌ Ocurrió un error ejecutando este comando. Comunicaselo a mi creador: legnaofc.");
    }
  });
};