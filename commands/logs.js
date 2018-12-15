const db = require('quick.db');
exports.run = (bot, message, args) => {
	if (args[0] === 'set') {
		if (!args[1]) {
			return message.channel.send('You didn\'t provide a type to set!');
		}
		if (args[1] === 'ban') {
			if (!args[2]) {
				return message.channel.send('There was no channel mentioned!');
			}
			const channelment = message.mentions.channels.first().id;
			if (!message.guild.channels.get(channelment)) {
				return message.channel.send('The channel mentioned is not a valid channel!');
			}
			else {
				db.set(`logs.ban.${message.guild.id}`, channelment).then(ch => {
					return message.channel.send(`Updated ban log channel to <#${ch}>!`);
				});
			}
		}
		if (args[1] === 'kick') {
			if (!args[2]) {
				return message.channel.send('There was no channel mentioned!');
			}
			const channelment = message.mentions.channels.first().id;
			if (!message.guild.channels.get(channelment)) {
				return message.channel.send('The channel mentioned is not a valid channel!');
			}
			else {
				db.set(`logs.kick.${message.guild.id}`, channelment).then(ch => {
					return message.channel.send(`Updated kick log channel to <#${ch}>!`);
				});
			}
		}
		if (args[1] === 'join') {
			if (!args[2]) {
				return message.channel.send('There was no channel mentioned!');
			}
			const channelment = message.mentions.channels.first().id;
			if (!message.guild.channels.get(channelment)) {
				return message.channel.send('The channel mentioned is not a valid channel!');
			}
			else {
				db.set(`logs.join.${message.guild.id}`, channelment).then(ch => {
					return message.channel.send(`Updated join log channel to <#${ch}>!`);
				});
			}
		}
		if (args[1] === 'leave') {
			if (!args[2]) {
				return message.channel.send('There was no channel mentioned!');
			}
			const channelment = message.mentions.channels.first().id;
			if (!message.guild.channels.get(channelment)) {
				return message.channel.send('The channel mentioned is not a valid channel!');
			}
			else {
				db.set(`logs.leave.${message.guild.id}`, channelment).then(ch => {
					return message.channel.send(`Updated leave log channel to <#${ch}>!`);
				});
			}
		}
	}
};

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: [],
};

exports.help = {
	name : 'logs',
	description: 'Edit the config log channels.',
	usage: 'logs <set | clear> <type>',
	group: 'utility',
};
