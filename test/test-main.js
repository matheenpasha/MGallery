var tests = [];
for (var file in window.__karma__.files) {
  if (/Spec\.js$/.test(file)) {
    tests.push(file.replace(/^\/base\//, 'http://localhost:9876/base/'))
  }
}

requirejs.config({
  // Karma serves files from '/base'
  baseUrl: '/base/build',

  //shim
  paths: {
    'MGallery': 'js/mgallery-min'
  },

  shim: {

  },

  // ask Require.js to load these files (all our tests)
  deps: tests,

  // start test run, once Require.js is done
  callback: window.__karma__.start
});

