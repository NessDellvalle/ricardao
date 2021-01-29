const DisTube = require('distube');
const execute = async (bot, msg, args) => {
    let queue = await bot.distube.getQueue(msg);

    if (queue) {
        bot.distube.pause(msg);
    } else {
        return msg.reply('Não exite música')
    }

};

module.exports = {
  name: "pause",
  help: "Pausa a música",
  section: "🎵 Música",
  usage: "pause",
  execute,
};