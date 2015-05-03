/**
 * Run predefined tasks whenever watched file patterns are added, changed or deleted.
 *
 * ---------------------------------------------------------------
 *
 * Watch for changes on
 * - files in the `assets` folder
 * - the `tasks/pipeline.js` file
 * and re-run the appropriate tasks.
 *
 * For usage docs see:
 * 		https://github.com/gruntjs/grunt-contrib-watch
 *
 */
module.exports = function(grunt) {

	grunt.config.set('watch', {
		assets: {
			files: ['assets/**/*'],
			tasks: [
        'shell:browserify',
        'less',
        'shell:copyBaseAssets',
        'shell:copyDevAssets',
        'jshint', 
        'csslint'
      ]
		}
	});

	grunt.loadNpmTasks('grunt-contrib-watch');
};
