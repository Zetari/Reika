exports.run = (bot, message) => {
  message.channel.send('Use this link to invite me to another server: https://bit.ly/2Mjc1OX')
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['inv']
}

exports.help = {
  name: 'invite',
  description: 'Shows the bot invite.',
  usage: 'invite',
  group: 'utility'
}
