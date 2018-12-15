exports.run = (bot, message, args) => {
	message.channel.send(args.join(' '));
	message.delete(message.author);
};

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: [],
};

exports.help = {
	name : 'sayd',
	description: 'The bot said it.',
	usage: 'sayd <message>',
	group: 'fun',
};
