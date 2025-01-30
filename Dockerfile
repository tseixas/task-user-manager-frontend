FROM node:latest
WORKDIR /app
COPY package*.json ./
RUN npm install -g @quasar/cli
COPY . .