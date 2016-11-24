import * as karma from 'karma';
import * as yargs from 'yargs';
import { getTestConfig } from './webpack.test.config';

let argv = yargs.argv;

export interface KarmaWithWebpackConfig extends karma.ConfigOptions {
  webpack: any;
  webpackMiddleware: any;
}

// ver https://github.com/AngularClass/angular2-webpack-starter/blob/master/config/spec-bundle.js
export function getKarmaConfig(config: karma.Config) {
  config.set(<KarmaWithWebpackConfig> {

    // base path that will be used to resolve all patterns (eg. files, exclude)
    // basePath: './',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
       'karma.entry.js'
    ],

    webpack: getTestConfig(argv.debug),
    webpackMiddleware: {
      noInfo: true, // Hide webpack output because its noisy.
      stats: { // Also prevent chunk and module display output, cleaner look. Only emit errors.
        assets: false,
        colors: true,
        version: false,
        hash: false,
        timings: false,
        chunks: false,
        chunkModules: false
      }
    },

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'karma.entry.js': ['webpack', 'sourcemap']
    },

    remapIstanbulReporter: {
      reports: {
        cobertura: './.coverage/coverage.xml',
        html: '.coverage',
        lcovonly: './.coverage/coverage.lcov',
        text: null
      }
    },


    // list of files to exclude
    exclude: [
    ],




    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['mocha', 'kjhtml', 'karma-remap-istanbul'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['PhantomJS'], // , 'Chrome', 'Firefox'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  });
}
