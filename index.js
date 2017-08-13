var Botkit = require('botkit');
var Witbot = require('witbot');

var slackToken = process.env.SLACK_TOKEN
var witToken = process.env.WIT_TOKEN

var controller = Botkit.slackbot({
    debug: false,
});

controller.spawn({
    token: slackToken
}).startRTM(function (err, bot, payload) {
	if (err) {
		throw new Error ('Error connecting to Slack: ', err);
	}
	console.log('Connectedto Slack');
}

);

var witbot = Witbot(witToken);