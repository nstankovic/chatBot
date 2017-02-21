var restify = require('restify');
var builder = require('botbuilder');
var request = require('request');
var querystring = require('querystring');
var http = require('http');
var async = require('async');
var faqService = require('./FAQService.js');

var server = restify.createServer();
server.listen(process.env.PORT, function () {
   console.log('%s listening to %s', server.name, server.url); 
});
  
var connector = new builder.ChatConnector({
    appId: "f46a9f9e-76b8-4716-a292-e9330ce33324",
    appPassword: "s2iQ4cBXgL5V1aNh9SBvRC2"
});
var bot = new builder.UniversalBot(connector);
server.post('/api/messages', connector.listen());

 bot.dialog('/',[
        (session) => {
            faqService.faqGet(session.message.text)
                    .then((res)=>{
                        session.send(res.answer);
                    }, (err) => {
						console.log("error");
                 });
    } , (session,result) => {

    } , (session) => {
        session.send('See you later');
}]);
