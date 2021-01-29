const DisTube = require('distube');
const execute = async (bot, msg, args) => {
    let queue = await bot.distube.getQueue(msg);

    if (queue) {
        bot.distube.skip(msg);
    } else {
        return msg.reply('Não exite música')
    }

};

module.exports = {
  name: "skip",
  help: "Skipa a música",
  section: "🎵 Música",
  usage: "skip",
  execute,
};
