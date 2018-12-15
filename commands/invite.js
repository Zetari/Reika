exports.run = (bot, message) => {
	message.channel.send('Use this link to invite me to another server: https://discordapp.com/api/oauth2/authorize?client_id=390950919711227917&permissions=8&scope=bot');
};

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: ['inv'],
};

exports.help = {
	name : 'invite',
	description: 'Shows the bot invite.',
	usage: 'invite',
	group: 'utility',
};
