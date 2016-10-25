var gulp         = require("gulp"),
    sass         = require("gulp-sass"),
    sourcemaps   = require('gulp-sourcemaps'),
    autoprefixer = require('gulp-autoprefixer'),

    onError = function (err) {  
  console.log(err);
 };


 var css_path  = 'dist/css/',
     sass_path = 'scss/**/*.scss';


// Sass task
gulp.task('sass', function() {
  gulp.src(sass_path)
    .pipe(sourcemaps.init())
    .pipe(sass({
      outputStyle: 'nested',
      precision: 10,
      errLogToConsole: true
    }))
    .pipe(sourcemaps.write('dist/css/maps'))
    .pipe(gulp.dest(css_path));
});


// Default task to be run with `gulp`
gulp.task('default', ['sass'], function() {
  gulp.watch(sass_path, ['sass']);
  gulp.watch("/*.html", ['browser-sync']);
});



