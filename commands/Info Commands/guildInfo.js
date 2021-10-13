const Command = require('../../utils/command')
const Discord = require('discord.js')
const ms = require('ms')
const dateformat = require('dateformat')
const config = require("../../config.json")
module.exports = class serverinfo extends Command {
    constructor() {
        super('serverInfo', `${config.prefix}serverInfo`, 'Shows info about the Guild', false, 'Info')
    }
    async run(client, message, args) {
        const createdAt = new Date(message.guild.createdAt)
        const roles = message.guild.roles.cache.filter(role => role.name != "@everyone")
        const embed = new Discord.MessageEmbed()
            .setColor('#FFFFF')
            .setTitle(`${message.guild.name} Guild Info`)
            .addField('Guild ID:\n', message.guild.id, true)
            .addField('Guild Owner:\n', message.guild.owner, true)
            .addField("Guild Owner ID:\n", message.guild.ownerID, true)
            .addField('Voice Region:\n', message.guild.region, true)
            .addField('Channels:\n', message.guild.channels.cache.size, true)
            .addField('Created On:\n', createdAt.toLocaleDateString(), true)
            .addField('Nitro Boosts:\n', message.guild.premiumSubscriptionCount, true)
            .addField('Nitro Boost Tier:\n', message.guild.premiumTier, true)
            .addField('User Info:\n', '--------------', false)
            .addField('Members:\n', message.guild.members.cache.filter(user => !user.user.bot).size, true)
            .addField('Bots:\n', message.guild.members.cache.filter(user => user.user.bot).size, true)
            .addField('Member Presences:\n', `🟢 Online: ${message.guild.members.cache.filter(user => user.presence.status == "online").size}\n🔴 Do Not Disturb: ${message.guild.members.cache.filter(user => user.presence.status == "dnd").size}\n🟡 Idle: ${message.guild.members.cache.filter(user => user.presence.status == "idle").size}\n⚫ Offline/Invisible: ${message.guild.members.cache.filter(user => user.presence.status == "offline").size}`, false)
            .addField(`Roles:\n`, roles.size, true)
            .addField(`Emojis:`, `(${message.guild.emojis.cache.size})`, true)
            .setFooter(`${client.user.tag} - Command Executed`)
            .setTimestamp()
            .setThumbnail(message.guild.iconURL())
        return message.channel.send(embed)

    }
}