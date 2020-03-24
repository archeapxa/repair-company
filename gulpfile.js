const {src, dest, watch, series} = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const minify = require('gulp-minify');
const htmlmin = require('gulp-htmlmin');
const tinypng = require('gulp-tinypng-compress');
// const rename = require('gulp-rename');
const ftp = require('vinyl-ftp');

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

function buildCSS(done) {
  src('css/**/**.css')
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(dest('dist/css/'));
  done();
}

function buildJS(done) {
  src(['js/**.js', '!js/**.min.js'])
    .pipe(minify({
      ext:{
        min:'.js'
      },
      noSource: true,

    }))
    .pipe(dest('dist/js'));
    src('js/**.min.js')
    .pipe(dest('dist/js'));
  done();
}

function html(done) {
  src('**.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(dest('dist/'));
  done();
}

function php(done) {
  src('**.php')
    .pipe(dest('dist/'));
  src('phpmailer/**/**')
    .pipe(dest('dist/phpmailer/'));
  done();
}

function fonts(done) {
  src('fonts/**/**')
    .pipe(dest('dist/fonts/'));
  done();
}

function imagemin(done) {
  src('img/**/*.{png,jpg,jpeg}')
    .pipe(tinypng({
      key: 'QThwWb4y5m8SCkN037L9dsWYPt4J4xcp',
      }))
    .pipe(dest('dist/img/'));
  src('img/**/**.{svg,ico}')
    .pipe(dest('dist/img/'));
  done();
}


function deploy(done) {
  var conn = ftp.create({
    host:      '136.243.147.150',
    user:      'arche154_gulp',
    password:  'gulp12345',
    parallel:  10,
  });
  var globs = [
    'dist/**',
    ];
  return src(globs, {buffer: false})
    .pipe(conn.dest('/www/webstanislav.ru/repair-company/'));
}


exports.serve = bs;
exports.build = series(buildCSS, buildJS, html, php, fonts, imagemin);
exports.html = html;
exports.deploy = deploy;