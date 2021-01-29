const Discord = require("discord.js");
const Canvas = require("canvas");
const { MessageEmbed } = require("discord.js");
const colors = require("../../json/colors.json");
const execute = async (bot, msg, args) => {
  var Ness = bot.users.cache.get("513113161126248469");
  var Ericlis = bot.users.cache.get("705281721997852703");
  //msg.channel.send("Ness\nEriclis");
  const canvas = Canvas.createCanvas(700, 250);
  const ctx = canvas.getContext("2d");
  ctx.save();
  var background = await Canvas.loadImage("https://i.imgur.com/ILuIJIu.jpg");
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

  ctx.font = "32px sans-serif";
  ctx.fillStyle = "#FFFFFF";
  ctx.shadowColor = "black";
  ctx.shadowBlur = 7;
  ctx.lineWidth = 5;
  ctx.fillText(Ness.tag, 25, 240);

  ctx.font = "32px sans-serif";
  ctx.fillStyle = "#FFFFFF";
  ctx.shadowColor = "black";
  ctx.shadowBlur = 7;
  ctx.lineWidth = 5;
  ctx.fillText(Ericlis.tag, 475, 240);

  //? Avatar Ness
  ctx.beginPath();
  ctx.arc(125, 110, 100, 0, Math.PI * 2, true);
  ctx.lineWidth = 6;
  ctx.strokeStyle = "#FFFCFC";
  ctx.stroke();
  ctx.closePath();
  ctx.clip();
  const avatar = await Canvas.loadImage(
    Ness.displayAvatarURL({ format: "jpg" })
  );
  ctx.drawImage(avatar, 25, 10, 200, 200);

  ctx.restore();
  //? Avatar Ericlis
  ctx.beginPath();
  ctx.arc(575, 110, 100, 0, Math.PI * 2, true);
  ctx.lineWidth = 6;
  ctx.strokeStyle = "#FFFCFC";
  ctx.stroke();
  ctx.closePath();
  ctx.clip();
  const avatar1 = await Canvas.loadImage(
    Ericlis.displayAvatarURL({ format: "jpg" })
  );
  ctx.drawImage(avatar1, 475, 10, 200, 200);
  const devs = new Discord.MessageAttachment(canvas.toBuffer(), "devs.png");

  const embed = new MessageEmbed()
    .setAuthor(
      bot.user.username,
      bot.user.displayAvatarURL({ size: 4096, dynamic: true })
    )
    .setColor(colors.cream)
    .setImage("attachment://devs.png")
    .setFooter(`Desenvolvedores: ${Ness.tag} | ${Ericlis.tag}`)
    .attachFiles(devs);
  return msg.channel.send(embed);
};

module.exports = {
  name: "dev",
  help: "Mostra os Desenvolvedores do Bot!",
  section: "⚙️ Sistema",
  usage: "dev",
  execute,
};
