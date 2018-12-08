deploy:
	yarn build
	gsutil -m rsync -r -c public gs://www.moonrhythm.io/
