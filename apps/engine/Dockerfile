# Build context must be the monorepo root:
#   docker build -f apps/engine/Dockerfile .

ARG GIT_SHA

# Stage 1: Build
FROM node:22-alpine AS builder
WORKDIR /monorepo

# Native module fallback build toolchain: better-sqlite3 and isolated-vm ship
# prebuilt binaries fetched over the network at install time; when that fetch
# is unreachable (restrictive egress, air-gapped CI) node-gyp needs python3 +
# a C/C++ toolchain to compile from source instead of failing outright.
RUN apk add --no-cache python3 make g++

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
COPY packages/integrations/gmail/package.json ./packages/integrations/gmail/package.json
COPY packages/integrations/sendgrid/package.json ./packages/integrations/sendgrid/package.json
COPY packages/integrations/stripe/package.json ./packages/integrations/stripe/package.json
COPY packages/integrations/google-workspace/package.json ./packages/integrations/google-workspace/package.json
COPY packages/integrations/salesforce/package.json ./packages/integrations/salesforce/package.json
COPY packages/integrations/hubspot/package.json ./packages/integrations/hubspot/package.json
COPY packages/integrations/zendesk/package.json ./packages/integrations/zendesk/package.json
COPY packages/integrations/twilio/package.json ./packages/integrations/twilio/package.json
COPY packages/integrations/quickbooks/package.json ./packages/integrations/quickbooks/package.json
COPY packages/integrations/bamboohr/package.json ./packages/integrations/bamboohr/package.json
COPY packages/integrations/shopify/package.json ./packages/integrations/shopify/package.json
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
COPY packages/integrations/gmail/src ./packages/integrations/gmail/src
COPY packages/integrations/gmail/tsconfig.json ./packages/integrations/gmail/tsconfig.json
COPY packages/integrations/gmail/tsconfig.build.json ./packages/integrations/gmail/tsconfig.build.json
COPY packages/integrations/sendgrid/src ./packages/integrations/sendgrid/src
COPY packages/integrations/sendgrid/tsconfig.json ./packages/integrations/sendgrid/tsconfig.json
COPY packages/integrations/sendgrid/tsconfig.build.json ./packages/integrations/sendgrid/tsconfig.build.json
COPY packages/integrations/stripe/src ./packages/integrations/stripe/src
COPY packages/integrations/stripe/tsconfig.json ./packages/integrations/stripe/tsconfig.json
COPY packages/integrations/stripe/tsconfig.build.json ./packages/integrations/stripe/tsconfig.build.json
COPY packages/integrations/google-workspace/src ./packages/integrations/google-workspace/src
COPY packages/integrations/google-workspace/tsconfig.json ./packages/integrations/google-workspace/tsconfig.json
COPY packages/integrations/google-workspace/tsconfig.build.json ./packages/integrations/google-workspace/tsconfig.build.json
COPY packages/integrations/salesforce/src ./packages/integrations/salesforce/src
COPY packages/integrations/salesforce/tsconfig.json ./packages/integrations/salesforce/tsconfig.json
COPY packages/integrations/salesforce/tsconfig.build.json ./packages/integrations/salesforce/tsconfig.build.json
COPY packages/integrations/hubspot/src ./packages/integrations/hubspot/src
COPY packages/integrations/hubspot/tsconfig.json ./packages/integrations/hubspot/tsconfig.json
COPY packages/integrations/hubspot/tsconfig.build.json ./packages/integrations/hubspot/tsconfig.build.json
COPY packages/integrations/zendesk/src ./packages/integrations/zendesk/src
COPY packages/integrations/zendesk/tsconfig.json ./packages/integrations/zendesk/tsconfig.json
COPY packages/integrations/zendesk/tsconfig.build.json ./packages/integrations/zendesk/tsconfig.build.json
COPY packages/integrations/twilio/src ./packages/integrations/twilio/src
COPY packages/integrations/twilio/tsconfig.json ./packages/integrations/twilio/tsconfig.json
COPY packages/integrations/twilio/tsconfig.build.json ./packages/integrations/twilio/tsconfig.build.json
COPY packages/integrations/quickbooks/src ./packages/integrations/quickbooks/src
COPY packages/integrations/quickbooks/tsconfig.json ./packages/integrations/quickbooks/tsconfig.json
COPY packages/integrations/quickbooks/tsconfig.build.json ./packages/integrations/quickbooks/tsconfig.build.json
COPY packages/integrations/bamboohr/src ./packages/integrations/bamboohr/src
COPY packages/integrations/bamboohr/tsconfig.json ./packages/integrations/bamboohr/tsconfig.json
COPY packages/integrations/bamboohr/tsconfig.build.json ./packages/integrations/bamboohr/tsconfig.build.json
COPY packages/integrations/shopify/src ./packages/integrations/shopify/src
COPY packages/integrations/shopify/tsconfig.json ./packages/integrations/shopify/tsconfig.json
COPY packages/integrations/shopify/tsconfig.build.json ./packages/integrations/shopify/tsconfig.build.json
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
WORKDIR /monorepo/packages/integrations/gmail
RUN pnpm run build
WORKDIR /monorepo/packages/integrations/sendgrid
RUN pnpm run build
WORKDIR /monorepo/packages/integrations/stripe
RUN pnpm run build
WORKDIR /monorepo/packages/integrations/google-workspace
RUN pnpm run build
WORKDIR /monorepo/packages/integrations/salesforce
RUN pnpm run build
WORKDIR /monorepo/packages/integrations/hubspot
RUN pnpm run build
WORKDIR /monorepo/packages/integrations/zendesk
RUN pnpm run build
WORKDIR /monorepo/packages/integrations/twilio
RUN pnpm run build
WORKDIR /monorepo/packages/integrations/quickbooks
RUN pnpm run build
WORKDIR /monorepo/packages/integrations/bamboohr
RUN pnpm run build
WORKDIR /monorepo/packages/integrations/shopify
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
COPY --from=builder /monorepo/packages/integrations/gmail/package.json ./packages/integrations/gmail/
COPY --from=builder /monorepo/packages/integrations/gmail/dist ./packages/integrations/gmail/dist
COPY --from=builder /monorepo/packages/integrations/sendgrid/package.json ./packages/integrations/sendgrid/
COPY --from=builder /monorepo/packages/integrations/sendgrid/dist ./packages/integrations/sendgrid/dist
COPY --from=builder /monorepo/packages/integrations/stripe/package.json ./packages/integrations/stripe/
COPY --from=builder /monorepo/packages/integrations/stripe/dist ./packages/integrations/stripe/dist
COPY --from=builder /monorepo/packages/integrations/google-workspace/package.json ./packages/integrations/google-workspace/
COPY --from=builder /monorepo/packages/integrations/google-workspace/dist ./packages/integrations/google-workspace/dist
COPY --from=builder /monorepo/packages/integrations/salesforce/package.json ./packages/integrations/salesforce/
COPY --from=builder /monorepo/packages/integrations/salesforce/dist ./packages/integrations/salesforce/dist
COPY --from=builder /monorepo/packages/integrations/hubspot/package.json ./packages/integrations/hubspot/
COPY --from=builder /monorepo/packages/integrations/hubspot/dist ./packages/integrations/hubspot/dist
COPY --from=builder /monorepo/packages/integrations/zendesk/package.json ./packages/integrations/zendesk/
COPY --from=builder /monorepo/packages/integrations/zendesk/dist ./packages/integrations/zendesk/dist
COPY --from=builder /monorepo/packages/integrations/twilio/package.json ./packages/integrations/twilio/
COPY --from=builder /monorepo/packages/integrations/twilio/dist ./packages/integrations/twilio/dist
COPY --from=builder /monorepo/packages/integrations/quickbooks/package.json ./packages/integrations/quickbooks/
COPY --from=builder /monorepo/packages/integrations/quickbooks/dist ./packages/integrations/quickbooks/dist
COPY --from=builder /monorepo/packages/integrations/bamboohr/package.json ./packages/integrations/bamboohr/
COPY --from=builder /monorepo/packages/integrations/bamboohr/dist ./packages/integrations/bamboohr/dist
COPY --from=builder /monorepo/packages/integrations/shopify/package.json ./packages/integrations/shopify/
COPY --from=builder /monorepo/packages/integrations/shopify/dist ./packages/integrations/shopify/dist
COPY --from=builder /monorepo/apps/engine/package.json ./apps/engine/

RUN pnpm install --prod --frozen-lockfile --filter @magicaal/engine --filter @magicaal/nodes --filter @magicaal/integration-core --filter @magicaal/integration-slack --filter @magicaal/integration-github --filter @magicaal/integration-jira --filter @magicaal/integration-gmail --filter @magicaal/integration-sendgrid --filter @magicaal/integration-stripe --filter @magicaal/integration-google-workspace --filter @magicaal/integration-salesforce --filter @magicaal/integration-hubspot --filter @magicaal/integration-zendesk --filter @magicaal/integration-twilio --filter @magicaal/integration-quickbooks --filter @magicaal/integration-bamboohr --filter @magicaal/integration-shopify

WORKDIR /monorepo/apps/engine
COPY --from=builder /monorepo/apps/engine/dist ./dist

EXPOSE 4000
HEALTHCHECK --interval=10s --timeout=5s --retries=5 \
  CMD wget -qO- http://localhost:4000/health || exit 1
CMD ["node", "dist/index.js"]
