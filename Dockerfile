FROM node:20-alpine

WORKDIR /app

RUN apk add --no-cache libc6-compat g++ make
COPY client/package*.json ./

RUN npm install \
    && npm install sharp

COPY ./client .


RUN npm run build

EXPOSE 3000


CMD ["npm", "run", "start"]
