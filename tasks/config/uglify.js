/**
 * Minify files with UglifyJS.
 *
 * ---------------------------------------------------------------
 *
 * Minifies client-side javascript `assets`.
 *
 * For usage docs see:
 * 		https://github.com/gruntjs/grunt-contrib-uglify
 *
 */
module.exports = function(grunt) {

	grunt.config.set('uglify', {
		dist: {
			src: [ 'assets/tmp/app.js' ],
			dest: '.tmp/public/js/app.min.js'
		}
	});

	grunt.loadNpmTasks('grunt-contrib-uglify');
};
