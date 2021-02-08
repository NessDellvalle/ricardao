const Discord = require("discord.js");
const Canvas = require("canvas");
const colors = require("../../json/colors.json");
const { MessageEmbed } = require("discord.js");
// MODELS
const Data = require("../../models/data.js");
const execute = async (bot, msg, args) => {
  if (!args[0]) {
    var user = msg.author;
  } else {
    var user = msg.mentions.users.first() || bot.users.cache.get(args[0]);
  }

  Data.findOne(
    {
      userID: user.id,
    },
    async (err, data) => {
      if (err) console.log(err);
      if (!data) {
        msg.reply(
          "Não foi encontrada nenhuma conta! Para criar uma conta é necessário digitar: `/criar`"
        );
      } else {
        const canvas = Canvas.createCanvas(440, 200);
        const ctx = canvas.getContext("2d");

        //? Generate image
        var background = await Canvas.loadImage(
          "https://i.imgur.com/HZTzUpB.jpg"
        );
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
        ctx.strokeStyle = "#C0C0C0";
        ctx.strokeRect(0, 0, canvas.width, canvas.height);

        ctx.beginPath();
        ctx.fillStyle = "gray";
        ctx.globalAlpha = 0.21;
        ctx.fillRect(30, 0, 110, 256);
        ctx.globalAlpha = 1;
        ctx.fillStyle = "white";

        //? Name
        ctx.font = "30px Arial";
        ctx.fillText(user.username, 180, 50);
        ctx.fillText(`${data.money} R$`, 180, 95);
        ctx.font = "22px Arial";
        ctx.fillText(`🛡️ ${data.securityLevel}`, 290, 140); //371
        ctx.fillText(`🕵️ ${data.stealLevel}`, 341, 140);
        //? Avatar
        const avatar = await Canvas.loadImage(
          user.displayAvatarURL({ format: "jpg" })
        );

        ctx.drawImage(avatar, 35, 25, 100, 100);

        //? xpLevel

        ctx.beginPath();
        ctx.globalAlpha = 0.6;
        ctx.rect(35, 150, 100, 25);
        ctx.fillStyle = "#6F5E32";
        ctx.fill();
        ctx.globalAlpha = 1;
        ctx.beginPath();
        ctx.lineWidth = 4;
        ctx.strokeStyle = "white";
        ctx.strokeRect(35, 150, 100, 25);

        ctx.fillStyle = "white";
        ctx.font = "20px Arial";
        ctx.fillText(`LVL ${data.xpLevel}`, 62, 170);

        exp = data.xp;
        lvl = data.xpLevel;

        ctx.lineWidth = 4;
        ctx.stroke.style = colors.white;
        ctx.globalAlpha = 0.2;
        ctx.fillStyle = "#000000";
        ctx.globalAlpha = 1;
        ctx.strokeRect(180, 150, 221, 25);

        //bar
        ctx.fillStyle = "#6F5E32";
        ctx.globalAlpha = 0.6;
        ctx.fillRect(182, 152, (100/2 / (lvl * 100/2)) * exp * 2.148, 21);
        //ctx.fill();
        ctx.globalAlpha = 1;
        //text
        ctx.font = "20px Arial";
        ctx.textAlign = "center";
        ctx.fillStyle = colors.white;
        ctx.fillText(`${exp} / ${lvl * 100/2} XP`, 300.5, 170);

        const final = new Discord.MessageAttachment(
          canvas.toBuffer(),
          "balance.png"
        );

        const embed = new MessageEmbed()
          .setAuthor(
            `${user.username} Conta`,
            user.displayAvatarURL({ size: 4096, dynamic: true })
          )
          .setColor("#FA5000")
          .setImage("attachment://balance.png")
          .setFooter("Dica: Use 'trablhar' para ganhar 125R$ a cada 3 horas")
          .attachFiles(final);
        return msg.channel.send(embed);
      }
    }
  );
};

module.exports = {
  name: "conta",
  section: "🏇 Cavalaria",
  help: "Mostra o seu dinheiro",
  usage: "conta OU conta @menção",
  execute,
};
