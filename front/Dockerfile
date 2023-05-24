FROM node AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
ENTRYPOINT ["npm", "run", "start"]