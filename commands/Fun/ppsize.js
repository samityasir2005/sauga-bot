const Command = require("../../utils/command");
const Discord = require("discord.js");
const config = require("../../config.json");
const covidReport = require("covid19-api").getReports();
const numberFormatter = require("number-formatter");
module.exports = class covid extends Command {
  constructor() {
    super(
      "ppsize",
      `${config.prefix}ppsize`,
      "Returns pp size ;)",
      false,
      "Fun"
    );
  }
  async run(client, message, args) {
    let pUser = message.mentions.members.first();
    if (!pUser) return message.channel.send("Please provide a user.");

    let gaytedbed2 = new Discord.MessageEmbed()
      .addField("User", pUser.user.tag)
      .addField("Penis Size", "D===================D");

    if (pUser.id == "210893052628303872")
      return message.channel.send(gaytedbed2);

    let repliese = [
      "8D",
      "8=D",
      "8==D",
      "8===D",
      "8====D",
      "8======D",
      "8==========D",
      "8=====D",
    ];

    let result = Math.floor(Math.random() * repliese.length);

    let gaytedbed = new Discord.MessageEmbed()
      .setColor(0x8b0000)

      .addField("User", pUser.user.tag)
      .addField("Penis Size", repliese[result]);
    if (!message.mentions.users.first()) {
      return message.channel.send(gaytedbed);
    }
    return message.channel.send(gaytedbed);
  }
};
