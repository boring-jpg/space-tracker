FROM node:18 AS frontend

WORKDIR /frontend

COPY ./frontend/package.json ./frontend/package-lock.json ./

RUN npm i

COPY ./frontend/ ./

RUN npm run build

## BACKEND ##

FROM node:18 AS backend

WORKDIR /backend

ENV NODE_ENV="production"
ENV PORT='5000'

ARG MONGO
ENV MONGO=${MONGO}

ARG SESSION
ENV SESSION=${SESSION}

COPY ./backend/ ./

COPY --from=frontend /frontend/dist /backend/public

EXPOSE 5000

CMD ["npm", "start"]