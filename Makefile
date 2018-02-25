default:
	# `make deploy` build and deploy to production
	# `make dev` starts server in localhost:8080

dev:
	live-server src/

deploy: cluster patch

clean:
	rm -rf build/

.PHONY: build
build:
	html-minifier \
		--html5 \
		--collapse-boolean-attributes \
		--collapse-inline-tag-whitespace \
		--collapse-whitespace \
		--minify-css \
		--minify-js \
		--minify-ur-ls \
		--remove-attribute-quotes \
		--remove-comments \
		--remove-empty-attributes \
		--remove-optional-tags \
		--remove-redundant-attributes \
		--remove-script-type-attributes \
		--remove-style-link-type-attributes \
		--remove-tag-whitespace \
		--input-dir src \
		--output-dir build

setup:
	npm install -g live-server html-minifier
