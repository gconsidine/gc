/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 *
 * For more information on bootstrapping your app, check out:
 * http://sailsjs.org/#/documentation/reference/sails.config/sails.config.bootstrap.html
 */

module.exports.bootstrap = function(cb) {

  // It's very important to trigger this callback method when you are finished
  // with the bootstrap!  (otherwise your server will never lift, since it's waiting on the bootstrap)
  
  var request = require('request');

  var twitterAuth = encodeURIComponent(sails.config.twitterKey) + 
                    ':' + encodeURIComponent(sails.config.twitterSecret);

  twitterAuth = 'Basic ' + new Buffer(twitterAuth).toString('base64');
  
  var options = {
    uri: 'https://api.twitter.com/oauth2/token',
    headers: {
      Authorization: twitterAuth,
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    },
    form: { grant_type: 'client_credentials'  }
  };

  request.post(options, twitterAuthSet);

  function twitterAuthSet (error, response, body) {
    if(error) {
      console.log('Twitter bearer token not set.'); 
      return cb();
    }

    var body = JSON.parse(body);

    sails.config.twitterBearer = body.access_token;
    cb();
  }
};
