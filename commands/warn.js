const Discord = require('discord.js')
exports.run = (bot, message, args, func) => {
  const wmember = message.mentions.members.first()
  let reason = message.content.split(/\s+/g).slice(2).join(' ')
  const db = require('quick.db')
  const lc = db.get(`logs_warn_${message.guild.id}`)
  if (!message.member.hasPermission('MANAGE_MESSAGES')) {
    func.statusMsg('x', message.channel, 'This requires you to have a role that can manage messages.')
    return
  }
  if (message.mentions.users.size === 0) {
    return func.statusMsg('x', message.channel, 'You need to mention a user to warn.')
  }
  if (message.mentions.users.size > 1) {
    return func.statusMsg('x', message.channel, 'You can only mention one user at a time.')
  }
  if (reason.length === 0) {
    reason = 'None'
  } else {
    func.statusMsg('white_check_mark', message.channel, `Added a warning to ${wmember}.`)
    db.add(`history_warns_${wmember}`, 1)
  }
  let embed = new Discord.RichEmbed()
  if (lc) {
    embed.addField('📦 | Action »', 'Warn')
    embed.addField('📑 | User »', `${wmember}`)
    embed.addField('💼 | Moderator »', `${message.author.toString()}`)
    embed.addField('📜 | Reason »', `${reason}`)
    embed.setColor(0x1D82B6)
    embed.setTimestamp()
    bot.channels.get(lc).send(embed)
  }
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: []
}

exports.help = {
  name: 'warn',
  description: 'Warn a user.',
  usage: 'warn <user> [reason]',
  group: 'moderation'
}
