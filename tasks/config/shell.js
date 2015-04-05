module.exports = function(grunt) {

	grunt.config.set('shell', {

    buildStructure: {
      command: [
        'mkdir -p assets/js/dependencies',
        'mkdir -p assets/js/dist',
        'mkdir -p assets/less/dependencies',
        'mkdir -p assets/fonts',
      ].join('&&')
    },

    copyDependencies: {
      command: [
        'cp bower_components/jquery/dist/jquery.js assets/js/dependencies',
        'cp bower_components/bootstrap/dist/js/bootstrap.js assets/js/dependencies',
        'cp -r bower_components/bootstrap/less/* assets/less/dependencies',
        'cp bower_components/bootstrap/fonts/* assets/fonts',
      ].join('&&')
    },

    browserify: {
      command: [
        './node_modules/.bin/browserify',
        'assets/js/dependencies/jquery.js',
        'assets/js/dependencies/bootstrap.js',
        'assets/js/*.*.js',
        '-o assets/js/dist/app-bundle.js'
      ].join(' ')    
    },

    cleanUp: {
      command: [
        'rm -rf assets/styles',
        'rm -rf assets/importer.less'
      ].join('&&')
    }

	});

	grunt.loadNpmTasks('grunt-shell');
};
