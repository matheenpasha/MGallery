/**
 * Project gulp file
 * for all the UI task automation
 */

// include gulp and all the plug-ins
var gulp = require('gulp');

// server for the to serve the assets and having liverload
var server = require('gulp-server-livereload');


var del = require('del');
var jshint = require('gulp-jshint');
var changed = require('gulp-changed');
var imagemin = require('gulp-imagemin');
var concat = require('gulp-concat');
var stripDebug = require('gulp-strip-debug');
var uglify = require('gulp-uglify');
var less = require('gulp-less');
var path = require('path');
var autoprefix = require('gulp-autoprefixer');
var minifyCSS = require('gulp-minify-css');


// register all the tasks


// CSS concat, auto-prefix and minify
gulp.task('less', ['clean'], function (){
  return gulp.src('./src/less/*.less')
    .pipe(less())
    .pipe(gulp.dest('./src/css'))
    .pipe(concat('mgallery.css'))
    .pipe(autoprefix('last 2 versions'))
    .pipe(minifyCSS())
    .pipe(gulp.dest('./build/css/'));
});

// minify new images
gulp.task('compressImages', ['clean'], function (){
  var imgSrc = './src/images/**/*',
    imgDst = './build/images';

  return gulp.src(imgSrc)
    .pipe(changed(imgDst))
    .pipe(imagemin())
    .pipe(gulp.dest(imgDst));
});

//concat and minify js
gulp.task('build-scripts', ['clean'], function (){
  return gulp.src(['./src/js/iscroll.js', './src/js/MGallery.js'])
    .pipe(concat('mgallery-min.js'))
    .pipe(stripDebug())
    .pipe(uglify())
    .pipe(gulp.dest('./build/js/'));
});


// jslint task to checck the JS
gulp.task('jshint', function (){
  return gulp.src('./src/js/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});


//actual server for the code
gulp.task('serve', ['build'], function (){
  gulp.src('./')
    .pipe(server({
      port: 5001,
      directoryListing: false,
      open: true,
      log: 'debug',
      defaultFile: './index.html'
    }));
});

gulp.task('clean', function (cb){
  del([
    'build/*/**'
  ], cb);
});

gulp.task('build', ['jshint', 'build-scripts', 'compressImages', 'less']);


gulp.task('watch', function (){
  gulp.watch('./src/js/*.js', ['jshint', 'build-scripts']);
  gulp.watch('./src/images/**/*', ['compressImages']);
  gulp.watch('./src/less/*.less', ['less']);
});


//make all task default
gulp.task('default', ['watch']);
