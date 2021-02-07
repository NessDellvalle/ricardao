const Discord = require("discord.js");
const colors = require("../../json/colors.json");
const fs = require('fs');
// MODELS
const Data = require("../../models/data.js");

const execute = async (bot, msg, args) => {
  
  Data.find({
    lb: "all",
  })
    .sort([["money", "descending"]])
    .exec((err, res) => {
      if (err) console.log(err);

      var users = 0;
      for (i = 0; i < res.length; i++) {

        if(res.money != -1) {
          users++;
        }
      }

      var page = Math.ceil(users / 10);

      let embed = new Discord.MessageEmbed();
      embed.setColor(colors.brown);
      embed.setTitle("Top");
      embed.setThumbnail(
        "https://dbdzm869oupei.cloudfront.net/img/sticker/preview/22422.png"
      );
      //name
      let pg = parseInt(args[0]);
      if (pg != Math.floor(pg)) pg = 1;
      if (!pg) pg = 1;
      let end = pg * 10;
      let start = pg * 10 - 10;

      if (res.length === 0) {
        embed.addField("Error", "No pages found!");
      } else if (res.length <= start) {
        embed.addField("Error", "Page not found!");
      } else if (res.length <= end) {
        embed.setFooter(`page ${pg} of ${page}`);

        for (i = start; i < res.length; i++) {
          
          if (res[i].money == -1) {
          } else {
            embed.addField(
              `${i + 1}. ${!bot.users.cache.get(res[i].id) ? res[i].name : bot.users.cache.get(res[i].id).username}`,
              `$${res[i].money.toLocaleString()}`
            );
          }
        }
      } else {
        embed.setFooter(`page ${pg} of ${page}`);
        for (i = start; i < end; i++) {
          if (res[i].money == -1) {
          } else {
            embed.addField(
              `${i + 1}. ${!bot.users.cache.get(res[i].id) ? res[i].name : bot.users.cache.get(res[i].id).username}`,
              `$${res[i].money.toLocaleString()}`
            );
          }
        }
      }

      msg.channel.send(embed);
    });
};

module.exports = {
  name: "top",
  section: "🏇 Cavalaria",
  help: "Mostra os top users da economia",
  usage: "top",
  execute,
};