const Discord = require("discord.js");

const ms = require("parse-ms");

const { time } = require("console");
// MODELS
const Data = require("../../models/data.js");
const getHelp = require("../../util/helpDoubt.js").helpDoubt;
const execute = async (bot, msg, args) => {
    let user = msg.mentions.members.first() || bot.users.cache.get(args[0]);

    if (!user) {
      msg.reply("Por favor mencione alguêm!");
      getHelp(msg, bot, "pay");
      return;
    }
  
    if (user.id === msg.author.id)
      return msg.reply("Você não pode roubar você mesmo!");
      let timeout = 18000000;
    Data.findOne(
      {
        userID: msg.author.id,
      },
      (err, authorData) => {
        if (err) console.log(err);
        if (!authorData) {
          msg.reply("Oi, você precissa cria uma conta primeiro! `/criar`");
        } else {
          Data.findOne(
            {
              userID: user.id,
            },
            (err, userData) => {
              if (!userData) return msg.reply("A pessoa não tem uma conta!");
              if (userData.money == 0) return msg.reply("A pessoa não tem dinheiro");
              if (authorData.stealLevel < userData.securityLevel) return msg.reply("O seu nivel de roubo é inferior ao nível de segurança da pessoa");
              if (timeout - (Date.now() - authorData.stealTime) > 0) {
                let time = ms(timeout - (Date.now() - authorData.stealTime));
                return msg.reply(`Pode roubar em: ${time.hours}H  ${time.minutes}M ${time.seconds}S`);
              }
              if (err) console.log(err);
                var moneyToSteal;
                if (!(userData.money % 2 == 0)) {
                    moneyToSteal = userData.money - 1;
                } else {
                    moneyToSteal = userData.money;
                }

                moneyToSteal = moneyToSteal/2;
                moneyToSteal = Math.floor(Math.random() * moneyToSteal) + 1
                authorData.stealTime = Date.now();
                userData.money -= moneyToSteal;
                authorData.money += moneyToSteal;
                userData.save().catch((err) => console.log(err));
                authorData.save().catch((err) => console.log(err));
              return msg.channel.send(
                `${msg.author.username} roubou ${moneyToSteal}R$ a ${
                  bot.users.cache.get(user.id).username
                }`
              );
            }
          );
        }
      }
    );
};

module.exports = {
  name: "roubar",
  help: "Rouba dinheiro de alguêm",
  section: "🏇 Cavalaria",
  usage: "roubar @menção",
  execute,
};