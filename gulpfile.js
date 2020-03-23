const {src, dest, watch} = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
// const cleanCSS = require('gulp-clean-css');
// const rename = require('gulp-rename');

// sass
function serveSass() {
  return src("./sass/**/*.sass", "./sass/**/*.scss")
      .pipe(sass())
      .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], {
        add: true,
        cascade: false,
        flexbox: true,
      }))
      .pipe(dest("./css"))
      .pipe(browserSync.stream());
}

// Static server
function bs() {
  serveSass();
  browserSync.init({
      server: {
          baseDir: "./"
      }
  });
  watch("./*.html").on('change', browserSync.reload); 
  watch("./sass/**/*.sass", serveSass); 
  watch("./sass/**/*.scss", serveSass); 
  watch("./js/*.js").on('change', browserSync.reload);
}


// // min.css
// gulp.task('minify-css', () => {
//   return src('css/*.css')  // source directory .css
//     .pipe(cleanCSS({compatibility: 'ie8'})) // cleanCSS himself
//     .pipe(rename('styles.min.css')) // renaming new file, so its do not overwrite original
//     .pipe(dest('css')); // destination directory
// });

exports.serve = bs;