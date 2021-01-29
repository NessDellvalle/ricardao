const DisTube = require('distube');
const execute = async (bot, msg, args) => {
    let queue = await bot.distube.getQueue(msg);

    if (queue) {
        bot.distube.stop(msg);
    } else {
        return msg.reply('Não exite música')
    }

};

module.exports = {
  name: "stop",
  help: "Acaba com a música",
  section: "🎵 Música",
  usage: "stop",
  execute,
};
