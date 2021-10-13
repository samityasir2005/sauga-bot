const Command = require('../../utils/command')
const Discord = require('discord.js')
const config = require("../../config.json")
const path = require('path')
const JSONdb = require('simple-json-db')
const levelsDB = new JSONdb(path.join(__dirname, '../../database/levels.json'))
module.exports = class Add extends Command {

    constructor() {

        super('add', `${config.prefix}add (level Number) (Role Resolvable)`, 'Links a Level Number to a Role', false, 'Level System')

    }

    async run(client, message, args) {
        if (args.length === 0) {
            const embed = new Discord.MessageEmbed()
                .setColor('Black')
                .setTitle(`${this.name} Command Help`)
                .addField('Usage:\n', this.usage, false)
                .addField('Description:\n', this.desc, false)
                .addField('Category:\n', this.category, false)
                .setFooter(`${client.user.tag} - Command Help`)
                .setTimestamp()
            return message.channel.send(embed)
        }
        let [levelNumber, role] = args

        levelNumber = parseInt(levelNumber)
        if (isNaN(levelNumber)) return message.reply('Please input a valid level number')

        role = this.RoleResolvable(message.guild.roles.cache, role)
        if (!role) return message.reply('Could\'t find the role by that resolvable')


        if (message.member.hasPermission("MANAGE_ROLES")) {
            if (levelsDB.has(`${levelNumber}/${message.guild.id}`)) {
                const embed = new Discord.MessageEmbed()
                    .setColor("#FFFFF")
                    .setTitle("Uh Oh!")
                    .addField("Command:\n", this.name, false)
                    .addField("Error:\n", 'This Level is Already Linked to a Role!')
                    .setFooter(`${client.user.tag} - Command Error`)
                    .setTimestamp()
                return message.channel.send(embed)
            } else {
                let level = {
                    level: levelNumber,
                    roleID: role.id,
                    createdAt: Date.now(),
                    updatedAt: Date.now()
                }
                levelsDB.set(`${levelNumber}/${message.guild.id}`, level)
                const embed = new Discord.MessageEmbed()
                    .setColor("#FFFFF")
                    .setTitle("Level Linked!")
                    .addField("Level:\n", levelNumber, false)
                    .addField("Role:\n", role)
                    .setFooter(`${client.user.tag} - Command Executed`)
                    .setTimestamp()
                return message.channel.send(embed)
            }


        } else {
            const embed = new Discord.MessageEmbed()
                .setColor("#FFFFF")
                .setTitle("Uh Oh!")
                .addField("Command:\n", this.name, false)
                .addField("Error:\n", 'You require the Permission `MANAGE_ROLES`')
                .setFooter(`${client.user.tag} - Command Error`)
                .setTimestamp()
            return message.channel.send(embed)
        }

    }

}