FROM node:alpine as production

COPY .env .
COPY main.js .
COPY package* .

RUN npm install

CMD [ "node", "main.js" ]