'use strict';

import babel from 'gulp-babel';
import gulp from 'gulp';
import jscs from 'gulp-jscs';
import jshint from 'gulp-jshint';
import mocha from 'gulp-mocha';
import nodemon from 'gulp-nodemon';
import stylish from 'jshint-stylish';

gulp.task('es6', () => {
  gulp
    .src('src/**/*.js')
    .pipe(babel())
    .pipe(gulp.dest('dst'))
  ;
});

gulp.task('jscs', () => {
  gulp
    .src('src/**/*.js')
    .pipe(jscs())
    .pipe(jscs.reporter())
    .pipe(jscs.reporter('failImmediately'))
  ;
});

gulp.task('jshint', () => {
  gulp
    .src('src/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter(stylish))
});

gulp.task('server', () => {
  nodemon({
    'script': 'dst'
  });
});

gulp.task('test', ['es6'], () => {
  gulp
    .src('dst/tests/**/*.js')
    .pipe(mocha({ reporter: 'nyan' }))
  ;
});

gulp.task('watch', () => {
  gulp.watch('./src/**/*.js', ['jscs', 'jshint', 'es6']);
});

gulp.task('default', ['jscs', 'jshint', 'es6', 'watch', 'server']);
