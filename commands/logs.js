const db = require('quick.db')
exports.run = (bot, message, args, func) => {
  const logtypes = [
    'ban',
    'kick',
    'join',
    'leavelog',
    'mute',
    'warn',
    'welcome',
    'leave'
  ]
  const deltypes = [
    'delete',
    'remove',
    'reset',
    'clear',
    'disable'
  ]
  if (!message.member.hasPermission('ADMINISTRATOR')) return func.statusMsg('x', message.channel, 'This requires you to have a role with the permission `Administrator`.')
  if (!args[0]) return func.statusMsg('exclamation', message.channel, 'Correct usage: `logs <set | remove> <type>`')
  if (args[0] === 'set') {
    if (!args[1]) {
      return func.statusMsg('question', message.channel, 'You didn\'t provide a type to set!')
    }
    if (logtypes.toString().includes(args[1])) {
      if (!args[2]) {
        return func.statusMsg('question', message.channel, 'There was no channel mentioned!')
      }
      const channelment = message.mentions.channels.first().id
      if (!message.guild.channels.get(channelment)) {
        return func.statusMsg('x', message.channel, 'The channel mentioned is not a valid channel!')
      } else {
        db.set(`logs_${args[1]}_${message.guild.id}`, channelment)
        return func.statusMsg('white_check_mark', message.channel, `Updated ${args[1]} log channel to <#${channelment}>!`)
      }
    } else if (args[1] === 'all') {
      if (!args[2]) {
        return func.statusMsg('question', message.channel, 'There was no channel mentioned!')
      }
      const channelment = message.mentions.channels.first().id
      if (!message.guild.channels.get(channelment)) {
        return func.statusMsg('x', message.channel, 'The channel mentioned is not a valid channel!')
      } else {
        for (let i = 0; i < logtypes.length; i++) {
          db.set(`logs_${logtypes[i]}_${message.guild.id}`, channelment)
        }
        return func.statusMsg('white_check_mark', message.channel, `Updated all log channels to <#${channelment}>!`)
      }
    } else {
      func.statusMsg('question', message.channel, 'That wasn\'t a valid type...')
    }
    if (!args[0]) return func.statusMsg('question', message.channel, 'There was no input for the command!')
  }
  if (deltypes.toString().includes(args[0])) {
    if (!args[1]) {
      return func.statusMsg('question', message.channel, 'You didn\'t provide a type to remove!')
    }
    if (logtypes.toString().includes(args[1])) {
      db.delete(`logs_${args[1]}_${message.guild.id}`)
      return func.statusMsg('white_check_mark', message.channel, `Removed the ${args[1]} log channel!`)
    } else {
      func.statusMsg('question', message.channel, 'That wasn\'t a valid type...')
      if (args[1] === 'all') {
        for (let i = 0; i < logtypes.length; i++) {
          db.delete(`logs_${logtypes[i]}_${message.guild.id}`)
        }
        return func.statusMsg('white_check_mark', message.channel, `Removed all log channels!`)
      }
      if (!args[0]) return func.statusMsg('question', message.channel, 'There was no input for the command!')
    }
  }
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: []
}

exports.help = {
  name: 'logs',
  description: 'Edit the config log channels.',
  usage: 'logs <set | clear> <type>',
  group: 'utility'
}
