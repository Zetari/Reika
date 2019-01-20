const db = require('quick.db')
exports.run = (bot, member) => {
  let leavech = member.guild.channels.get(db.fetch(`logs_leave_${member.guild.id}`))
  let leaveText = db.fetch(`messages_leave_${member.guild.id}`)
  if (leavech && leaveText) {
    return leavech.send(leaveText.replace(/{user}/g, member).replace(/{server}/g, member.guild.name))
  }
}
