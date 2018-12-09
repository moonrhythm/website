default: clean build deploy

dev:
	live-server --mount=/-/:assets/ --mount=/:.build/ src/

watch:
	gulp watch

build:
	yarn build

clean:
	rm -rf .build
	rm -rf public

deploy:
	gsutil -m -h "Cache-Control: public, max-age=3600" rsync public gs://www.moonrhythm.io/
	gsutil -m -h "Cache-Control: public, max-age=31536000, immutable" rsync -r public/- gs://www.moonrhythm.io/-/
