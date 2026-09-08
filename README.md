# MagiCaal

[![CI](https://github.com/jdubz-1/magicaal/actions/workflows/ci.yml/badge.svg)](https://github.com/jdubz-1/magicaal/actions/workflows/ci.yml)
[![License: Apache 2.0](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](LICENSE)
[![Release](https://img.shields.io/github/v/release/jdubz-1/magicaal)](https://github.com/jdubz-1/magicaal/releases)

A self-hosted platform for building, deploying, and managing production-ready AI agents. Every agent is a directed graph of typed nodes — visual in the Studio canvas, or defined as TypeScript and compiled to the same runtime format.

- **Two authoring paths, one runtime** — drag-and-drop in Studio or write TypeScript with `@Agent` + `AgentGraph`; both compile to the same `AgentGraphDefinition` schema
- **Multi-provider Model Router** — OpenAI, Anthropic, Google; circuit breaker, 5 routing strategies, reactive triggers (`rate_limit`, `provider_error`, `timeout`, `context_overflow`, `content_policy`, `latency_degraded`, `error_rate`)
- **Production-grade** — multi-tenant RBAC, invocation auth (API key + JWT/JWKS), session management, audit log
- **Caal AI assistant** — built into Studio; explains, suggests, and modifies your graphs via conversation
- **MCP client** — connect any MCP server (stdio or Streamable HTTP); direct and funnel modes; 53+ built-in nodes
- **Fully self-hosted** — Apache 2.0, no cloud dependency, no telemetry, air-gapped Marketplace support

---

## Quick Deploy (5 minutes)

Uses published Docker images — no build required.

```bash
git clone https://github.com/jdubz-1/magicaal.git
cd magicaal/deploy
cp .env.example .env
# Edit .env: set MAGICAAL_MASTER_KEY and JWT_SECRET (both occurrences) to random secrets
#   openssl rand -hex 32
docker compose up -d
```

Open **http://localhost:8080** — Studio is ready.

See [`deploy/README.md`](deploy/README.md) for the full quickstart, upgrade instructions, and troubleshooting.

---

## Architecture

```
Browser
   │ HTTP / SSE
   ▼
apps/api (port 3000)          ← BFF: auth, agent CRUD, engine proxy, boot-sync
   │ internal REST
   ▼
apps/engine (port 4000)       ← Graph execution: Node Registry, Execution Worker, Tool Executor
   │
   ├── SQLite (via Drizzle)   ← Primary DB + Telemetry Store
   └── Redis (BullMQ)         ← Job queue, rate limit counters, session pub/sub
```

```
apps/web (port 8080)  ← Studio canvas + Admin panel (Datastar)
```

---

## Developer Setup

For contributing or building from source:

```bash
# Requires Devbox (pins Node.js 24 LTS + pnpm 9)
devbox shell   # runs pnpm install automatically
cp apps/api/.env.example apps/api/.env
cp apps/engine/.env.example apps/engine/.env
cp apps/web/.env.example apps/web/.env
devbox run dev
```

See [`CONTRIBUTING.md`](CONTRIBUTING.md) for the full contributor guide and coding standards.

---

## What's in this repo

```
apps/
├── api/        @magicaal/api       — BFF Express API (port 3000)
├── engine/     @magicaal/engine    — Agent execution runtime (port 4000)
└── web/        @magicaal/web       — Studio + Admin UI (port 8080)

packages/
├── core/          @magicaal/core       — Shared foundational TypeScript types (types-only)
├── sdk/           @magicaal/sdk-node   — Node authoring SDK (NodeModule, ExecutionContext)
├── sdk-client/    @magicaal/sdk        — npm-published API consumer SDK
├── compiler/      @magicaal/compiler   — Graph-as-Code TypeScript compiler
├── cli/           @magicaal/cli        — magicaal CLI (build, validate, deploy)
└── integrations/
    └── caal/      @magicaal/integration-caal  — Caal AI assistant tools
```

---

## Links

| | |
|---|---|
| Docs | [docs.magicaal.dev](https://docs.magicaal.dev) |
| Roadmap | [ROADMAP.md](ROADMAP.md) |
| Contributing | [CONTRIBUTING.md](CONTRIBUTING.md) |
| Security | [SECURITY.md](SECURITY.md) |
| Changelog | [CHANGELOG.md](CHANGELOG.md) |
| Releases & branches | [RELEASES.md](RELEASES.md) |
| Governance | [GOVERNANCE.md](GOVERNANCE.md) |
| License | [Apache 2.0](LICENSE) |
