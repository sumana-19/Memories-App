FROM node:14.18.1

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ENV DB_URL=mongodb+srv://dbuser:v88zFxxRAJgYvMOk@clusterss.qbonm.mongodb.net/?retryWrites=true&w=majority
ENV PORT=3001

EXPOSE 3001

CMD ["npm", "start"]
