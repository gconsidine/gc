var HomeController = function () {
  'use strict';
  
  var self = this || {};

  self.init = function ($, logo, utility, activity) {
    self.utility = utility;
    self.logo = logo;
    self.$ = $;

    self.activity = activity || require('./activity.service');

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
    try {
      response = JSON.parse(response);
    } catch(error) {
      response = null;  
    }
      
    self.activity.renderBlogPosts('blogContent', response);
  };

  self.updateGitHubActivity = function (error, response) {
    try {
      response = JSON.parse(response);
    } catch(error) {
      response = null;  
    }
      
    self.activity.renderGitHubActivity('gitHubContent', response);
  };

  self.updateTwitterActivity = function (error, response) {
    try {
      response = JSON.parse(response);
    } catch(error) {
      response = null;  
    }
      
    self.activity.renderTweets('twitterContent', response);
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

