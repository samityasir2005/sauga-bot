const Command = require('../../utils/command')
const Discord = require('discord.js')
const config = require("../../config.json")
const random = require('node-dogandcat')
module.exports = class poll extends Command {
    constructor() {
        super("poll", `${config.prefix}poll`, 'create poll', false, 'Fun')
    }
    async run(client, message, args) {


                const Poll_Emoji_1 = "👍";
                const Poll_Emoji_2 = "👎";
                message.channel.send(`<@&901520619110297611> **📊**`)
                const Embed = new Discord.MessageEmbed()
                .setColor("RANDOM")
                .setTitle("Poll Info")
                .setDescription(`Poll <Message> to create a poll`)
                .setFooter(`Poll requested by ${message.author}`)
                .setTimestamp()
        
                if (args.lenth === 0) {
                    return message.channel.send(Embed)
                }
        
                let Message = args.slice(0).join(" ")
        
                let Poll = await message.channel.send(
                    new Discord.MessageEmbed()
                    .setColor(`RANDOM`)
                    .setTitle(`${Message}`)
                    .setFooter(`Poll Made by ${message.author.username}`)
                    .setTimestamp()
                );
        
        
                await Poll.react(`${Poll_Emoji_1}`);
                await Poll.react(`${Poll_Emoji_2}`);
                await message.delete
        
        
            }
        }
    
