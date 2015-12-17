'use strict';

var gulp = require('gulp'),
  del = require('del'),
  gulpSequence = require('gulp-sequence'),
  jshint = require('gulp-jshint'),
  concat = require('gulp-concat'),
  compass = require('gulp-compass'),
  assetsVersionReplace = require("gulp-assets-version-replace");

var versionFileDist = 'dist/';
var globs = {
  scss: './scss/*.scss',
  css_build: 'css_build/',
  js_build: 'js_build/',
  css_build_all: 'css_build/*.css',
  js_build_all: 'js_build/*.js'
}

var jsHintFiles = [
  "js/utils.js",
  "js/app.js"
]

var jsfiles = jsHintFiles.slice(0);
// Some files don't need to jshint
jsfiles.unshift("js/libs/zepto.min.js")

gulp.task('clean', function () {
  return del([
    globs.css_build,
    globs.js_build,
    versionFileDist
  ])
});

gulp.task('jshint', function () {
  return gulp.src(jsHintFiles)
    .pipe(jshint())
    .pipe(jshint.reporter());
});

gulp.task('compass', function() {
  return gulp.src(globs.scss)
    .pipe(compass({
      environment: 'production',
      config_file: './config_dist.rb',
      style: 'compressed',
      css: 'css_build',
      sass: 'scss'
    }))
});

gulp.task('js-app', ['jshint'], function () {
  return gulp.src(jsfiles)
    .pipe(concat('app.js'))
    .pipe(gulp.dest(globs.js_build));
});

gulp.task('assetsVersion', ['compass'], function () {
  return gulp.src([globs.css_build_all, globs.js_build_all])
    .pipe(assetsVersionReplace({
      tsVersionedFilesDest: versionFileDist,
      replaceTemplateList: [
        '../header.php',
        '../footer.php'
      ]
    }))
    .pipe(gulp.dest(versionFileDist))
});

gulp.task('default', gulpSequence('clean', 'jshint', ['compass', 'js-app'], 'assetsVersion'));