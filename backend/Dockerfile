FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
# RUN npm i --dev env
RUN npm i --omit=dev
COPY . .
EXPOSE 5000
CMD ["npm","start"]
