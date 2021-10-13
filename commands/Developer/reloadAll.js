const Command = require("../../utils/command");
const Discord = require("discord.js");
const config = require("../../config.json");
const glob = require("glob");
module.exports = class reloadAll extends Command {
  constructor() {
    super(
      "reloadAll",
      `${config.prefix}reloadAll`,
      "Reloads All Commands **DEVELOPER ONLY**",
      false,
      "Developer"
    );
  }
  async run(client, message, args) {
    if (message.author.id != "210893052628303872") {
      const embed = new Discord.MessageEmbed()
        .setColor("#FFFFF")
        .setTitle("Uh Oh!")
        .addField("Command:\n", this.name, false)
        .addField("Error:\n", "This is a Developer Only Command!")
        .setFooter(`${client.user.tag} - Command Error`)
        .setTimestamp();
      return message.channel.send(embed);
    } else {
      await client.reloadCommands();
      const embed = new Discord.MessageEmbed()
        .setColor("#FFFFF")
        .setTitle("Reload Success")
        .addField(
          "Commands:\n",
          client.commands.reduce((total, cmd) => total + `${cmd.name},`, ""),
          false
        )
        .addField("Reload Status:\n", "Success", false)
        .setFooter(`${client.user.tag} - Command Executed`)
        .setTimestamp();
      return message.channel.send(embed);
    }
  }
};
