(function () {
  'use strict';  

  document.addEventListener('DOMContentLoaded', documentReady);  

  function documentReady () {
    var $, jQuery, logo, utility;

    logo = require('./canvas.logo');

    if(/animations/g.test(document.URL)) {
      var paths = document.URL.split('/');
      return routeAnimation(paths[paths.length - 1], logo);
    }

    $ = jQuery = require('./dependencies/jquery');
    require('./dependencies/bootstrap');
    require('./dependencies/sails.io');

    logo.init('logoHeader');
    logo.init('logoContent');

    utility = require('./app.utility');

    setSmoothScroll($);
    setContactFormEvent(utility);
  }

  function setSmoothScroll($) {
    $('.gc-scroll').click( function (event) {		
      event.preventDefault();
      $('html, body').animate({ scrollTop: $(this.hash).offset().top }, 500);
    });
  }

  function setContactFormEvent(utility) {
    var contactButton = document.getElementById('contactButton');

    if(contactButton) {
      contactButton.onclick = function () { 
        utility.request({
          text: document.getElementById('userMessage').value,
          email: document.getElementById('userEmail').value,
          _csrf: document.getElementById('_csrf').value
        });
      };
    }
  }

  function routeAnimation(animation, logo) {
    clearView();
    setReturnIcon(logo);

    var view;

    switch(animation) {
      case 'everywhere-usa':
        view = require('./canvas.everywhere-usa');
        break;
      case 'forest-moon':
        view = require('./canvas.forest-moon')();
        break;
      case 'squares-and-triangles':
        view = require('./canvas.squares-and-triangles')();
        break;
    }

    view.init();
  }

  function setReturnIcon(logo) {
    logo.init('canvasReturn');

    document.getElementById('canvasReturn').onclick = function () {
      window.location.href = '/';
    };
  }

  function clearView() {
    document.getElementsByTagName('nav')[0].innerHTML = '';
    document.getElementsByClassName('gc-footer')[0].innerHTML = '';
  }

}());
