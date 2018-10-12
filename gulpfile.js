/*
 * The packages needed for this gulpfile:
 *
 * npm install --save-dev gulp merge-stream gulp-concat gulp-sass gulp-csso gulp-postcss autoprefixer gulp-sourcemaps
 */

const gulp = require('gulp'),
    mergeStream = require('merge-stream'),
    concat = require('gulp-concat'),
    sass = require('gulp-sass'),
    csso = require('gulp-csso'),
    postcss = require('gulp-postcss'),
    autoprefixer = require('autoprefixer'),
    sourcemaps = require('gulp-sourcemaps');

// Compile and minify Sass files
gulp.task('sass', function () {
    let standard = gulp.src(['src/ea-material-color.scss'])
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(concat('ea-material-color.css'))
        .pipe(postcss([autoprefixer()]))
        .pipe(sourcemaps.write('.'));

    let minify = gulp.src(['src/ea-material-color.scss'])
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(concat('ea-material-color.min.css'))
        .pipe(postcss([autoprefixer()]))
        .pipe(csso())
        .pipe(sourcemaps.write('.'));

    return mergeStream(standard, minify)
        .pipe(gulp.dest('dist'));
});

// Default
gulp.task('default', ['sass']);