exports.run = (bot, message) => {
	message.channel.send(`:ping_pong: Pong! Took \`${Date.now() - message.createdTimestamp} ms \`.`).catch(console.error);
};

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: [],
};

exports.help = {
	name : 'ping',
	description: 'Is the bot alive?',
	usage: 'ping',
	group: 'utility',
};
