# Build context must be the monorepo root:
#   docker build -f apps/api/Dockerfile .

ARG GIT_SHA

# Stage 1: Build
FROM node:24-alpine AS builder
WORKDIR /monorepo

# Native module fallback build toolchain: better-sqlite3 and isolated-vm ship
# prebuilt binaries fetched over the network at install time; when that fetch
# is unreachable (restrictive egress, air-gapped CI) node-gyp needs python3 +
# a C/C++ toolchain to compile from source instead of failing outright.
RUN apk add --no-cache python3 make g++

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable && corepack prepare pnpm@9 --activate

# Copy manifests first — install layer is only invalidated when package files change
COPY package.json pnpm-workspace.yaml pnpm-lock.yaml ./
COPY packages/core/package.json ./packages/core/package.json
COPY packages/sdk/package.json ./packages/sdk/package.json
COPY packages/compiler/package.json ./packages/compiler/package.json
COPY packages/cli/package.json ./packages/cli/package.json
COPY packages/nodes/package.json ./packages/nodes/package.json
COPY packages/integrations/core/package.json ./packages/integrations/core/package.json
COPY agents/package.json ./agents/package.json
COPY apps/api/package.json ./apps/api/package.json

RUN pnpm install --frozen-lockfile

# Copy shared source
COPY tsconfig.base.json ./
COPY packages/core/src ./packages/core/src
COPY packages/core/tsconfig.json ./packages/core/tsconfig.json
COPY packages/sdk/src ./packages/sdk/src
COPY packages/sdk/tsconfig.json ./packages/sdk/tsconfig.json
COPY packages/nodes/src ./packages/nodes/src
COPY packages/nodes/tsconfig.json ./packages/nodes/tsconfig.json
COPY packages/nodes/tsconfig.build.json ./packages/nodes/tsconfig.build.json
COPY packages/integrations/core/src ./packages/integrations/core/src
COPY packages/integrations/core/tsconfig.json ./packages/integrations/core/tsconfig.json
COPY packages/integrations/core/tsconfig.build.json ./packages/integrations/core/tsconfig.build.json
WORKDIR /monorepo/packages/nodes
RUN pnpm run build
WORKDIR /monorepo/packages/integrations/core
RUN pnpm run build
WORKDIR /monorepo

# Build CLI + compiler (needed for magicaal build step)
COPY packages/compiler/src ./packages/compiler/src
COPY packages/compiler/tsconfig.json ./packages/compiler/tsconfig.json
COPY packages/compiler/tsconfig.build.json ./packages/compiler/tsconfig.build.json
COPY packages/cli/src ./packages/cli/src
COPY packages/cli/tsconfig.json ./packages/cli/tsconfig.json
COPY packages/cli/tsconfig.build.json ./packages/cli/tsconfig.build.json
WORKDIR /monorepo/packages/compiler
RUN pnpm run build
WORKDIR /monorepo/packages/cli
RUN pnpm run build

# Compile agent definitions
COPY agents /monorepo/agents
WORKDIR /monorepo
RUN node packages/cli/dist/index.js build --agents-dir agents --out-dir dist/agents || true

# Stage: export compiled agents into the agents_dist volume on every container start.
# Alpine-based so the entrypoint can actively copy files, ensuring the volume is
# refreshed on every redeployment (scratch stages only init volumes on first creation).
FROM alpine AS agent-builder
COPY --from=builder /monorepo/dist/agents /agents-src
ENTRYPOINT ["/bin/sh", "-c", "cp -r /agents-src/. /agents-out/ && echo 'Agents synced to volume'"]

# Build the API app
FROM builder AS api-builder
WORKDIR /monorepo/apps/api
COPY apps/api/src ./src
COPY apps/api/drizzle ./drizzle
COPY apps/api/tsconfig.json ./tsconfig.json
COPY apps/api/tsconfig.build.json ./tsconfig.build.json
RUN pnpm run build

# Stage 2: Runtime
FROM node:24-alpine AS runtime
ENV NODE_ENV=production
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable && corepack prepare pnpm@9 --activate

# Same native-module fallback toolchain as the builder stage — this is a
# separate `pnpm install` in a fresh image and needs its own build tools.
RUN apk add --no-cache python3 make g++

WORKDIR /monorepo
COPY --from=api-builder /monorepo/package.json /monorepo/pnpm-workspace.yaml /monorepo/pnpm-lock.yaml ./
COPY --from=api-builder /monorepo/packages/core/package.json ./packages/core/
COPY --from=api-builder /monorepo/packages/nodes/package.json ./packages/nodes/
COPY --from=api-builder /monorepo/packages/integrations/core/package.json ./packages/integrations/core/
COPY --from=api-builder /monorepo/apps/api/package.json ./apps/api/

RUN pnpm install --prod --frozen-lockfile --filter @magicaal/api --filter @magicaal/nodes --filter @magicaal/integration-core

COPY --from=api-builder /monorepo/packages/nodes/dist ./packages/nodes/dist
COPY --from=api-builder /monorepo/packages/integrations/core/dist ./packages/integrations/core/dist

WORKDIR /monorepo/apps/api
COPY --from=api-builder /monorepo/apps/api/dist ./dist
COPY --from=api-builder /monorepo/apps/api/drizzle ./drizzle

EXPOSE 3000
HEALTHCHECK --interval=10s --timeout=5s --retries=5 \
  CMD wget -qO- http://localhost:3000/health || exit 1
CMD ["node", "dist/index.js"]

