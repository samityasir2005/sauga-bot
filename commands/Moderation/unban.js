const Command = require('../../utils/command')
const Discord = require('discord.js')
const config = require("../../config.json")
module.exports = class unban extends Command {
    constructor() {
        super("unban", `${config.prefix}unban (User ID)`, 'Unbans a GuildMember', false, 'Moderation')
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
        if (message.member.hasPermission("BAN_MEMBERS")) {
            const banInfo = await message.guild.fetchBan(args.shift())
            if (banInfo) {
                try {
                    await message.guild.members.unban(banInfo.user.id)
                    const embed = new Discord.MessageEmbed()
                        .setColor("#FFFFFF")
                        .setTitle('Unban Success!')
                        .addField("User Info:\n", '------------', false)
                        .addField("User:\n", banInfo.user, true)
                        .addField("User ID:\n", banInfo.user.id, true)
                        .addField('Staff Info:\n', '------------', false)
                        .addField("Staff:\n", message.member, true)
                        .addField("Staff ID:\n", message.author.id, true)
                        .addField('Ban Reason:\n', banInfo.reason, false)
                        .setFooter(`${client.user.tag} - Command Executed`)
                        .setTimestamp()
                    return message.channel.send(embed)
                } catch (error) {
                    const embed = new Discord.MessageEmbed()
                        .setColor("#FFFFF")
                        .setTitle('Uh Oh!')
                        .addField('Command:\n', this.name, false)
                        .addField('Error:\n', `${error}`, false)
                        .setFooter(`${client.user.tag} - Command Error`)
                        .setTimestamp()
                    return message.channel.send(embed)
                }

            } else {
                const embed = new Discord.MessageEmbed()
                    .setColor("#FFFFF")
                    .setTitle('Uh Oh!')
                    .addField('Command:\n', this.name, false)
                    .addField('Error:\n', "That User Does Not Exist Or Isnt Banned!", false)
                    .setFooter(`${client.user.tag} - Command Error`)
                    .setTimestamp()
                return message.channel.send(embed)
            }
        } else {
            const embed = new Discord.MessageEmbed()
                .setColor("#FFFFFF")
                .setTitle('Uh Oh!')
                .addField('Command:\n', this.name, false)
                .addField('Error:\n', "You require the `BAN_MEMBERS` Permission", false)
                .setFooter(`${client.user.tag} - Command Error`)
                .setTimestamp()
            return message.channel.send(embed)
        }
    }
}