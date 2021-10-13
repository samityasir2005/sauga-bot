const Command = require('../../utils/command')
const Discord = require('discord.js')
const config = require("../../config.json")
module.exports = class Ping extends Command {

    constructor() {

        super('ping', `${config.prefix}ping`, 'Shows Your Ping', false)

    }

    async run(client, message, args) {

        message.channel.send("Pinging...").then(m => {
            var ping = m.createdTimestamp - message.createdTimestamp;

            m.edit(`**:ping_pong: Pong! Your Ping Is:** ${ping}ms`);
        });

    }

}