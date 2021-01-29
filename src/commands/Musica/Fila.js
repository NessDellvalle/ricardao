const DisTube = require('distube');
const execute = async (bot, msg, args) => {
    let queue = await bot.distube.getQueue(msg);

    if (queue) {
        msg.channel.send('Fila:\n' + queue.songs.map((song, id) =>
            `**${id + 1}**. ${song.name} - \`${song.formattedDuration}\``
        ).slice(0, 10).join("\n"));
    } else {
        return msg.reply('Não exite música')
    }

};

module.exports = {
  name: "fila",
  help: "Mostra a fila de músicas",
  section: "🎵 Música",
  usage: "fila",
  execute,
};