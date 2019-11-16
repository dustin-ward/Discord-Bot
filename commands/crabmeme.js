const Discord = require("discord.js");
const cfg = require("../config.json");

module.exports.run = async (bot, message, args) => {
  if(!args[0]) return message.channel.send("Error, no meme provided!");
  let botmessage = args.join(" ");
  message.delete().catch();
  message.channel.send(`:crab: ${botmessage} :crab:`);
}

module.exports.help = {
  name: "crabmeme"
}
