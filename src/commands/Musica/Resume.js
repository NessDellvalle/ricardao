const DisTube = require('distube');
const execute = async (bot, msg, args) => {
    let queue = await bot.distube.getQueue(msg);

    if (queue) {
        bot.distube.resume(msg);
    } else {
        return msg.reply('Não exite música')
    }

};

module.exports = {
  name: "resume",
  help: "Continua a música pausada",
  section: "🎵 Música",
  usage: "resume",
  execute,
};