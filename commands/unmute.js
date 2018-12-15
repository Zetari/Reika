exports.run = (bot, message) => {
	if (!message.member.hasPermission('MANAGE_MESSAGES')) {
		message.channel.send('This requires you to have a role with the permission `Manage Messages`.');
		return;
	}
	const toMute = message.mentions.members.first();
	if(!toMute) return message.channel.send('No user specified!');
	if(toMute.id === message.author.id) return message.channel.send('You can\'t mute yourself!');
	const role = message.guild.roles.find(r => r.name === 'Muted');
	function checkForMutedRole() {
		if (!toMute.roles.has(role.id)) {
			message.channel.send('That user is not currently muted!');
			return;
		}
	}
	checkForMutedRole();
	toMute.removeRole(role).catch(console.error);
	message.channel.send(`${toMute} has been unmuted.`);
};

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: [],
};

exports.help = {
	name : 'unmute',
	description: 'Unmutes a mutes user.',
	usage: 'unmute <user>',
	group: 'moderation',
};
