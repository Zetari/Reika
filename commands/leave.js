exports.run = (bot, message, args, func) => {
	if (!message.member.voiceChannel) return func.emsg('x', message.channel, 'You aren\'t connected to a voice channel!');

	if (!message.guild.me.voiceChannel) return func.emsg('x', message.channel, 'I am not connected to a voice channel!');

	if (message.guild.me.voiceChannelID !== message.member.voiceChannelID) return func.emsg('exclamation', message.channel, 'You aren\'t in the same voice channel as I am!');

	message.guild.me.voiceChannel.leave();

	func.emsg('heavy_check_mark', message.channel, 'Left the voice channel.');
};

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: [],
};

exports.help = {
	name : 'leave',
	description: 'Leaves the voice channel.',
	usage: 'leave',
	group: 'music',
};
