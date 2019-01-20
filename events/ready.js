exports.run = (bot) => {
  const guildNames = bot.guilds.map(g => g.name).join(', ')

  // 0 = Playing
  // 1 = Twitch
  // 2 = Listening to
  // 3 = Watching

  const statuses = [{
    type: 3,
    name: 'you type'
  },
  {
    type: 0,
    name: 'the saxophone'
  },
  {
    type: 2,
    name: 'your voices'
  },
  {
    type: 3,
    name: 'some lewdies'
  },
  {
    type: 3,
    name: 'anime'
  },
  {
    type: 0,
    name: 'the piano'
  },
  {
    type: 0,
    name: 'with the best girl <3'
  },
  {
    type: 0,
    name: 'with cute girls'
  },
  {
    type: 0,
    name: 'the violin'
  },
  {
    type: 3,
    name: 'Netflix'
  },
  {
    type: 3,
    name: 'you'
  },
  {
    type: 3,
    name: `over ${bot.users.size} users`
  },
  {
    type: 3,
    name: 'zetari#0001'
  },
  {
    type: 0,
    name: '<3'
  },
  {
    type: 3,
    name: 'the sky go past'
  },
  {
    type: 3,
    name: 'the sun go down'
  },
  {
    type: 3,
    name: 'the sunrise'
  },
  {
    type: 3,
    name: 'youtube videos'
  },
  {
    type: 0,
    name: 'CS:GO'
  }
  ]

  console.log('Shard #0 active with ' + bot.guilds.size + ' guilds')
  console.log('Guilds: ' + guildNames)
  bot.changeStatus = function () {
    let type
    const status = statuses[~~(Math.random() * statuses.length)]
    if (status.type === 0) type = 'PLAYING'
    if (status.type === 2) type = 'LISTENING'
    if (status.type === 3) type = 'WATCHING'
    bot.user.setActivity(status.name + ` | ${bot.guilds.size} guilds`, {
      'type': type
    })
  }
  setInterval(() => bot.changeStatus(), 60000)
}
