#stage 1
FROM node:16.18.1-alpine as node
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build --omit=dev

#stage 2
FROM nginx:alpine
COPY --from=node /app/dist/employees-admin /usr/share/nginx/html
