var gulp = require('gulp'),
	minifyCSS = require('gulp-minify-css'),
	rename = require('gulp-rename'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'), // uglify for minifying the js file
	jshint = require('gulp-jshint'),
	nodemon = require('gulp-nodemon'),
	ngAnnotate = require('gulp-ng-annotate');

gulp.task('css', function() {
	return gulp.src('public/assets/css/*.css')
		.pipe(concat('style.css'))
		.pipe(minifyCSS())
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest('public/dist'));
});

gulp.task('js', function() {
	return gulp.src(['public/*.js','public/controllers/*.js',
		'public/routes/*.js','public/services/*.js'])
		.pipe(jshint())
		.pipe(jshint.reporter('default'))
		.pipe(ngAnnotate())
		.pipe(concat('app.js'))
		.pipe(uglify())
		.pipe(rename({suffix:'.min'}))
		.pipe(gulp.dest('public/dist'));
});

gulp.task('watch', function() {
	gulp.watch('public/assets/css/*.css',['css']);
	gulp.watch(['server.js', 'public/*.js','public/controllers/*.js',
		'public/routes/*.js','public/services/*.js'], ['js']);
});

gulp.task('nodemon', function() {
	nodemon({
		script: 'server.js',
		ext : 'js html'
	})
	.on('start', ['watch'])
	.on('change', ['watch'])
	.on('restart', function() {
		console.log('Restarted!');
	});
});

gulp.task('default', ['nodemon']);




