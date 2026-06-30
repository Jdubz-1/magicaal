# Build context must be the monorepo root:
#   docker build -f apps/engine/Dockerfile .

ARG GIT_SHA

# Stage 1: Build
FROM node:26-alpine AS builder
WORKDIR /monorepo

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable && corepack prepare pnpm@9 --activate

COPY package.json pnpm-workspace.yaml pnpm-lock.yaml ./
COPY packages/core/package.json ./packages/core/package.json
COPY packages/sdk/package.json ./packages/sdk/package.json
COPY packages/nodes/package.json ./packages/nodes/package.json
COPY apps/engine/package.json ./apps/engine/package.json

RUN pnpm install --frozen-lockfile

COPY tsconfig.base.json ./
COPY packages/core/src ./packages/core/src
COPY packages/core/tsconfig.json ./packages/core/tsconfig.json
COPY packages/sdk/src ./packages/sdk/src
COPY packages/sdk/tsconfig.json ./packages/sdk/tsconfig.json
COPY packages/nodes/src ./packages/nodes/src
COPY packages/nodes/tsconfig.json ./packages/nodes/tsconfig.json
COPY packages/nodes/tsconfig.build.json ./packages/nodes/tsconfig.build.json
COPY apps/engine/src ./apps/engine/src
COPY apps/engine/tsconfig.json ./apps/engine/tsconfig.json
COPY apps/engine/tsconfig.build.json ./apps/engine/tsconfig.build.json
WORKDIR /monorepo/packages/nodes
RUN pnpm run build
WORKDIR /monorepo/apps/engine
RUN pnpm run build

# Stage 2: Runtime
FROM node:26-alpine AS runtime
ENV NODE_ENV=production
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable && corepack prepare pnpm@9 --activate

WORKDIR /monorepo
COPY --from=builder /monorepo/package.json /monorepo/pnpm-workspace.yaml /monorepo/pnpm-lock.yaml ./
COPY --from=builder /monorepo/packages/core/package.json ./packages/core/
COPY --from=builder /monorepo/packages/sdk/package.json ./packages/sdk/
COPY --from=builder /monorepo/packages/nodes/package.json ./packages/nodes/
COPY --from=builder /monorepo/packages/nodes/dist ./packages/nodes/dist
COPY --from=builder /monorepo/apps/engine/package.json ./apps/engine/

RUN pnpm install --prod --frozen-lockfile --filter @magicaal/engine --filter @magicaal/nodes

WORKDIR /monorepo/apps/engine
COPY --from=builder /monorepo/apps/engine/dist ./dist

EXPOSE 4000
HEALTHCHECK --interval=10s --timeout=5s --retries=5 \
  CMD wget -qO- http://localhost:4000/health || exit 1
CMD ["node", "dist/index.js"]
