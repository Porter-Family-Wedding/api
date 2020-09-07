FROM node:14

RUN useradd -u 777 -r -m -U app
RUN mkdir -p /src/app
WORKDIR /src/app
COPY . /src/app

RUN chown -R app:app .
USER app

ADD package.json /src/app

RUN npm install

RUN npm run build

CMD ["npm", "start"]