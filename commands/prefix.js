exports.run = (bot, message, args) => {
	const db = require('quick.db');
	if (!message.member.hasPermission('ADMINISTRATOR')) {
		return message.channel.send('This requires you to have a role with the permission `Administrator`.');
	}
	if (!args.join(' ')) {
		return message.channel.send('Please enter arguments. `prefix <prefix>`');
	}
	db.set(`prefix.${message.guild.id}`, args.join(' '));

	message.channel.send('Prefix changed to ' + args.join(' '));
};

exports.conf = {
	enabled: true,
	guildOnly: true,
	aliases: [],
};

exports.help = {
	name : 'prefix',
	description: 'Change the server prefix for the bot.',
	usage: 'prefix <prefix>',
	group: 'utility',
};
