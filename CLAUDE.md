# CLAUDE.md

This file provides guidance to Claude Code when working with code in this repository.

## Monorepo Structure

```
magicaal/
├── package.json              # Workspace root — private, pnpm
├── pnpm-workspace.yaml       # pnpm workspace declarations
├── tsconfig.base.json        # Shared TypeScript compiler options
├── tsconfig.json             # Root project references (tsc --build)
│
├── apps/
│   ├── api/                  # @magicaal/api — BFF Express API (port 3000)
│   ├── engine/               # @magicaal/engine — Agent execution runtime (port 4000)
│   └── web/                  # @magicaal/web — Studio + Admin UI (port 8080)
│
├── packages/
│   ├── core/                 # @magicaal/core — shared foundational types, no build step
│   ├── sdk/                  # @magicaal/sdk-node — node authoring SDK (NodeModule, ExecutionContext)
│   ├── sdk-client/           # @magicaal/sdk-client (published as @magicaal/sdk) — API consumer SDK
│   └── integrations/
│       └── caal/             # @magicaal/integration-caal — Caal AI assistant tool package
│
└── docs/
```

**Workspace rules:**
- Always run `pnpm install` from the **monorepo root** — never from inside a workspace.
- `packages/` holds shared libraries only; `apps/` holds runnable services.
- `@magicaal/core` is types-only — import with `import type { ... } from '@magicaal/core'`.
- All workspace deps use `"workspace:*"` protocol: `"@magicaal/core": "workspace:*"`.

## Environment Setup

