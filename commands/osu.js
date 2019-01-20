const Discord = require('discord.js')
const osu = require('node-osu')
exports.run = async (bot, message, args, func) => {
  var osuApi = new osu.Api(process.env.OSU_API, {
    notFoundAsError: true,
    completeScores: true
  })
  const embed = new Discord.RichEmbed()
  if (args[0] === 'user') {
    if (!args[1]) return func.statusMsg('question', message.channel, 'No user specified to search!')
    else {
      const name = args.toString().slice(args[1].length).replace(/,/gi, ' ')
      const msg = await message.channel.send(':mag: Searching...')
      await osuApi.getUser({ u: name }).then(user => {
        embed.setAuthor('osu! Stats')
          .setTitle(`${user.name} • Level ${user.level} • ${user.accuracyFormatted} Accuracy`)
          .setColor(0xF06292)
          .addField('50', user.counts['50'], true)
          .addField('100', user.counts['100'], true)
          .addField('300', user.counts['300'], true)
          .addField('SS', user.counts.SS, true)
          .addField('S', user.counts.S, true)
          .addField('A', user.counts.A, true)
          .addField('PP (raw)', user.pp.raw, true)
          .addField('Rank', user.pp.rank, true)
          .addField(`Country Rank (${user.country})`, user.pp.countryRank, true)
        msg.edit({ embed })
      }).catch(error => {
        func.statusMsg('interrobang', message.channel, error)
      })
    }
  }
  if (args[0] === 'beatmap' || args[0] === 'map') {
    if (!args[1]) return func.statusMsg('question', message.channel, 'No beatmap specified to search!')
    else {
      const msg = await message.channel.send(':mag: Searching...')
      await osuApi.getBeatmaps({ b: args[1] }).then(beatmaps => {
        embed.setAuthor(`osu! Beatmap | ${beatmaps[0].id}`)
          .setColor(0xF06292)
          .setTitle(`${beatmaps[0].artist} • ${beatmaps[0].title}`)
          .addField('Creator', beatmaps[0].creator)
          .addField('BPM', beatmaps[0].bpm)
          .addField('Approval Status', beatmaps[0].approvalStatus)
          .addField('Plays', beatmaps[0].counts.plays, true)
          .addField('Passes', beatmaps[0].counts.passes, true)
          .addField('Max Combo', beatmaps[0].maxCombo, true)
          .addField('Difficulty Ratings', `Overall rating: ${beatmaps[0].difficulty.overall}`)
          .addField('Map Rating', beatmaps[0].difficulty.rating, true)
          .addField('Size', beatmaps[0].difficulty.size, true)
          .addField('Approach', beatmaps[0].difficulty.approach, true)
          .addField('Drain', beatmaps[0].difficulty.drain, true)
        msg.edit({ embed })
      }).catch(error => {
        func.statusMsg('interrobang', message.channel, error)
      })
    }
  }
  if (args[0] === 'score' || args[0] === 'scores') {
    if (!args[1]) return func.statusMsg('question', message.channel, 'No beatmap specified to search!')
    else {
      const msg = await message.channel.send(':mag: Searching...')
      await osuApi.getScores({ b: args[1] }).then(scores => {
        osuApi.getBeatmaps({ b: args[1] }).then(beatmaps => {
          embed.setAuthor(`osu! Scores | ${beatmaps[0].artist} • ${beatmaps[0].title}`)
            .setColor(0xF06292)
          for (let x = 0; x <= 10; x++) {
            embed.addField(`${x}. ${scores[x].user.name}`, scores[x].score)
          }
          msg.edit({ embed })
        }).catch(error => {
          func.statusMsg('interrobang', message.channel, error)
        })
      }).catch(error => {
        func.statusMsg('interrobang', message.channel, error)
      })
    }
  }
}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: []
}

exports.help = {
  name: 'osu',
  description: 'Commands for osu things.',
  usage: 'osu',
  group: 'fun'
}
