dev:
	live-server --mount=/-/:assets/ --mount=/:.build/ src/

watch:
	yarn run gulp watch

build: clean
	yarn run gulp

clean:
	rm -rf .build
	rm -rf public
