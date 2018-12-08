deploy:
	yarn build
	gsutil -m -h "Cache-Control: public, max-age=3600" rsync public gs://www.moonrhythm.io/
	gsutil -m -h "Cache-Control: public, max-age=31536000, immutable" rsync -r public/- gs://www.moonrhythm.io/-/
