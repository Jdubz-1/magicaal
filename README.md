# MagiCaal

A self-hosted platform for building, deploying, and managing production-ready AI agents. Every agent is a directed graph of typed nodes — visual in the Studio, or defined as TypeScript and compiled to the same format.

## Quick Start

```bash
# Clone
git clone https://github.com/your-org/magicaal.git
cd magicaal

# Install Devbox if not already installed (run "devbox version" to check first)
devbox version || curl -fsSL https://get.jetify.com/devbox | bash

# Enter devbox shell — Node.js 22 LTS + pnpm activate; deps install automatically
devbox shell

# Configure environment (copy examples for each service)
cp apps/api/.env.example apps/api/.env
cp apps/engine/.env.example apps/engine/.env
cp apps/web/.env.example apps/web/.env

# Start all services
docker compose up --build

# Verify
curl http://localhost:3000/health   # → {"status":"OK","service":"api",...}
curl http://localhost:4000/health   # → {"status":"OK","service":"engine",...}
curl http://localhost:8080/health   # → {"status":"OK","service":"web",...}
```

## What's in this repo

```
apps/
├── api/        # Backend-for-frontend Express API (port 3000)
├── engine/     # Agent execution runtime (port 4000)
└── web/        # Studio + Admin UI — Datastar (port 8080)

packages/
├── core/             # @magicaal/core — shared foundational TypeScript types
├── sdk/              # @magicaal/sdk-node — node authoring SDK (NodeModule, ExecutionContext)
├── sdk-client/       # @magicaal/sdk — public API consumer SDK (@magicaal/sdk on npm)
└── integrations/
    └── caal/         # @magicaal/integration-caal — Caal AI assistant tool package
```

## Documentation

| Guide | Description |
|---|---|
| [DEVELOPMENT.md](DEVELOPMENT.md) | Local setup and common tasks |
| [CONTRIBUTING.md](CONTRIBUTING.md) | Contribution workflow and standards |
| [TECHSTACK.md](TECHSTACK.md) | Library inventory |
| [CLAUDE.md](CLAUDE.md) | AI dev guidance — architecture, patterns, pitfalls |
| [DEVLOG.md](DEVLOG.md) | Significant change history |
| [.ai_docs/](.ai_docs/) | Architecture spec and development roadmap |

---

> **Phase 0 — Foundation**: The monorepo structure, shared types, package scaffolds, and Docker compose are in place. The Studio UI and agent execution are Phase 1+.
