// MODELS
const Data = require("../../models/data.js");
const getHelp = require("../../util/helpDoubt.js").helpDoubt;

const execute = async (bot, msg, args) => {
  var author = msg.author;

  var user = msg.mentions.members.first();

  if (!user) {
     msg.reply("Precisa mencionar alguêm!");
     getHelp(msg, bot, "coinflip");
     return;
  }
  if(user.id == author.id) return msg.reply("Não pode jogar com você mesmo!");

  if (!args[1]) {
    msg.reply("Você precisa de dizer quanto dinheiro quer apostar!");
    getHelp(msg, bot, "coinflip");
    return;
  } 

  var flag = true;

  var bet = args[1];
  var side = args[2];

  let sides = ["cara", "coroa"];

  var pick = sides[Math.floor(Math.random() * sides.length)];

  if (side != "cara" && side != "coroa") {
    msg.reply("Você precissa escolher: `cara` ou `coroa`");
    getHelp(msg, bot, "coinflip");
    return;
  }
  
  if (parseInt(bet) < 1) return msg.reply("Não pode apostar menos de 1R$!");

  if (!Number.isInteger(parseInt(bet)))
    return msg.reply("Algo de errado não está certo >:(");

  var result;

  if (pick == side) {
    result = "Win";
  } else {
    result = "Lose";
  }

  Data.findOne(
    {
      userID: msg.author.id,
    },
    (err, authorData) => {
      if (err) console.log(err);
      if (!authorData)
        return msg.reply("Você não tem uma conta, digite: `/criar`");
      Data.findOne(
        {
          userID: user.id,
        },
        (err, userData) => {
          if (!userData) return msg.reply("A pessoa não tem uma conta!");

          if (err) console.log(err);

          if (parseInt(bet) > authorData.money)
            return msg.reply("Você não tem dinheiro!");

          if (parseInt(bet) > userData.money)
            return msg.reply("A pessoa não tem tanto dinheiro assim \:(!");

          msg.channel
            .send(
              `${author}, quer apostar ${bet}R$ com ${user}\n${user}, Aceitas? ☑️`
            )
            .then((msg) => {
              msg.react("☑️").then((r) => {
                //filtros
                const checkF = (reaction, users) =>
                  reaction.emoji.name === "☑️" && users.id === user.id;

                const check = msg.createReactionCollector(checkF, {
                  time: 60000,
                });
                check.on("collect", (r) => {
                  if (flag) {
                    flag = false;
                    if (result == "Win") {
                      authorData.money += parseInt(bet);
                      userData.money -= parseInt(bet);
                      authorData.save().catch((err) => console.log(err));
                      userData.save().catch((err) => console.log(err));
                      return msg.channel.send(`${author} Ganhou: ${bet}$\n${user} Perdeu: ${bet}$\nhttps://media.tenor.com/images/80912eeba514ec1d92ff1aac54d999ee/tenor.gif`);
                    } else {
                      userData.money += parseInt(bet);
                      authorData.money -= parseInt(bet);
                      authorData.save().catch((err) => console.log(err));
                      userData.save().catch((err) => console.log(err));
                      return msg.channel.send(`${user} Ganhou: ${bet}$\n${author} Perdeu: ${bet}$\nhttps://media.tenor.com/images/80912eeba514ec1d92ff1aac54d999ee/tenor.gif`);
                    }
                  }
                });
              });
            });
        }
      );
    }
  );
};

module.exports = {
  name: "coinflip",
  section: "🏇 Cavalaria",
  help: "Jogue na moeda com  alguêm! Cara ou coroa",
  usage: "coinflip @menção dinehiro cara OU coroa",
  execute,
};