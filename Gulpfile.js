const gulp = require('gulp')
const concat = require('gulp-concat')
const sass = require('gulp-sass')
const autoprefixer = require('gulp-autoprefixer')
const path = require('path')
const critical = require('critical').stream
const htmlmin = require('gulp-htmlmin')
const removeCode = require('gulp-remove-code')
const runSequence = require('run-sequence')

const outputDir = './public'

const sassOption = {
	outputStyle: 'compressed',
	includePaths: 'node_modules'
}

gulp.task('style', compileScss)

gulp.task('critical', () => gulp
	.src('./src/*.html')
	.pipe(removeCode({ production: true }))
	.pipe(critical({
			base: outputDir,
			inline: true,
			minify: true,
			css: [path.join(outputDir, 'css', 'style.css')]
		}))
	.on('error', err => { console.error(err.message) })
	.pipe(
		htmlmin({
			minifyJS: true,
			removeComments: true,
			collapseWhitespace: true,
			removeOptionalTags: true,
			removeScriptTypeAttributes: true
		})
	)
	.pipe(gulp.dest(outputDir))
)

gulp.task('dev', () => compileScss)

gulp.task('watch', () => gulp.watch('src/sass/**/*.scss', ['dev']))

gulp.task('default', runSequence('style', 'critical'))

function compileScss () {
	return gulp
		.src('./src/sass/main.scss')
		.pipe(sass(sassOption).on('error', sass.logError))
		.pipe(autoprefixer({ browsers: ['last 2 versions'] }))
		.pipe(concat('style.css'))
		.pipe(gulp.dest(path.join(outputDir, 'css')))
}