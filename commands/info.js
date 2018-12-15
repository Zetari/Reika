const Discord = require('discord.js');
const { version } = require('discord.js');
const moment = require('moment');
/* eslint-disable */
const momentDurationFormatSetup = require('moment-duration-format');
/* eslint-enable */
exports.run = (bot, message) => {
	const duration = moment.duration(bot.uptime).format(' D [days], H [hrs], m [mins], s [secs]');
	const embed = new Discord.RichEmbed()
		.setTitle('Reika Info')
		.addField('Memory Usage', `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`)
		.addField('Uptime', duration)
		.addField('Users', bot.users.size.toLocaleString())
		.addField('Servers', bot.guilds.size.toLocaleString())
		.addField('Channels', bot.channels.size.toLocaleString())
		.addField('Discord.js', version)
		.addField('Node.js', process.version);
	message.channel.send({ embed });
};

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: [],
};

exports.help = {
	name : 'info',
	description: 'Shows the bot info.',
	usage: 'info',
	group: 'utility',
};
