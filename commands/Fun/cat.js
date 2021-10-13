const Command = require('../../utils/command')
const Discord = require('discord.js')
const config = require("../../config.json")
const random = require('random-cat')
module.exports = class cat extends Command {
    constructor() {
        super("cat", `${config.prefix}cat`, 'Returns cat Picture', false, 'Fun')
    }
    async run(client, message, args) {
        const randomcat = random.get()
        return message.channel.send(`${randomcat}`)
    }
}