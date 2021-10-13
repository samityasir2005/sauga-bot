const Command = require('../../utils/command')
const Discord = require('discord.js')
const config = require("../../config.json")
const Canvas = require('canvas')
const { prefix } = require('metric-prefix')
const path = require('path')
const JSONdb = require('simple-json-db')

module.exports = class Rank extends Command {
    constructor() {
        super('Rank', `${config.prefix}Rank`, 'Checks Your Rank and XP', false, 'Level System')
    }
    async run(client, message, args) {
        const userDB = new JSONdb(path.join(__dirname, '../../database/users.json'))
        let USER = userDB.get(`${message.author.id}/${message.guild.id}`)
        let user = this.UserResolvable(message.guild.members.cache, USER.userID)
        const canvas = Canvas.createCanvas(700, 250);
        const ctx = canvas.getContext('2d');
        let xpLength = `${prefix(USER.XP)}XP/${prefix( (USER.Levels + 1) * 300 )}XP`
        const background = await Canvas.loadImage('./rankcard.png');
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);


        // const Level = await client.DB.models.levels.findOne({
        //     where: {
        //         Level: USER.Levels,
        //         guildId: GUILD.id
        //     }
        // })

        let levelMSG = `Level ${USER.Levels}`
            // if (Level) levelMSG = message.guild.roles.cache.get(Level.roleID).name

        ctx.font = '25px Montserrat';
        ctx.fillStyle = '#FFFFFF';
        ctx.fillText(levelMSG, canvas.width - ctx.measureText(levelMSG).width, canvas.height - 50);
        ctx.font = '50px Montserrat';
        ctx.fillStyle = '#FFFFFF';
        ctx.fillText(`${user.user.username}`, 270, canvas.height / 2 + ctx.measureText(user.user.username).actualBoundingBoxAscent / 2);

        ctx.font = '25px Montserrat';
        ctx.fillStyle = '#FFFFFF';
        ctx.fillText(xpLength, canvas.width - ctx.measureText(xpLength).width, 225);

        let xwidth = ctx.measureText(xpLength).width
        let barLength = Math.abs(((USER.Levels * 300) - USER.XP) / 300) * xwidth
        ctx.fillStyle = 'white'
        ctx.rect(canvas.width - ctx.measureText(xpLength).width, 230, barLength, 4)
        ctx.fill()


        ctx.beginPath();
        ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.clip();
        const avatar = await Canvas.loadImage(user.user.displayAvatarURL({ format: 'jpg', size: 4096 }));
        ctx.drawImage(avatar, 25, 25, 200, 200);

        const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'CustomRankCard.png');
        return message.channel.send(attachment);
    }
}