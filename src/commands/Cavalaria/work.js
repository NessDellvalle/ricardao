const Discord = require("discord.js");

const ms = require("parse-ms");

const { time } = require("console");

// MODELS
const Data = require("../../models/data.js");
const { DESTRUCTION } = require("dns");
const { db } = require("../../models/data.js");

const execute = async (bot, msg, args) => {
  let timeout = 10800000;


  Data.findOne(
    {
      userID: msg.author.id,
    },
    (err, data) => {
      if (err) console.log(err);
      if (!data) {
        msg.reply("Oi, você precissa cria uma conta primeiro! `/criar`");
      } else {
        let reward = 125 + (15*data.xpLevel);
        if (timeout - (Date.now() - data.workTime) > 0) {
          let time = ms(timeout - (Date.now() - data.workTime));
          const description = [
            `Pode trabalhar em: ${time.hours}H  ${time.minutes}M ${time.seconds}S`,
            `Enquanto você espera. [Adicione-me no seu servidor!](${`https://discord.com/api/oauth2/authorize?client_id=${bot.user.id}&permissions=8&scope=bot`})`,
          ];
          const embed = new Discord.MessageEmbed() 
            .setColor("#00FFFF")
            .setAuthor(
              msg.author.tag,
              msg.author.displayAvatarURL({ size: 4096, dynamic: true })
            )
            .setTitle("Você já trabalhou!")
            .setDescription(description);
          return msg.channel.send(embed);
        } else {
          const gerarXp =  Math.floor(Math.random() * 10) + 5;
          if (data.xpLevel * 100/2 <= data.xp) {
            data.xp = 0;
            data.xpLevel += 1;
          }
          data.xp += gerarXp;
          data.money += reward;
          data.workTime = Date.now();
          data.save().catch((err) => console.log(err));
          const embed = new Discord.MessageEmbed()
            .setColor("#00FFFF")
            .setAuthor(
              msg.author.tag,
              msg.author.displayAvatarURL({ size: 4096, dynamic: true })
            )
            .setTitle("Você trabalhou com sucesso!")
            .setThumbnail('https://cdn.discordapp.com/attachments/721367456148619264/803129179226112030/9679d0dc653d0b9f7d4df46f4f3f3126694231e1r1-500-455_hq.gif')
            .setDescription(`Você recebeu: ${reward}R$`);
          return msg.channel.send(embed);
        }
      }
    }
  );
};

module.exports = {
  name: "trabalhar",
  section: "🏇 Cavalaria",
  help: "Você recebe 125$ por 3 horas!",
  usage: "trabalhar",
  execute,
};
