exports.run = (bot, message, args) => {
	message.channel.send(args.join(' '));
};

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: [],
};

exports.help = {
	name : 'say',
	description: 'Make the bot say something.',
	usage: 'say <message>',
	group: 'fun',
};
