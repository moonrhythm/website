const gulp = require('gulp')
const concat = require('gulp-concat')
const sass = require('gulp-sass')
const autoprefixer = require('gulp-autoprefixer')
const path = require('path')
const critical = require('critical').stream
const htmlmin = require('gulp-htmlmin')
const removeCode = require('gulp-remove-code')
const runSequence = require('run-sequence')
const clean = require('gulp-clean')

const tempDir = './.build'
const outputDir = './public'

const sassOption = {
	outputStyle: 'compressed',
	includePaths: 'node_modules'
}

gulp.task('clean-temp', () => gulp.src(tempDir).pipe(clean({ force: true })))
gulp.task('clean-output', () => gulp.src(tempDir).pipe(clean({ force: true })))
gulp.task('clean', ['clean-temp', 'clean-output'])

gulp.task('assets', () => gulp
	.src('./assets/**/*')
	.pipe(gulp.dest(outputDir))
)

gulp.task('style', () => gulp
	.src('./src/sass/main.scss')
	.pipe(sass(sassOption).on('error', sass.logError))
	.pipe(autoprefixer({ browsers: ['last 2 versions'] }))
	.pipe(concat('style.css'))
	.pipe(gulp.dest(path.join(tempDir, 'css')))
)

gulp.task('critical', () => gulp
	.src('./src/*.html')
	.pipe(removeCode({ production: true }))
	.pipe(critical({
		base: tempDir,
		inline: true,
		minify: true,
		css: [ path.join(tempDir, 'css', 'style.css') ]
	}))
	.on('error', err => { console.error(err.message) })
	.pipe(htmlmin({
		minifyJS: true,
		removeComments: true,
		collapseWhitespace: true,
		removeOptionalTags: true,
		removeScriptTypeAttributes: true
	}))
	.pipe(gulp.dest(outputDir))
)

gulp.task('watch', () => gulp.watch('src/sass/**/*.scss', ['style']))

gulp.task('default', runSequence('clean', 'assets', 'style', 'critical'))
