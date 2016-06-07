var gulp = require('gulp');
var ghPages = require('gulp-gh-pages');
var rename = require('gulp-rename');

gulp.task('gh-pages', function() {
	return gulp.src([
		'./LICENSE',
		'./demo/**/*',
		'./angular-ui-flag.js',
		'./node_modules/jquery/dist/jquery.min.js',
		'./node_modules/bootstrap/dist/css/bootstrap.min.css',
		'./node_modules/bootstrap/dist/js/bootstrap.min.js',
		'./node_modules/font-awesome/css/font-awesome.min.css',
		'./node_modules/font-awesome/fonts/fontawesome-webfont.ttf',
		'./node_modules/font-awesome/fonts/fontawesome-webfont.woff',
		'./node_modules/lodash/lodash.min.js',
		'./node_modules/angular/angular.min.js',
		'./node_modules/angular-bootstrap-colorpicker/js/bootstrap-colorpicker-module.min.js',
		'./node_modules/angular-bootstrap-colorpicker/css/colorpicker.min.css',
	], {base: __dirname})
		.pipe(rename(function(path) {
			path.dirname = path.dirname.replace(/^demo/, ''); // Remove all demo prefixes
			if (path.basename == 'angular-ui-flag') { // Move main JS file into /js directory in demo
				path.dirname = '/js';
			}
			return path;
		}))
		.pipe(ghPages({
			push: true,
			origin: 'origin',
			branch: 'gh-pages',
		}))
});
