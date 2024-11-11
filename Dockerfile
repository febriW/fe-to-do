FROM node:20.17 AS build

WORKDIR /app

COPY package.json package-lock.json yarn.lock ./
RUN yarn install --frozen-lockfile

COPY . .

RUN yarn build

FROM node:20.17 AS production

WORKDIR /app

COPY package.json package-lock.json yarn.lock ./
RUN yarn install --production --frozen-lockfile

COPY --from=build /app/.output ./.output

EXPOSE 3000

CMD ["node", ".output/server/index.mjs"]
