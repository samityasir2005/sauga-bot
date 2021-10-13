const Command = require('../../utils/command')
const Discord = require('discord.js')
const config = require("../../config.json")
module.exports = class kick extends Command {
    constructor() {
        super('kick', `${config.prefix}kick (User Resolvable) (Reason)`, 'Kicks a Guild Member', false, 'Moderation')
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
        if (message.member.hasPermission("KICK_MEMBERS")) {
            const user = this.UserResolvable(message.guild.members.cache, args.shift())
            if (user) {
                const reason = args.join(' ') || "No Reason Specified"
                if (!user.kickable) {
                    const embed = new Discord.MessageEmbed()
                        .setColor("#FFFFF")
                        .setTitle("Uh Oh!")
                        .addField("Command:\n", this.name, false)
                        .addField("Error:\n", "This User is Higher than Me!")
                        .addField("Solution:\n", "Provide me with `Administrator` or Move My Role Higher!")
                        .setFooter(`${client.user.tag} - Command Error`)
                        .setTimestamp()
                    return message.channel.send(embed)
                } else {
                    try {
                        await user.kick(JSON.stringify(reason))
                        const embed = new Discord.MessageEmbed()
                            .setColor("#FFFFF")
                            .setTitle("Kick Success!")
                            .addField("User Info:\n", '------------', false)
                            .addField("User:\n", user, true)
                            .addField("User ID:\n", user.id, true)
                            .addField('Staff Info:\n', '------------', false)
                            .addField("Staff:\n", message.member, true)
                            .addField("Staff ID:\n", message.author.id, true)
                            .addField('Reason:\n', reason, false)
                            .setFooter(`${client.user.tag} - Command Executed`)
                            .setTimestamp()
                        return message.channel.send(embed)
                    } catch (error) {
                        const embed = new Discord.MessageEmbed()
                            .setColor("#FFFFF")
                            .setTitle("Uh Oh!")
                            .addField('Command:\n', this.name, false)
                            .addField('Error:\n', `${error}`)
                            .setFooter(`${client.user.tag} - Command Error`)
                            .setTimestamp()
                        return message.channel.send(embed)
                    }

                }

            } else {
                const embed = new Discord.MessageEmbed()
                    .setColor("#FFFFF")
                    .setTitle("Uh Oh!")
                    .addField("Command:\n", this.name, false)
                    .addField("Error:\n", "User Does Not Exist")
                    .setFooter(`${client.user.tag} - Command Error`)
                    .setTimestamp()
                return message.channel.send(embed)
            }
        } else {
            const embed = new Discord.MessageEmbed()
                .setColor("#FFFFF")
                .setTitle("Uh Oh!")
                .addField('Command:\n', this.name, false)
                .addField('Error:\n', "You Require the `KICK_MEMBERS` Permission")
                .setFooter(`${client.user.tag} - Command Error`)
                .setTimestamp()
            return message.channel.send(embed)
        }
    }
}