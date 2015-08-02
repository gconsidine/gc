var Rss = function (xml2js, https) {
  'use strict';

  var POST_LIMIT = 2;

  var request = require('request'),
      xml2js = require('xml2js');
  
  this.read = function (uri, callback) {
    var parser = new xml2js.Parser({explicitArray: false});

    request(uri, function (error, response, body) {
      parser.parseString(body, function (error, result) {
        if(error) {
          return callback(true, result);
        }
        
        if(result.rss.channel.item instanceof Array) {
          result.rss.channel.item.splice(POST_LIMIT);
        }

        callback(false, result.rss.channel.item);
      });
    });
  };
};

module.exports = new Rss();
