const db = require('quick.db')
const Discord = require('discord.js')
exports.run = (bot, member) => {
  let welcomech = member.guild.channels.get(db.fetch(`logs_welcome_${member.guild.id}`))
  let joinchannel = member.guild.channels.get(db.fetch(`logs_join_${member.guild.id}`))
  let joinText = db.fetch(`messages_join_${member.guild.id}`)
  if (welcomech && joinText) {
    welcomech.send(joinText.replace(/{user}/g, member).replace(/{server}/g, member.guild.name))
  }
  if (joinchannel) {
    const embed = new Discord.RichEmbed()
    embed.setTitle(member.user.username + '#' + member.user.discriminator)
      .setAuthor('User join')
      .setColor(0x58D68D)
      .addField('Created At', member.user.createdAt)
      .addField('User ID', member.user.id)
      .setThumbnail(member.user.avatarURL)
      .setTimestamp()
    joinchannel.send({ embed })
  }
}
