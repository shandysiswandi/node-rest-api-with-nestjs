FROM node:12

# Create app directory
WORKDIR /app

# Bundle app source
COPY . .
COPY .env-example .env

RUN npm install
RUN npm run typeorm migration:run
RUN npm run prebuild
RUN npm run build
RUN npm run start:prod

EXPOSE 8080
