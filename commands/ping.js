exports.run = (bot, message, args, func) => {
  func.statusMsg('ping_pong', message.channel, `Pong! Took \`${Date.now() - message.createdTimestamp} ms \`.`)
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: []
}

exports.help = {
  name: 'ping',
  description: 'Is the bot alive?',
  usage: 'ping',
  group: 'utility'
}
