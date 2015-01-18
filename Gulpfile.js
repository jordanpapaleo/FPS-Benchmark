'use strict';

var bump        = require('gulp-bump'),
    eslint      = require('gulp-eslint'),
    gulp        = require('gulp'),
    jscs        = require('gulp-jscs'),
    rename      = require('gulp-rename'),
    uglify      = require('gulp-uglify');

gulp.task('build', ['bump']);

gulp.task('bump', ['compress'], function () {
    return gulp.src(['./package.json', './bower.json'])
        .pipe(bump())
        .pipe(gulp.dest('./'));
});

gulp.task('compress', ['lint'], function() {
    gulp.src('./src/*.js')
        .pipe(uglify())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('dist'))
});

gulp.task('lint', function() {
    return gulp.src('./src/*.js')
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failOnError())
        .pipe(jscs());
});
