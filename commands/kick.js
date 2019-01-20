const Discord = require('discord.js')
exports.run = (bot, message, args, func) => {
  const kmember = message.mentions.members.first()
  let reason = message.content.split(/\s+/g).slice(2).join(' ')
  const db = require('quick.db')
  const lc = db.get(`logs_kick_${message.guild.id}`)
  if (!message.member.hasPermission('KICK_MEMBERS')) {
    func.statusMsg('x', message.channel, 'This requires you to have a role that can kick members.')
    return
  }
  if (message.mentions.users.size === 0) {
    return func.statusMsg('x', message.channel, 'You need to mention a user to kick.')
  }
  if (message.mentions.users.size > 1) {
    return func.statusMsg('x', message.channel, 'You can only mention one user at a time.')
  }
  if (reason.length === 0) {
    reason = 'None'
  } else {
    kmember.kick(reason)
    func.statusMsg('boot', message.channel, `Successfully kicked user ${kmember}.`)
  }
  let embed = new Discord.RichEmbed()
  if (lc) {
    embed.addField('📦 | Action »', 'Kick')
    embed.addField('📑 | User »', `${kmember}`)
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
  name: 'kick',
  description: 'Kicks a user.',
  usage: 'kick <user> [reason]',
  group: 'moderation'
}
