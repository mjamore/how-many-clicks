var gulp = require('gulp'),
	watch = require('gulp-watch'),
	minifycss = require('gulp-minify-css'),
	sass = require('gulp-sass');


gulp.task('sass', function() {
	return gulp.src('public/stylesheets/sass/*.scss')
		.pipe(watch('public/stylesheets/sass/*.scss'))
		.pipe(sass())
		.pipe(minifycss())
		.pipe(gulp.dest('public/stylesheets/css'));
});


gulp.task('default', ['sass']);