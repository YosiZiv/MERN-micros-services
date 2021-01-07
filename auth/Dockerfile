FROM node:alpine
ENV CI=true
WORKDIR /app
RUN npm install
COPY . .
CMD ["npm", "start"]