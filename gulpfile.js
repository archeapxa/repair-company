const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const cleanCSS = require('gulp-clean-css');
const rename = require('gulp-rename');

gulp.task('hello', function(done) {
  console.log('Hello, world!');
  done();
});

// Static server
gulp.task('browser-sync', function() {
  browserSync.init({
      server: {
          baseDir: "./"
      }
  });
  gulp.watch("./*.html").on('change', browserSync.reload); // reload browser page on changes in html
});

// min.css
gulp.task('minify-css', () => {
  return gulp.src('css/*.css')  // source directory .css
    .pipe(cleanCSS({compatibility: 'ie8'})) // cleanCSS himself
    .pipe(rename('styles.min.css')) // renaming new file, so its do not overwrite original
    .pipe(gulp.dest('css')); // destination directory
});