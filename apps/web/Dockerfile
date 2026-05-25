# Build context must be the monorepo root:
#   docker build -f apps/web/Dockerfile .

ARG GIT_SHA

# Stage 1: Build
FROM node:22-alpine AS builder
WORKDIR /monorepo

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable && corepack prepare pnpm@9 --activate

COPY package.json pnpm-workspace.yaml pnpm-lock.yaml ./
COPY apps/web/package.json ./apps/web/package.json

RUN pnpm install --frozen-lockfile

COPY tsconfig.base.json ./
COPY apps/web/src ./apps/web/src
COPY apps/web/public ./apps/web/public
COPY apps/web/tsconfig.json ./apps/web/tsconfig.json
COPY apps/web/tsconfig.build.json ./apps/web/tsconfig.build.json
WORKDIR /monorepo/apps/web
RUN pnpm run build

# Stage 2: Runtime
FROM node:22-alpine AS runtime
ENV NODE_ENV=production
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable && corepack prepare pnpm@9 --activate

WORKDIR /monorepo
COPY --from=builder /monorepo/package.json /monorepo/pnpm-workspace.yaml /monorepo/pnpm-lock.yaml ./
COPY --from=builder /monorepo/apps/web/package.json ./apps/web/

RUN pnpm install --prod --frozen-lockfile --filter @magicaal/web

WORKDIR /monorepo/apps/web
COPY --from=builder /monorepo/apps/web/dist ./dist
COPY --from=builder /monorepo/apps/web/public ./public

EXPOSE 8080
HEALTHCHECK --interval=10s --timeout=5s --retries=5 \
  CMD wget -qO- http://localhost:8080/health || exit 1
CMD ["node", "dist/index.js"]
