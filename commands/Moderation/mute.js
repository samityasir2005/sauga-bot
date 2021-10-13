const Command = require('../../utils/command')
const Discord = require('discord.js')
const config = require("../../config.json")
const ms = require('ms')
module.exports = class mute extends Command {
    constructor() {
        super("mute", `${config.prefix}mute (User Resolvable) (Time)`, 'Mutes a User for a Certain Time Or Permanently If no Time is Given', false, 'Moderation')
    }
    async run(client, message, args) {
        
        if (message.member.hasPermission("MUTE_MEMBERS")) {
            const guild = client.guilds.get(guild.id);
            const user = this.UserResolvable(message.guild.members.cache, args.shift())
            const time = args.shift() || "No Time Specified"
            const role = message.guild.roles.cache.find(role => role.name === "Muted")
            if (!role) {
                const MutedRole = await message.guild.roles.create({
                    data: {
                        name: 'Muted',
                        position: 21
                    }
                })
                await MutedRole.setPermissions(0);
                message.guild.channels.cache.forEach(ch => {
                    if (ch.type == "text") {
                        ch.createOverwrite(MutedRole, { "SEND_MESSAGES": false })
                    }
                });
                user.roles.add(MutedRole).then(() => {
                    if (time.length == 0) return
                    client.setTimeout(() => {
                        user.roles.remove(role)
                    }, ms(time));
                })
                const embed = new Discord.MessageEmbed()
                    .setColor("#FFFFF")
                    .setTitle("Mute Success!")
                    .addField("User Info:\n", '------------', false)
                    .addField("User:\n", user, true)
                    .addField("User ID:\n", user.id, true)
                    .addField('Staff Info:\n', '------------', false)
                    .addField("Staff:\n", message.member, true)
                    .addField("Staff ID:\n", message.author.id, true)
                    .addField('Length:\n', `${time}`, false)
                    .setFooter(`${client.user.tag} - Command Executed`)
                    .setTimestamp()
                return message.channel.send(embed)
            } else {
                user.roles.add(role).then(() => {
                    if (time.length == 0) return
                    client.setTimeout(() => {
                        user.roles.remove(role)
                    }, ms(time));
                })
                const embed = new Discord.MessageEmbed()
                    .setColor("#FFFFF")
                    .setTitle("Mute Success!")
                    .addField("User Info:\n", '------------', false)
                    .addField("User:\n", user, true)
                    .addField("User ID:\n", user.id, true)
                    .addField('Staff Info:\n', '------------', false)
                    .addField("Staff:\n", message.member, true)
                    .addField("Staff ID:\n", message.author.id, true)
                    .addField('Length:\n', `${time}`, false)
                    .setFooter(`${client.user.tag} - Command Executed`)
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