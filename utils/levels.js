function UserResolvable(cache, input) {

    if (input.startsWith('<') && input.endsWith('>')) input = input.slice(2, input.length - 1)
    if (input.startsWith('!')) input = input.slice(1)

    return cache.find(member => member.user.username.toLowerCase() === input || member.id === input)

}
const path = require('path')
const JSONdb = require('simple-json-db')

module.exports = async(client, message) => {
    const userDB = new JSONdb(path.join(__dirname, '../database/users.json'))
    const levelsDB = new JSONdb(path.join(__dirname, '../database/levels.json'))
    let user = {
        userID: message.author.id,
        Levels: 0,
        XP: 0,
        createdAt: Date.now(),
        updatedAt: Date.now()
    }

    if (userDB.has(`${message.author.id}/${message.guild.id}`)) {
        let user = userDB.get(`${message.author.id}/${message.guild.id}`)
            // if ((message.createdAt - user.updatedAt) <= 120000) return;
        user.XP += Math.floor(Math.random() * 30) + 5
        user.updatedAt = Date.now()
        user.Levels = Math.floor(user.XP / 300)
        userDB.set(`${message.author.id}/${message.guild.id}`, user)
    } else {
        userDB.set(`${message.author.id}/${message.guild.id}`, user)
    }

    let levels = await levelsDB.JSON()
    let LEVELS = new Array()
    for (let [key, value] of Object.entries(levels)) {
        LEVELS.push(value)
    }
    LEVELS.forEach(async(level) => {
        let user = userDB.get(`${message.author.id}/${message.guild.id}`)
        if (level.level <= user.Levels) {
            const role = message.guild.roles.cache.get(level.roleID)

            if (!role) levelsDB.delete(level)

            message.member.roles.add(role)
        }
    })
}