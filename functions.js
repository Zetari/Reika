module.exports = {

  embed: function (channel, message) {
    channel.send({
      embed: {
        description: message,
        color: 0x1D82B6
      }
    })
  },
  statusMsg: function (emote, channel, message) {
    channel.send(`:${emote}: • ${message}`)
  }
}
