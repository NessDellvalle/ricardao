const Discord = require("discord.js");
const colors = require("../../json/colors.json");
const { MessageEmbed } = require("discord.js");
const execute = async (bot, msg, args) => {
  let cavalo1 = ["` ' `|", "` ' `|", "` ' `|", "` ' `|", "` ' `|", "⠀🏇"];
  let cavalo2 = ["` ' `|", "` ' `|", "` ' `|", "` ' `|", "` ' `|", "⠀🎠"];
  let cavalo3 = ["` ' `|", "` ' `|", "` ' `|", "` ' `|", "` ' `|", "⠀🟢"];
  let cavalo4 = ["` ' `|", "` ' `|", "` ' `|", "` ' `|", "` ' `|", "⠀🔴"];
  let cavalo5 = ["` ' `|", "` ' `|", "` ' `|", "` ' `|", "` ' `|", "⠀🔵"];
  var corrida = [];
  for (i = 0; i < cavalo1.length; i++) {
    corrida.push(cavalo1[i] + cavalo2[i] + cavalo3[i] + cavalo4[i] + cavalo5[i]);
  }
  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  const Embed = new MessageEmbed().setColor(colors.orange).setDescription(corrida);

  var win = false;
  var c1 = 1;
  var c2 = 1;
  var c3 = 1;
  var c4 = 1;
  var c5 = 1;
  msg.channel.send(Embed).then((msg) => {
    do {
      var n = Math.floor(Math.random() * 5) + 1;
      switch (n) {
        case 1:
          c1++;
          cavalo1[cavalo1.length - c1] = "⠀🏇";
          cavalo1[cavalo1.length - c1 + 1] = "` ' `|";
          if (c1 == 6) win = true;
          break;
        case 2:
          c2++;
          cavalo2[cavalo1.length - c2] = "⠀🎠";
          cavalo2[cavalo1.length - c2 + 1] = "` ' `|";
          if (c2 == 6) win = true;
          break;
        case 3:
          c3++;
          cavalo3[cavalo1.length - c3] = "⠀🟢";
          cavalo3[cavalo1.length - c3 + 1] = "` ' `|";
          if (c3 == 6) win = true;
          break;
        case 4:
          c4++;
          cavalo4[cavalo1.length - c4] = "⠀🔴";
          cavalo4[cavalo1.length - c4 + 1] = "` ' `|";
          if (c4 == 6) win = true;
          break;
        case 5:
          c5++;
          cavalo5[cavalo1.length - c5] = "⠀🔵";
          cavalo5[cavalo1.length - c5 + 1] = "` ' `|";
          if (c5 == 6) win = true;
          break;
      }
      for (i = 0; i < cavalo1.length; i++) {
        corrida[i] = cavalo1[i] + cavalo2[i] + cavalo3[i] + cavalo4[i] + cavalo5[i];
      }
      sleep(1000);
      Embed.setDescription(corrida);
      msg.edit(Embed);
    } while (!win);
  });
};

module.exports = {
  name: "corrida",
  help: "corrida de cavalos",
  section: "🏇 Cavalaria",
  usage: "corrida",
  execute,
};
