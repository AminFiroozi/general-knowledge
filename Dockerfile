FROM node:23-alpine

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm i

COPY . .
COPY .env.local .env.local

RUN npm run build

CMD ["npm", "run", "start"]
