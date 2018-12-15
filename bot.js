const Discord = require('discord.js');
const bot = new Discord.Client();
const fs = require('fs');
const db = require('quick.db');
const Enmap = require('enmap');
const func = require('./functions.js');

fs.readdir('./events/', (err, files) => {
	if (err) return console.error(err);
	files.forEach(file => {
		const event = require(`./events/${file}`);
		const eventName = file.split('.')[0];
		bot.on(eventName, (...args) => event.run(bot, ...args));
	});
});

bot.commands = new Enmap();
bot.aliases = new Enmap();
bot.groups = new Object();
fs.readdir('./commands/', (err, files) => {
	if(err) console.error(err);
	console.log(`Loading a total of ${files.length} commands.`);
	files.forEach(f=> {
		const props = require(`./commands/${f}`);
		console.log(`Loading Command: ${props.help.name}. :ok_hand:`);
		bot.commands.set(props.help.name, props);
		bot.groups[props.help.group] = new Array();
		props.conf.aliases.forEach(alias => {
			bot.aliases.set(alias, props.help.name);
		});
	});
});
bot.on('guildMemberAdd', member => {
	db.fetch(`logs.join.${member.guild.id}`).then(i => {

		db.fetch(`messages.joindm.${member.guild.id}`).then(o => {

			if (!o) console.log(`ERR: ${member.guild.name} does not have a dmJoinMessage set.`);
			else func.embed(member, o.replace('{user}', member).replace('{members}', member.guild.memberCount));

			if (!member.guild.channels.get(i)) return console.log(`ERR: ${member.guild.name} does not have a join/leave channel set.`);

			db.fetch(`jessages.join.${member.guild.id}`).then(p => {

				if (!p) func.embed(member.guild.channels.get(i), `${member} joined the server. Member count: ${member.guild.memberCount}`);
				else func.embed(member.guild.channels.get(i), p.replace('{user}', member).replace('{members}', member.guild.memberCount));

			});

		});

	});
});

console.log(
	' ██████╗ ███████╗██╗██╗  ██╗ █████╗ \n',
	'██╔══██╗██╔════╝██║██║ ██╔╝██╔══██╗\n',
	'██████╔╝█████╗  ██║█████╔╝ ███████║\n',
	'██╔══██╗██╔══╝  ██║██╔═██╗ ██╔══██║\n',
	'██║  ██║███████╗██║██║  ██╗██║  ██║\n',
	'╚═╝  ╚═╝╚══════╝╚═╝╚═╝  ╚═╝╚═╝  ╚═╝\n',
);

bot.login(process.env.BOT_TOKEN);
