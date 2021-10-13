module.exports = (client) => {
    return () => {
        client.logger.log('info', `${client.user.tag} Logged In`)
    }
}