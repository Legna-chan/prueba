module.exports = {
  name: 'messageCreate',
  execute(message, client) {
    if (!message.content.startsWith('!') || message.author.bot) return;

    const args = message.content.slice(1).split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command = client.commands.get(commandName);
    if (command) {
      command.execute(message, args);
    }
  }
};
