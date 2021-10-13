const Command = require('../../utils/command')
const Discord = require('discord.js')
const config = require("../../config.json")
const path = require('path')
const JSONdb = require('simple-json-db')
const levelsDB = new JSONdb(path.join(__dirname, '../../database/levels.json'))
module.exports = class Delete extends Command {

    constructor() {

        super('delete', `${config.prefix}delete (level Number)`, 'Deletes The Role Linked To ', false, 'Level System')

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
        if (!message.member.hasPermission("MANAGE_ROLES")) {
            const embed = new Discord.MessageEmbed()
                .setColor("#FFFFF")
                .setTitle("Uh Oh!")
                .addField("Command:\n", this.name, false)
                .addField("Error:\n", 'You require the Permission `MANAGE_ROLES`')
                .setFooter(`${client.user.tag} - Command Error`)
                .setTimestamp()
            return message.channel.send(embed)
        }
        let [levelNumber] = args

        levelNumber = parseInt(levelNumber)
        if (isNaN(levelNumber)) {
            const embed = new Discord.MessageEmbed()
                .setColor("#FFFFF")
                .setTitle("Uh Oh!")
                .addField("Command:\n", this.name, false)
                .addField("Error:\n", 'The Argument (Level Number) **Must** be a Number!')
                .setFooter(`${client.user.tag} - Command Error`)
                .setTimestamp()
            return message.channel.send(embed)
        }
        try {
            if (levelsDB.has(`${levelNumber}/${message.guild.id}`)) {
                levelsDB.delete(`${levelNumber}/${message.guild.id}`)
            }

            const embed = new Discord.MessageEmbed()
                .setColor("#FFFFF")
                .setTitle("Level Unlinked!")
                .addField("Level:\n", levelNumber, false)
                .addField("Status:\n", 'Unlinked')
                .setFooter(`${client.user.tag} - Command Executed`)
                .setTimestamp()
            return message.channel.send(embed)
        } catch (error) {
            const embed = new Discord.MessageEmbed()
                .setColor("#FFFFF")
                .setTitle("Uh Oh!")
                .addField("Command:\n", this.name, false)
                .addField("Error:\n", `${error}`)
                .setFooter(`${client.user.tag} - Command Error`)
                .setTimestamp()
            return message.channel.send(embed)
        }


    }

}