FROM node:12.10.0-alpine

WORKDIR /usr/src/app

COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]

RUN apk add git \
    && yarn install \
    && yarn add global expo-cli  \
    && apk add android-tools --repository=http://dl-cdn.alpinelinux.org/alpine/edge/testing

# RUN apk add --no-cache git \
#     && yarn install 

COPY ./ .

EXPOSE 19000

EXPOSE 19001

EXPOSE 19002 

RUN rm -rf .expo && rm -rf .expo-shared 

RUN yarn cache clean

CMD adb connect 10.0.2.2 && \
    yarn run android
    # runs expo-cli start --android
# CMD yarn start