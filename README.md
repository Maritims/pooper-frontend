# pooper-frontend

Frontend project for the Pooper application.

## Run in dev mode
The project is usually developed in a Docker environment, but to run it in standalone mode without any container business just run the following command:
```shell
yarn dev
```

## Run tests
To run all the project's unit tests run the following command:
```shell
yarn test
```

## Build for production
```shell
yarn install --pure-lockfile --non-interactive
yarn test
yarn build
rm -rf node_modules
yarn install --production --ignore-scripts --prefer-offline
yarn cache clean
```

## Run in production
1) Use a web server like [nginx](https://www.nginx.com/)
2) Copy contents of `public` into the web server's document root
3) Run your web server

## Dockerfile for development and production
This project comes with a Dockerfile based on the [multistage technique](https://docs.docker.com/develop/develop-images/multistage-build/) for running the project as a Docker container.

### Building the image
To build the image you must specify the build arguments for the expected API_BASE_URL and MAPBOX_ACCESS_TOKEN.
```shell
docker build . -t pooper-frontend:lates --build-arg API_BASE_URL=foo --build-arg MAPBOX_ACCESS_TOKEN=bar
```

### Using the image in development
To use the image in development use docker-compose with the following service configuration. This assumes that you're in a parent directory where the source code is in a sub directory named `pooper-frontend` which in turn also contains the `node_modules` directory. The arguments `API_BASE_URL` and `MAPBOX_ACCESS_TOKEN` are expected to reside in an `.env` file in the current directory, not in the `pooper-frontend` directory.
```yaml
frontend:
  build:
    context: ./pooper-frontend
    target: develop-stage
    args:
      - API_BASE_URL=${API_BASE_URL}
      - MAPBOX_ACCESS_TOKEN=${MAPBOX_ACCESS_TOKEN}
  volumes:
    - ./pooper-frontend:/usr/src/app
    - ./pooper-frontend/node_modules:/usr/src/app/node_modules
  network_mode: host
  command: yarn dev
```

### Using the image in production
The production stage of the Dockerfile starts an nginx process which listens on port 80, so to run the container just start it as you would start any other container with an exposed port. The application code at this point is contained in static assets. No environment variables are expected.
```shell
docker run --name pooper-frontend --publish 80:80 pooper:frontend/latest
```