const Discord = require("discord.js");
const colors = require("../../json/colors.json");
const { MessageEmbed } = require("discord.js");
const execute = async (bot, msg, args) => {
  if (!args[0]) {
    var user = msg.author;
  } else {
    var user = msg.mentions.users.first() || bot.users.cache.get(args[0]);
  }

  let avatar = user.avatarURL({ dynamic: true, format: "png", size: 1024 });

  let embed = new MessageEmbed()
    .setColor(colors.green)
    .setTitle(`Avatar de ${user.username}`)
    .setDescription(`[Baixar ⬇️](${avatar})`)
    .setImage(avatar)
    .setFooter(
      `• Autor: ${msg.author.tag}`,
      msg.author.displayAvatarURL({ format: "png" })
    );
  await msg.channel.send(embed);
};

module.exports = {
  name: "avatar",
  help: "Mostra o seu avatar ou alguêm mencionado",
  section: "😂 Divertimento",
  usage: "avatar",
  execute,
};
