const message = async (bot, msg) => {
  if (!msg.content.startsWith(process.env.PREFIX) || msg.author.bot) return;

  const args = msg.content.slice(process.env.PREFIX.length).split(" ");
  const command = args.shift();

  try {
    bot.commands.get(command).execute(bot, msg, args);
  } catch (e) {
    console.error(e);
    return msg.reply("Ops! Eu ainda não conheço esse comando!");
  }
};

module.exports = {
  message,
};
