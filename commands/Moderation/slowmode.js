const Command = require('../../utils/command')
const config = require('../../config.json')
const Discord = require('discord.js')

module.exports = class slowmode extends Command {
    constructor() {
        super("slowmode", `${config.prefix}slowmode (Time in Seconds)`, 'Sets the rate limit per User in the Channel', false, 'Moderation')
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
        if (!message.member.hasPermission("MANAGE_CHANNEL")) return
        const time = parseInt(args[0])
        await message.channel.setRateLimitPerUser(time, null).then(() => {
            return message.channel.send(`Rate Limit Set To ${time} seconds`)
        })
    }
}