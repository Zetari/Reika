exports.run = async (bot, message, args, func) => {
  if (!message.member.hasPermission('MANAGE_MESSAGES')) {
    func.statusMsg('x', message.channel, 'This requires you to have a role with the permission `Manage Messages`!')
    return
  }
  const toUnMute = message.mentions.members.first()
  if (!toUnMute) return func.statusMsg('question', message.channel, 'No user specified!')
  if (toUnMute.id === message.author.id) {
    func.statusMsg('no_entry_sign', message.channel, 'Why would you even try this?')
    return
  }
  let role = message.guild.roles.find(r => r.name === 'Muted')
  if (!role) {
    role = await message.guild.createRole({
      name: 'Muted',
      color: '#996699',
      permissions: []
    })
    message.guild.channels.forEach(async (channel) => {
      await channel.overwritePermissions(role, {
        SEND_MESSAGES: false,
        ADD_REACTIONS: false
      })
    })
  }
  function checkForMutedRole () {
    if (!toUnMute.roles.has(role.id)) {
      func.statusMsg('x', message.channel, 'That user is not currently muted!')
    }
  }
  checkForMutedRole()
  toUnMute.removeRole(role).catch(console.error)
  func.statusMsg('white_check_mark', message.channel, `${toUnMute} has been unmuted.`)
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: []
}

exports.help = {
  name: 'unmute',
  description: 'Unmutes a mutes user.',
  usage: 'unmute <user>',
  group: 'moderation'
}
