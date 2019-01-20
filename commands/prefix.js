exports.run = (bot, message, args, func) => {
  const db = require('quick.db')
  if (!message.member.hasPermission('ADMINISTRATOR')) {
    return func.statusMsg('x', message.channel, 'This requires you to have a role with the permission `Administrator`.')
  }
  if (!args.join(' ')) {
    return func.statusMsg('question', message.channel, 'Please enter arguments. `prefix <prefix>`')
  }
  db.set(`prefix.${message.guild.id}`, args.join(' '))
  func.statusMsg('white_check_mark', message.channel, `Prefix changed to \`${args.join(' ')}\``)
}

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: []
}

exports.help = {
  name: 'prefix',
  description: 'Change the server prefix for the bot.',
  usage: 'prefix <prefix>',
  group: 'utility'
}
