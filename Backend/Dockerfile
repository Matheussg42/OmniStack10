FROM node:12.10.0-alpine

WORKDIR /usr/src/app

COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]

RUN yarn install 

ENV MONGODB_CONNECTION_STRING=$MONGODB_CONNECTION_STRING

COPY ./ .

EXPOSE 3333

CMD yarn dev