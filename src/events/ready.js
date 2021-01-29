const ready = async (bot) => {
    console.log(
      `Estou conectado como ${bot.user.username} | Servidores: ${bot.guilds.cache.size}`
    );
  
    bot.user.setActivity("/help", { type: 3 });
  };
  
  module.exports = {
    ready,
  };