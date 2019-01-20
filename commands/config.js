const db = require('quick.db')
const Discord = require('discord.js')

exports.run = (bot, message, args, func) => {
  if (!message.member.hasPermission('ADMINISTRATOR')) return func.statusMsg('x', message.channel, 'This requires you to have a role with the permission `Administrator`.')
  let joinchannel = message.guild.channels.get(db.fetch(`logs_join_${message.guild.id}`))
  let welcomechannel = message.guild.channels.get(db.fetch(`logs_welcome_${message.guild.id}`))
  let leavechannel = message.guild.channels.get(db.fetch(`logs_leavelog_${message.guild.id}`))
  let kickchannel = message.guild.channels.get(db.fetch(`logs_kick_${message.guild.id}`))
  let banchannel = message.guild.channels.get(db.fetch(`logs_ban_${message.guild.id}`))
  let leavechanneltxt = message.guild.channels.get(db.fetch(`logs_leave_${message.guild.id}`))
  let warnchannel = message.guild.channels.get(db.fetch(`logs_warn_${message.guild.id}`))
  let dmText = db.fetch(`messages_joindm_${message.guild.id}`)
  let joinText = db.fetch(`messages_join_${message.guild.id}`)
  let leaveText = db.fetch(`messages_leave_${message.guild.id}`)
  const embed = new Discord.RichEmbed()
  let bantxt
  let leavetxt
  let kicktxt
  let jointxt
  let dmtxt
  let joinmsgtxt
  let leavemsgtxt
  let welcometxt
  let leavechtxt
  let warntxt

  if (!banchannel) bantxt = '*Not Set*'
  else bantxt = banchannel

  if (!leavechannel) leavetxt = '*Not Set*'
  else leavetxt = leavechannel

  if (!welcomechannel) welcometxt = '*Not Set*'
  else welcometxt = welcomechannel

  if (!leavechanneltxt) leavechtxt = '*Not Set*'
  else leavechtxt = leavechanneltxt

  if (!kickchannel) kicktxt = '*Not set*'
  else kicktxt = kickchannel

  if (!joinchannel) jointxt = '*Not set*'
  else jointxt = joinchannel

  if (!dmText) dmtxt = '*Not set*'
  else dmtxt = dmText

  if (!joinText) joinmsgtxt = '*Not set*'
  else joinmsgtxt = joinText

  if (!leaveText) leavemsgtxt = '*Not set*'
  else leavemsgtxt = leaveText

  if (!warnchannel) warntxt = '*Not set*'
  else warntxt = warnchannel

  if (args[0] === 'messages') {
    embed.setTitle('Server Config • Messages')
      .addField('Join DM Message', dmtxt)
      .addField('Welcome Message', joinmsgtxt)
      .addField('Leave Message', leavemsgtxt)
    message.channel.send({ embed })
  }
  if (args[0] === 'logs') {
    embed.setTitle('Server Config • Logs')
      .addField('Ban Log', bantxt, true)
      .addField('Kick Log', kicktxt, true)
      .addField('Warn Log', warntxt, true)
      .addField('Join Log', jointxt, true)
      .addField('Leave Log', leavetxt, true)
      .addField('Welcome Channel', welcometxt, true)
      .addField('Leave Channel', leavechtxt, true)
    message.channel.send({ embed })
  }
  if (!args[0]) {
    func.statusMsg('information_source', message.channel, 'Use `config <messages | logs>` to view the configs for the server!', '\u200B')
  }
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['cfg']
}

exports.help = {
  name: 'config',
  description: 'Shows the config.',
  usage: 'config',
  group: 'utility'
}
