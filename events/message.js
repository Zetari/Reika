const db = require('quick.db')
const func = require('../functions.js')
exports.run = (bot, message) => {
  let pre = db.fetch(`prefix.${message.guild.id}`)
  let prefix
  if (!pre) {
    prefix = '-!'
  } else {
    prefix = pre
  };
  if (!message.content.startsWith(prefix)) return
  const command = message.content.split(' ')[0].slice(prefix.length)
  const args = message.content.split(' ').slice(1)
  let cmd
  if (bot.commands.has(command)) {
    cmd = bot.commands.get(command)
  } else if (bot.aliases.has(command)) {
    cmd = bot.commands.get(bot.aliases.get(command))
  }
  if (cmd) {
    cmd.run(bot, message, args, func)
    console.log(`[${message.guild.name}] ${message.author.username}#${message.author.discriminator}: ${message} (args: ${args})`)
  } else {
    message.react('❌')
  }
}
