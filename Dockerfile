FROM node:12
WORKDIR /
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 8082
CMD [ "node", "server.js" ]