const Discord = require("discord.js");
const Data = require("../../models/data.js");
const execute = async (bot, msg, args) => {
  const bet = parseInt(args[0]);
  if (!bet) {
    return msg.reply(
      "Você precisa de dizer quanto dinheiro você quer apostar!"
    );
  }

  if (!Number.isInteger(parseInt(args[0])))
    return msg.reply("Isso não é um número");

  if (bet <= 0) {
    return msg.reply("Isso é um número negativo");
  }
  let coisa = ["❌", "❌", "❌", "❌"];
  let coisas = ["⚪", "🔴", "🟢", "🔵"];
  const m = await msg.channel.send(coisa[0] + coisa[1] + coisa[2] + coisa[3]);
  Data.findOne(
    {
      userID: msg.author.id,
    },
    (err, data) => {
      if (err) console.log(err);
      if (!data) {
        msg.reply("Você não tem uma conta: `/criar`"); //
      } else {
        if (bet > data.money) {
          return msg.reply("Você não tem tanto dinheiro!")
        }
        for (i = 0; i < 4; i++) {
          var n = Math.floor(Math.random() * 4) + 0;
          coisa[i] = coisas[n];
          m.edit(coisa[0] + coisa[1] + coisa[2] + coisa[3]);
        }
        const allEqual = arr => arr.every( v => v === arr[0] )
        if(allEqual(coisa)) {
          m.edit(coisa[0] + coisa[1] + coisa[2] + coisa[3] + " **Ganhou \:(**");
          data.money += bet*4;
          data.save().catch((err) => console.log(err));
        } else{
          m.edit(coisa[0] + coisa[1] + coisa[2] + coisa[3] + " **Perdeu \:(**");
          data.money -= bet;
          data.save().catch((err) => console.log(err));
        }
      }
    }
  );
};

module.exports = {
  name: "maquina",
  help: "Máquina de apostas",
  section: "🏇 Cavalaria",
  usage: "maquina",
  execute,
};
