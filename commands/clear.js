exports.run = (bot, message) => {
	message.delete(message.author);

	if (!message.member.hasPermission('MANAGE_MESSAGES')) {
		message.channel.send('This requires you to have a role with the permission `Manage Messages`.');
		return;
	}
	const user = message.mentions.users.first();
	const amount = parseInt(message.content.split(' ')[1]) ? parseInt(message.content.split(' ')[1]) : parseInt(message.content.split(' ')[2]);

	if (!amount) {
		message.channel.send('You must specify an amount to delete!');
		return;
	}
	if (amount > 100) {
		message.channel.send('I can only delete 100 messages at a time!');
		return;
	}
	if (!amount && !user) {
		message.channel.send('You must specify a user and amount, or just an amount, of messages to purge!');
		return;
	}
	message.channel.fetchMessages({
		limit: amount,
	}).then((messages) => {
		if (user) {
			const filterBy = user ? user.id : bot.user.id;
			messages = messages.filter(m => m.author.id === filterBy).array().slice(0, amount);
		}
		message.channel.bulkDelete(messages).catch(error => console.log(error.stack));
	});
};

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: [],
};

exports.help = {
	name : 'clear',
	description: 'Clear messages.',
	usage: 'clear',
	group: 'utility',
};
