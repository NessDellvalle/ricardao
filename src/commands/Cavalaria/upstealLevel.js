// MODELS
const Data = require("../../models/data.js");

const execute = async (bot, msg, args) => {
  const id = msg.author.id;
  var flag = true;
  Data.findOne(
    {
      userID: msg.author.id,
    },
    async (err, data) => {
      if (err) console.log(err);
      if (!data) {
        return msg.reply("Oi, você precissa cria uma conta primeiro! `/criar`");
      } else {
        msg.channel.send(`Upar o seu lvl de roubo para o ${data.stealLevel+1} [${data.stealLevel*1250}R$]`).then((msg) => {
            msg.react("☑️").then((r) => {
              //filtros
              const checkF = (reaction, users) =>
                reaction.emoji.name === "☑️" && users.id === id;

              const check = msg.createReactionCollector(checkF, {
                time: 60000,
              });
              check.on("collect", (r) => {
                if (flag) {
                  flag = false;
                  if(data.money < data.stealLevel * 1250) return msg.reply("Não tem dinheiro")

                    data.money -= data.stealLevel * 1250;
                                      data.stealLevel +=1;
                    data.save().catch((err) => console.log(err));
                    msg.reply("Operação concluida!");
                }
              });
            });
          });
      }
    }
  );
};

module.exports = {
  name: "uproubo",
  section: "🏇 Cavalaria",
  help: "Você cria a sua conta no sistema de cavalaria",
  usage: "criar",
  execute,
};
