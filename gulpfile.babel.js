'use strict';

import babel from 'gulp-babel';
import del from 'del';
import gulp from 'gulp';
import jscs from 'gulp-jscs';
import jshint from 'gulp-jshint';
import mocha from 'gulp-mocha';
import nodemon from 'gulp-nodemon';
import stylish from 'jshint-stylish';

gulp.task('build', () => {
  return gulp
    .src('src/**/*.js')
    .pipe(babel())
    .pipe(gulp.dest('dst'))
    ;
});

gulp.task('clean', () => {
  return del(['dst'])
});

gulp.task('jscs', () => {
  return gulp
    .src('src/**/*.js')
    .pipe(jscs())
    .pipe(jscs.reporter())
    .pipe(jscs.reporter('failImmediately'))
  ;
});

gulp.task('jshint', () => {
  return gulp
    .src('src/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter(stylish))
});

gulp.task('server', ['jscs', 'jshint', 'build', 'watch'], () => {
  return nodemon({
    'script': 'dst'
  });
});

gulp.task('test', ['build'], () => {
  process.env.NODE_ENV = 'test';

  return gulp
    .src('dst/tests/**/*.js')
    .pipe(mocha({ reporter: 'nyan' }))
  ;
});

gulp.task('watch', () => {
  return gulp.watch('./src/**/*.js', ['jscs', 'jshint', 'build']);
});

gulp.task('default', ['server']);
