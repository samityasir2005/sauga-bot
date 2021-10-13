const Discord = require("discord.js");
const { parse } = require("path");
const client = new Discord.Client();
const glob = require("glob");
client.commands = new Discord.Collection();
client.logger = require('./utils/logger.js')
const config = require("./config.json")
glob("./commands/*/*.js", (_, files) => {
    files.forEach((file) => {
        const module = require(file);
        const command = new module();

        client.commands.set(command.name, command);
    });
});

glob("./events/*.js", (_, files) => {
    files.forEach((file) => {
        const event = require(file);
        const { name } = parse(file);

        client.on(name, event(client));
    });
});
client.loadCommands = async() => {
    glob('./commands/*/*.js', (_, files) => {
        files.forEach(async(file) => {
            const module = require(file)
            const command = new module()

            await client.commands.set(command.name, command)
        })
    })
}
client.unloadCommands = async() => {
    glob('./commands/*/*.js', (_, files) => {
        files.forEach(async(file) => {
            const module = require(file)
            const command = new module()
            await client.commands.delete(command.name)
            delete require.cache[require.resolve(file)]


        })
    })
}
client.reloadCommands = async() => {
    await client.unloadCommands()
    await client.loadCommands()
}

client.login(config.token);