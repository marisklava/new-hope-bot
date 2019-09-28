const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
      if (args[0] === undefined) return message.channel.send("Usage: pico-ban @user reason");
      let bicon = message.mentions.users.first().displayAvatarURL;
      let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
      if(!bUser) return message.channel.send("Can't find user.");
      let bReason = args.join(" ").slice(22);
      if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("No can do pal!");
      if(bUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("That person can't be banned!");

      let banEmbed = new Discord.RichEmbed()
      .setDescription("~Ban~")
      .setColor("#BC4523")
      .setThumbnail(bicon)
      .addField("Banned user", `${bUser} with ID ${bUser.id}`)
      .addField("Banned by", `${message.author} with ID ${message.author.id}`)
      .addField("Banned in", message.channel)
      .addField("Time", message.createdAt)
      .addField("Reason", bReason);

      let banChannel = message.guild.channels.find(`name`, "parancsok");
      if (!banChannel) return message.channel.send("Couldn't find the specific channel");

      message.guild.member(bUser).ban(bReason);

      message.delete().catch(O_o=>{});
      banChannel.send(banEmbed);
}
module.exports.help = {
    name: "ban",
    type: "admin"
}
