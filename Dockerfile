FROM node:latest AS develop-stage
ARG API_BASE_URL
ARG MAPBOX_ACCESS_TOKEN
WORKDIR /usr/src/app
COPY package.json rollup.config.js ./
COPY . .
RUN yarn install --pure-lockfile --non-interactive

FROM develop-stage AS build-stage
ARG API_BASE_URL
ARG MAPBOX_ACCESS_TOKEN
ENV API_BASE_URL=${API_BASE_URL}
ENV MAPBOX_ACCESS_TOKEN=${MAPBOX_ACCESS_TOKEN}
RUN yarn build \
    && rm -rf node_modules \
    && yarn install --production --ignore-scripts --prefer-offline \
    && yarn cache clean

FROM nginx:stable-alpine AS production-stage
COPY --from=build-stage /usr/src/app/public /usr/share/nginx/html
CMD nginx -g "daemon off;"
EXPOSE 80