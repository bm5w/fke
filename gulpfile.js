// Requirements
// ============================================================================
// Include gulp
var gulp = require('gulp');
// Include Our Plugins
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var browserify = require('browserify');
var source = require('vinyl-source-stream'); // converts browserify bundle into appropriate stream for gulp
var buffer = require('vinyl-buffer'); //converts streaming vinyl files to use buffers

// Paths
// ============================================================================
var rootPath = process.cwd();
var cssPath = rootPath + '/css/';
var jsPath =  rootPath + '/js/';
var destPath = rootPath + '/dist/';


// Gulp Tasks
// ============================================================================
// Lint Task
gulp.task('lint', function() {
    return gulp.src('js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// Concatenate and browserify JS sourcefiles.
gulp.task('js', function() {
  return  browserify(jsPath + 'main.js')
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest(destPath));
});

// Concatenate, browserify, and minify JS sourcefiles.
// only perform when going to prod
gulp.task('minify:js', ['js'], function() {
    return browserify(jsPath + 'main.js')
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(buffer())
        .pipe(uglify())
        .pipe(gulp.dest(destPath));
});

// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch('js/*.js', ['lint', 'js']);
});

// Default Task
gulp.task('default', ['lint', 'js', 'watch']);
// run this task for minify before releasing to prod
gulp.task('production', ['lint', 'minify:js', 'watch']);
