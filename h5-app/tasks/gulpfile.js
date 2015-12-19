'use strict';

var gulp = require('gulp'),
  del = require('del'),
  gulpSequence = require('gulp-sequence'),
  jshint = require('gulp-jshint'),
  concat = require('gulp-concat'),
  sass = require('gulp-sass'),
  assetsVersionReplace = require("gulp-assets-version-replace");

var staticPath = '../static/';
var globs = {
  scss: staticPath + 'scss/',
  scss_all: staticPath + 'scss/*.scss',
  css_build: staticPath + 'css_build/',
  js_build: staticPath + 'js_build/',
  css_build_all: staticPath + 'css_build/**/*.css',
  js_build_all: staticPath + 'js_build/**/*.js',
  dist: staticPath + 'dist/'
}

var jsHintFiles = [
  staticPath + "js/utils.js",
  staticPath + "js/app.js"
]

var jsfiles = jsHintFiles.slice(0);
// Some files don't need to jshint
jsfiles.unshift(staticPath + "js/libs/zepto.min.js")
jsfiles.unshift(staticPath + "js/libs/template.js")

gulp.task('clean', function () {
  return del([
    globs.css_build,
    globs.js_build
  ], {
    force: true
  })
});

gulp.task('jshint', function () {
  return gulp.src(jsHintFiles)
    .pipe(jshint())
    .pipe(jshint.reporter());
});

gulp.task('sass', function () {
  gulp.src(globs.scss_all)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(globs.css_build));
});

gulp.task('jsMin', ['jshint'], function () {
  gulp.src(jsfiles)
    .pipe(concat('app.js'))
    .pipe(gulp.dest(globs.js_build));

  return gulp.src([staticPath + "js/libs/zepto.min.js", staticPath + "js/libs/template.js"])
    .pipe(concat('lib.js'))
    .pipe(gulp.dest(globs.js_build + 'lib/'));
});

gulp.task('assetsVersion', ['sass', 'jsMin'], function () {
  return gulp.src([globs.css_build_all, globs.js_build_all]
      // Setting `base:'.'` for keeping `js`,`css` folder structure in `dist`
      , {base: staticPath}
    )
    .pipe(assetsVersionReplace({
      replaceTemplateList: [
        '../header.php',
        '../footer.php'
      ]
    }))
    .pipe(gulp.dest(globs.dist))
});

gulp.task('default', gulpSequence('clean', 'jshint', ['sass', 'jsMin'], 'assetsVersion'));