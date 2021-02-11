FROM node:14.15-alpine 

WORKDIR /app 

COPY package.json .
RUN yarn
COPY . .

CMD ["yarn", "start:dev"]