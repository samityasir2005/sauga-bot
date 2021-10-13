const Command = require('../../utils/command')
const Discord = require('discord.js')
const config = require("../../config.json")
const covidReport = require('covid19-api').getReports()
const numberFormatter = require('number-formatter')
module.exports = class covid extends Command {
    constructor() {
        super("covid", `${config.prefix}covid`, 'Returns Covid Deaths in the US', false, 'Fun')
    }
    async run(client, message, args) {
        const covid = await covidReport
        const emebd = new Discord.MessageEmbed()
            .setColor('Black')
            .setTitle('Covid')
            .addField('Cases:\n', numberFormatter("#,##0.####", covid[0][0].cases), false)
            .addField('Deaths:\n', numberFormatter("#,##0.####", covid[0][0].deaths), false)
            .addField('Recovered:\n', numberFormatter("#,##0.####", covid[0][0].recovered), false)
            .setFooter(`${client.user.tag} - Command Executed`)
            .setTimestamp()
        return message.channel.send(emebd)
    }
}