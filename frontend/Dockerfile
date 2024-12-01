FROM node:18-alpine AS base

WORKDIR /app

COPY package.json bun.lockb yarn.lock ./

RUN yarn install

FROM base AS build

COPY . .

RUN yarn build

FROM base AS final

COPY --from=build /app/next.config.js .
COPY --from=build /app/.next ./.next
COPY --from=build /app/public ./public

RUN chown -R node:node /app

USER node

EXPOSE 3001

CMD ["yarn", "start"]
