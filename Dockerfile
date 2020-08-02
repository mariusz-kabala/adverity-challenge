FROM node:12.16.3-alpine

WORKDIR /usr/src/app

COPY . .

RUN yarn

RUN yarn build

FROM nginx:alpine

COPY --from=0 /usr/src/app/build /usr/share/nginx/html