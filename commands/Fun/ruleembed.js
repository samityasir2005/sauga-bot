const Command = require('../../utils/command')
const Discord = require('discord.js')
const config = require("../../config.json")
const random = require('node-dogandcat')
module.exports = class rules extends Command {
    constructor() {
        super("rules", `${config.prefix}rules`, `Gives info about The Bot`, false, 'Info')
    }
    async run(client, message, args) {
        const userCreated = new Date(client.user.createdAt)
        const used = process.memoryUsage().heapUsed / 1024 / 1024;
        const embed = new Discord.MessageEmbed()
            .setColor('#FFFFFF')
            .setImage('https://cdn.discordapp.com/attachments/841108445825466399/878758226605264946/Hnet-image_7-7.gif')
            .setTitle('Server Rules')
            .addFields(
                {name: 'Rule1', value: 'Do not be a dick.'},
                {name: 'Rule2', value: 'Do not spam in any channels, including mic spam in voice channels.'},
                {name: 'Rule3', value: 'Do not make your username, nickname, profile picture, about me, or status anything offensive.'},
                {name: 'Rule4', value: "Do not leak Direct Messages without the other person's consent."},
                {name: 'Rule5', value: 'Do not leak personal information anywhere in this server.'},
                {name: 'Rule6', value: 'Do not advertise without permission.'},
                {name: 'Rule7', value: 'Do not post intolerant and hateful content'},
                {name: 'Rule8', value: 'Do not post material that is misleading and/or inaccurate.'},
                {name: 'Rule9', value: 'Do not violate any real life laws.'},
                {name: 'Rule10', value: 'Do not post not safe for work content.'},
                {name: 'Rule11', value: "Do not use the discord for the purposes of sharing or distributing viruses or any other sort of online-material meant to damage another person's computer."},
                {name: 'Rule12', value: "Follow Discord's [Terms of Service](https://discord.com/terms) and [Community Guidelines](https://discord.com/guidelines)."},
            )
            message.channel.send(embed)
            
    }
}