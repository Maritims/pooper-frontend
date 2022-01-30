# pooper-frontend

Frontend project for the Pooper application.

## Run in dev mode
`yarn dev`

## Run tests
`yarn test`

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