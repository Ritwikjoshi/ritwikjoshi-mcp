FROM node:20-alpine

WORKDIR /app

COPY . .

RUN chmod +x /app/index.js

CMD ["node", "index.js"]
