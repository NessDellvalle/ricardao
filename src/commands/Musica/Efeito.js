const DisTube = require('distube');
const execute = async (bot, msg, args) => {
    let queue = await bot.distube.getQueue(msg);
    const filtro = args.join(' ');

    if (queue) {
        if ([`3d`, `bassboost`, `echo`, `karaoke`, `nightcore`, `vaporwave`].includes(args[0])) {
            let filter = bot.distube.setFilter(msg, args[0]);
        }
    } else {
        return msg.reply('Não exite música')
    }



};

module.exports = {
  name: "efeito",
  help: "Coloca um efeito na musica: [`3d`, `bassboost`, `echo`, `karaoke`, `nightcore`, `vaporwave`]",
  section: "🎵 Música",
  usage: "efeito `nome do efeito`",
  execute,
};