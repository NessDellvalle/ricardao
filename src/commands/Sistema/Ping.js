const execute = async (bot, msg, args) => {
  const m = await msg.channel.send('ping?');

  m.edit(`🏓 **| Pong!**\nLatência do Server: **${m.createdTimestamp -
      msg.createdTimestamp}ms.**\nLatência da API: **${Math.round(
      bot.ws.ping
    )}ms**`
  );
};

module.exports = {
  name: "ping",
  help: "Mostra o ping do bot",
  section: "⚙️ Sistema",
  usage: "ping",
  execute,
};