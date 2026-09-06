FROM node:20-slim

WORKDIR /app

# Ensure non-root environment & copy project files
COPY package*.json ./
RUN npm ci --omit=dev || npm install --omit=dev

COPY index.js tools.json data.json ./
RUN chmod +x index.js

ENTRYPOINT ["node", "index.js"]
