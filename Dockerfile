FROM node:20 AS frontend

WORKDIR /frontend

COPY ./frontend/package.json ./frontend/package-lock.json ./

RUN npm ci

COPY ./frontend/ ./

RUN npm run build

## BACKEND ##

FROM node:20 AS backend

WORKDIR /backend

ENV NODE_ENV="production"
ENV PORT='10000'

ARG MONGO
ENV MONGO=${MONGO}

ARG SESSION
ENV SESSION=${SESSION}

ARG DOMAIN
ENV DOMAIN=${DOMAIN}

COPY ./backend/package.json ./backend/package-lock.json ./

RUN npm ci

COPY ./backend/ ./

COPY --from=frontend /frontend/dist /backend/public

EXPOSE 10000

CMD ["npm", "start"]