module.exports = function (grunt) {

	grunt.config.set('jshint', {
    options: {
      jshintrc: true
    },
    all: ['assets/js/*.js']
	});

	grunt.loadNpmTasks('grunt-contrib-jshint');

};
