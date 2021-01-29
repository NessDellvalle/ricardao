const Discord = require("discord.js");

const ms = require("parse-ms");

const { time } = require("console");

// MODELS
const Data = require("../../models/data.js");
const { DESTRUCTION } = require("dns");

const execute = async (bot, msg, args) => {
  let timeout = 43200000;
  let reward = 500;

  Data.findOne(
    {
      userID: msg.author.id,
    },
    (err, data) => {
      if (err) console.log(err);
      if (!data) {
        msg.reply("Oi, você precissa cria uma conta primeiro! `/criar`");
      } else {
        if (timeout - (Date.now() - data.daily) > 0) {
          let time = ms(timeout - (Date.now() - data.daily));
          const description = [
            `Pode coletar em: ${time.hours}H  ${time.minutes}M ${time.seconds}S`,
            `Enquanto você espera. [Adicione-me no seu servidor!](${`https://discord.com/api/oauth2/authorize?client_id=${bot.user.id}&permissions=8&scope=bot`})`,
          ];
          const embed = new Discord.MessageEmbed() 
            .setColor("#00FFFF")
            .setAuthor(
              msg.author.tag,
              msg.author.displayAvatarURL({ size: 4096, dynamic: true })
            )
            .setTitle("Você já coletou!")
            .setDescription(description);
          return msg.channel.send(embed);
        } else {
          data.money += reward;
          data.daily = Date.now();
          data.save().catch((err) => console.log(err));
          const embed = new Discord.MessageEmbed()
            .setColor("#00FFFF")
            .setAuthor(
              msg.author.tag,
              msg.author.displayAvatarURL({ size: 4096, dynamic: true })
            )
            .setTitle("Coletado!")
            .setThumbnail('https://cdn.discordapp.com/attachments/721367456148619264/803129179226112030/9679d0dc653d0b9f7d4df46f4f3f3126694231e1r1-500-455_hq.gif')
            .setDescription(`Você recebeu: ${reward}R$`);
          return msg.channel.send(embed);
        }
      }
    }
  );
};

module.exports = {
  name: "daily",
  section: "🏇 Cavalaria",
  help: "Você recebe 500R$ por 12 horas!",
  usage: "daily",
  execute,
};
