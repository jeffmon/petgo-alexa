'use strict';
var Alexa = require('alexa-sdk');
const rp = require("request-promise");
const arduinoEndpoint = "http://bcda0588.ngrok.io/treat";

//=========================================================================================================================================
//TODO: The items below this comment need your attention.
//=========================================================================================================================================

//Replace with your app ID (OPTIONAL).  You can find this value at the top of your skill's page on http://developer.amazon.com.
//Make sure to enclose your value in quotes, like this: var APP_ID = "amzn1.ask.skill.bb4045e6-b3e8-4133-b650-72923c5980f1";
var APP_ID = undefined;

var SKILL_NAME = "drop treat";
var GET_FACT_MESSAGE = "Good Boy: ";
var HELP_MESSAGE = "You can say tell me a space fact, or, you can say exit... What can I help you with?";
var HELP_REPROMPT = "What can I help you with?";
var STOP_MESSAGE = "Goodbye!";

//=========================================================================================================================================
//TODO: Replace this data with your own.  You can find translations of this data at http://github.com/alexa/skill-sample-node-js-fact/data
//=========================================================================================================================================
var data = [
    "spot."

];

//=========================================================================================================================================
//Editing anything below this line might break your skill.
//=========================================================================================================================================
exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};

var handlers = {
    'LaunchRequest': function () {
        this.emit('givemetreat');
    },
    'givemetreat': function () {
        // var factArr = data;
        // var factIndex = Math.floor(Math.random() * factArr.length);
        // var randomFact = factArr[factIndex];
        // var speechOutput = GET_FACT_MESSAGE + randomFact;
        // this.emit(':tellWithCard', speechOutput, SKILL_NAME, randomFact)
        rp(arduinoEndpoint)
          .then(htmlString => {
            console.log("hit the endpoint at", arduinoEndpoint);
            this.emit(':tellWithCard', 'Giving treat', SKILL_NAME, 'Giving treat')
          })
          .catch(err => {
            console.log("problem occured", err);
          });
    },
    'AMAZON.HelpIntent': function () {
        var speechOutput = HELP_MESSAGE;
        var reprompt = HELP_REPROMPT;
        this.emit(':ask', speechOutput, reprompt);
    },
    'AMAZON.CancelIntent': function () {
        this.emit(':tell', STOP_MESSAGE);
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', STOP_MESSAGE);
    }
};
