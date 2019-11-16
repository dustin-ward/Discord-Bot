const Discord = require("discord.js");
const cfg = require("../config.json");
const xp = require("../xp.json");

module.exports.run = async (bot, message, args) => {
  if(!xp[message.author.id]){
    xp[message.author.id] = {
      xp: 0,
      level: 1
    };
  }

  let curxp = xp[message.author.id].xp;
  let curlvl = xp[message.author.id].level - 1;
  let nxtlvlup = curlvl * 300;
  let difference = nxtlvlup - curxp;

  let lvlEmbed = new Discord.RichEmbed()
    .setAuthor(message.author.username)
    .setColor(cfg.xpcolor)
    .addField("Level", curlvl, true)
    .addField("XP", curxp, true)
    .setFooter(`${difference} XP to level up`, message.author.displayAvatarURL);
  message.channel.send(lvlEmbed).then(message.delete(0)).then(msg => {msg.delete(15000)});
}

module.exports.help = {
  name: "level"
}
