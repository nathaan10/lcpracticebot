// server.js
// where your node app starts

// init project
const express = require("express");
const app = express();

// we've started you off with Express,
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function(request, response) {
  response.sendFile(__dirname + "/views/index.html");
});

// listen for requests :)
const listener = app.listen(process.env.PORT, function() {
  console.log("Your app is listening on port " + listener.address().port);
});

const Discord = require("discord.js");
const client = new Discord.Client();
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('database.json');
const db = low(adapter);

db.defaults({ histoires: [], xp: []}).write()

var prefix = "é";

var dispatcher;

client.login(process.env.TOKEN);

client.on("ready", () => {
  console.log(`Bot: Hosting ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`);
  client.user.setStatus("dnd", "cc");
  client.user.setActivity("lcpractice.fr", { type: "STREAMING" });
  var generalChannel = client.channels.get("668549673526755359");
});

client.on("guildMemberAdd", member => {
  member.guild.channels
    .get("668549673526755359")
    .send(member.user + ", Welcome to **LCPRACTICE** discord server :flag_fr:" + " [**" + member.guild.memberCount + "**]"
    );
  var role = member.guild.roles.find("name", "PVPERS ☢");
  member.addRole(role);
});

client.on("guildMemberRemove", member => {
  member.guild.channels
    .get("668549673526755359")
    .send(member.user + ", leave the server. :wave:" + " (**" + member.guild.memberCount + "**)"
    );
});


client.on('message', message => {
  
  var msgauthor = message.author.id;
  
  if(message.author.bot)return;
  
  if(!db.get("xp").find({user: msgauthor}).value()){
    db.get("xp").push({user: msgauthor, xp: 1}).write();
  }else{
    var userxpdb = db.get("xp").filter({user: msgauthor}).find('xp').value();
    console.log(userxpdb);
    var userxp = Object.values(userxpdb)
    console.log(userxp)
    console.log(`xp: ${userxp[1]}`)
    
    db.get("xp").find({user: msgauthor}).assign({user: msgauthor, xp: userxp[1] += 1}).write();
    
  if (message.content === prefix + "xp"){
    var xp = db.get("xp").filter({user: msgauthor}).find('xp').value()
    var xpfinal = Object.values(xp)
    var xp_embed = new Discord.RichEmbed()
      .setTitle(`${message.author.username}`)
      .setColor('#F4D03F')
      .setDescritpion("xpp")
      .addField("XP:", `${xpfinal[1]} xp`)
    message.channel.send({embed: xp_embed});
  }
  }
  });

client.on("message", message => {
  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;

  let command = message.content.split(" ")[0];
  command = command.slice(prefix.length);

  let args = message.content.split(" ").slice(1);

  if (message.content === prefix + "discord") {
    var commands_embed = new Discord.RichEmbed()
      .setTitle("https://discord.gg/BG2VxK7", true)
      .setColor("#4f88ca");
    message.channel.sendEmbed(commands_embed);
  }
  if (message.content === prefix + "namemc") {
    var commands_embed = new Discord.RichEmbed()
      .setTitle("https://fr.namemc.com/server/lcpractice.fr", true)
      .setColor("#277929");
    message.channel.sendEmbed(commands_embed);
  }
  if (message.content === prefix + "stats") {
    var commands_embed = new Discord.RichEmbed()
      .setTitle("https://minecraft-statistic.net/en/server/lcpractice/top/", true)
      .setColor("RANDOM");
    message.channel.sendEmbed(commands_embed);
  }
  if (message.content === prefix + "bvn") {
    var commands_embed = new Discord.RichEmbed()
      .setTitle("Bienvenue fils !", true)
      .setColor("RANDOM");
    message.delete();
    message.channel.sendEmbed(commands_embed);
  }
  if (message.content === prefix + "twitter") {
    var commands_embed = new Discord.RichEmbed()
      .setTitle("https://twitter.com/lcpractice")
      .setColor("#00beff");
    message.channel.sendEmbed(commands_embed);
  }
  if (message.content === prefix + "ip") {
    var commands_embed = new Discord.RichEmbed()
      .setTitle("lcpractice.fr")
      .setColor("#00beff");
    message.channel.sendEmbed(commands_embed);
  }
  if (command == "say") {
    message.delete();
    const embed = new Discord.RichEmbed()
      .setDescription(message.author.username + ": " + args.join(" "))
      .setColor("#ffffff");
    message.delete();
    message.channel.send({ embed });
  }
  if(command === "sayy") {
    const sayMessage = args.join(" ");
    message.delete().catch(O_o=>{}); 
    message.channel.send(sayMessage);
  }
  if (command == "bypass") {
    const embed = new Discord.RichEmbed()
      .setDescription(args.join(" "))
      .setColor("RANDOM");
    message.delete();
    message.channel.send({ embed });
  }

  if (message.content.startsWith(prefix + "annp")) {
    if (!message.guild.member(message.author).hasPermission("ADMINISTRATOR"))
      return message.channel.send("❌");
    if (!message) return message.channel.send({ message });

    var mpall = new Discord.RichEmbed()
      .setThumbnail(client.user.avatarURL)
      .setTimestamp()
      .setColor("RANDOM")
      .addField(":bell:", message);
    message.delete();
    message.guild.members.map(m => m.send(mpall));
  }
})

