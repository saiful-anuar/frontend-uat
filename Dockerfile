FROM node:latest

WORKDIR /usr/src/app

COPY . /usr/src/app

CMD ["ng", "serve", "--host", "0.0.0.0"]
