'use strict';

var gulp = require('gulp'),
  gulpSequence = require('gulp-sequence'),
  assetsVersionReplace = require("gulp-assets-version-replace");

var versionFileDist = 'dist/';

gulp.task('assetsVersionReplace', function () {
  gulp.src(['css/*.css', 'js/*.js']
      // Setting `base:'.'` for keeping `js`,`css` folder structure in `dist`
      , {base: '.'}
    )
    .pipe(assetsVersionReplace({
      tsVersionedFilesDest: versionFileDist,
      replaceTemplateList: [
        'index.html'
      ]
    }))
    .pipe(gulp.dest(versionFileDist))
});


gulp.task('default', gulpSequence('assetsVersionReplace'))