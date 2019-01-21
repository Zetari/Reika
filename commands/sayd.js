exports.run = (bot, message, args) => {
  if (!message.member.hasPermission('MENTION_EVERYONE')) {
    const edited = args.join(' ').replace(/@everyone/gi, '`@everyone`').replace(/@here/gi, '`@here`')
    message.channel.send(edited)
    message.delete(message.author)
  }
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: []
}

exports.help = {
  name: 'sayd',
  description: 'The bot said it.',
  usage: 'sayd <message>',
  group: 'fun'
}
