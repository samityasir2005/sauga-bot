const Command = require('../../utils/command')
const Discord = require('discord.js')
const config = require("../../config.json")
const random = require('node-dogandcat')
module.exports = class dog extends Command {
    constructor() {
        super("dog", `${config.prefix}dog`, 'Returns Dog Picture', false, 'Fun')
    }
    async run(client, message, args) {
        const randomDog = await random.getRandomDog()
        return message.channel.send(`${randomDog}`)
    }
}