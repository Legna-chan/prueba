module.exports = {
  name: 'ready',
  once: true,
  execute(client) {
    console.log(`🌸 Bot conectada como ${client.user.tag}`);
  }
};