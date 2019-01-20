const Discord = require('discord.js')
exports.run = async (bot, message, args, func) => {
  const db = require('quick.db')
  const lc = db.get(`logs_mute_${message.guild.id}`)
  let reason = message.content.split(/\s+/g).slice(2).join(' ')
  if (!message.member.hasPermission('MANAGE_MESSAGES')) return func.statusMsg('x', message.channel, 'This requires you to have a role with the permission `Manage Messages`.', 10000)
  const toMute = message.mentions.members.first()
  if (!toMute) {
    func.statusMsg('x', message.channel, 'You need to mention a user to mute.')
    return
  }
  if (message.mentions.users.size > 1) {
    func.statusMsg('x', message.channel, 'You can only mention one user at a time.')
    return
  }
  if (toMute.hasPermission('ADMINISTRATOR')) {
    func.statusMsg('x', message.channel, 'You cannot mute that member!')
    return
  }
  if (reason.length === 0) {
    reason = 'None'
  }
  if (toMute.id === message.author.id) {
    func.statusMsg('x', message.channel, 'Did you really just try to mute yourself?')
  }
  let role = message.guild.roles.find(r => r.name === 'Muted')
  if (!role) {
    role = await message.guild.createRole({
      name: 'Muted',
      color: '#996699',
      permissions: []
    })
    message.guild.channels.forEach(async (channel) => {
      await channel.overwritePermissions(role, {
        SEND_MESSAGES: false,
        ADD_REACTIONS: false
      })
    })
  }
  if (toMute.roles.has(role.id)) {
    func.statusMsg('x', message.channel, 'That user is already muted!')
    return
  }
  toMute.addRole(role).catch(console.error)
  func.statusMsg('white_check_mark', message.channel, `${toMute} has been muted.`)
  db.add(`history_mutes_${toMute}`, 1)
  if (lc) {
    const embed = new Discord.RichEmbed()
      .addField('📦 | Action »', 'Mute')
      .addField('📑 | User »', `${toMute}`)
      .addField('💼 | Moderator »', `${message.author.toString()}`)
      .addField('📜 | Reason »', `${reason}`)
      .setColor(0x1D82B6)
      .setTimestamp()
    bot.channels.get(lc).send(embed)
  }
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: []
}

exports.help = {
  name: 'mute',
  description: 'Mutes a user.',
  usage: 'mute <user> [reason]',
  group: 'moderation'
}
