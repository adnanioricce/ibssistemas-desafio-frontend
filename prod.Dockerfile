FROM node:18 AS build

WORKDIR /app

COPY . .

RUN npm install

RUN npm run build --prod

FROM nginx:alpine

COPY --from=build /app/dist/persons-frontend/3rdpartylicenses.txt /usr/share/nginx/html/
COPY --from=build /app/dist/persons-frontend/browser/. /usr/share/nginx/html/
