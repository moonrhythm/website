SERVICE=moonrhythm
REGISTRY=gcr.io/acoshift-1362
COMMIT_SHA=$(shell git rev-parse HEAD)
NOW=$(shell date +%s)

default:
	# `make deploy` build and deploy to production
	# `make dev` starts server in localhost:8080

dev:
	go run -tags dev main.go

deploy: cluster patch

clean:
	rm -f entrypoint

build:
	env GOOS=linux GOARCH=amd64 CGO_ENABLED=0 go build -o entrypoint -a -ldflags '-w -s' main.go

docker: clean build
	gcloud docker -- build -t $(REGISTRY)/$(SERVICE):$(COMMIT_SHA) .
	gcloud docker -- push $(REGISTRY)/$(SERVICE):$(COMMIT_SHA)

cluster:
	gcloud container clusters get-credentials cluster-sg-1 --zone asia-southeast1-b --project acoshift-1362

patch:
	kubectl patch deployment $(SERVICE) -p '{"spec":{"template":{"metadata":{"labels":{"date":"$(NOW)"}},"spec":{"containers":[{"name":"$(SERVICE)","image":"$(REGISTRY)/$(SERVICE):$(COMMIT_SHA)"}]}}}}'
	kubectl rollout status deployment/$(SERVICE)
