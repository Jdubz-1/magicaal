# Contributing to MagiCaal

Thank you for your interest in contributing. This document covers everything you need to get started: DCO requirements, dev environment setup, coding standards, and the PR process.

---

## Developer Certificate of Origin (DCO)

MagiCaal uses the standard [Developer Certificate of Origin](https://developercertificate.org/) rather than a CLA. It certifies that you have the right to submit your contribution under the project's license — it does **not** grant anyone relicensing rights beyond Apache 2.0, and requires no legal entity or hosted agreement to stand up.

**Every commit must carry a `Signed-off-by` trailer.** Add `-s` when committing:

```bash
git commit -s -m "fix(api): correctly propagate status code in errorHandler"
```

A DCO bot checks every PR commit automatically. If a commit is missing the trailer, amend it (`git commit --amend -s`) and force-push your branch — the bot re-checks and clears the block.

*If a genuine commercial relicensing need arises later, a CLA may be introduced — applying only to contributions made from that point forward, never retroactively.*

---

## Dev Environment Setup

MagiCaal uses [Devbox](https://www.jetify.com/devbox) to pin Node.js 24 LTS and pnpm 9.

```bash
# 1. Clone
git clone https://github.com/magicaal/magicaal.git
cd magicaal

# 2. Enter the dev shell (installs Devbox if needed, then runs pnpm install automatically)
devbox shell

# 3. Copy env files
cp apps/api/.env.example apps/api/.env
cp apps/engine/.env.example apps/engine/.env
cp apps/web/.env.example apps/web/.env

# 4. Start the API with hot reload
devbox run dev
```

**Important:** Never use bare `pnpm` or `node` outside of a `devbox shell` or `devbox run` invocation. The system versions will differ from what the project pins.

```bash
# ✅ Correct — run arbitrary pnpm commands inside devbox
devbox run -- pnpm --filter @magicaal/api run test

# ✅ Correct — run named devbox scripts
devbox run build
devbox run lint

# ❌ Wrong — system pnpm may be a different version
pnpm install
```

---

## Monorepo Layout

```
apps/
  api/       @magicaal/api       — BFF Express API (port 3000)
  engine/    @magicaal/engine    — Agent execution runtime (port 4000)
  web/       @magicaal/web       — Studio + Admin UI (port 8080)

packages/
  core/         @magicaal/core       — Shared foundational types (types-only, no runtime)
  sdk/          @magicaal/sdk-node   — Node authoring SDK (NodeModule, ExecutionContext)
  sdk-client/   @magicaal/sdk        — Published API consumer SDK
  compiler/     @magicaal/compiler   — TypeScript Graph-as-Code compiler
  cli/          @magicaal/cli        — magicaal CLI
  integrations/
    caal/       @magicaal/integration-caal  — Caal AI assistant tool package
```

All internal dependencies use the `workspace:*` protocol:
```json
{ "@magicaal/core": "workspace:*" }
```

Always import from `@magicaal/core` with `import type` — it is types-only and will fail at runtime otherwise:
```typescript
import type { AgentGraphDefinition } from '@magicaal/core'; // ✅
import { AgentGraphDefinition } from '@magicaal/core';      // ❌ fails at runtime
```

---

## Coding Standards

### Config

All environment variables are centralised in each app's `src/config.ts`. Never call `process.env` directly in business logic:

```typescript
// ✅ Read from config
import { config } from '../config';
const path = config.databasePath;

// ❌ Never do this
const path = process.env.DATABASE_URL;
```

### Error Handling

Controllers throw; `errorHandler` catches. Don't write error responses in controller catch blocks:

```typescript
// ✅ Let the error propagate
export const myHandler: RequestHandler = async (req, res, next) => {
  try {
    const data = await doSomething();
    res.json(data);
  } catch (err) {
    next(err);
  }
};

// To return a specific HTTP status:
const err = Object.assign(new Error('Not found'), { status: 404 });
throw err;
```

### Database

Use Drizzle ORM. Never write raw SQL outside of migration files:

```typescript
// ✅ Use Drizzle
import { db } from '@/db/client';
import { agents } from '@/db/schema';
const rows = await db.select().from(agents).where(eq(agents.tenantId, tenantId));

// ❌ No raw SQL
sqlite.prepare('SELECT * FROM agents').all();
```

### Comments

Write no comments by default. Add a comment only when the **why** is non-obvious: a hidden constraint, a workaround for a specific bug, or behavior that would surprise a future reader. Never explain what the code does — well-named identifiers do that.

---

## What Requires an RFC

Changes in these categories should get a [Request for Comments (RFC)](rfcs/0000-template.md) before implementation. This is currently a self-serve design-note practice — write it, merge it when ready, no mandatory discussion window — see [GOVERNANCE.md](GOVERNANCE.md) for the full process.

**Requires an RFC:**
- New node type or node category
- `AgentGraphDefinition` schema change (breaking or additive)
- `NodeModule` or `ExecutionContext` interface change (`packages/sdk`)
- Public API shape change (`/v1/` routes) — breaking or additive
- Marketplace package format change
- New Engine subsystem
- New external dependency in an npm-published package

**Does not require an RFC:**
- Bug fixes
- Performance improvements with no interface change
- New integration packages conforming to the existing format
- Documentation improvements
- Tooling changes (devbox, CI, Dependabot)

---

## Testing

- **Unit tests** — for node implementations in `packages/nodes`
- **Integration tests** — for API routes in `apps/api/tests/integration/` (uses Supertest against a real SQLite database, not mocks)
- **Coverage** — Jest enforces 80% coverage. Check before pushing: `devbox run test:cov`

```bash
devbox run test           # Run all tests
devbox run test:cov       # Tests with coverage report
devbox run -- pnpm --filter @magicaal/api run test   # Single workspace
```

---

## Branch Strategy

MagiCaal uses a two-branch flow: `DEV-main` → `main`. All development and testing happens on `DEV-main`; `main` only receives code that's ready to release.

```
feat/api/xyz  ─┐
feat/engine/xyz─┤──→ DEV-main ──→ main ──→ vX.Y.Z tag
fix/web/xyz   ─┘
```

| Branch | Purpose |
|---|---|
| `main` | Production-ready; every merge is tagged and released |
| `DEV-main` | Primary integration + testing branch; all feature PRs target this |
| `feat/*`, `fix/*` | Short-lived; branch off `DEV-main`, PR back to `DEV-main` |
| `hotfix/*` | Emergency fixes only; branch off `main`, PR back to `main`, then back-merged into `DEV-main` |

**OSS contributors always target `DEV-main`**, never `main` directly.

Branch naming: `feat/<scope>/<description>`, `fix/<scope>/<description>`, `hotfix/<description>` — where `<scope>` matches a conventional commit scope (`api`, `engine`, `web`, `nodes`, etc.).

For the full release flow (how `DEV-main` promotes to `main`, how tags are cut, RC process, hotfix procedure, versioning rules, and CI/CD trigger table) see **[RELEASES.md](RELEASES.md)**.

---

## Commit Standards

Format: `<type>(<scope>): <subject>`

**Types:** `feat`, `fix`, `refactor`, `test`, `docs`, `ci`, `chore`, `perf`

**Valid scopes:**
`api`, `engine`, `web`, `core`, `sdk`, `nodes`, `integrations`, `caal`, `compiler`, `cli`, `middleware`, `config`, `tests`, `docs`, `ci`, `docker`, `devbox`

```bash
feat(api): add session expiry endpoint
fix(engine): correctly resume suspended runs after restart
feat(nodes): add core:budget-guard node
docs(governance): add Core Maintainer process
ci(release): add npm publish job
```

Commit messages describe **why**, not **what**. The diff shows what changed.

---

## Pull Request Process

1. Fork the repo and create a feature branch off `DEV-main`
2. Commit with `git commit -s` so every commit carries a DCO `Signed-off-by` trailer
3. Write tests for your change
4. Run `devbox run lint`, `devbox run type-check`, and `devbox run test` — all must pass
5. Add a `CHANGELOG.md` entry if the change is user-visible
6. Open a PR targeting `DEV-main`, using the PR template
7. Address review feedback; the DCO bot will auto-clear once every commit is signed off

The BDFL reviews and merges. Response time is typically 1–3 business days. See [GOVERNANCE.md](GOVERNANCE.md) for merge authority details.

---

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

## Adding a New Node Type

Node implementations live in `packages/nodes/src/<category>/<type>/`. Each node module exports a `NodeModule<TConfig>` from `@magicaal/sdk-node`. See an existing node for the pattern (e.g., `packages/nodes/src/core/llm-call/`).

New node types or categories require an RFC if they introduce a new category or change the `NodeModule` interface. Adding a node within an existing category does not require an RFC.

---

## Schema Migrations

1. Edit schema files in `apps/api/src/db/schema/`
2. Generate the migration: `devbox run -- pnpm --filter @magicaal/api exec drizzle-kit generate`
3. Commit both the schema change and the generated migration file together

Migrations run automatically at API startup before `app.listen()`.

---

## Docker

Build from the **monorepo root**:

```bash
docker build -f apps/api/Dockerfile .
docker build -f apps/engine/Dockerfile .
docker build -f apps/web/Dockerfile .
```

Building from inside an app directory will fail because `COPY` of `packages/` requires the monorepo root as the build context.

---

## Questions?

- **GitHub Discussions** — [github.com/magicaal/magicaal/discussions](https://github.com/magicaal/magicaal/discussions)
- **Discord** — [discord.gg/magicaal](https://discord.gg/magicaal) — `#contributors` channel
- **Security issues** — see [SECURITY.md](SECURITY.md), never file as a public issue
