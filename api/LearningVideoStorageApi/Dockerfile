FROM node:18
RUN npm install --global nodemon
WORKDIR /learningChineseVideo
COPY . .
RUN yarn install
EXPOSE 2601
CMD yarn start
