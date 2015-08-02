var HomeController = function () {
  'use strict';
  
  var self = this || {};

  self.init = function ($, logo, utility) {
    self.utility = utility;
    self.logo = logo;
    self.$ = $;

    self.logo.init('logoHeader');
    self.logo.init('logoContent');

    self.setSmoothScroll();
    self.setContactFormEvent();

    self.getBlogActivity();
    self.getGitHubActivity();
    self.getTwitterActivity();
  };

  self.updateContactStatus = function (message) {
    var contactButton = document.getElementById('contactButton'),
        contactStatus = document.getElementById('contactStatus'),
        contactSending = document.getElementById('contactSending'),
        contactSuccess = document.getElementById('contactSuccess'),
        userMessage = document.getElementById('userMessage'),
        userEmail = document.getElementById('userEmail');

    switch(message) {
      case 'pending':
        contactButton.style.display = 'none';
        contactSending.style.display = 'block';
        contactButton.style.display = 'none';
        break;
      case 'success':
        contactStatus.style.display = 'none';
        contactButton.style.display = 'none';
        contactSending.style.display = 'none';
        contactSuccess.style.display = 'block';
        userMessage.readOnly = 'readonly';
        userEmail.readOnly = 'readonly';
        break;
      default:
        contactSending.style.display = 'none';
        contactStatus.innerHTML = 'Invalid submission';
        contactStatus.style.display = 'block';
        contactButton.innerHTML = 'Try Again';
        contactButton.style.display = 'block';
        break;
    }
  };

  self.getBlogActivity = function () {
    self.utility.getRequest({
      url: '/activity/blog',  
      callback: self.updateBlogActivity
    });
  };

  self.getGitHubActivity = function () {
    self.utility.getRequest({
      url: '/activity/github',  
      callback: self.updateGitHubActivity
    });
  };

  self.getTwitterActivity = function () {
    self.utility.getRequest({
      url: '/activity/Twitter',  
      callback: self.updateTwitterActivity
    });
  };

  self.updateBlogActivity = function (error, response) {
    response = JSON.parse(response);

    var blog = document.getElementById('blogContent');

    var preview = response.data.description.match(/(<p>).{0,150}\s/g)[0];
    preview = preview.substring(3, preview.length);

    var html = [
      '<p>',
      '  <a href="' + response.data.link + '" target="_blank">' + response.data.title + '</a> | ',
      '  <em>' + new Date(response.data.pubDate).toLocaleString() + '</em>',
      '</p>',
      '<p>', 
      preview + '<a href="' + response.data.link + '" target="_blank"> ...continue reading</a>',
      '</p>'
    ].join('');

    blog.innerHTML = html;
  };

  self.updateGitHubActivity = function (error, response) {
    response = JSON.parse(response);

    var gitHub = document.getElementById('gitHubContent');
    var html = '';
    var c;
    
    for(var i = 0; i < 3; i++) {
      c = response.data[i].payload.commits[0];

      html += [
        '<p>',
        '  <a href="' + c.url + '" target="_blank">' + c.sha.substring(0, 7) + '</a> | ',
        '  <em>' + new Date(response.data[i].created_at).toLocaleString() + '</em>',
        '</p>',
        '<p>' + c.message + '</p>'
      ].join('');
    }

    gitHub.innerHTML = html;
  };

  self.updateTwitterActivity = function (error, response) {
    response = JSON.parse(response);

    var twitter = document.getElementById('twitterContent');
    var html = '';
    
    for(var i = 0; i < response.data.length; i++) {
      html += [
        '<p>',
        '  <a href="https://twitter.com/greg_considine/status/' + response.data[i].id,
        '     target="_blank">' + response.data[i].id + '</a> | ',
        '  <em>' + new Date(response.data[i].created_at).toLocaleString() + '</em>',
        '</p>',
        '<p>' + response.data[i].text + '</p>'
      ].join('');
    }

    twitter.innerHTML = html;
  };

  self.setSmoothScroll = function () {
    self.$('.gc-scroll').click( function (event) {		
      event.preventDefault();
      self.$('html, body').animate({ scrollTop: self.$(this.hash).offset().top }, 500);
    });
  };

  self.validateContactForm = function (params) {
    if(params.text !== '' && params.email !== '') {
      if(params.email.indexOf('@') !== -1 && params.email.indexOf('.') !== -1) {
        return true;
      }
    }

    return false;  
  };

  self.setContactFormEvent = function () {
    var contactButton = document.getElementById('contactButton');

    if(contactButton) {
      contactButton.onclick = function () { 
        var params = {
          text: document.getElementById('userMessage').value,
          email: document.getElementById('userEmail').value,
          _csrf: document.getElementById('_csrf').value
        };

        if(!self.validateContactForm(params)) {
          self.updateContactStatus('fail');  
        }

        self.utility.postRequest({
          url: '/contact',
          params: params,
          callback: self.updateContactStatus
        });
      };
    }
  };
};

module.exports = new HomeController();

