# Development Guide

Local setup, commands, and common issues for the MagiCaal monorepo. For contribution process, DCO, and branch strategy, see [CONTRIBUTING.md](CONTRIBUTING.md). For architectural rules and patterns, see [CLAUDE.md](CLAUDE.md).

## Prerequisites

Install [Devbox](https://www.jetify.com/devbox) once on your machine. It pins Node.js 24 LTS and pnpm 9 for this project — no other manual tool installation needed.

```bash
# Check if devbox is already installed
devbox version

# If not installed, run the installer
curl -fsSL https://get.jetify.com/devbox | bash
```

Optionally, for the Docker Compose quickstart: **Docker** and **Docker Compose**.

## Monorepo Layout

```
magicaal/
├── package.json              # Workspace root — private, pnpm
├── pnpm-workspace.yaml       # apps/*, packages/*, packages/integrations/*, agents
├── tsconfig.base.json        # Shared TypeScript compiler options
│
├── apps/
│   ├── api/                  # @magicaal/api    — BFF Express API (port 3000)
│   ├── engine/                # @magicaal/engine — Graph execution runtime (port 4000)
│   └── web/                   # @magicaal/web    — Studio (Svelte canvas) + Admin (Datastar) (port 8080)
│
├── packages/
│   ├── core/                  # @magicaal/core        — shared foundational types, no build step
│   ├── sdk/                   # @magicaal/sdk-node     — node authoring SDK (NodeModule, ExecutionContext)
│   ├── sdk-client/            # @magicaal/sdk          — published API consumer SDK (dual ESM/CJS)
│   ├── compiler/              # @magicaal/compiler     — Graph-as-Code TypeScript compiler
│   ├── cli/                   # @magicaal/cli          — magicaal CLI (build, generate, list, sessions, validate)
│   ├── nodes/                 # @magicaal/nodes        — 50 built-in core:* node implementations
│   └── integrations/          # 16 packages: core, caal, + 14 vendor integrations (slack, github, stripe, ...)
│
├── agents/                    # Graph-as-Code agent definitions, compiled to /agents JSON at build time
├── deploy/                    # Docker Compose quickstart (published images, no build required)
├── rfcs/                      # Design notes for changes listed in CONTRIBUTING.md "What Requires an RFC"
├── .github/workflows/         # CI and release pipelines
├── docker-compose.yml         # Local dev compose (builds from source)
└── docs/                      # All documentation
```

Each app follows the same layered structure inside `src/`: `routes/` → `controllers/` → business logic, plus `middleware/`, `lib/`, and `config.ts`. See [CLAUDE.md](CLAUDE.md) for the request lifecycle and layer-responsibility rules.

## Development Commands

All commands run from the **monorepo root**, inside the devbox shell:

| Command | Description |
|---|---|
| `devbox shell` | Enter dev environment (Node.js 24 LTS, auto-runs `pnpm install`) |
| `devbox run dev` | Start `apps/api` with hot reload (nodemon) |
| `devbox run build` | Compile `apps/api` TypeScript to `dist/` |
| `devbox run type-check` | Type-check `apps/api` without emitting |
| `devbox run lint` | Lint `apps/api` |
| `devbox run test` | Run the `apps/api` Jest suite |
| `devbox run test:cov` | Run tests with coverage report |
| `devbox run format` | Format all files with Prettier |
| `devbox run setup` | Re-run `pnpm install` (after adding packages) |
| `devbox run magicaal` | Run the built CLI (`node packages/cli/dist/index.js`) |

`devbox run <script>` only targets `apps/api` (see `devbox.json`). To run `apps/engine`, `apps/web`, or any package directly, use `devbox run -- pnpm --filter <name> run <script>`:

```bash
devbox run -- pnpm --filter @magicaal/engine run dev
devbox run -- pnpm --filter @magicaal/web run dev
devbox run -- pnpm --filter @magicaal/sdk-client run build
devbox run -- pnpm --filter @magicaal/api run test
```

Root-level convenience scripts also exist in `package.json` (`pnpm run dev:api`, `dev:engine`, `dev:web`, `build`, etc.) — always invoke them via `devbox run -- pnpm run <script>`, never bare `pnpm`.

## Environment Setup

Each app has its own env file — there is no single root `.env.example`.

```bash
cp apps/api/.env.example apps/api/.env
cp apps/engine/.env.example apps/engine/.env
cp apps/web/.env.example apps/web/.env
```

Minimum required across `apps/api` and `apps/engine`: `MAGICAAL_MASTER_KEY` and `JWT_SECRET` (generate both with `openssl rand -hex 32`). The full variable reference, grouped by app, is in [docs/reference/README.md](docs/reference/README.md).

## Running Locally

```bash
# 1. Install Devbox if not already installed
devbox version || curl -fsSL https://get.jetify.com/devbox | bash

# 2. Enter the dev shell — Node.js 24 LTS activates and pnpm install runs automatically
devbox shell

# 3. Configure environment (see above)

# 4. Start each service in its own terminal, all inside the devbox shell
devbox run dev                                          # apps/api  :3000
devbox run -- pnpm --filter @magicaal/engine run dev     # apps/engine :4000
devbox run -- pnpm --filter @magicaal/web run dev        # apps/web  :8080

# 5. Verify
curl http://localhost:3000/health
curl http://localhost:4000/health
```

For a faster path that doesn't require building from source, use the Docker Compose quickstart in [`deploy/README.md`](deploy/README.md) — published images, `docker compose up -d`, ready in a few minutes.

## Docker Build (from source)

Each app has its own Dockerfile. The build context must always be the **monorepo root** so Docker can `COPY` from `packages/`.

```bash
# ✅ Correct — build context is monorepo root
docker build -f apps/api/Dockerfile -t magicaal-api .
docker build -f apps/engine/Dockerfile -t magicaal-engine .
docker build -f apps/web/Dockerfile -t magicaal-web .

# ❌ Wrong — build context is the app dir, COPY of packages/ will fail
docker build apps/api/
```

`docker-compose.yml` at the repo root builds all three services plus `redis` from source for local development; `deploy/docker-compose.yml` instead pulls published images.

## Adding a New Route

```
apps/api/src/routes/<name>.ts                   → Router definition
apps/api/src/controllers/<name>.controller.ts   → Request handlers
apps/api/tests/integration/<name>.test.ts       → Supertest integration tests
```

Register in `apps/api/src/routes/index.ts`:
```typescript
router.use('/v1/<name>', <name>Router);
```

Then add the path to `apps/api/src/openapi/spec.ts` — it's the source for the published API reference at `GET /v1/openapi.json` and for `docs/developer-guide/api/README.md`.

## Adding a New Node Type

Node implementations live in `packages/nodes/src/nodes/`. Each exports a `NodeModule<TConfig>` from `@magicaal/sdk-node`. See `docs/developer-guide/node-authoring.md` and any existing `core-*.ts` file for the pattern. New node categories require an RFC — see [CONTRIBUTING.md](CONTRIBUTING.md#what-requires-an-rfc).

## Schema Migrations

1. Edit schema files in `apps/api/src/db/schema/`
2. Generate the migration: `devbox run -- pnpm --filter @magicaal/api exec drizzle-kit generate`
3. Commit both the schema change and the generated migration file together

Migrations run automatically at API startup, before `app.listen()`.

## Common Issues

| Issue | Cause | Fix |
|---|---|---|
| `node: command not found` | Not inside the devbox shell | Run `devbox shell` |
| Node version mismatch | Running pnpm/node from the host shell | Always use `devbox shell` or `devbox run -- <cmd>` |
| `Cannot find module '@magicaal/...'` | `pnpm install` run from inside a workspace instead of the monorepo root | Always run `pnpm install` (or `devbox run setup`) from the monorepo root |
| `Missing required environment variable: X` | A required env var is absent in `apps/<app>/.env` | Add it; see `apps/<app>/src/config.ts` and `apps/<app>/.env.example` |
| Plain `import` of a `@magicaal/core` type fails at runtime | Core is types-only | Always `import type { ... } from '@magicaal/core'` |
| Hot reload not triggering | File saved outside `src/` | nodemon watches `src/` only in each app's `nodemon.json` |
| `Cannot find module '@/...'` | Path aliases not registered | `ts-node` must run with `-r tsconfig-paths/register` (already wired into each app's `nodemon.json` / `db:migrate` / `seed` scripts) |
| Docker build fails: cannot `COPY packages/` | Build context is the app dir, not monorepo root | Run `docker build -f apps/<app>/Dockerfile .` from the repo root |
| Tests fail with type errors | tsconfig mismatch | Run `devbox run -- pnpm --filter @magicaal/<app> run type-check` for full diagnostics |
| `NODE_MODULE_VERSION` mismatch after a Node major bump | `better-sqlite3`/`isolated-vm` native bindings tied to the old ABI reused from pnpm's store | `rm -rf node_modules` at every workspace root, then reinstall |
