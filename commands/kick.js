const Discord = require('discord.js');
exports.run = (bot, message) => {
	const kmember = message.mentions.members.first();
	let reason = message.content.split(/\s+/g).slice(2).join(' ');
	const guild = message.guild;
	const db = require('quick.db');
	let pref;
	db.fetch(`prefix_${message.guild.id}`).then(p => {
		if(!p) {
			pref = '-!';
		}
		else {
			pref = p;
		}
		db.fetch(`logChannel_${message.guild.id}`).then(ml => {
			if (!message.member.hasPermission('KICK_MEMBERS')) {
				message.channel.send('This requires you to have a role that can kick members.');
				return;
			}
			if(message.mentions.users.size === 0) {
				return message.channel.send('You need to mention a user to kick.').catch(console.error);
			}
			if(message.mentions.users.size > 1) {
				return message.channel.send('You can only mention one user at a time.').catch(console.error);
			}
			if(reason.length === 0) {
				reason = 'None';
			}
			else {
				kmember.kick(reason);
				message.channel.send(`Successfully kicked user ${kmember}.`);
			}

			if (!guild.channels.get(ml)) {return message.channel.send(`Could not log kick because there is no modLog channel set! set one with ${pref}modlogs #channel`);}

			else {
				const embed = new Discord.RichEmbed()
					.addField('📦 | Action »', 'Kick')
					.addField('📑 | User »', `${kmember}`)
					.addField('💼 | Moderator »', `${message.author.toString()}`)
					.addField('📜 | Reason »', `${reason}`)
					.setColor(0x1D82B6)
					.setTimestamp();
				bot.channels.get(ml).send(embed);

				embed.setTitle('**❌ You\'ve been kicked! ❌**')
					.setColor(0x1D82B6)
					.setDescription(`You got kicked from ${guild.name} by a staff member.\nReason: ${reason}`);
				message.mentions.members.first().send(embed);
			}
		});
	});
};

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: [],
};

exports.help = {
	name : 'kick',
	description: 'Kicks a user.',
	usage: 'kick <user> [reason]',
	group: 'moderation',
};
