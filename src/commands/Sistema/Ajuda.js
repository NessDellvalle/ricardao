const { MessageEmbed } = require("discord.js");
const getHelp = require("../../util/helpDoubt.js").helpDoubt;
const colors = require("../../json/colors.json");
const execute = async (bot, msg, args) => {
  if (args[0]) return getHelp(msg, bot, args[0]);  

  //? Prefix
  const prefix = process.env.PREFIX;

  var sections = [];
  var commands = [];
  const gen = bot.commands;
  for (const num of gen) {
    if (!sections.includes(num[1].section) && num[1].section != undefined)
      sections.push(num[1].section);
  }

  for (const num of gen) {
    if (!commands.includes(num[1].name) && num[1].section != undefined)
      commands.push(num[1].name);
  }

  var help = "";
  for (section = 0; section < sections.length; section++) {
    help += `\n**${sections[section]}**\n`;
    for (command = 0; command < commands.length; command++) {
      const c = bot.commands.get(commands[command]);
      if (c.section === sections[section])
        help += "`" + prefix + c.name + "`, ";
    }
  }

  var kaori = bot.users.cache.get(bot.user.id);
  let kaoriavatar = kaori.displayAvatarURL({ size: 4096, dynamic: true });
  var dev = bot.users.cache.get("513113161126248469");
  let devavatar = dev.displayAvatarURL({ size: 4096, dynamic: true });
  let Emebed = new MessageEmbed()
    .setAuthor("Help", kaoriavatar)
    .setColor(colors.red)
    .setDescription(help)
    .setFooter(
      `Dev: ${dev.username}#${dev.discriminator} | Qualquer coisa use: ${prefix}help CommandName`,
      devavatar
    );
  return msg.channel.send(Emebed);
};

module.exports = {
  name: "help",
  section: "⚙️ Sistema",
  help: "Show help",
  usage: "help",
  execute,
};