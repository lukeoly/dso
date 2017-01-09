var gulp         = require('gulp'),
    sass         = require('gulp-sass'),
    notify       = require('gulp-notify'),
    plumber      = require('gulp-plumber'),
    sourcemaps   = require('gulp-sourcemaps'),
    autoprefixer = require('gulp-autoprefixer'),
    browserSync  = require('browser-sync'),

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

// BrowserSync task
gulp.task('serve', ['sass'], function() {
  browserSync.init({
    server: {
      baseDir: "./"
    }
  });

  gulp.watch('./scss/**/*.scss', ['sass']);
  gulp.watch('./*.html').on('change', browserSync.reload);
});

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


// JS
gulp.task('js', function() {
  return gulp.src([
    'bower_components/jquery/dist/jquery.min.js',
    'bower_components/bootstrap-sass/assets/javascripts/bootstrap.min.js',
    'js/conditionize.jquery.js',
    'js/form.js',
  ])
  .pipe(gulp.dest('dist/js/'));
});

// Fonts
gulp.task('fonts', function() {
  return gulp.src([
    'bower_components/font-awesome/fonts/fontawesome-webfont.*'])
  .pipe(gulp.dest('dist/fonts/font-awesome/'));
});

// Default task to be run with `gulp`
gulp.task('default', ['serve', 'js', 'fonts'], function() {
  gulp.watch(sass_path, ['sass', 'fonts']);
});



