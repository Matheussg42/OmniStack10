FROM node:12.10.0-alpine

WORKDIR /usr/src/app

COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]

RUN yarn install 

COPY ./ .

EXPOSE 3000

CMD yarn start