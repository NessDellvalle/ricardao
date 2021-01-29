const Discord = require("discord.js");
const dotenv = require("dotenv");
const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");
//? Events
const ready = require("../src/events/ready").ready;
const message = require("../src/events/message").message;
dotenv.config();

const bot = new Discord.Client();
bot.commands = new Discord.Collection();
const DisTube = require("distube");
bot.distube = new DisTube(bot, { searchSongs: false, emitNewSongOnly: true });
const status = (queue) =>
  `Volume: \`${queue.volume}%\` | Filter: \`${
    queue.filter || "Off"
  }\` | Loop: \`${
    queue.repeatMode
      ? queue.repeatMode == 2
        ? "All Queue"
        : "This Song"
      : "Off"
  }\` | Autoplay: \`${queue.autoplay ? "On" : "Off"}\``;
bot.distube
  .on("playSong", (message, queue, song) =>
    message.channel.send(
      `Tocando \`${song.name}\` - \`${song.formattedDuration}\`\nPedida por: ${
        song.user
      }\n${status(queue)}`
    )
  )
  .on("addSong", (message, queue, song) =>
    message.channel.send(
      `Adicionada à lista: ${song.name} - \`${song.formattedDuration}\` Pedida por: ${song.user}`
    )
  );

//? Command handler
const commandsFolder = fs.readdirSync(path.join(__dirname, "/commands"));

for (var folder of commandsFolder) {
  const files = fs
    .readdirSync(path.join(__dirname, "/commands", folder))
    .filter((filename) => /^.*\.(t|j)s$/.test(filename));
  for (var filename of files) {
    const command = require(`./commands/${folder}/${filename}`);
    bot.commands.set(command.name, command);
  }
}

bot.login(process.env.TOKEN);

//? Connect to MongoDb
mongoose.connect(process.env.mongoPass, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

console.log("MongoDb Ok!");

bot.on("ready", function () {
  ready(bot);
});

bot.on("message", async function (msg) {
  message(bot, msg);
});
