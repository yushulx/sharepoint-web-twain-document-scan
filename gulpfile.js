'use strict';

const build = require('@microsoft/sp-build-web');

// Copy resources files from the node_modules folder to the dist folder
let resCopy = build.subTask('resCopy', (gulp, buildOptions, done) => {
  gulp.src('./node_modules/dwt/dist/**.*')
    .pipe(gulp.dest('./dist/'));
  gulp.src('./node_modules/dwt/dist/dist/**.*')
    .pipe(gulp.dest('./dist/dist'));
  gulp.src('./node_modules/dwt/dist/addon/**.*')
    .pipe(gulp.dest('./dist/addon'));
  gulp.src('./node_modules/dwt/dist/src/**.*')
    .pipe(gulp.dest('./dist/src'));
  done();
})
build.rig.addPreBuildTask(resCopy);

build.addSuppression(`Warning - [sass] The local CSS class 'ms-Grid' is not camelCase and will not be type-safe.`);

var getTasks = build.rig.getTasks;
build.rig.getTasks = function () {
  var result = getTasks.call(build.rig);

  result.set('serve', result.get('serve-deprecated'));

  return result;
};

build.initialize(require('gulp'));
