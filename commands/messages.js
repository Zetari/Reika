const db = require('quick.db')
exports.run = (bot, message, args, func) => {
  const msgtypes = [
    'join',
    'joindm',
    'leave'
  ]
  const deltypes = [
    'delete',
    'remove',
    'reset',
    'clear',
    'disable'
  ]
  let pre
  const prefix = db.get(`prefix_${message.guild.id}`)
  if (!prefix) pre = '-!'
  const command = message.content.split(' ')[0].slice(pre.length)
  if (!message.member.hasPermission('ADMINISTRATOR')) return func.statusMsg('x', message.channel, 'This requires you to have a role with the permission `Administrator`.')
  if (!args[0]) return func.statusMsg('exclamation', message.channel, 'Correct usage: `messages <set | remove> <type>`')
  if (args[0] === 'set') {
    if (!args[1]) {
      return func.statusMsg('question', message.channel, 'You didn\'t provide a type to set!')
    }
    if (msgtypes.toString().includes(args[1])) {
      if (!args[2]) {
        return func.statusMsg('question', message.channel, 'There was no message input!')
      } else {
        const nm = message.content.slice(pre.length).slice(command.length).trim().slice(args[0].length).trim().slice(args[1].length)
        db.set(`messages_${args[1]}_${message.guild.id}`, nm)
        return func.statusMsg('white_check_mark', message.channel, `Updated server \`${args[1]}\` message:\n` + nm)
      }
    } else {
      func.statusMsg('question', message.channel, 'That wasn\'t a valid type...')
    }
  } else if (deltypes.toString().includes(args[0])) {
    if (!args[1]) {
      return func.statusMsg('question', message.channel, 'You didn\'t provide a type to remove!')
    }
    if (msgtypes.toString().includes(args[1])) {
      db.delete(`messages_${args[1]}_${message.guild.id}`)
      return func.statusMsg('white_check_mark', message.channel, `Removed server \`${args[1]}\` message!`)
    }
  } else {
    func.statusMsg('question', message.channel, 'That wasn\'t a valid type...')
  }
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['msgs']
}

exports.help = {
  name: 'messages',
  description: 'Edit the config messages_',
  usage: 'messages <set | clear> <type>',
  group: 'utility'
}
