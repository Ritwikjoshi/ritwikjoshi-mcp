FROM node:20-alpine

WORKDIR /app

COPY package.json ./
RUN npm install --omit=dev

COPY index.js tools.json data.json ./

CMD ["node", "index.js"]
