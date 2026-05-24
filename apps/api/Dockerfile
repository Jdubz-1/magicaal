# Build context must be the monorepo root:
#   docker build -f apps/api/Dockerfile .

ARG GIT_SHA

# Stage 1: Build
FROM node:22-alpine AS builder
WORKDIR /monorepo

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable && corepack prepare pnpm@9 --activate

# Copy manifests first — install layer is only invalidated when package files change
COPY package.json pnpm-workspace.yaml pnpm-lock.yaml ./
COPY packages/core/package.json ./packages/core/package.json
COPY apps/api/package.json ./apps/api/package.json

RUN pnpm install --frozen-lockfile

# Build the app
COPY tsconfig.base.json ./
COPY packages/core/src ./packages/core/src
COPY packages/core/tsconfig.json ./packages/core/tsconfig.json
COPY apps/api/src ./apps/api/src
COPY apps/api/tsconfig.json ./apps/api/tsconfig.json
COPY apps/api/tsconfig.build.json ./apps/api/tsconfig.build.json
WORKDIR /monorepo/apps/api
RUN pnpm run build

# Stage 2: Runtime
FROM node:22-alpine AS runtime
WORKDIR /app

ENV NODE_ENV=production
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable && corepack prepare pnpm@9 --activate

COPY --from=builder /monorepo/apps/api/package.json ./package.json
COPY --from=builder /monorepo/package.json /monorepo/pnpm-workspace.yaml /monorepo/pnpm-lock.yaml /monorepo/
COPY --from=builder /monorepo/packages/core/package.json /monorepo/packages/core/

RUN cd /monorepo && pnpm install --prod --filter @magicaal/api

COPY --from=builder /monorepo/apps/api/dist ./dist

EXPOSE 3000
HEALTHCHECK --interval=10s --timeout=5s --retries=5 \
  CMD wget -qO- http://localhost:3000/health || exit 1
CMD ["node", "dist/index.js"]
