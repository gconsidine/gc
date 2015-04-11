module.exports = function(grunt) {

	grunt.config.set('shell', {
    
    /*
     * Remove .tmp/ and all subfolders and files before building
     */
    clean: {
      command: 'rm -rf .tmp'
    },

    /*
     * Build out dependency structure for moving assets out of bower_components into
     * the project.  Create temp folder for generated files pre-concatenation.
     */
    buildStructure: {
      command: [
        'mkdir -p assets/js/dependencies',
        'mkdir -p assets/less/dependencies',
        'mkdir -p assets/tmp',
        'mkdir -p assets/fonts',
        'mkdir -p .tmp/public/js',
        'mkdir -p .tmp/public/css',
        'mkdir -p .tmp/public/fonts',
        'mkdir -p .tmp/public/files',
        'mkdir -p .tmp/public/images'
      ].join('&&')
    },

    /*
     * Copy dependencies from bower_components into dependencies folders.  Dependencies
     * folders are under .gitignore
     */
    copyDependencies: {
      command: [
        'cp bower_components/jquery/dist/jquery.js assets/js/dependencies',
        'cp bower_components/bootstrap/dist/js/bootstrap.js assets/js/dependencies',
        'cp -r bower_components/bootstrap/less/* assets/less/dependencies',
        'cp bower_components/bootstrap/fonts/* assets/fonts',
      ].join('&&')
    },

    /*
     * Copies files that sit at the public root (e.g. sitemap.xml, humans.txt, robots.txt)
     */
    copyBaseAssets: {
      command: [
        'cp assets/favicon.ico .tmp/public',
        'cp assets/robots.txt .tmp/public'
      ].join('&&')
    },

    /*
     * Copies permanent and generated asset files to public directory
     */
    copyDevAssets: {
      command: [
        'cp assets/tmp/app.css .tmp/public/css/',
        'cp assets/tmp/app.js .tmp/public/js/',
        'cp assets/images/* .tmp/public/images/',
        'cp assets/files/* .tmp/public/files/',
        'cp assets/fonts/* .tmp/public/fonts/'
      ].join('&&')
    },

    /*
     * Use browserify and browserify-shim to bundle CommonJS spec'd code into a bundle.  The 
     * bundle is placed in a tmp folder pre-concatenation with sails.io.js.
     */
    browserify: {
      command: [
        './node_modules/.bin/browserify',
        'assets/js/dependencies/jquery.js',
        'assets/js/dependencies/bootstrap.js',
        'assets/js/*.*.js',
        '-o assets/tmp/app-bundle.js'
      ].join(' ')    
    }

	});

	grunt.loadNpmTasks('grunt-shell');
};
