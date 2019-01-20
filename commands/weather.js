exports.run = (bot, message, args, func) => {
  const Discord = require('discord.js')
  const weather = require('weather-js')

  if (!args[0]) return func.statusMsg('question', message.channel, 'No location specified!')

  weather.find({
    search: args.join(' '),
    degreeType: 'F'
  }, function (err, result) {
    if (err) return func.statusMsg('interrobang', message.channel, 'An error occurred!')

    if (result === undefined || result.length === 0) {
      func.statusMsg('question', message.channel, 'Please enter a valid location!')
      return
    }

    const current = result[0].current
    const location = result[0].location

    const embed = new Discord.RichEmbed()
      .setDescription(`**${current.skytext}**`)
      .setAuthor(`Weather for ${current.observationpoint}`)
      .setThumbnail(current.imageUrl)
      .setColor(0x00AE86)
      .addField('Timezone', `UTC${location.timezone}`, true)
      .addField('Degree Type', location.degreetype, true)
      .addField('Temperature', `${current.temperature} Degrees`, true)
      .addField('Feels Like', `${current.feelslike} Degrees`, true)
      .addField('Winds', current.winddisplay, true)
      .addField('Humidity', `${current.humidity}%`, true)

    message.channel.send({
      embed
    })
  })
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: []
}

exports.help = {
  name: 'weather',
  description: 'What\'s the weather like?',
  usage: 'weather <location>',
  group: 'utility'
}
