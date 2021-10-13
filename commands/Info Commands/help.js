const Command = require('../../utils/command')
const Discord = require('discord.js')
const config = require("../../config.json")
const Pagers = require("../../utils/pagers.js")

module.exports = class help extends Command {
    constructor() {
        super('help', `${config.prefix}help`, 'Shows The List of Commands', false, 'Main')
    }
    run(client, message, args) {

        if (message.guild.me.hasPermission("MANAGE_MESSAGES")) {
            const commands = client.commands.reduce((total, command) => {

                if (!total.has(command.category)) total.set(command.category, [])

                const category = total.get(command.category)
                category.push(command)
                total.set(command.category, category)

                return total

            }, new Discord.Collection())

            const embeds = commands.map((categorys, categoryName) => {

                const description = categorys.reduce((total, command) => total + `**${command.usage}** - ${command.desc}\n\n`, '**COMMAND: USAGE - DESCRIPTION**\n\n')

                const embed = new Discord.MessageEmbed()
                    .setTitle(`${categoryName} help`)
                    .setDescription(description);

                return embed

            })

            new Pagers(message, embeds)
        } else {
            let commands = client.commands
                .map(command => `**${command.name}** = **${command.usage}** - ${command.desc}`)
                .filter(command => command.name != 'help')
                .join('\n\n')
            let help = new Discord.MessageEmbed()
                .setColor("#00000")
                .setTitle("Commands")
                .setDescription(commands)
            message.channel.send(help)
        }
    }

}