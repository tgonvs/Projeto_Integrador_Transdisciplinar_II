FROM node:18-alpine AS base

WORKDIR /app

RUN  chown -R node:node /app 

USER node

ENV CI=true

COPY package.json yarn.lock huskyPrepare.js ./

RUN yarn install --prod

COPY prisma ./prisma/

RUN npx prisma generate

FROM base AS build

RUN yarn install

COPY . .

RUN yarn build

FROM base AS prod

ENV NODE_ENV=production \
    PORT=3000

COPY --from=build /app/dist/ ./dist/

EXPOSE 3000

CMD [ "yarn", "start:prod"]
