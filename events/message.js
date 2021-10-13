const config = require('../config.json')
const levelSystem = require('../utils/levels')
const Discord = require("discord.js")
module.exports = (client) => {

    return async(message) => {

        if (message.author.bot || message.channel.type === 'dm') return
            // await levelSystem(client, message)
        if (message.content.startsWith(config.prefix)) {

            const args = message.content.toLowerCase().split(' ')

            const request = args.shift().slice(config.prefix.length)

            const command = client.commands.get(request)

            if (!command) return

            if (command.maintance && message.author.id != "261299748357668865") {
                const embed = new Discord.MessageEmbed()
                    .setColor("#00000")
                    .setTitle("Uh Oh!")
                    .setDescription(`**Command**:\n${command.name}\n**Error**:\nThis Command Is Currently Under Maintance!`)
                    .setFooter(`${client.user.tag} - Command Error`)
                    .setTimestamp()
                message.channel.send(embed)
            } else return command.run(client, message, args)

        }

    }

}