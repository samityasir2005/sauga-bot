const Discord = require('discord.js')

const defaultReactions = {
    // "⏪" : (self) => { if (self.page != 1) self.select(1) },
    "◀": (self) => { if (self.page != 1) self.select(self.page - 1) },
    "▶": (self) => { if (self.page != self.pages.length) self.select(self.page + 1) },
    // "⏩" : (self) => { if (self.page != self.pages.length) self.select(self.pages.length) },
    "⏹": (self) => { self.collector.stop() }
}


/**
 * @param {Discord.Message} message - Discord message instance.
 * @param {Array<Discord.MessageEmbed>} pages - array of discord embeds.
 * @param {Number} time - The number of miliseconds the bot will listen for a reaction.
 * @param {Object<String, Function>} reactions - an object, where the key is the unicode emoji or the custom id & a function on what the collector will do.
 * @param {Booleon} pageFooters - just a number showing the total amount of pages and the current page your on.
 */
class Pages {
    constructor(
        message,
        pages = [],
        time = 120000,
        reactions = {},
        pageFooter = true
    ) {
        this.message = message
        this.pages = pages
        this.time = time
        this.page = 1

        if (this.pages.length == 1) {
            this.reactions = reactions
        } else {
            this.reactions = {...defaultReactions, ...reactions }
        }

        if (pages.length && pageFooter) {
            this.displayPageNumbers()
        }

        let missingPermissions = false
        if (!message.member.guild.me.hasPermission("MANAGE_MESSAGES") ||
            !message.member.guild.me.hasPermission("ADD_REACTIONS")
        ) {
            const checkPermissions = "💡 *The bot doesn't have* **MANAGE_MESSAGES** *or* **ADD_REACTIONS** *permission!*"
            missingPermissions = true
            pages[0].setDescription(checkPermissions)
        }

        message.channel.send(pages[0]).then(msg => {
            this.msg = msg

            if (missingPermissions) return

            this.addReactions().catch(err => console.error(err))
            this.createCollector()

        })
    }

    displayPageNumbers() {
        const total = this.pages.length
        let current
        for (let i = 0; i < total; i++) {
            current = this.pages[i]
            current.setFooter(
                `Page ${i + 1} / ${total}`,
                this.message.channel.client.user.avatarURL()
            )
        }
    }

    select(pg = 1) {
        this.page = pg
        this.msg.edit(this.pages[pg - 1])
            .catch(err => console.error(err))
    }

    createCollector() {
        this.collector = this.msg.createReactionCollector(
            (reaction, user) => user.id == this.message.author.id, {
                time: this.time
            }
        )

        this.collector.on("collect", reaction => {

            if (reaction.emoji.name in this.reactions) this.reactions[reaction.emoji.name](this)
            if (reaction.emoji.id in this.reactions) this.reactions[reaction.emoji.id](this)

            reaction.users.remove(this.message.author.id)
                .catch(err => console.error(err))
        })

        this.collector.on("end", () => {
            this.msg.reactions
                .removeAll()
                .catch(err => console.log("Failed to remove reactions " + err))
        })
    }

    async addReactions() {

        for (let emoji in this.reactions) {
            this.msg.react(emoji).catch(err => console.error(err))
        }

    }
}

module.exports = Pages