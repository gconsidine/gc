module.exports = function (grunt) {

	grunt.registerTask('buildDev', [
    'shell:clean',
    'shell:buildStructure',
		'shell:copyDependencies',
		'shell:copyBaseAssets',
		'shell:browserify',
    'less',
    'shell:copyDevAssets',
    'cache-busting:cssDev',
    'cache-busting:jsDev'
	]);

	grunt.registerTask('buildProd', [
    'shell:clean',
    'shell:buildStructure',
		'shell:copyDependencies',
		'shell:copyBaseAssets',
		'shell:browserify',
    'less',
    'shell:copyDevAssets',
    'cssmin',
    'uglify',
    'cache-busting:cssProd',
    'cache-busting:jsProd'
	]);
};
