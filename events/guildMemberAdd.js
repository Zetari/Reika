const db = require('quick.db')
exports.run = (bot, member) => {
  let welcomech = member.guild.channels.get(db.fetch(`logs_welcome_${member.guild.id}`))
  let joinText = db.fetch(`messages_join_${member.guild.id}`)
  if (welcomech && joinText) {
    return welcomech.send(joinText.replace(/{user}/g, member).replace(/{server}/g, member.guild.name))
  }
}
