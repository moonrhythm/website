const gulp = require('gulp')
const sass = require('gulp-sass')
const autoprefixer = require('gulp-autoprefixer')
const rename = require('gulp-rename')
const purgecss = require('gulp-purgecss')

const output = './assets/css'
const sassOption = {
	outputStyle: 'compressed',
	includePaths: 'node_modules'
}

gulp.task('default', function () {
	return build('./src/sass/main.scss', true)
})

gulp.task('dev', function () {
	return build('./src/sass/main.scss')
})

gulp.task('watch', () => gulp.watch('src/sass/**/*.scss', ['dev']))

function build (source, compress = false) {
	sassOption.outputStyle = compress ? 'compressed' : 'expanded'

	let flow = gulp.src(source)
		.pipe(sass(sassOption).on('error', sass.logError))

	if (compress) {
		flow = flow
			.pipe(purgecss({ content: ['./public/**/*.html'] }))
	}

	flow = flow
		.pipe(autoprefixer({
			browsers: ['last 2 versions']
		}))
		.pipe(rename({
			basename: 'style',
			extname: '.css'
		}))
		.pipe(gulp.dest(output))

	return flow
}
