const Discord = require("discord.js");
const cfg = require("../config.json");

module.exports.run = async (bot, message, args) => {
  let botembed = new Discord.RichEmbed()
    .setDescription("List of all the current commands:")
    .setColor(cfg.color)
    .setThumbnail(bot.user.displayAvatarURL)
    .addField(".avatar", "Returns the Avatar URL of the requesting user")
    .addField(".crabmeme", ":crab:")
    .addField(".botinfo", "Description of this bot")
    .addField(".level", "Returns the level of the requesting user")
    .addField(".ping", "Returns the latency between the bot and discord");

  message.channel.send(botembed).then(message.delete(0));
}

module.exports.help = {
  name: "help"
}
