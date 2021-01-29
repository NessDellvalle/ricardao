const Discord = require("discord.js");
const colors = require("../../json/colors.json");
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
        const embed = new Discord.MessageEmbed()
          .setTitle(`Conta de: ${user.tag}`)
          .setColor(colors.white)
          .setDescription(`❯ <a:emoji_1:803316264549220402> Dinheiro: ${data.money}R$`)
          .setThumbnail(user.displayAvatarURL({ size: 4096, dynamic: true }));
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
