#!/bin/bash

# Set variables
APP_NAME="persons-frontend"
IMAGE_NAME="adnanioricce/$APP_NAME"
TAG="latest"
CONTAINER_NAME="$APP_NAME-test"

# Build the Docker image
docker build -t $IMAGE_NAME:$TAG .

# Run a container from the built image
docker run -d --name $CONTAINER_NAME -p 8184:80 $IMAGE_NAME:$TAG

sleep 30

# Run end-to-end tests 
# TODO:

docker stop $CONTAINER_NAME
docker rm $CONTAINER_NAME

docker push $IMAGE_NAME:$TAG
