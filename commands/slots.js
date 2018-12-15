/*
*
* Slots command for PlexiDev Challenge
* Made from scratch, only module used is common-tags for nice inline edits
* By Zetari
*
*/

/* eslint-disable no-inline-comments */
const { stripIndent } = require('common-tags');
exports.run = (bot, message) => {

	const slotpicks = ['🍊', '🍎', '🍋', '🍌', '🍇', '🍒', '🌶'];	// Slot Emojis, customizable
	const display = []; // The line display for the slots

	for (let i = 0; i <= 8; i++) { // Generates a random 3 lines of emojis to push to the display
		display.push(slotpicks[Math.floor(Math.random() * slotpicks.length)]);
	}
	const line1 = display.slice(0, 3).toString().replace(/,/g, ' | '); // The three lines
	const line2 = display.slice(3, 6).toString().replace(/,/g, ' | ');
	const line3 = display.slice(6, 9).toString().replace(/,/g, ' | ');
	const em1 = display.slice(4, 5); // The three emojis that determine a win or loss
	const em2 = display.slice(5, 6);
	const em3 = display.slice(6, 7);
	let tf; // Global defenition
	if(`\\${em1}` === `\\${em2}` && `\\${em2}` === `\\${em3}`) { // Check if the middle emojis are the same (Converted to unicode emoji (\:<emoji>:), as using the actual emoji does not work)
		tf = true;
	}
	else {
		tf = false;
	}
	sendSlots(line1, line2, line3, tf, message); // Use the function to send the whole thing
};

function sendSlots(line1, line2, line3, tf, message) {
	message.channel.send(stripIndent`
		**[ 🎰 S L O T S ]**
		**━━━━━━━**



		**━━━━━━━**
	`).then(msg => {
		msg.edit(stripIndent`
			**[ 🎰 S L O T S ]**
			**━━━━━━━**
  	  ${line3}


			**━━━━━━━**
		`);
		msg.edit(stripIndent`
			**[ 🎰 S L O T S ]**
			**━━━━━━━**
			  ${line2}
			  ${line3}		
					
			**━━━━━━━**
		`);
		msg.edit(stripIndent`
			**[ 🎰 S L O T S ]**
			**━━━━━━━**
			  ${line1}	
			  ${line2}
			  ${line3}		
			**━━━━━━━**
		`);

		if(tf === true) { // Win or loss :^)
			msg.edit(stripIndent`
				**[ 🎰 S L O T S ]**
				**━━━━━━━**
				  ${line1}	
				  ${line2}
				  ${line3}		
				**━━━━━━━**
				**[ 🏆 W I N ]**
			`);
		}
		else {
			msg.edit(stripIndent`
				**[ 🎰 S L O T S ]**
				**━━━━━━━**
				  ${line1}	
				  ${line2}
				  ${line3}		
				**━━━━━━━**
				**[ ❌ L O S S ]**
				`);
		}
	});
}

/*
* Wow, you reached the end of the code :^)
* Big thanks to PlexiDev for teaching me a lot of the stuff I now know <3
*/
exports.conf = {
	enabled: true,
	guildOnly: true,
	aliases: [],
};

exports.help = {
	name : 'slots',
	description: 'Play a quick slots game.',
	usage: 'slots',
	group: 'fun',
};
