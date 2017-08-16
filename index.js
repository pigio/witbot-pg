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
	console.log('Connected to Slack');
}

);

var wit_bot = Witbot(witToken);

controller.hears('.*', 'direct_message,direct_mention', function (bot, message) {
  var wit = wit_bot.process(message.text, bot, message)

  wit.hears('saluti_iniziali', 0.53, function (bot, message, outcome) {
    bot.startConversation(message, function (_, convo) {
      convo.say('Hello!')
      convo.ask('How are you?', function (response, convo) {
        witbot.process(response.text)
          .hears('good', 0.5, function (outcome) {
            convo.say('I am so glad to hear it!')
            convo.next()
          })
          .hears('bad', 0.5, function (outcome) {
            convo.say('I\'m sorry, that is terrible')
            convo.next()
          })
          .otherwise(function (outcome) {
            convo.say('I\'m cofused')
            convo.repeat()
            convo.next()
          })
      })
    })
  })

  wit.otherwise(function (bot, message) {
    bot.reply(message, 'You are so intelligent, and I am so simple. I don\'t understnd')
  })
})

