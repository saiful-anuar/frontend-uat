#FROM jenkins/jenkins:lts
#USER root
#RUN apt-get update
#RUN curl -sSL https://get.docker.com/ | sh

FROM node:latest

# Create app directory
#RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json /usr/src/app/
RUN npm install -g @angular/cli
RUN npm install

# Bundle app source
COPY . /usr/src/app

CMD ["ng", "serve", "--host", "0.0.0.0"]
