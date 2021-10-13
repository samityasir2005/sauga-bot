const Command = require("../../utils/command");
const Discord = require("discord.js");
const config = require("../../config.json");
module.exports = class ban extends Command {
  constructor() {
    super(
      "ban",
      `${config.prefix}ban (User Resolvable) (Reason)`,
      "Bans a Guild Member",
      false,
      "Moderation"
    );
  }
  async run(client, message, args) {
    if (args.length === 0) {
      const embed = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setTitle(`${this.name} Command Help`)
        .addField("Usage:\n", this.usage, false)
        .addField("Description:\n", this.desc, false)
        .addField("Category:\n", this.category, false)
        .setFooter(`${client.user.tag} - Command Help`)
        .setTimestamp();
      return message.channel.send(embed);
    }
    if (message.member.hasPermission("BAN_MEMBERS")) {
      const user = this.UserResolvable(
        message.guild.members.cache,
        args.shift()
      );
      const reason = args.join(" ") || "No Reason Specified";
      if (user) {
        const embed = new Discord.MessageEmbed()
          .setColor("#FFFFF")
          .setTitle("Ban Success!")
          .addField("User Info:\n", "------------", false)
          .addField("User:\n", user, true)
          .addField("User ID:\n", user.id, true)
          .addField("Staff Info:\n", "------------", false)
          .addField("Staff:\n", message.member, true)
          .addField("Staff ID:\n", message.author.id, true)
          .addField("Reason:\n", reason, false)
          .setFooter(`${client.user.tag} - Command Executed`)
          .setTimestamp();
        user.send(embed);
        await user.ban({ reason: reason });
        return message.channel.send(embed);
      } else {
        const embed = new Discord.MessageEmbed()
          .setColor("#FFFFF")
          .setTitle("Uh Oh!")
          .addField("Command:\n", this.name, false)
          .addField("Error:\n", "That User Does Not Exist", false)
          .setFooter(`${client.user.tag} - Command Error`)
          .setTimestamp();
        return message.channel.send(embed);
      }
    } else {
      const embed = new Discord.MessageEmbed()
        .setColor("#FFFFFF")
        .setTitle("Uh Oh!")
        .addField("Command:\n", this.name, false)
        .addField("Error:\n", "You require the `BAN_MEMBERS` Permission", false)
        .setFooter(`${client.user.tag} - Command Error`)
        .setTimestamp();
      return message.channel.send(embed);
    }
  }
};
