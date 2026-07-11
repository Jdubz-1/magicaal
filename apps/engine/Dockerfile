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
COPY packages/nodes/package.json ./packages/nodes/package.json
COPY packages/integrations/core/package.json ./packages/integrations/core/package.json
COPY packages/integrations/slack/package.json ./packages/integrations/slack/package.json
COPY packages/integrations/github/package.json ./packages/integrations/github/package.json
COPY packages/integrations/jira/package.json ./packages/integrations/jira/package.json
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
COPY packages/integrations/core/src ./packages/integrations/core/src
COPY packages/integrations/core/tsconfig.json ./packages/integrations/core/tsconfig.json
COPY packages/integrations/core/tsconfig.build.json ./packages/integrations/core/tsconfig.build.json
COPY packages/integrations/slack/src ./packages/integrations/slack/src
COPY packages/integrations/slack/tsconfig.json ./packages/integrations/slack/tsconfig.json
COPY packages/integrations/slack/tsconfig.build.json ./packages/integrations/slack/tsconfig.build.json
COPY packages/integrations/github/src ./packages/integrations/github/src
COPY packages/integrations/github/tsconfig.json ./packages/integrations/github/tsconfig.json
COPY packages/integrations/github/tsconfig.build.json ./packages/integrations/github/tsconfig.build.json
COPY packages/integrations/jira/src ./packages/integrations/jira/src
COPY packages/integrations/jira/tsconfig.json ./packages/integrations/jira/tsconfig.json
COPY packages/integrations/jira/tsconfig.build.json ./packages/integrations/jira/tsconfig.build.json
COPY apps/engine/src ./apps/engine/src
COPY apps/engine/tsconfig.json ./apps/engine/tsconfig.json
COPY apps/engine/tsconfig.build.json ./apps/engine/tsconfig.build.json
WORKDIR /monorepo/packages/nodes
RUN pnpm run build
WORKDIR /monorepo/packages/integrations/core
RUN pnpm run build
WORKDIR /monorepo/packages/integrations/slack
RUN pnpm run build
WORKDIR /monorepo/packages/integrations/github
RUN pnpm run build
WORKDIR /monorepo/packages/integrations/jira
RUN pnpm run build
WORKDIR /monorepo/apps/engine
RUN pnpm run build

# Stage 2: Runtime
FROM node:22-alpine AS runtime
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
COPY --from=builder /monorepo/packages/integrations/core/package.json ./packages/integrations/core/
COPY --from=builder /monorepo/packages/integrations/core/dist ./packages/integrations/core/dist
COPY --from=builder /monorepo/packages/integrations/slack/package.json ./packages/integrations/slack/
COPY --from=builder /monorepo/packages/integrations/slack/dist ./packages/integrations/slack/dist
COPY --from=builder /monorepo/packages/integrations/github/package.json ./packages/integrations/github/
COPY --from=builder /monorepo/packages/integrations/github/dist ./packages/integrations/github/dist
COPY --from=builder /monorepo/packages/integrations/jira/package.json ./packages/integrations/jira/
COPY --from=builder /monorepo/packages/integrations/jira/dist ./packages/integrations/jira/dist
COPY --from=builder /monorepo/apps/engine/package.json ./apps/engine/

RUN pnpm install --prod --frozen-lockfile --filter @magicaal/engine --filter @magicaal/nodes --filter @magicaal/integration-core --filter @magicaal/integration-slack --filter @magicaal/integration-github --filter @magicaal/integration-jira

WORKDIR /monorepo/apps/engine
COPY --from=builder /monorepo/apps/engine/dist ./dist

EXPOSE 4000
HEALTHCHECK --interval=10s --timeout=5s --retries=5 \
  CMD wget -qO- http://localhost:4000/health || exit 1
CMD ["node", "dist/index.js"]
