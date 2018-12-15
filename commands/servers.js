const Discord = require('discord.js');
exports.run = (bot, message) => {
	const guildNames = bot.guilds.map(g => g.name).join(', ');
	const serv = new Discord.RichEmbed()
		.setColor(0x234725)
		.addField('Servers I am currently in:', `${guildNames}`);
	message.channel.send(serv);
};

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: [],
};

exports.help = {
	name : 'servers',
	description: 'Shows the servers that the bot is in.',
	usage: 'servers',
	group: 'utility',
};
