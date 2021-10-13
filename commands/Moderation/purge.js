const Command = require('../../utils/command')
const Discord = require('discord.js')
const config = require("../../config.json")
module.exports = class purge extends Command {
    constructor() {
        super("purge", `${config.prefix}purge (1-100)`, 'Deletes # of Messages Specified', false, 'Moderation')
    }
    async run(client, message, args) {
        if (args.length === 0) {
            const embed = new Discord.MessageEmbed()
                .setColor('RANDOM')
                .setTitle(`${this.name} Command Help`)
                .addField('Usage:\n', this.usage, false)
                .addField('Description:\n', this.desc, false)
                .addField('Category:\n', this.category, false)
                .setFooter(`${client.user.tag} - Command Help`)
                .setTimestamp()
            return message.channel.send(embed)
        }
        if (message.member.hasPermission("MANAGE_MESSAGES")) {
            if (args.length == 0) {
                const embed = new Discord.MessageEmbed()
                    .setColor("#FFFFF")
                    .setTitle("Uh Oh!")
                    .addField("Command:\n", this.name, false)
                    .addField("Error:\n", "The Argument `# of Messages to Delete` is **Required**")
                    .setFooter(`${client.user.tag} - Command Error`)
                    .setTimestamp()
                return message.channel.send(embed)
            }
            await message.delete()
            const limit = parseInt(args.shift())
            const firstEmbed = new Discord.MessageEmbed()
                .setColor("#FFFFF")
                .setTitle("Command Status")
                .addField("Command:\n", this.name, false)
                .addField("State:\n", "Deleting Messages", false)
                .setFooter(`${client.user.tag} - Command State`)
                .setTimestamp()
            await message.channel.send(firstEmbed)
            client.setTimeout(async() => {
                await message.channel.bulkDelete(limit)
                const embed = new Discord.MessageEmbed()
                    .setColor("#FFFFF")
                    .setTitle("Command Status")
                    .addField("Command:\n", this.name, false)
                    .addField("State:\n", `Messages Deleted: ${limit}`, false)
                    .setFooter(`${client.user.tag} - Command State`)
                    .setTimestamp()
                return message.channel.send(embed)
            }, 3000)
        } else {
            const embed = new Discord.MessageEmbed()
                .setColor("#FFFFF")
                .setTitle("Uh Oh!")
                .addField("Command:\n", this.name, false)
                .addField("Error:\n", "You Require the `MANAGE_MESSAGES` Permission")
                .setFooter(`${client.user.tag} - Command Error`)
                .setTimestamp()
            return message.channel.send(embed)
        }
    }
}