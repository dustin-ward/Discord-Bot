const Discord = require("discord.js");
const bot = new Discord.Client();
const ytdl = require("ytdl-core");
const request = require("request");
const getYouTubeID = require("get-youtube-id");
const fetchVideoInfo = require("youtube-info");
const cfg = require("./config.json");
const fs = require("fs");
const xp = require("./xp.json");
bot.commands = new Discord.Collection();

var queue = [];
var isPlaying = false;
var dispatcher = null;
var voiceChannel = null;
var skipReq = 0;
var skippers = [];


//Read Commands
//
fs.readdir("./commands/", (err, files) => {
  if(err) console.log(err);

  let jsfile = files.filter(f => f.split(".").pop() === "js")
  if(jsfile.length <= 0) {
    console.log("No commands found.");
    return;
  }
  jsfile.forEach((f, i) => {
    let props = require(`./commands/${f}`);
    console.log(`${f} loaded`);
    bot.commands.set(props.help.name, props);
  })
})




//On Ready
//
bot.on("ready", async () => {
  console.log(`Bot: ${bot.user.tag} ID: ${bot.user.id} Started in ${bot.guilds.size} guilds.`);
  bot.user.setActivity(`${bot.guilds.size} servers ||  ${cfg.prefix}help`, {type: "WATCHING"});
});




//XP System
//
bot.on("message", async message => {
  let xpAdd = Math.floor(Math.random() * 7) + 8;

  if(!xp[message.author.id]){
    xp[message.author.id] = {
      xp: 0,
      level: 1
    };
  }

  let curxp = xp[message.author.id].xp;
  let curlvl = xp[message.author.id].level;
  let nxtlvl = xp[message.author.id].level * 300;
  xp[message.author.id].xp = curxp + xpAdd;

  if(nxtlvl <= xp[message.author.id].xp){
    xp[message.author.id].level = curlvl + 1;
    let lvlup = new Discord.RichEmbed()
      .setColor(cfg.xpcolor)
      .addField("You leveled up!", `${message.author.tag} is now level ${curlvl}`);
    message.channel.send(lvlup).then(msg => {msg.delete(3000)});
  }
  fs.writeFile("./xp.json", JSON.stringify(xp), (err) => {
    if(err) console.log(err);
  });
})




//On Message
//
bot.on("message", async message => {
  if(message.author.bot || message.channel.type === "dm" || !message.content.startsWith(cfg.prefix)) return;

  // Prefix System
  //
  let prefix = cfg.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);


  // Command File System
  //
  let commandfile = bot.commands.get(cmd.slice(prefix.length));
  if(commandfile) commandfile.run(bot, message, args);

});


bot.login(cfg.token);
