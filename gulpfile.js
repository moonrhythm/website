const { src, dest, series, watch } = require('gulp')
const concat = require('gulp-concat')
const sass = require('gulp-sass')(require('node-sass'))
const autoprefixer = require('gulp-autoprefixer')
const path = require('path')
const critical = require('critical').stream
const htmlmin = require('gulp-htmlmin')
const removeCode = require('gulp-remove-code')

const tempDir = './.build'
const outputDir = './public'
const assetsDir = path.join(outputDir, '-')

const sassOption = {
	outputStyle: 'compressed',
	includePaths: 'node_modules'
}

function assets () {
	return src('./assets/**/*')
		.pipe(dest(assetsDir))
}

function style () {
	return src('./src/sass/main.scss')
		.pipe(sass(sassOption).on('error', sass.logError))
		.pipe(autoprefixer())
		.pipe(concat('style.css'))
		.pipe(dest(path.join(tempDir, 'css')))
}

function minify () {
	return src('./src/*.html')
		.pipe(removeCode({ production: true }))
		.pipe(critical({
			base: path.join(tempDir, 'css'),
			inline: true,
			minify: true,
			css: [ path.join(tempDir, 'css', 'style.css') ],
			pathPrefix: '',
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
		.pipe(dest(outputDir))
}

exports.assets = assets
exports.style = style
exports.watch = () => watch('src/sass/**/*.scss', style)
exports.default = series(assets, style, minify)
