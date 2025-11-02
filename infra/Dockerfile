# Этап 1: сборка фронтенда
FROM node:20 AS builder
WORKDIR /app
COPY ./vite-project/package*.json ./
RUN npm ci
COPY ./vite-project .
RUN npm run build

# Этап 2: nginx для отдачи статики
FROM nginx:latest
RUN rm /etc/nginx/conf.d/default.conf
COPY ./infra/conf /etc/nginx/conf.d
COPY --from=builder /app/dist /usr/share/nginx/html
