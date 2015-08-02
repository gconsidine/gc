(function () {
  'use strict';  

  document.addEventListener('DOMContentLoaded', documentReady);  

  function documentReady () {
    var $, jQuery, logo, home, utility;

    logo = require('./canvas.logo');
    home = require('./home.controller');

    if(/animations/g.test(document.URL)) {
      var paths = document.URL.split('/');
      return routeAnimation(paths[paths.length - 1], logo);
    }

    $ = jQuery = require('./dependencies/jquery');
    require('./dependencies/bootstrap');
    require('./dependencies/sails.io');

    utility = require('./app.utility');

    home.init($, logo, utility);
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
