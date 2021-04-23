dev:
	live-server --mount=/-/:assets/ --mount=/:.build/ src/

watch:
	gulp watch

build: clean
	gulp

clean:
	rm -rf .build
	rm -rf public