client.on("message", message => {
  let command = message.content.split(" ")[0];
  command = command.slice(prefix.length);

  let args = message.content.split(" ").slice(1);

  if (command == "p") {
    message.channel.send(message.author.avatarURL);
  }
});

client.on("message", message => {
  if (message.content === "Bonjour") {
    message.channel.send("Bonjour");
  }
  if (message.content === "aide moi") {
    message.channel.send("oui fils.");
  }
  if (message.content === "xsfot") {
    message.channel.send("le meilleur <3");
  }
  if (message.isMentioned(client.user)) {
    message.reply("hmmm..?");
  }
});

client.on("message", function(message) {
  if (!message.guild) return;
  let args = message.content.trim().split(/ +/g);

  if (args[0].toLowerCase() === prefix + "kick") {
    if (!message.member.hasPermission("KICK_MEMBERS"))
      return message.channel.send("perm :false:");
    let member = message.mentions.members.first();
    if (!member) return message.channel.send("mention :false:");
    if (
      member.highestRole.calculatedPosition >=
        message.member.highestRole.calculatedPosition &&
      message.author.id !== message.guild.owner.id
    )
      return message.channel.send("kick false 2");
    if (!member.kickable) return message.channel.send("kick :false");
    member.kick();
    message.channel.send(member.user.username + " has been kicked");
  }

  if (args[0].toLocaleLowerCase() === prefix + "ban") {
    if (!message.member.hasPermission("BAN_MEMBERS"))
      return message.channel.send("perm :false:");
    let member = message.mentions.members.first();
    if (!member) return message.channel.send("mention :false:");
    if (
      member.highestRole.calculatedPosition >=
        message.member.highestRole.calculatedPosition &&
      message.author.id !== message.guild.owner.id
    )
      return message.channel.send("ban false 2");
    if (!member.bannable) return message.channel.send("ban :false:");
    message.guild.ban(member, { days: 7 });
    message.channel.send(member.user.username + " has been banned");
  }

  if (args[0].toLowerCase() === prefix + "clear") {
    if (!message.member.hasPermission("MANAGE_MESSAGES"))
      return message.channel.send("perm :false:");
    let count = parseInt(args[1]);
    if (!count) return message.channel.send("numbers");
    if (isNaN(count)) return message.channel.send("valid numbers");
    if (count < 1 || count > 100) return message.channel.send("1 / 100");
    message.channel.bulkDelete(count + 1, true);
    message.channel.send(":writing_hand:");
  }

  if (args[0].toLowerCase() === prefix + "unmute") {
    if (!message.member.hasPermission("MANAGE_MESSAGES"))
      return message.channel.send(
        "Vous n'avez pas la permission d'utiliser cette commande."
      );
    let member = message.mentions.members.first();
    if (!member) return message.channel.send("Membre :false:");
    if (
      member.highestRole.calculatedPosition >=
        message.member.highestRole.calculatedPosition &&
      message.author.id !== message.guild.ownerID
    )
      return message.channel.send("perm :false1:");
    if (!member.manageable) return message.channel.send("perm :false2:");
    let muterole = message.guild.roles.find(role => role.name === "Muted");
    if (muterole && member.roles.has(muterole.id)) member.removeRole(muterole);
    message.channel.send(member + " has been unmuted");
  }

  if (args[0].toLowerCase() === prefix + "mute") {
    if (!message.member.hasPermission("MANAGE_MESSAGES"))
      return message.channel.send("perm :false:");
    let member = message.mentions.members.first();
    if (!member) return message.channel.send("member :false:");
    if (
      member.highestRole.calculatedPosition >=
        message.member.highestRole.calculatedPosition &&
      message.author.id !== message.guild.ownerID
    )
      return message.channel.send("Vous ne pouvez pas mute ce membre");
    if (!member.manageable) return message.channel.send("mute :false:");
    let muterole = message.guild.roles.find(role => role.name === "Muted");
    if (muterole) {
      member.addRole(muterole);
      message.channel.send(member + " kiss");
    } else {
      message.guild
        .createRole({ name: "Muted", permissions: 0 })
        .then(function(role) {
          message.guild.channels
            .filter(channel => channel.type === "text")
            .forEach(function(channel) {
              channel.overwritePermissions(role, {
                SEND_MESSAGES: false
              });
            });
          member.addRole(role);
          message.channel.send(member + " :white_check_mark:");
        });
    }
  }
});
