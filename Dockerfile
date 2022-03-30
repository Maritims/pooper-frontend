FROM node:latest AS develop-stage
ARG API_BASE_URL
ARG VAPID_PUBLIC_KEY
ARG MAPBOX_ACCESS_TOKEN
ARG SSL_CERTIFICATE_FILE
ARG SSL_CERTIFICATE_KEY_FILE
WORKDIR /usr/src/app
COPY package.json rollup.config.js ./
COPY . .
RUN yarn install --pure-lockfile --non-interactive \
    && yarn lint src/**/*.svelte \
    && yarn test

FROM develop-stage AS build-stage
ARG API_BASE_URL
ARG VAPID_PUBLIC_KEY
ARG MAPBOX_ACCESS_TOKEN
ARG SSL_CERTIFICATE_FILE
ARG SSL_CERTIFICATE_KEY_FILE
ENV API_BASE_URL=${API_BASE_URL}
ENV VAPID_PUBLIC_KEY=${VAPID_PUBLIC_KEY}
ENV MAPBOX_ACCESS_TOKEN=${MAPBOX_ACCESS_TOKEN}
ENV SSL_CERTIFICATE_FILE=${SSL_CERTIFICATE_FILE}
ENV SSL_CERTIFICATE_KEY_FILE=${SSL_CERTIFICATE_KEY_FILE}
RUN yarn build \
    && rm -rf node_modules \
    && yarn install --production --ignore-scripts --prefer-offline \
    && yarn cache clean

FROM nginx:stable-alpine AS production-stage
COPY --from=build-stage /usr/src/app/public /usr/share/nginx/html
CMD nginx -g "daemon off;"
EXPOSE 80