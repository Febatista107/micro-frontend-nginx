# Building
FROM node:12.18.2 as build

WORKDIR /app

COPY . .

RUN npm ci --silent
RUN npm run build

# Serving
FROM nginx

COPY ./nginx.conf /etc/nginx/nginx.conf

COPY --from=build /app/dist /usr/share/nginx/html