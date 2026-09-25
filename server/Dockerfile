FROM node:22-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=dev

COPY index.js ./

RUN mkdir -p data uploads

EXPOSE 3000

CMD ["npm", "start"]