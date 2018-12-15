const Discord = require('discord.js');
exports.run = (bot, message) => {
	const bmember = message.mentions.members.first();
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
		db.fetch(`logs.${message.guild.id}`).then(ml => {
			if (!message.member.hasPermission('BAN_MEMBERS')) {
				message.channel.send('This requires you to have a role with the permission `Ban Members`!');
				return;
			}
			if(message.mentions.users.size === 0) {
				return message.channel.send('You need to mention a user to ban!').catch(console.error);
			}
			if(message.mentions.users.size > 1) {
				return message.channel.send('You can only mention one user at a time!').catch(console.error);
			}
			if(reason.length === 0) {
				reason = 'None';
			}
			else {
				bmember.ban(reason);
				message.channel.send(`Successfully banned user ${bmember}.`);
			}

			if (!guild.channels.get(ml)) {return message.channel.send(`Could not log ban because there is no logging channel set! set one with ${pref}logs ban #channel`);}

			else {
				const embed = new Discord.RichEmbed()
					.addField('📦 | Action »', 'Ban')
					.addField('📑 | User »', `${bmember}`)
					.addField('💼 | Moderator »', `${message.author.toString()}`)
					.addField('📜 | Reason »', `${reason}`)
					.setColor(0x1D82B6)
					.setTimestamp();
				bot.channels.get(ml).send(embed);

				embed.setTitle('**You\'ve been banned!**')
					.setColor(0x1D82B6)
					.setDescription(`You were banned from ${guild.name} by a staff member.\nReason: ${reason}`);
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
	name : 'ban',
	description: 'Ban a user.',
	usage: 'ban <user> [reason]',
	group: 'moderation',
};
