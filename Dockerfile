FROM node:20-alpine

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install
RUN  npm install --global serve
# Maybe install json server
COPY . .

RUN npm run build

EXPOSE 3000
CMD [ "serve", "-s", "dist" ]