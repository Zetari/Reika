exports.run = (bot, message, args) => {
  if (!message.member.hasPermission('MENTION_EVERYONE')) {
    const edited = args.join(' ').replace(/@everyone/gi, '`@everyone`').replace(/@here/gi, '`@here`')
    message.channel.send(edited)
  }
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: []
}

exports.help = {
  name: 'say',
  description: 'Make the bot say something.',
  usage: 'say <message>',
  group: 'fun'
}
