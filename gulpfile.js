var gulp         = require('gulp'),
    sass         = require('gulp-sass'),
    notify       = require('gulp-notify'),
    plumber      = require('gulp-plumber'),
    sourcemaps   = require('gulp-sourcemaps'),
    autoprefixer = require('gulp-autoprefixer'),

    onError = function (err) {
      notify({
        title: 'Gulp Task Error',
        message: 'Check the console.'
      }).write(err);

      console.log(err.toString());
       
      this.emit('end');
 };


  var css_path  = 'dist/css/',
      sass_path = 'scss/**/*.scss',
      bowerDir = './bower_components/';

// Sass task
gulp.task('sass', function() {
  gulp.src(sass_path)
    .pipe(plumber({ errorHandle: onError }))
    .pipe(sourcemaps.init())
    .pipe(sass({
      outputStyle: 'nested',
      includePaths: 'bower_components/bootstrap-sass/assets/stylesheets',
      precision: 10,
      errLogToConsole: true
    }))
    .on('error', onError)
    .pipe(sourcemaps.write('dist/css/maps'))
    .pipe(gulp.dest(css_path));
});


// Default task to be run with `gulp`
gulp.task('default', ['sass'], function() {
  gulp.watch(sass_path, ['sass']);
  gulp.watch('/*.html', ['browser-sync']);
});



