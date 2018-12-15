module.exports = {

	embed: function(channel, message) {
		channel.send({
			embed:{
				description: message,
				color: 0x1D82B6,
			},
		});
	},
	emsg: function(emoji, channel, message) {
		channel.send(`:${emoji}: **│** ${message}`);
	},
};
