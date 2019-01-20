const Discord = require('discord.js')
exports.run = async (bot, message) => {
  const user = message.mentions.users.first() || message.author

  if (!message.channel.permissionsFor(message.guild.me).has('EMBED_LINKS')) {
    message.channel.send('I don\'t have permission to embed links!')
    return
  }
  setTimeout(() => {
    const embed = new Discord.RichEmbed()
      .setAuthor(user.username)
      .setDescription('Avatar ID: ' + user.avatar)
      .setImage(user.avatarURL)
      .setTimestamp()
      .setColor(0x99ccff)
    message.channel.send({ embed: embed })
  }, 100)
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['pfp']
}

exports.help = {
  name: 'avatar',
  description: 'Shows a user\'s avatar.',
  usage: 'avatar <user>',
  group: 'utility'
}
