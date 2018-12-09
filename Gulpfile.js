const gulp = require('gulp')
const concat = require('gulp-concat')
const sass = require('gulp-sass')
const autoprefixer = require('gulp-autoprefixer')
const path = require('path')
const critical = require('critical').stream
const htmlmin = require('gulp-htmlmin')
const removeCode = require('gulp-remove-code')
const runSequence = require('run-sequence')

const tempDir = './.build'
const outputDir = './public'
const assetsDir = path.join(outputDir, '-')

const sassOption = {
	outputStyle: 'compressed',
	includePaths: 'node_modules'
}

gulp.task('assets', () => gulp
	.src('./assets/**/*')
	.pipe(gulp.dest(assetsDir))
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
		css: [ path.join(tempDir, 'css', 'style.css') ],
		width: 10000,
		height: 10000
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

gulp.task('default', runSequence('assets', 'style', 'critical'))
