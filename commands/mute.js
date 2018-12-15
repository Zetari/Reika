const Discord = require('discord.js');
exports.run = async (bot, message) => {
	const db = require('quick.db');
	let reason = message.content.split(/\s+/g).slice(2).join(' ');
	if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send(':x: This requires you to have a role with the permission `Manage Messages`.', 10000);
	const toMute = message.mentions.members.first();
	if(!toMute) {
		message.channel.send('you need to mention a user to mute.');
		return;
	}
	if(message.mentions.users.size > 1) {
		message.channel.send('You can only mention one user at a time.');
		return;
	}
	if(toMute.hasPermission('ADMINISTRATOR')) {
		message.channel.send('You cannot mute that member!');
		return;
	}
	if(reason.length === 0) {
		reason = 'None';
	}
	if(toMute.id === message.author.id) {
		message.channel.send('You can\'t mute yourself!');
	}
	let role = message.guild.roles.find(r => r.name === 'Muted');

	if(!role) {
		role = await message.guild.createRole({
			name: 'Muted',
			color: '#996699',
			permissions: [],
		});
		message.guild.channels.forEach(async (channel) => {
			await channel.overwritePermissions(role, {
				SEND_MESSAGES: false,
				ADD_REACTIONS: false,
			});
		});
	}
	if (toMute.roles.has(role.id)) {
		message.channel.send('That user is already muted!');
		return;
	}
	toMute.addRole(role).catch(console.error);
	message.channel.send(`${toMute} has been muted.`);
	let pref;
	db.fetch(`prefix_${message.guild.id}`).then(p => {
		if(!p) {
			pref = '-!';
		}
		else {
			pref = p;
		}
		db.fetch(`mLogChannel_${message.guild.id}`).then(ml => {
			if (!message.guild.channels.get(ml)) {
				message.channel.send(`Could not log mute because there is no logging channel set! set one with ${pref}logs set mute #channel`);
				return;
			}
			else {
				const embed = new Discord.RichEmbed()
					.addField('📦 | Action »', 'Mute')
					.addField('📑 | User »', `${toMute}`)
					.addField('💼 | Moderator »', `${message.author.toString()}`)
					.addField('📜 | Reason »', `${reason}`)
					.setColor(0x1D82B6)
					.setTimestamp();
				bot.channels.get(ml).send(embed);
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
	name : 'mute',
	description: 'Mutes a user.',
	usage: 'mute <user> [reason]',
	group: 'moderation',
};
