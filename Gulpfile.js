const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const rename = require('gulp-rename');

const output = './assets/css'
const sassOption = {
	outputStyle: 'compressed',
	includePaths: 'node_modules'
}

gulp.task('dev', function () {
	build('./src/sass/main.scss', 'moonrhythm')
})

gulp.task('watch', () => gulp.watch('src/sass/**/*.scss', ['dev']))

function build(source, basename, compress = false, suffix = '.min') {
	sassOption.outputStyle = compress == true ? 'compressed' : 'expanded'
	gulp.src(source)
	.pipe(sass(sassOption).on('error', sass.logError))
	.pipe(autoprefixer({
		browsers: ['last 2 versions']
	}))
	.pipe(rename({
		basename: basename,
		suffix: suffix,
		extname: '.css'
	}))
	.pipe(gulp.dest(output))
}