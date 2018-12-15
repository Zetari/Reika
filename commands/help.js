const Discord = require('discord.js');
const fs = require('fs');
exports.run = (bot, message, args) => {

	if (!args[0]) {
		let props;
		let groups;
		fs.readdir('D:/Discord Bots/Reika/commands', (err, files) => {
			if(err) console.error(err);
			console.log(`Loading a total of ${files.length} commands.`);
			groups = new Array();
			files.forEach(f=> {
				props = require(`D:/Discord Bots/Reika/commands/${f}`);
				if (!groups[props.help.group]) {
					groups[props.help.group] = new Array();
					groups[props.help.group].push(props.help.name);
				}
				else {
					groups[props.help.group].push(props.help.name);
				}
			});
			const x = new Array();
			const embed = new Discord.RichEmbed();
			bot.commands.map(c => {
				if (!x[c.help.group]) {
					x[c.help.group] = new Array();
				}
				if (x[c.help.group].length > 0) {
					return;
				}
				else if (x[c.help.group].length === 0) {
					embed.addField(c.help.group.toUpperCase(), groups[c.help.group].toString().replace('[', '').replace(']', '').replace(/,/gi, ', '));
				}
				x[c.help.group].push(1);
			});
			files.forEach(f => {
				props = require(`D:/Discord Bots/Reika/commands/${f}`);
				x[props.help.group] = [];
				groups[props.help.group] = [];
			});
			embed.setTimestamp();
			embed.setColor(0xadd8e6);
			embed.setAuthor(`${bot.user.username}'s Commands`, bot.user.avatarURL);
			embed.setFooter(`Requested by ${message.author.username}`, message.author.avatarURL);
			message.channel.send({ embed });
		});
	}
	else {
		const embed = new Discord.RichEmbed();
		let command = args[0];
		if (bot.commands.has(command)) {
			command = bot.commands.get(command);
			embed.setAuthor(command.help.name.toUpperCase());
			embed.setFooter(`Requested by ${message.author.username}`, message.author.avatarURL);
			embed.addField('Description', command.help.description);
			embed.addField('Usage', command.help.usage);
			embed.addField('Group', command.help.group);
			message.channel.send({ embed });
		}
	}
};

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: [],
};

exports.help = {
	name : 'help',
	description: 'help.',
	usage: 'help [command]',
	group: 'utility',
};
