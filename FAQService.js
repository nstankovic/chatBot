module.exports = (function(){
    'use strict';

    var config = require('./config.js');
    var request = require('superagent');

    function faqGet(message){
        if(message == '') return Promise.reject('You didn\'t provide any message.');
		
		return new Promise((resolve,reject)=>{
            request
			   .post(config.faqURL)
			   .send({ 'question': message })
			   .set('Ocp-Apim-Subscription-Key', config.faqSubKey)
			   .set('Content-Type', 'application/json')
			   .end(function(err, res){
				 if (err || !res.ok) {
					 reject(err);
				 } else {
					 console.log(res.body);
					 resolve(res.body);
				 }
			   });
        });
    }

    return {
        faqGet: faqGet
    }
}());

