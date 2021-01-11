FROM node:alpine
ENV CI=true
WORKDIR /app
RUN npm install --only=prod
COPY . .
CMD ["npm", "start"]