const Discord = require("discord.js");
const colors = require("../../json/colors.json");
const Data = require("../../models/data.js");
const ms = require("parse-ms");
const execute = async (bot, msg, args) => {
  Data.findOne(
    {
      userID: msg.author.id,
    },
    async (err, data) => {
      if (err) console.log(err);
      if (!data)
        return msg.reply("Oi, você precissa cria uma conta primeiro! `/criar`");
      let workTime = ms(10800000 - (Date.now() - data.workTime));
      let dailyTime = ms(86400000 - (Date.now() - data.daily));
      let stealTime = ms(18000000 - (Date.now() - data.stealTime));
      let weekly = ms(604800000 - (Date.now() - data.weekly));
      const embed = new Discord.MessageEmbed()
        .setAuthor(
          `${msg.author.username} Tempos`,
          msg.author.displayAvatarURL({ size: 4096, dynamic: true })
        )
        .setDescription(
          `Daily: ${dailyTime.hours}H  ${dailyTime.minutes}M ${dailyTime.seconds}S\n` +
            `Trabalho: ${workTime.hours}H  ${workTime.minutes}M ${workTime.seconds}S\n` +
            `Roubar: ${stealTime.hours}H  ${stealTime.minutes}M ${stealTime.seconds}S\n` +
            `Semanada: ${weekly.days}D ${weekly.hours}H  ${weekly.minutes}M ${weekly.seconds}S`
        )
        .setColor(colors.blue);
      return msg.channel.send(embed);
    }
  );
};

module.exports = {
  name: "tempos",
  help: "Mostra os tempos que faltam para realizar as ações da economia",
  section: "🏇 Cavalaria",
  usage: "tempos",
  execute,
};
