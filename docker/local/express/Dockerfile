ARG NODE_VERSION=21-alpine3.18

FROM node:${NODE_VERSION}

LABEL name="invoice"
LABEL license="MIT"
LABEL description="invoice img"

ENV NODE_ENV=development

ARG APP_HOME=/APP_HOME

WORKDIR ${APP_HOME}

RUN addgroup --system invoice \ 
    && adduser --system --ingroup invoice invoice

COPY package*.json ./

RUN npm install

COPY --chown=invoice:invoice . ${APP_HOME}

RUN chown invoice:invoice ${APP_HOME}

USER invoice

CMD ["npm", "run", "dev"]