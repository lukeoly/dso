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
      font_path = 'dist/fonts/'

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


// Fonts
gulp.task('fonts', function() {
  return gulp.src([
    'bower_components/font-awesome/fonts/fontawesome-webfont.*'])
  .pipe(gulp.dest('dist/fonts/font-awesome/'));
});

// Default task to be run with `gulp`
gulp.task('default', ['sass', 'fonts'], function() {
  gulp.watch(sass_path, ['sass', 'fonts']);
  gulp.watch('/*.html', ['browser-sync']);
});



