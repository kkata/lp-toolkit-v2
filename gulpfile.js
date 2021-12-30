const gulp = require('gulp')
const pug = require('gulp-pug')
const sass = require('gulp-sass')(require('sass'))
const postcss = require('gulp-postcss')
const cachebuster = require('postcss-cachebuster')
const cssnano = require('cssnano')
const autoprefixer = require('autoprefixer')
const plumber = require('gulp-plumber')
const notify = require('gulp-notify')
const browserSync = require('browser-sync')
const path = require('path')
const fs = require('fs')
const del = require('del')
const webpackStream = require('webpack-stream')
const webpack = require('webpack')
const webpackConfig = require('./webpack.config')
const imagemin = require('gulp-imagemin')
const imageminMozjpeg = require('imagemin-mozjpeg')
const imageminPngquant = require('imagemin-pngquant')
const replace = require('gulp-replace')
const convertEncoding = require('gulp-convert-encoding')
const gzip = require('gulp-gzip')
// const critical = require('critical').generate

// 開発用ソース
const src = {
  root: 'src/',
  html: 'src/html/**/*.pug',
  htmlDir: 'src/html/',
  css: 'src/css/**/*.scss',
  js: 'src/js/**/*.js',
  img: 'src/img/**/*',
  ssi: 'src/ssi/**/*',
}

// 開発サーバ用ディレクトリ
const public = {
  root: 'public/',
  path: '',
  cssDir: 'public/css/',
  jsDir: 'public/js/',
  imgDir: 'public/img/',
  ssiDir: 'public/',
  html: 'public/**/*.html',
  css: 'public/css/**/*.css',
  js: 'public/js/**/*.js',
  img: 'public/img/**/*.*',
}

// 納品用ディレクトリ
const release = {
  root: 'release/',
  html: 'release/**/*.html',
  cssDir: 'release/css/',
  jsDir: 'release/js/',
  imgDir: 'release/img/',
}

// html
function html() {
  return gulp
    .src([src.html, '!src/html/_partial/*.pug'])
    .pipe(
      plumber({ errorHandler: notify.onError('Error: <%= error.message %>') }),
    )
    .pipe(
      pug({
        // pretty: true,
        basedir: src.htmlDir,
      }),
    )
    .pipe(gulp.dest(public.root))
}

// html release
function htmlRelease() {
  return gulp
    .src([public.html, '!' + public.root + 'index.html'])
    .pipe(gulp.dest(release.root))
}

// css
function css() {
  return gulp
    .src(src.css, {
      sourcemaps: true,
    })
    .pipe(plumber({ errorHandler: notify.onError('<%= error.message %>') }))
    .pipe(sass({}))
    .pipe(
      postcss([
        autoprefixer({
          cascade: false,
        }),
        cachebuster({
          imagesPath: '/' + src.root,
        }),
        cssnano(),
      ]),
    )
    .pipe(
      gulp.dest(public.cssDir, {
        sourcemaps: '.',
      }),
    )
    .pipe(browserSync.stream())
}

// css release
function cssRelease() {
  return gulp.src(public.css).pipe(gulp.dest(release.cssDir))
}

// js
function js() {
  return webpackStream(webpackConfig, webpack).pipe(gulp.dest(public.jsDir))
}
//js release
function jsRelease() {
  return gulp.src(public.js).pipe(gulp.dest(release.jsDir))
}

// img
function img() {
  return gulp
    .src(src.img)
    .pipe(
      plumber({
        errorHandler(err) {
          console.log(err.messageFormatted)
          this.emit('end')
        },
      }),
    )
    .pipe(
      imagemin([
        imageminMozjpeg({
          quality: 70,
        }),
        imageminPngquant({
          quality: [0.65, 0.8],
        }),
        imagemin.svgo({
          plugins: [
            // viewBox属性を削除する（widthとheight属性がある場合）。
            // 表示が崩れる原因になるので削除しない。
            { removeViewBox: false },
            // <metadata>を削除する。
            // 追加したmetadataを削除する必要はない。
            { removeMetadata: false },
            // SVGの仕様に含まれていないタグや属性、id属性やvertion属性を削除する。
            // 追加した要素を削除する必要はない。
            { removeUnknownsAndDefaults: false },
            // コードが短くなる場合だけ<path>に変換する。
            // アニメーションが動作しない可能性があるので変換しない。
            { convertShapeToPath: false },
            // 重複や不要な`<g>`タグを削除する。
            // アニメーションが動作しない可能性があるので変換しない。
            { collapseGroups: false },
            // SVG内に<style>や<script>がなければidを削除する。
            // idにアンカーが貼られていたら削除せずにid名を縮小する。
            // id属性は動作の起点となることがあるため削除しない。
            { cleanupIDs: false },
          ],
        }),
        imagemin.optipng(),
        imagemin.gifsicle(),
      ]),
    )
    .pipe(gulp.dest(public.imgDir))
}

// img release
function imgRelease() {
  return gulp.src(public.img).pipe(gulp.dest(release.imgDir))
}

// SSI
function ssi() {
  return gulp.src(src.ssi).pipe(gulp.dest(public.ssiDir))
}

// del
function clean() {
  return del([public.root + '**/*', '!' + public.root + '.gitignore'])
}

// browser sync
function serve() {
  return browserSync.init({
    port: 3000,
    server: {
      baseDir: public.root,
    },
    startPath: public.path,
    open: false,
    rewriteRules: [
      {
        match: /<!--#include virtual="(.+?)" -->/g,
        fn: function (req, res, match, filename) {
          const filePath = path.join(public.ssiDir, filename)
          if (!fs.existsSync(filePath)) {
            return `<span style="color: red">${filePath} could not be found</span>`
          }
          return fs.readFileSync(filePath)
        },
      },
    ],
  })
}

// reload
function reload(done) {
  browserSync.reload()
  done()
}

// watch
function watch(done) {
  gulp.watch(src.html).on('change', gulp.series(html, reload))
  gulp.watch(src.css).on('change', gulp.series(css, reload))
  gulp.watch(src.js).on('change', gulp.series(js, reload))
  gulp.watch(src.img).on('change', gulp.series(img, reload))
  gulp.watch(src.img).on('add', gulp.series(img, reload))
  gulp.watch(src.ssi).on('change', gulp.series(ssi, reload))
  done()
}

// html release convert encoding
function htmlsjisConvert() {
  return gulp
    .src([public.html, '!' + public.root + 'index.html'])
    .pipe(replace('<meta charset="UTF-8">', '<meta charset="Shift_JIS">'))
    .pipe(convertEncoding({ to: 'Shift_JIS' }))
    .pipe(gulp.dest(release.root))
}

// gzip
function createGzip() {
  return gulp
    .src([
      release.root + '**/*.*',
      '!' + release.root + '**/*.gz',
      '!' + release.imgDir + '**/*.*',
    ])
    .pipe(gzip())
    .pipe(gulp.dest(release.root))
}

// critical
function useCritical() {
  return critical({
    inline: true,
    base: './',
    css: '.css',
    minify: true,
    width: 320,
    height: 480,
    src: '.html',
    dest: '.html',
  })
}

// define tasks
exports.release = gulp.series(
  clean,
  html,
  htmlRelease,
  css,
  cssRelease,
  js,
  jsRelease,
  img,
  imgRelease,
  // useCritical,
  // htmlsjisConvert,
  createGzip,
)
exports.default = gulp.series(
  clean,
  html,
  css,
  js,
  img,
  ssi,
  gulp.parallel(serve, watch),
)
