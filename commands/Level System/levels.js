const Command = require('../../utils/command')
const Discord = require('discord.js')
const config = require("../../config.json")
const path = require('path')
const JSONdb = require('simple-json-db')
module.exports = class levels extends Command {

    constructor() {

        super('levels', `${config.prefix}levels`, 'Lists the Level and the Role its mapped too', false, 'Level System')

    }
    async run(client, message, args) {
        const levelsDB = new JSONdb(path.join(__dirname, '../../database/levels.json'))
        const levels = await levelsDB.JSON()
        let Level = new Array()
        for (let [key, value] of Object.entries(levels)) {
            Level.push(value)
        }
        const description = Level.reduce((total, level) => total + `${level.level} - ${message.guild.roles.cache.get( level.roleID )}\n`, '')

        const LevelEmbed = new Discord.MessageEmbed()
            .setColor("#000000")
            .setTitle("Levels")
            .setDescription(description)
            .setFooter(`${client.user.tag} - Command Executed`)
            .setTimestamp()
        message.channel.send(LevelEmbed)
    }

}