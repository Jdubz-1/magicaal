# Build context must be the monorepo root:
#   docker build -f apps/api-service/Dockerfile .

ARG GIT_SHA

# Stage 1: Build
FROM node:20-alpine AS builder
WORKDIR /monorepo

# Copy manifests first — install layer is only invalidated when package files change
COPY package.json package-lock.json* ./
COPY packages/types/package.json ./packages/types/package.json
COPY apps/api-service/package.json ./apps/api-service/package.json

RUN npm ci

# Build the app (types-only packages need no build step)
COPY tsconfig.base.json ./
COPY packages/types/src ./packages/types/src
COPY apps/api-service/src ./apps/api-service/src
COPY apps/api-service/tsconfig.json ./apps/api-service/tsconfig.json
COPY apps/api-service/tsconfig.build.json ./apps/api-service/tsconfig.build.json
WORKDIR /monorepo/apps/api-service
RUN npm run build

# Stage 2: Runtime
FROM node:20-alpine AS runtime
WORKDIR /app

ENV NODE_ENV=production

COPY --from=builder /monorepo/apps/api-service/package.json ./package.json

# Strip devDependencies so npm does not attempt to resolve @workspace/* from the public registry
RUN node -e "const p=require('./package.json');delete p.devDependencies;require('fs').writeFileSync('./package.json',JSON.stringify(p))"

RUN npm install --omit=dev

COPY --from=builder /monorepo/apps/api-service/dist ./dist

EXPOSE 3000
CMD ["node", "dist/index.js"]
