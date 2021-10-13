module.exports = class Command {

    constructor(name, usage, desc, maintance, category = 'Main') {

        this.name = name.toLowerCase();
        this.usage = usage;
        this.desc = desc;
        this.maintance = maintance;
        this.category = category
    }

    UserResolvable(cache, input) {

        
        

        return cache.find(member => member.user.username.toLowerCase() === input || member.id === input)

    }

    RoleResolvable(cache, input) {

        if (input.startsWith('<@&') && input.endsWith('>')) input = input.slice(3, input.length - 1)
        return cache.find(role => role.name === input || role.id === input)

    }

}