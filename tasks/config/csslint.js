module.exports = function (grunt) {

	grunt.config.set('csslint', {
    options: {
      csslintrc: '.csslintrc'
    },
    strict: {
      src: ['assets/tmp/app.css']
    }  
	});

	grunt.loadNpmTasks('grunt-contrib-csslint');

};
