FROM node:latest

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json /usr/src/app/
RUN npm install -g @angular/cli
RUN npm install

# Bundle app source
COPY . /usr/src/app
CMD ["ng", "serve", "--host", "0.0.0.0"]
