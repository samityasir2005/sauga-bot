const Command = require('../../utils/command')
const Discord = require('discord.js')
const config = require("../../config.json")
module.exports = class nick extends Command {
    constructor() {
        super('nick', `${config.prefix}nick (User Resolvable) (New Nickname)`, 'Changes a Users Nickname', false, 'Moderation')
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
        if (message.member.hasPermission("MANAGE_NICKNAMES")) {
            try {
                const user = this.UserResolvable(message.guild.members.cache, args.shift())
                let nickname = args.join(' ')
                await user.setNickname(`${nickname}`)
                const embed = new Discord.MessageEmbed()
                    .setColor("#FFFFF")
                    .setTitle("Success!")
                    .addField("User:\n", user.user.tag, false)
                    .addField("New Nickname:\n", nickname)
                    .setFooter(`${client.user.tag} - Command Executed`)
                    .setTimestamp()
                return message.channel.send(embed)
            } catch (error) {
                const embed = new Discord.MessageEmbed()
                    .setColor("#FFFFF")
                    .setTitle("Uh Oh!")
                    .addField("Command:\n", this.name, false)
                    .addField("Error:\n", `${error}`)
                    .setFooter(`${client.user.tag} - Command Error`)
                    .setTimestamp()
                return message.channel.send(embed)
            }
        } else {
            const embed = new Discord.MessageEmbed()
                .setColor("#FFFFF")
                .setTitle("Uh Oh!")
                .addField("Command:\n", this.name, false)
                .addField("Error:\n", 'You require the Permission `MANAGE_NICKNAMES`')
                .setFooter(`${client.user.tag} - Command Error`)
                .setTimestamp()
            return message.channel.send(embed)
        }
    }
}