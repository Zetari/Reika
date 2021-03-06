const Discord = require('discord.js')
const db = require('quick.db')
exports.run = (bot, message) => {
  let bal = db.fetch(`money_${message.author.id}`)
  if (!bal) {
    bal = 0
  }

  const embed = new Discord.RichEmbed()
    .setDescription(`**${message.guild.name} Bank**`)
    .setColor(0xD4AF37)
    .addField('Account Holder', message.author.username, true)
    .addField('Account Balance', bal + ' :yen:', true)
  message.channel.send({ embed })
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['bal', 'money']
}

exports.help = {
  name: 'balance',
  description: 'Check balance of a user.',
  usage: 'balance',
  group: 'fun'
}
