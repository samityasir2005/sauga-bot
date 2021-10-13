const Command = require('../../utils/command')
const Discord = require('discord.js')
const ms = require('ms')
const dateformat = require('dateformat')
const config = require("../../config.json")
module.exports = class botinfo extends Command {
    constructor() {
        super("botinfo", `${config.prefix}botinfo`, `Gives info about The Bot`, false, 'Info')
    }
    async run(client, message, args) {
        const userCreated = new Date(client.user.createdAt)
        const used = process.memoryUsage().heapUsed / 1024 / 1024;
        const embed = new Discord.MessageEmbed()
            .setColor('#FFFFFF')
            .setTitle("Bot Information")
            .addField("Bot Username:\n", client.user.username, true)
            .addField('Bot ID:\n', client.user.id, true)
            .addField('Bot Info:\n', '----------------', false)
            .addField('Status:\n', client.user.presence.status, true)
            .addField('Users:\n', client.users.cache.size, true)
            .addField('Servers:\n', client.guilds.cache.size, true)
            .addField('Channels:\n', client.channels.cache.size, true)
            .addField('Command Count:\n', client.commands.size, true)
            .addField('System Info:\n', '----------------', false)
            .addField('Bot Uptime:\n', ms(client.uptime, { long: true }), true)
            .addField('Created On:\n', userCreated.toLocaleDateString(), true)
            .addField('Node Version:\n', process.version, false)
            .addField('Discord.js Version:\n', `v${Discord.version}`, true)
            .addField('Memory Usage', `${Math.round(used * 100) / 100} MB`, false)
            .setFooter(`${client.user.username} - Developed and Maintaned By Unknown#9817, x2#9407`)
            .setThumbnail(client.user.displayAvatarURL())
        message.channel.send(embed)
    }
}