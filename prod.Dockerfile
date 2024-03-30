FROM node:14 AS build

WORKDIR /app

COPY . .

RUN npm install

RUN npm run build --prod

FROM nginx:alpine

COPY --from=build /app/dist/persons-frontend /usr/share/nginx/html
