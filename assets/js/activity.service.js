var ActivityService = function () {
  'use strict';

  var self = this || {};

  self.renderBlogPosts = function (id, response) {
    if(!response) {
      return self.renderEmpty(id);
    }
    
    var previewContent = response.data.description.match(/(<p>).{0,150}\s/g)[0],
        partial = require('../partials/blog.handlebars');

    previewContent = previewContent.substring(3, previewContent.length);

    document.getElementById(id).innerHTML = partial({
      link: response.data.link,
      title: response.data.title,
      date: new Date(response.data.pubDate).toLocaleDateString(),
      previewContent: previewContent
    });
  };

  /**
   * Only shows PushEvent commit activity for the time being.  Other events (like forks)
   * will need to be rendered seperately
   */
  self.renderGitHubActivity = function (id, response) {
    if(!response) {
      return self.renderEmpty(id);
    }

    var partial = require('../partials/github.handlebars'),
        commits = [];
    
    for(var i = 0; i < response.data.length; i++) {
      if(response.data[i].type !== 'PushEvent') {
        continue;
      }

      commits.push({
        name: response.data[i].repo.name,
        hash: response.data[i].payload.commits[0].sha,
        truncatedHash: response.data[i].payload.commits[0].sha.substring(0, 7),
        date: new Date(response.data[i].created_at).toLocaleDateString(),
        message: response.data[i].payload.commits[0].message
      });

      if(commits.length === 3) {
        break;
      }
    }

    document.getElementById(id).innerHTML = partial(commits);
  };

  self.renderTweets = function (id, response) {
    if(!response) {
      return self.renderEmpty(id);
    }

    var partial = require('../partials/tweet.handlebars'),
        tweets = [];

    for(var i = 0; i < response.data.length; i++) {
      tweets.push({
        idString: response.data[i].id_str,
        id: response.data[i].id,
        date: new Date(response.data[i].created_at).toLocaleDateString(),
        tweet: self.markupTweet(response.data[i].text)
      });
    }

    document.getElementById(id).innerHTML = partial(tweets);
  };

  self.markupTweet = function (tweet) {
    var userPattern = /(@)(\w|\d|_){1,15}/g,
        shortLinkPattern = /(http:\/\/t.co\/)[a-zA-Z0-9]{10}/g,
        hashTagPattern = /\s#[a-zA-Z]{1}([a-zA-Z0-9])+/g,
        i = 0;

    var users = tweet.match(userPattern),
        shortLinks = tweet.match(shortLinkPattern),
        hashTags = tweet.match(hashTagPattern);

    if(users) {
      for(i = 0; i < users.length; i++) {
        tweet = tweet.replace(
          users[i],
          '<a href="https://twitter.com/' + users[i].substring(1, users[i].length) + '"' +
          ' target="_blank">' +  users[i] + '</a>'
        );
      }
    }

    if(shortLinks) {
      for(i = 0; i < shortLinks.length; i++) {
        tweet = tweet.replace(
          shortLinks[i], 
          '<a href="' + shortLinks[i] + '" target="_blank">' + shortLinks[i] + '</a>'
        );
      }
    }

    if(hashTags) {
      for(i = 0; i < hashTags.length; i++) {
        tweet = tweet.replace(
          hashTags[i], 
          ' <a href="https://twitter.com/hashtag/"' + hashTags[i].substring(1, hashTags[i].length) +
          ' target="_blank">' + hashTags[i] + '</a>'
        );
      }
    }

    return tweet;
  };


  self.renderEmpty = function (id) {
    var partial = require('../partials/empty.handlebars');
    
    document.getElementById(id).innerHTML = partial();
  };
};

module.exports = new ActivityService();
