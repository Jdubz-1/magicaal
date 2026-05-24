# Build context must be the monorepo root:
#   docker build -f apps/engine/Dockerfile .

ARG GIT_SHA

# Stage 1: Build
FROM node:22-alpine AS builder
WORKDIR /monorepo

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable && corepack prepare pnpm@9 --activate

COPY package.json pnpm-workspace.yaml pnpm-lock.yaml ./
COPY packages/core/package.json ./packages/core/package.json
COPY packages/sdk/package.json ./packages/sdk/package.json
COPY apps/engine/package.json ./apps/engine/package.json

RUN pnpm install --frozen-lockfile

COPY tsconfig.base.json ./
COPY packages/core/src ./packages/core/src
COPY packages/core/tsconfig.json ./packages/core/tsconfig.json
COPY packages/sdk/src ./packages/sdk/src
COPY packages/sdk/tsconfig.json ./packages/sdk/tsconfig.json
COPY apps/engine/src ./apps/engine/src
COPY apps/engine/tsconfig.json ./apps/engine/tsconfig.json
COPY apps/engine/tsconfig.build.json ./apps/engine/tsconfig.build.json
WORKDIR /monorepo/apps/engine
RUN pnpm run build

# Stage 2: Runtime
FROM node:22-alpine AS runtime
WORKDIR /app

ENV NODE_ENV=production
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable && corepack prepare pnpm@9 --activate

COPY --from=builder /monorepo/apps/engine/package.json ./package.json
COPY --from=builder /monorepo/package.json /monorepo/pnpm-workspace.yaml /monorepo/pnpm-lock.yaml /monorepo/
COPY --from=builder /monorepo/packages/core/package.json /monorepo/packages/core/
COPY --from=builder /monorepo/packages/sdk/package.json /monorepo/packages/sdk/

RUN cd /monorepo && pnpm install --prod --filter @magicaal/engine

COPY --from=builder /monorepo/apps/engine/dist ./dist

EXPOSE 4000
HEALTHCHECK --interval=10s --timeout=5s --retries=5 \
  CMD wget -qO- http://localhost:4000/health || exit 1
CMD ["node", "dist/index.js"]
