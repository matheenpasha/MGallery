module.exports = function (config) {
  'use strict';
  config.set({

    basePath: '',

    frameworks: ['requirejs', 'mocha', 'sinon-chai'],

    files: [
      {pattern: 'src/js/**/*.js', included: false},
      {pattern: 'test/unit/**/*.js', included: false},
      'test/test-main.js'
    ],

    exclude: [],

    reporters: ['progress'],

    port: 9876,
    colors: true,
    autoWatch: false,
    singleRun: true,


    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    browsers: ['PhantomJS']

  });
};
