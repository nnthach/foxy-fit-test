FROM node:22

WORKDIR /src

COPY package*.json ./

RUN npm ci

COPY . .

CMD ["npm", "run", "dev:docker"]