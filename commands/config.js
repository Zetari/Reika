const db = require('quick.db');
const Discord = require('discord.js');

exports.run = (bot, message) => {

	let joinchannel;
	let leavechannel;
	let kickchannel;
	let banchannel;
	let dmText;
	let joinText;
	let leaveText;

	/* For anyone who complains about nested callback hell, screw off. <3 */

	db.fetch(`logs.ban.${message.guild.id}`).then(banID => {
		if (!message.guild.channels.get(banID)) banchannel = '*Not Set*';
		else banchannel = message.guild.channels.get(banID);

		db.fetch(`logs.leave.${message.guild.id}`).then(leaveID => {
			if (!message.guild.channels.get(leaveID)) leavechannel = '*Not Set*';
			else leavechannel = message.guild.channels.get(leaveID);

			db.fetch(`logs.kick.${message.guild.id}`).then(kickID => {
				if (!message.guild.channels.get(kickID)) kickchannel = '*Not set*';
				else kickchannel = message.guild.channels.get(kickID);

				db.fetch(`logs.join.${message.guild.id}`).then(joinID => {
					if (!message.guild.channels.get(joinID)) joinchannel = '*Not set*';
					else joinchannel = message.guild.channels.get(joinID);
/* eslint-disable */
					db.fetch(`messages.joindm.${message.guild.id}`).then(joinDMFetched => {
						if (!joinDMFetched) dmText = '*Not set*';
						else dmText = joinDMFetched;

						db.fetch(`messages.join.${message.guild.id}`).then(joinMessageFetched => {
							if (!joinMessageFetched) joinText = '*Not set*';
							else joinText = joinMessageFetched;

							db.fetch(`messages.leave.${message.guild.id}`).then(leaveMessageFetched => {
								if (!leaveMessageFetched) leaveText = '*Not set*';
								else leaveText = leaveMessageFetched;

								const banch = `${banchannel}`;
								const kickch = `${kickchannel}`;
								const joinch = `${joinchannel}`;
								const leavech = `${leavechannel}`;
								const welcomedm = `${dmText}`;
								const welcometxt = `${joinText}`;
								const leavetxt = `${leaveText}`;
								const embed = new Discord.RichEmbed()
									.addField('Logging Channels', '\u200B')
									.addField('Ban Log', banch, true)
									.addField('Kick Log', kickch, true)
									.addField('Join Log', joinch, true)
									.addField('Leave Log', leavech, true)
									.addField('\u200B', '\u200B')
									.addField('Messages', '\u200B')
									.addField('Join DM Message', dmText, true)
									.addField('Welcome Message', joinText, true)
									.addField('Leave Message', leaveText, true);
								message.channel.send({ embed });
							});
						});
					});
				});
			});
		});
	});
};

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: ['cfg'],
};

exports.help = {
	name : 'config',
	description: 'Shows the config.',
	usage: 'config',
	group: 'utility',
};
