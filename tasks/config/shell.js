module.exports = function(grunt) {

	grunt.config.set('shell', {

    buildStructure: {
      command: [
        'mkdir -p assets/js/dependencies',
        'mkdir -p assets/less/dependencies',
        'mkdir -p assets/fonts',
      ].join('&&')
    },

    copyDependencies: {
      command: [
        'cp bower_components/jquery/dist/jquery.js assets/js/dependencies',
        'cp bower_components/bootstrap/dist/js/bootstrap.js assets/js/dependencies',
        'cp -r bower_components/bootstrap/less/* assets/less/dependencies',
        'cp bower_components/bootstrap/fonts/* assets/fonts'
      ].join('&&')
    },

    cleanUp: {
      command: [
        'rm -rf assets/styles',
        'rm -rf assets/importer.less',
        'rm -rf assets/templates'
      ].join('&&')
    }

	});

	grunt.loadNpmTasks('grunt-shell');
};