This repo uses [Devbox](https://www.jetify.com/devbox) to manage the dev environment. Devbox pins Node.js 22 LTS + pnpm 9 and runs `pnpm install` automatically on shell entry.

```bash
# Check if devbox is already installed
devbox version

# If not installed, run the installer (one-time, system-level)
curl -fsSL https://get.jetify.com/devbox | bash

# Enter the dev shell — Node.js 22 LTS + pnpm activate; deps install automatically
devbox shell

# Copy environment files before starting services
cp apps/api/.env.example apps/api/.env
cp apps/engine/.env.example apps/engine/.env
cp apps/web/.env.example apps/web/.env
```

## Development Commands

All commands are run from the **monorepo root**, inside the devbox shell:

| Command | Purpose |
|---|---|
| `devbox shell` | Enter the dev environment |
| `devbox run dev` | Start `apps/api` with hot reload |
| `devbox run build` | Compile `apps/api` TypeScript to `dist/` |
| `devbox run type-check` | Type-check `apps/api` without emitting |
| `devbox run lint` | ESLint check on `apps/api` |
| `devbox run test` | Run `apps/api` Jest test suite |
| `devbox run test:cov` | Tests with coverage report |
| `devbox run format` | Prettier format all files |
| `devbox run setup` | Re-run `pnpm install` (after adding packages) |

Per-workspace pnpm commands — always prefix with `devbox run --` so the correct Node.js and pnpm versions are on PATH:
```bash
devbox run -- pnpm --filter @magicaal/api run dev
devbox run -- pnpm --filter @magicaal/engine run dev
devbox run -- pnpm --filter @magicaal/sdk-client run build
devbox run -- pnpm install
```

`devbox run <script>` runs a named script from `devbox.json`. `devbox run -- <cmd>` runs any arbitrary command inside the devbox environment (correct Node/pnpm on PATH, init_hook applied). Never use bare `pnpm` or `node` without one of these prefixes — the system versions will differ.
## External Library Documentation

Use the **context7 MCP** (`mcp__context7__resolve-library-id` + `mcp__context7__query-docs`) whenever you need current documentation for any external dependency or service — including but not limited to Datastar, Svelte, Express, Node.js, TypeScript, `@anthropic-ai/sdk`, and Docker. Do not rely solely on training data for API signatures, configuration options, or version-specific behaviour; fetch the docs instead.

## Architecture Overview

Three Express services plus shared packages. Communication:

```
Browser ──HTTP/SSE──► apps/api ──internal REST──► apps/engine
                          │
                     Primary DB (SQLite)
                          │
                     Job Queue (BullMQ + Redis, Phase 1)
```

| App/Package | Responsibility |
|---|---|
| `apps/api` | BFF: auth, agent CRUD, Studio/Admin data layer, engine proxy, boot-time sync |
| `apps/engine` | Graph execution runtime: node registry, graph loader, execution worker |
| `apps/web` | Studio canvas editor + Admin panel (Datastar, Phase 1+) |
| `packages/core` | All shared foundational TypeScript types — zero runtime code |
| `packages/sdk` | NodeModule/ExecutionContext/ProviderAdapter interfaces for node authors |
| `packages/sdk-client` | `@magicaal/sdk` npm package — API consumer client (dual ESM/CJS) |
| `packages/integrations/caal` | Caal AI assistant tool stubs (Phase 4) |

Each app follows the same request lifecycle:
```
Client → helmet → cors → json → requestLogger → router → controller → response
                                                                  ↓ (on error)
                                                            errorHandler
```

## Config Pattern

All environment variables are centralised in `src/config.ts`. Never call `process.env` directly in business logic.

```typescript
// apps/api/src/config.ts
export function requireEnv(key: string): string {
  const val = process.env[key];
  if (!val) throw new Error(`Missing required environment variable: ${key}`);
  return val;
}

export const config = Object.freeze({
  port: parseInt(process.env.PORT ?? '3000', 10),
  databasePath: requireEnv('DATABASE_URL'),
  // Required vars throw at startup — fast failure
});

// ✅ Correct — always read from config
import { config } from '../config';
const path = config.databasePath;

// ❌ Never do this
const path = process.env.DATABASE_URL;
```

## Database Pattern

All DB access goes through Drizzle ORM in `apps/api/src/db/`. Schema is in `src/db/schema/`. Migrations live in `apps/api/drizzle/migrations/` and run automatically at API startup before `app.listen()`.

```typescript
// ✅ Correct — use the Drizzle client
import { db } from '@/db/client';
import { agents } from '@/db/schema';
const rows = await db.select().from(agents).where(eq(agents.tenantId, tenantId));

// ❌ Never — raw SQL outside migrations
sqlite.prepare('SELECT * FROM agents').all();
```

**Migration workflow:**
```bash
# Edit schema files, then generate the migration
devbox run -- pnpm --filter @magicaal/api exec drizzle-kit generate

# Commit both the schema change and the generated migration file
```

## Error Handling Pattern

Controllers throw; `errorHandler` catches. Do not write error responses in controller catch blocks.

```typescript
// ✅ Correct — let the error propagate
export const myHandler: RequestHandler = async (req, res, next) => {
  try {
    const data = await doSomething();
    res.json(data);
  } catch (err) {
    next(err);
  }
};
```

To return a specific HTTP status, attach `status` to the thrown error:
```typescript
const err = Object.assign(new Error('Not found'), { status: 404 });
throw err;
```

## Auth Pattern (Phase 1+)

When adding auth middleware:
1. Create `src/middleware/auth.ts` implementing `RequestHandler`
2. Extend `Express.Request` in `src/types/express.d.ts` with the verified payload type
3. Read the verified payload from `req.user` in controllers — **never** from URL params or body

## TypeScript Conventions

- `strict: true` — no implicit `any`
- Explicit return types on all exported functions
- Path alias `@/*` resolves to `src/*` in each app — use it for imports crossing multiple directories
- `import type` for ALL `@magicaal/core` imports — types are erased at compile time; plain `import` will fail at runtime in Docker
- `workspace:*` protocol for all internal workspace dependencies

## Adding a New Route

```
apps/api/src/routes/<name>.ts                   → Router definition
apps/api/src/controllers/<name>.controller.ts   → Request handlers
apps/api/tests/integration/<name>.test.ts       → Supertest integration tests
```

Register in `apps/api/src/routes/index.ts`:
```typescript
router.use('/<name>', <name>Router);
```

## Docker

Always build from the **monorepo root**:

```bash
# ✅ Correct
docker build -f apps/api/Dockerfile .
docker build -f apps/engine/Dockerfile .
docker build -f apps/web/Dockerfile .

# ❌ Wrong — build context is wrong, COPY of packages/ will fail
docker build apps/api/
```

All Dockerfiles use `corepack enable && corepack prepare pnpm@9 --activate` to get pnpm in the Alpine image. They copy `pnpm-lock.yaml` and run `pnpm install --frozen-lockfile`.

## Commit Standards

Format: `<type>(<scope>): <subject>`

**No AI attribution in commits.** Do not include `Co-Authored-By: Claude`, `Generated with Claude Code`, or any reference to AI assistance.

Scopes: `api`, `engine`, `web`, `core`, `sdk`, `nodes`, `integrations`, `caal`, `compiler`, `cli`, `middleware`, `config`, `tests`, `docs`, `ci`, `docker`, `devbox`

```bash
feat(api): add agents CRUD endpoints
feat(engine): implement graph loader and execution worker
fix(api): correctly propagate status code in errorHandler
feat(core): add SessionConfig types
test(api): add integration tests for agents endpoints
docs(developer-guide): add architecture decision record
ci(docker): cache pnpm install layer in release workflow
chore(devbox): add ripgrep to dev environment
```

## Common Pitfalls

1. **`pnpm install` inside a workspace**: Always run from the monorepo root. Running inside a workspace breaks symlinks for `@magicaal/*` packages.

2. **`process.env` outside config.ts**: Always use `config` from `src/config.ts`. Bare `process.env` calls scatter configuration.

3. **Plain `import` from `@magicaal/core`**: Always use `import type`. Core is types-only; a plain `import` will fail in the Docker runtime image.

4. **`outDir` confusion**: Type-checking uses `tsconfig.json` (no `outDir`). Building uses `tsconfig.build.json`. Run `pnpm run build` — not `tsc` directly.

5. **Docker build missing `pnpm-lock.yaml`**: The Dockerfiles use `pnpm install --frozen-lockfile`. Always commit `pnpm-lock.yaml`.

6. **Test coverage below threshold**: Jest enforces 80% coverage. Check `pnpm run test:cov` before pushing.

7. **Wrong Docker build context**: Always run `docker build -f apps/<name>/Dockerfile .` from the monorepo root.

8. **Running pnpm without devbox**: Never use bare `pnpm` or `node` — the system versions will differ from what devbox pins. Use `devbox run <script>` for named scripts or `devbox run -- pnpm <args>` for arbitrary pnpm commands. Do **not** manually export nix store paths like `export PATH="/nix/store/..."` — that is fragile and breaks when devbox packages are updated.

9. **Changing devbox packages without committing `devbox.lock`**: After `devbox add` or `devbox rm`, commit both `devbox.json` and `devbox.lock`.

10. **Switching the devbox `nodejs` version doesn't rebuild native modules**: `better-sqlite3` and `isolated-vm` ship native `.node` binaries tied to a specific Node ABI. After bumping `nodejs@22` → `nodejs@24` (or any major change) in `devbox.json`, a plain `pnpm install` reuses the old-ABI binary from pnpm's content-addressable store and fails at runtime with `NODE_MODULE_VERSION` mismatch — even `pnpm install --force` doesn't reliably fix this. Delete the specific package's store entry (or `rm -rf node_modules` at every workspace root) and reinstall.

11. **Sending a response after `next(err)`**: Calling `next(err)` hands control to `errorHandler`. Any `res.json()` after that triggers "headers already sent".

12. **Middleware order in `app.ts`**: `requestLogger` must come before routes; `notFound` and `errorHandler` must be last, in that order.

## Development Tracking

All significant work must be logged in `DEVLOG.md` immediately after completion.

**When to add an entry:** new features, refactors, critical bug fixes, infrastructure changes, security changes, substantial documentation additions.

**Entry format:**
```markdown
### YYYY-MM-DD - Brief Title

**Type:** Feature | Bugfix | Refactor | Infrastructure | Documentation

**Description:**
What was done and why.

**Changes:**
- Specific change (file path preferred)

**Impact:**
Effect on the system, security, or developer workflow.
```

**Workflow:** Complete work → commit with conventional commit → add DEVLOG entry → commit devlog as `docs(devlog): ...`
