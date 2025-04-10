FROM node:18

WORKDIR /app

COPY package.json ./
COPY .env ./
COPY index.js db.js ./
COPY tts_plain ./tts_plain

RUN npm install

EXPOSE 7777

CMD ["node", "index.js"]