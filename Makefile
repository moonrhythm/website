dev:
	live-server --mount=/-/:assets/ --mount=/:.build/ src/

watch:
	npx gulp watch

build: clean
	npx gulp

clean:
	rm -rf .build
	rm -rf public
