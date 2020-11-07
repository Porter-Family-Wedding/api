FROM mhart/alpine-node:15.0.1

WORKDIR /src/app
COPY . /src/app

ADD package.json /src/app

RUN yarn install

RUN yarn build

CMD ["yarn", "start"]
