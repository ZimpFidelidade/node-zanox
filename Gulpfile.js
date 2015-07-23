'use strict';

var gulp = require('gulp'),
	jscs = require('gulp-jscs'),
	jshint = require('gulp-jshint'),
	duration = require('gulp-duration'),
	mocha = require('gulp-mocha');

gulp.task('lint', function() {
	return gulp.src([ './lib/*.js', './index.js' ])
		.pipe(jscs({
			configPath: './.jscsrc'
		}))
		.pipe(jshint())
		.pipe(jshint.reporter('default'))
		.pipe(duration('Testing duration: '));
});

gulp.task('test', ['lint']);