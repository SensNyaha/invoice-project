ARG NODE_VERSION=21-alpine3.18

FROM node:${NODE_VERSION}

ARG APP_HOME=/app

WORKDIR ${APP_HOME}

COPY package*.json ./

RUN npm install

COPY . ${APP_HOME}

CMD ["npm", "start"]