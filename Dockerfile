# NurseAide App Dockerfile

### STAGE 1: Build ###

FROM node:8.16.1-alpine as builder

WORKDIR /fwf-client

COPY package*.json ./

RUN echo "Installing dependencies..." \
    && npm set progress=false \
    && npm config set depth 0 \
    && npm cache clean --force \
    && npm install --unsafe-perm

COPY . .

## Build the Ionic app in production mode and store the artifacts in www folder
RUN echo "Building the app..." \
    && npm run build


### STAGE 2: Setup ###

FROM nginx:1.19.10-alpine

LABEL maintainer="Jose Manuel Duran <josemanuelduran@gmail.com>"

ARG BUILD_DATE
ARG GIT_COMMIT
ARG BUILD_VERSION="SNAPSHOT"

LABEL org.label-schema.schema-version="1.0"
LABEL org.label-schema.build_date=$BUILD_DATE
LABEL org.label-schema.name="fwf/fwf-app"
LABEL org.label-schema.description="FWF app"
LABEL org.label-schema.vendor="JM Duran"
LABEL org.label-schema.vcs-ref=$GIT_COMMIT
LABEL org.label-schema.version=$BUILD_VERSION
LABEL org.label-schema.docker.cmd="docker run -d --name fwf-app -p 80:80 fwf/fwf-app"

## Copy our default nginx config
COPY nginx/default.conf /etc/nginx/conf.d/
## Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

## copy the artifacts in www folder to default nginx public folder
COPY --from=builder /fwf-client/www /usr/share/nginx/html

## CMD ["nginx", "-g", "daemon off;"]
CMD sed -i -e 's/$PORT/'"$PORT"'/g' /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'
