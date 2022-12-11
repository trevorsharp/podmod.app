FROM node:18-alpine

RUN apk add --no-cache yarn

WORKDIR /app

COPY ./package.json ./package.json
COPY ./yarn.lock ./yarn.lock
RUN yarn

COPY . .
RUN export SKIP_ENV_VALIDATION && yarn build

CMD ["yarn", "start"]
