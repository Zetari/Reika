const db = require('quick.db')
const Discord = require('discord.js')
exports.run = (bot, member) => {
  let leavech = member.guild.channels.get(db.fetch(`logs_leave_${member.guild.id}`))
  let leaveText = db.fetch(`messages_leave_${member.guild.id}`)
  let leavechannel = member.guild.channels.get(db.fetch(`logs_leavelog_${member.guild.id}`))
  if (leavech && leaveText) {
    leavech.send(leaveText.replace(/{user}/g, member).replace(/{server}/g, member.guild.name))
  }
  if (leavechannel) {
    const embed = new Discord.RichEmbed()
    embed.setTitle(member.user.username + '#' + member.user.discriminator)
      .setAuthor('User left')
      .setColor(0xEC7063)
      .addField('User ID', member.user.id)
      .setThumbnail(member.user.avatarURL)
      .setTimestamp()
    leavechannel.send({ embed })
  }
}
