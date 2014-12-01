module.exports = function(config) {
    config.set({
        // base path, that will be used to resolve files and exclude
        basePath: './',

        // testing framework to use (jasmine/mocha/qunit/...)
        frameworks: ['jasmine'],

        // list of files / patterns to load in the browser
        files: [
            'app/bower_components/angular/angular.js',
            'app/bower_components/CryptoJS/build/rollups/sha1.js',
            'app/bower_components/angular-mocks/angular-mocks.js',
            'app/bower_components/angular-route/angular-route.js',
            'app/bower_components/angular-resource/angular-resource.js',
            'app/js/app.js',
            'app/js/app.constant.js',
            'app/js/error/errorInterceptor.js',
            'app/js/service/*.js',
            'app/js/controller/*.js',
            'test/controller/*.js'
        ],


        reporters: ['progress', 'coverage'],


        preprocessors: {
            // source files, that you wanna generate coverage for
            // do not include tests or libraries
            // (these files will be instrumented by Istanbul)
            'app/js/controller/*.js': ['coverage']
        },


        // optionally, configure the reporter
        coverageReporter: {
            type : 'html',
            dir : 'test/coverage/',
            file : 'coverage.html'
        },


        // list of files / patterns to exclude
        exclude: [],

        // web server port
        port: 7779,

        // level of logging
        // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
        logLevel: config.LOG_INFO,


        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: false,


        // Start these browsers, currently available:
        // - Chrome
        // - ChromeCanary
        // - Firefox
        // - Opera
        // - Safari (only Mac)
        // - PhantomJS
        // - IE (only Windows)
        browsers: ['Firefox'],

        // Continuous Integration mode
        // if true, it capture browsers, run tests and exit
        singleRun: false
    });
};