# Overview

This repository contains code and configuration for a simple Todo List application. 

The application is composed from Angular + Nest + MongoDB. It is containerized and deployed on top of Kubernetes.

# Installation

## Dependencies

* NodeJS
* Angular CLI

    ```
    npm i -g @angular/cli
    ```

## Deployment Dependencies

* Docker
* Docker Compose
* Helm 3+

# Development Environment


## MongoDB

```
docker-compose up mongodb
```

You can alternatively use any MongoDB server. You will need to update the `.env` file in the `ibm-code-challenge-server` directory with the correct connection string.

## User Interface

```
cd ibm-code-challenge-ui/
npm install
ng serve
```

### Proxy

The user interface (when in development mode) will deploy a proxy. This proxy will redirect requests from `http://localhost:4200/api/...` to `http://localhost:3000/api/...`. This is to prevent CORS errors that occur when using different domains and ports. 

This configuration file can be located in: `ibm-code-challenge-ui/proxy.conf.json`

See the following for detais: https://angular.io/guide/build#proxying-to-a-backend-server

## Server

```
cd ibm-code-challenge-server/
npm install
npm run start:dev
```

You can then open up the application in your browser: http://localhost:4200/

# Production Environment

The following assumes you have configured `kubectl`, `helm`, and `docker` to work with a cluster and registry.

Values from the `.env` file provide the registry URL for building and pushing images. Note, this is separate from the helm chart: `charts/ibm-code-challenge/values.yaml`.

1. Build the docker images and deploy to the registry

    ```
    docker-compose build
    docker-compose push server ui
    ```

2. Deploy the helm chart
    
    ```
    helm upgrade ibm-code-challenge charts/ibm-code-challenge --upgrade
    ```
    
3. Goto the website: https://jrdemo-c4a24be17d2b0bfc980895fd31267ec3-0000.mon01.containers.appdomain.cloud/ibm-code-challenge/

## Secret

A secret must be deployed which will provide the connection string for the MongoDB server.

It is not included in this repository for security reasons. It can be created in the following manner:

```
kubectl create secret generic ibm-code-challenge --from-literal=MONGODB_URI=<MONGODB_CONNECTION_STRING>
```
