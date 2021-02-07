// MODELS
const Data = require("../../models/data.js");

const execute = async (bot, msg, args) => {
  Data.findOne(
    {
      userID: msg.author.id,
    },
    async (err, data) => {
      if (err) console.log(err);
      if (!data) {
        const newData = new Data({
          name: msg.author.username,
          userID: msg.author.id,
          lb: "all",
          money: 0,
          daily: 0,
          stelTime: 0,
          securityLevel: 1,
          stealLevel: 1,
          xp: 0,
          xpLevel: 1,
          workTime: 0,
          weekly: 0,
        });
        newData.save().catch((err) => console.log(err));
        return msg.reply("Criada, digite: /conta");
      } else {
        return msg.reply("Você já tem uma conta, digite: /conta");
      }
    }
  );
};

module.exports = {
  name: "criar",
  section: "🏇 Cavalaria",
  help: "Você cria a sua conta no sistema de cavalaria",
  usage: "criar",
  execute,
};
