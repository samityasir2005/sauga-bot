const Command = require('../../utils/command')
const Discord = require('discord.js')
const config = require("../../config.json")
const path = require('path')
const JSONdb = require('simple-json-db')
const userDB = new JSONdb(path.join(__dirname, '../database/users.json'))
module.exports = class lb extends Command {

    constructor() {

        super('lb', `${config.prefix}lb`, 'Shows the Leaderboard', false, 'Level System')

    }

    async run(client, message, args) {
        const users = await userDB.JSON()
        let USER = new Array()
        for (let [key, value] of Object.entries(users)) {
            USER.push(value)
        }
        const description = USER.reduce((total, user) => total + `**Level**: ${user.Levels} **(${user.XP})XP** - **Member**: ${message.guild.members.cache.get( user.userID )}\n`, '')
        const embed = new Discord.MessageEmbed()
            .setColor("#000000")
            .setTitle("Leaderboard")
            .setDescription(description)
            .setFooter(`${client.user.tag} - Command Executed`)
            .setTimestamp()


        return message.channel.send(embed)

    }

}