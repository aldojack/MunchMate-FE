ARG NODE_VERSION=24-alpine
# Build Production Build
FROM node:${NODE_VERSION} AS builder

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build
# Serve Production Build
FROM node:${NODE_VERSION} AS runner

ENV NODE_ENV=production

WORKDIR /app

COPY --link --from=builder /app/dist ./dist

RUN --mount=type=cache,target=/root/.npm npm install --global serve@^14.2.6

USER node

EXPOSE 3000

CMD ["serve", "-s", "dist", "-l", "3000"]