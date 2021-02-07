const Discord = require("discord.js");
const colors = require("../../json/colors.json");
const { MessageEmbed } = require("discord.js");
const Canvas = require("canvas");
const execute = async (bot, msg, args) => {
  let mentionsArr = msg.mentions.users.array();
  if (mentionsArr.length === 0) {
    return msg.reply("Não existem menções suficientes");
  }

  const canvas = Canvas.createCanvas(mentionsArr.length * 200, 200);
  const ctx = canvas.getContext("2d");

  for (var i = 0; i < mentionsArr.length; i++) {
    const avatar = await Canvas.loadImage(
      mentionsArr[i].displayAvatarURL({ format: "jpg" })
    );
    ctx.drawImage(avatar, i * 200, 0, 200, 200);
  }

  const metadinha = new Discord.MessageAttachment(
    canvas.toBuffer(),
    "metadinha.png"
  );
  msg.channel.send(metadinha);
};

module.exports = {
  name: "metadinha",
  help: "Mostra o seu avatar ou alguêm mencionado",
  section: "😂 Divertimento",
  usage: "avatar",
  execute,
};
