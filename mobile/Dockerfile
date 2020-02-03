FROM node:12.10.0-alpine

WORKDIR /usr/src/app

COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]

RUN npm install -g grunt-cli \
    && npm install -g yarn \
    && npm install -g create-react-native-app \
    && npm install -g react-native-cli \ 
    && npm install -g expo-cli 

RUN yarn install 

COPY /. .

EXPOSE 19000

EXPOSE 19001

EXPOSE 19002 

CMD yarn start