FROM node:20
ENV NODE_ENV=production
WORKDIR /app

COPY . .
RUN yarn install
RUN yarn add env-cmd

EXPOSE 7700
CMD yarn start:production
