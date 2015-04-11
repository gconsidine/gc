module.exports = function (grunt) {

	grunt.config.set('cache-busting', {
    cssDev: {
      replace: ['views/layout.jade'],
      replacement: 'app.css',
      file: '.tmp/public/css/app.css',
      get_param: true
    },

    jsDev: {
      replace: ['views/layout.jade'],
      replacement: 'app.js',
      file: '.tmp/public/js/app.js',
      get_param: true
    },

    cssProd: {
      replace: ['views/layout.jade'],
      replacement: 'app.min.css',
      file: '.tmp/public/css/app.min.css',
      get_param: true
    },

    jsProd: {
      replace: ['views/layout.jade'],
      replacement: 'app.min.js',
      file: '.tmp/public/js/app.min.js',
      get_param: true
    }

	});

	grunt.loadNpmTasks('grunt-cache-busting');
};
