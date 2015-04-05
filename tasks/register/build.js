module.exports = function (grunt) {
	grunt.registerTask('build', [
    'shell',
		'compileAssets',
		'linkAssetsBuild',
		'clean:build',
		'copy:build'
	]);
};
