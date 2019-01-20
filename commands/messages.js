const db = require('quick.db')
exports.run = (bot, message, args, func) => {
  if (args[0] === 'set') {
    if (!args[1]) {
      return func.statusMsg('question', message.channel, 'You didn\'t provide a type to set!')
    }
    if (args[1] === 'join') {
      if (!args[2]) {
        return func.statusMsg('question', message.channel, 'There was no message input!')
      } else {
        const newMsg = message.content.slice(20)
        db.set(`messages_join_${message.guild.id}`, newMsg)
        return func.statusMsg('white_check_mark', message.channel, 'Updated server join message!')
      }
    }
    if (args[1] === 'joindm') {
      if (!args[2]) {
        return func.statusMsg('question', message.channel, 'There was no message input!')
      } else {
        const newMsg = args.toString().replace(/,/g, ' ').slice(11)
        db.set(`messages_joindm_${message.guild.id}`, newMsg)
        return func.statusMsg('white_check_mark', message.channel, 'Updated server join DM message!')
      }
    }
    if (args[1] === 'leave') {
      if (!args[2]) {
        return func.statusMsg('question', message.channel, 'There was no message input!')
      } else {
        const newMsg = message.content.slice(21)
        db.set(`messages_leave_${message.guild.id}`, newMsg)
        return func.statusMsg('white_check_mark', message.channel, 'Updated server leave message!')
      }
    }
  } else if (args[0] === 'clear' || args[0] === 'remove' || args[0] === 'delete' || args[0] === 'reset') {
    if (!args[1]) {
      return func.statusMsg('question', message.channel, 'You didn\'t provide a type to remove!')
    }
    if (args[1] === 'join') {
      db.delete(`messages_join_${message.guild.id}`)
      return func.statusMsg('white_check_mark', message.channel, 'Removed server join message!')
    }
    if (args[1] === 'joindm') {
      db.delete(`messages_joindm_${message.guild.id}`)
      return func.statusMsg('white_check_mark', message.channel, 'Removed server join DM message!')
    }
    if (args[1] === 'leave') {
      db.delete(`messages_leave_${message.guild.id}`)
      return func.statusMsg('white_check_mark', message.channel, 'Removed server leave message!')
    }
  } else if (args[0] === 'preview') {
    let msg
    if (!args[1]) {
      func.statusMsg('question', message.channel, 'You didn\'t provide a message to preview!')
    }
    if (args[1] === 'join') {
      msg = db.get(`messages_join_${message.guild.id}`)
      if (!msg) {
        func.statusMsg('x', message.channel, 'No message is set for that type!')
      } else {
        message.channel.send(msg)
      }
    }
    if (args[1] === 'joindm') {
      msg = db.get(`messages_joindm_${message.guild.id}`)
      if (!msg) {
        func.statusMsg('x', message.channel, 'No message is set for that type!')
      } else {
        message.channel.send(msg)
      }
    }
    if (args[1] === 'leave') {
      msg = db.get(`messages_leave_${message.guild.id}`)
      if (!msg) {
        func.statusMsg('x', message.channel, 'No message is set for that type!')
      } else {
        message.channel.send(msg)
      }
    }
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
