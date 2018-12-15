exports.run = (bot, message) => {
	const Discord = require('discord.js');
	const fs = require('fs');
	const deps = JSON.parse(fs.readFileSync('./package.json', 'utf8'));

	const depsList = deps.dependencies;

	const embed = new Discord.RichEmbed()
		.setColor(0x1D82B6)
		.setTitle(`${bot.user.username}'s Dependencies`);

	/* eslint-disable */
	for (x in depsList) {
		embed.addField(x, depsList[x], true);
	/* eslint-enable */

	}
	message.channel.send(embed);
};

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: ['deps'],
};

exports.help = {
	name : 'dependencies',
	description: 'Shows the bot dependencies.',
	usage: 'dependencies',
	group: 'utility',
};
