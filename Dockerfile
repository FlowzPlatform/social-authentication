#FROM bitnami/node:latest
FROM mhart/alpine-node:8

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY package.json /usr/src/app/

RUN npm install

COPY . /usr/src/app

EXPOSE 3004

CMD [ "npm", "start" ]