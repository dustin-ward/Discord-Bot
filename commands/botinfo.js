const Discord = require("discord.js");
const cfg = require("../config.json");

module.exports.run = async (bot, message, args) => {
  let botembed = new Discord.RichEmbed()
    .setDescription("Bot Information")
    .setColor(cfg.color)
    .setThumbnail(bot.user.displayAvatarURL)
    .addField("Bot Name", bot.user.username)
    .addField("Author", "Dustin Ward");

    message.channel.send(botembed)
}

module.exports.help = {
  name: "botinfo"
}
