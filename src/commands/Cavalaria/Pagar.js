const getHelp = require("../../util/helpDoubt.js").helpDoubt;
// MODELS
const Data = require("../../models/data.js");

const execute = async (bot, msg, args) => {
  let user = msg.mentions.members.first() || bot.users.cache.get(args[0]);

  if (!user) {
    msg.reply("Por favor mencione alguêm!");
    getHelp(msg, bot, "pay");
    return;
  }

  if (user.id === msg.author.id)
    return msg.reply("Você não pode pagar você mesmo!");

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
            if (err) console.log(err);
            if (!args[1]) {
              msg.reply("Esqueceu de dizer quanto dinheiro quer pagar");
              getHelp(msg, bot, "pagar");
              return;
            }

            if (!Number.isInteger(parseInt(args[1])))
              return msg.reply("Isso não é um número");

            if (parseInt(args[1]) > authorData.money)
              return msg.reply("Você não tem esse dinheiro!");

            if (parseInt(args[1]) < 1)
              return msg.reply("Não pode pagar menos de 1R$!");

            if (!userData) {
              const newData = new Data({
                name: bot.users.cache.get(user.id).username,
                userID: user.id,
                lb: "all",
                money: parseInt(args[1]),
                daily: 0,
              });
              authorData.money -= parseInt(args[1]);
              newData.save().catch((err) => console.log(err));
              authorData.save().catch((err) => console.log(err));
            } else {
              userData.money += parseInt(args[1]);
              authorData.money -= parseInt(args[1]);
              userData.save().catch((err) => console.log(err));
              authorData.save().catch((err) => console.log(err));
            }
            return msg.channel.send(
              `${msg.author.username} pagou ${args[1]}R$ para ${
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
  name: "pagar",
  section: "🏇 Cavalaria",
  help: "Pagar dinheiro a outra pessoa",
  usage: "pagar @menção dinheiro",
  execute,
};
