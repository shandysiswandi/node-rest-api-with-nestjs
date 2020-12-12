FROM node:12

# Create app directory
WORKDIR /app

# Bundle app source
COPY . .
COPY .env-example .env

RUN npm install
RUN npm run typeorm migration:run
RUN npm run start

EXPOSE 8080
