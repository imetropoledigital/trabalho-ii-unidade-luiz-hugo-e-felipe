# Development image
FROM node:20-bullseye as development

WORKDIR /usr/src/app

# Corrigido para o nome correto do arquivo de lock do NPM
COPY package.json ./
COPY package-lock.json ./

RUN npm i

COPY . .

# RUN npm build (descomente se necessário)

# Production image
FROM node:20-bullseye as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package.json ./
COPY package-lock.json ./

RUN npm i --production --frozen-lockfile

COPY --from=development /usr/src/app/dist ./dist

CMD ["node", "dist/main"]
