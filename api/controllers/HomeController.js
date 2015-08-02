var HomeController = function () {
  'use strict';

  var request = require('request');

  var self = this || {};
  
  self.getBlogActivity = function (req, res) {
    Rss.read('https://blog.greg-considine.com/rss', function (error, data) {
      if(error) {
        return res.serverError();
      }

      return res.send({ error: false, data: data });
    });
  };

  self.getGitHubActivity = function (req, res) {
    var options = {
      uri: 'https://api.github.com/users/gconsidine/events',
      headers: {
        'User-Agent': 'gconsidine'
      }
    }

    request.get(options, function (error, response, body) {
       if(error) {
         return res.serverError();
       }

       return res.send({error: false, data: JSON.parse(body)});
    });
  };

  self.getTwitterActivity = function (req, res) {
    var url = [
      'https://api.twitter.com/1.1/statuses/user_timeline.json?',
      'count=3&user_id=2912956878&screen_name=greg_considine'
    ].join('');

    var options = {
      uri: url,
      headers: {
        'UserAgent': 'greg-considine.com v0.0.2',
        Authorization: 'Bearer ' + sails.config.twitterBearer
      }
    };

    request.get(options, function (error, response, body) {
       if(error) {
         return res.serverError();
       }

       return res.send({error: false, data: JSON.parse(body)});
    });
  };

};

module.exports = new HomeController();
