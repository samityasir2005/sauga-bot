const Command = require('../../utils/command')
const Discord = require('discord.js')
const config = require("../../config.json")
module.exports = class mute extends Command {
    constructor() {
        super("unmute", `${config.prefix}mute (User Resolvable)`, 'Unmutes a User', true, 'Moderation')
    }
    async run(client, message, args) {
        if (message.member.hasPermission("MUTE_MEMBERS")) {
            const user = this.UserResolvable(message.guild.members.cache, args.shift())
            const role = message.guild.roles.cache.find(r => r.name === "Muted")
            try {
                user.roles.remove(role)
                const embed = new Discord.MessageEmbed()
                    .setColor("#FFFFF")
                    .setTitle("Unmute Success!")
                    .addField("User Info:\n", '------------', false)
                    .addField("User:\n", user, true)
                    .addField("User ID:\n", user.id, true)
                    .addField('Staff Info:\n', '------------', false)
                    .addField("Staff:\n", message.member, true)
                    .addField("Staff ID:\n", message.author.id, true)
                    .setFooter(`${client.user.tag} - Command Executed`)
                    .setTimestamp()
                return message.channel.send(embed)
            } catch (error) {
                const embed = new Discord.MessageEmbed()
                    .setColor("#FFFFFF")
                    .setTitle('Uh Oh!')
                    .addField('Command:\n', this.name, false)
                    .addField('Error:\n', `${error}`, false)
                    .setFooter(`${client.user.tag} - Command Error`)
                    .setTimestamp()
                return message.channel.send(embed)
            }
        } else {
            const embed = new Discord.MessageEmbed()
                .setColor("#FFFFFF")
                .setTitle('Uh Oh!')
                .addField('Command:\n', this.name, false)
                .addField('Error:\n', "You require the `MUTE_MEMBERS` Permission", false)
                .setFooter(`${client.user.tag} - Command Error`)
                .setTimestamp()
            return message.channel.send(embed)
        }
    }
}