const Command = require('../../utils/command')
const Discord = require('discord.js')
const config = require("../../config.json")
module.exports = class coinflip extends Command {
    constructor() {
        super("coinflip", `${config.prefix}coinflip`, 'Returns Heads or Tails', false, 'Fun')
    }
    async run(client, message, args) {
        const number = Math.floor(Math.random() * 2)
        switch (number) {
            case 0:
                {
                    return message.channel.send('It was Heads!')
                }
            case 1:
                {
                    return message.channel.send('It was Tails!')
                }
        }
    }
}