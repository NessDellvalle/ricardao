const DisTube = require('distube');
const execute = async (bot, msg, args) => {
    if (!msg.member.voice.channel) {
        return msg.reply("Desculpe mas o senhor esqueceu de estar num canal de voz!");
      }
    const music = args.join(' ');
    bot.distube.play(msg, music);
};

module.exports = {
  name: "play",
  help: "Coloca musica a tocar num canal de voz",
  section: "🎵 Música",
  usage: "play NomeDaMúsica",
  execute,
};
