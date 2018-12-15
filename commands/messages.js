const db = require('quick.db');
exports.run = (bot, message, args) => {
	if (args[0] === 'set') {
		if (!args[1]) {
			return message.channel.send('You didn\'t provide a type to set!');
		}
		if (args[1] === 'join') {
			if (!args[2]) {
				return message.channel.send('There was no message input!');
			}
			else {
				const newMsg = args.toString().replace(/,/g, ' ').slice(9);
				db.set(`messages.join.${message.guild.id}`, newMsg).then(nm => {
					return message.channel.send(`Updated server join message to \`${nm}\``);
				});
			}
		}
		if (args[1] === 'joindm') {
			if (!args[2]) {
				return message.channel.send('There was no message input!');
			}
			else {
				const newMsg = args.toString().replace(/,/g, ' ').slice(11);
				db.set(`messages.joindm.${message.guild.id}`, newMsg).then(nm => {
					return message.channel.send(`Updated server join DM message to \`${nm}\``);
				});
			}
		}
		if (args[1] === 'leave') {
			if (!args[2]) {
				return message.channel.send('There was no message input!');
			}
			else {
				const newMsg = args.toString().replace(/,/g, ' ').slice(10);
				db.set(`messages.leave.${message.guild.id}`, newMsg).then(nm => {
					return message.channel.send(`Updated server leave message to \`${nm}\``);
				});
			}
		}
	}
};

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: ['msgs'],
};

exports.help = {
	name : 'messages',
	description: 'Edit the config messages.',
	usage: 'messages <set | clear> <type>',
	group: 'utility',
};
