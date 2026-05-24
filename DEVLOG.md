# Development Log

A running record of significant changes. Add an entry after completing any feature, refactor, critical fix, or infrastructure change.

## Entry Format

```markdown
### YYYY-MM-DD - Brief Title

**Type:** Feature | Bugfix | Refactor | Infrastructure | Documentation

**Description:**
What was done and why.

**Changes:**
- Specific change 1 (file path preferred)
- Specific change 2

**Impact:**
How this affects the system, security posture, or developer workflow.

**Notes:** (optional)
Trade-offs, follow-up items, or important context.
```

---

### 2026-05-24 - Phase 1 Milestone Sign-off: Tests, Canvas UX & Config UI

**Type:** Feature

**Description:**
Closed six gaps blocking Phase 1 milestone sign-off: added test suites for all
three packages (83 tests), wired per-node step output in the TestRunPanel,
implemented the trigger config form in AgentConfigPanel, added core:start/end
config blocks in NodeConfigPanel, added canvas pan/zoom and node drag, and
implemented port drag-to-connect edge creation with an edge type picker.

Also fixed a production bug where invalid JWTs returned 500 instead of 401 due
to the jose library throwing without a `status` property.

**Changes:**
- `packages/nodes/package.json` — added jest + ts-jest devDependencies and test scripts
- `packages/nodes/jest.config.ts` — new Jest configuration for nodes package
- `packages/nodes/tests/` — mock context helper + 6 test files (35 tests): jsonata utils, core:start/end/stop/condition/router nodes
- `apps/engine/jest.config.ts` — new Jest configuration for engine
- `apps/engine/tests/setup.ts` — in-memory SQLite + test env vars
- `apps/engine/tests/unit/execution/worker.test.ts` — resolveEdges + executeGraph unit tests (17 tests)
- `apps/engine/tests/unit/graph/graph-loader.test.ts` — cache miss/hit/invalidate tests with mocked better-sqlite3
- `apps/api/tests/helpers/auth-helpers.ts` — reusable createUserAndLogin helper for integration tests
- `apps/api/tests/integration/auth.test.ts` — login/logout/refresh/JWT validation (31 tests across 3 integration files)
- `apps/api/tests/integration/agents.test.ts` — agent CRUD, publish, draft, versions
- `apps/api/tests/integration/runs.test.ts` — async/sync dispatch with mocked engine client
- `apps/api/src/middleware/auth.ts` — bug fix: wrap jwtVerify in try/catch, re-throw with status 401
- `apps/api/src/controllers/agents.controller.ts` — added getAgentConfig + updateAgentConfig handlers
- `apps/api/src/routes/agents.ts` — registered GET/PATCH /:id/config routes
- `apps/web/src/canvas/stores/run.ts` — expanded StepResult type with all fields
- `apps/web/src/canvas/stores/graph.ts` — added agentConfig store + addEdge action
- `apps/web/src/canvas/App.svelte` — fetch agentConfig on mount, populate store
- `apps/web/src/canvas/components/TestRunPanel.svelte` — capture runId, fetch + display step timeline
- `apps/web/src/canvas/components/AgentConfigPanel.svelte` — trigger config form (description + save)
- `apps/web/src/canvas/components/NodeConfigPanel.svelte` — core:start inputSchema textarea, core:end outputKeys input
- `apps/web/src/canvas/components/Canvas.svelte` — pan/zoom (wheel + background drag), node drag, port drag-to-connect with rubber-band line, edge type picker overlay

**Impact:**
Phase 1 milestone requirements are met. All 83 tests pass (35 nodes, 17 engine,
31 API). Canvas is fully interactive: nodes drag, viewport pans and zooms, edges
are created by dragging from output port to input port. The JWT 401 fix
eliminates a silent auth failure in production.

**Notes:**
- AgentGraphDefinition requires version, name, toolEdges, workspaceEdges, config fields — test helpers include all required fields
- jest.mock() hoisting requires using jest.fn() in factory and accessing via require() for engine client mock in runs tests
- Port CSS hover (opacity: 0.4 → 1 on g:hover) uses :global selectors since Svelte's scoped CSS cannot target parent hover for SVG elements

---

### 2026-05-24 - Phase 1: Core Engine & Minimal Studio

**Type:** Feature

**Description:**
Delivered the first end-to-end working loop: a developer can log in, build a
graph in the Studio canvas, publish it, and invoke it via API key. The run
result is visible in the test run panel and queryable via the REST API. An API
consumer can do the same with `@magicaal/sdk`.

**Changes:**
- `apps/api/drizzle/migrations/0001_phase1_schema.sql` — schema alignment: renamed slug→handle, version→version_number, graph_definition→graph_json; added 17 new tables (sessions, mcp_servers, workspaces, marketplace, integrations, platform, prompt-test)
- `apps/api/src/` — JWT auth (argon2 + jose), RBAC middleware (4 roles), full v1 REST API: users, tenants, agents CRUD, publish/draft, runs dispatch/status/steps, invocation key management, nodes list, system health
- `apps/engine/src/` — node registry, graph loader (read-only SQLite, in-memory cache), graph validator, ExecutionContextImpl, BFS execution worker with conditional/fallback edge resolution, BullMQ scheduler (concurrency: 10), lifecycle manager writing to telemetry store, invocation auth (SHA-256 hash, Redis rate limiting), internal REST API
- `packages/nodes/src/` — core:start, core:end, core:stop, core:condition, core:router node implementations with JSONata expression evaluation
- `packages/sdk-client/src/` — MagiCaalClient, AgentClient (invoke/start), RunHandleImpl (wait/cancel/status/steps) with error mapping
- `apps/web/src/` — session middleware, auth pages (login/logout), API proxy, admin pages (users/tenants/agents/system via Datastar), Svelte canvas island (SVG-based node graph, NodePalette, NodeConfigPanel, AgentConfigPanel, TestRunPanel)
- `.env.example` files updated with JWT_SECRET, ENGINE_BASE_URL, API_BASE_URL

**Impact:**
All six sub-phases (A: schema, B: nodes, C: engine, D: API, E: SDK, F: web)
are complete. `docker compose up --build` should boot all four services. The
full invocation path — login → build graph → publish → invoke via SDK or API
key → view run result — is implemented end-to-end. No LLM nodes yet (Phase 2).

**Notes:**
- Engine's tsconfig removes composite project references for packages (types resolve via node_modules `"types": "src/index.ts"`)
- SQLite read-only connection used in engine for graph loading and invocation key validation; telemetry store is a separate SQLite file
- Svelte canvas uses SVG rendering (not @xyflow/svelte) for Phase 1; Svelte Flow can replace it in Phase 2 for drag-to-connect
- Run sync mode polls via setTimeout loop in runs.controller.ts; consider SSE for Phase 2
- Web API proxy at /api/* → /v1/* forwards the user's access_token cookie

---

### 2026-05-24 - Phase 0: MagiCaal Foundation

**Type:** Infrastructure

**Description:**
Transformed the generic Express template into the working MagiCaal monorepo
foundation. Migrated from npm to pnpm workspaces, restructured all apps and
packages under the @magicaal namespace, stood up three new services (api,
engine, web), defined all foundational shared types, scaffolded the SDK
packages, added Drizzle ORM with SQLite, and wired up Docker Compose for
local development.

**Changes:**
- `devbox.json`, `pnpm-workspace.yaml` — switched to pnpm 9; removed package-lock.json
- `apps/api/` — renamed from apps/api-service; added Drizzle ORM, 11-table SQLite schema, migrations, seed script
- `apps/engine/` — new execution runtime skeleton (port 4000)
- `apps/web/` — new static frontend placeholder (port 8080)
- `packages/core/` — renamed from packages/types; populated with all Phase 0 type definitions (8 domain modules, ~80 interfaces)
- `packages/sdk/` — new @magicaal/sdk-node node authoring SDK (types only)
- `packages/sdk-client/` — new @magicaal/sdk-client consumer SDK with dual ESM/CJS build and error hierarchy
- `packages/integrations/caal/` — new CAAL tool package with 17 stub NodeModule implementations
- `docker-compose.yml` — four-service compose (api, engine, web, redis) + shared db_data volume
- `.github/workflows/ci.yml` — full rewrite for pnpm, Node 22, multi-workspace matrix, package build verification
- `CLAUDE.md`, `README.md`, `TECHSTACK.md` — updated for MagiCaal identity and new structure

**Impact:**
`docker compose up --build` boots all four services. `pnpm install` from root
resolves all workspace dependencies. All foundational types are in place for
Phase 1 (auth, agent execution, LLM routing). The database schema is migrated
automatically on API startup via `runMigrations()`. MAGICAAL_MASTER_KEY is
optional in Phase 0 but required before Phase 1 credential encryption.

**Notes:**
- packages/sdk is named @magicaal/sdk-node internally to avoid naming conflict with sdk-client (published as @magicaal/sdk)
- SQLite WAL mode + foreign_keys=ON enforced at client.ts connection time
- apps/web is a placeholder; Datastar integration deferred to Phase 1
- MAGICAAL_PRD.md is still empty — must be completed before Phase 1 auth/user model design

---

### 2026-05-23 - Integrate Devbox as primary environment management tool

**Type:** Infrastructure

**Description:**
Promoted devbox from a placeholder to the first-class dev environment tool. Node.js is now pinned to LTS (22.22.3) via `devbox.json`, and the shell `init_hook` automatically runs `npm install` when `node_modules` is absent — so contributors only need `devbox shell` to be fully ready. Devbox scripts wrap all root workspace commands (`devbox run dev`, `devbox run test`, etc.). All documentation updated to lead with the devbox workflow.

**Changes:**
- `devbox.json` — switch `nodejs@latest` to `nodejs@22` (LTS); add auto-install `init_hook`; add `dev`, `build`, `test`, `test:cov`, `lint`, `type-check`, `format`, `setup` scripts
- `devbox.lock` — regenerated with Node 22.22.3 store paths for all platforms
- `CLAUDE.md`, `GEMINI.md` — add "Environment Setup" section; replace npm command table with `devbox run` commands; add pitfalls for running npm outside shell and forgetting to commit `devbox.lock`; add `devbox` to commit scopes
- `DEVELOPMENT.md` — add Prerequisites section; rewrite "Running Locally" with devbox-first steps; update commands table and common issues
- `README.md`, `CONTRIBUTING.md` — update Quick Start blocks to lead with `devbox version` check and `devbox shell`

**Impact:**
New contributors no longer need to install Node.js manually or know which version to use. `devbox shell` is the single entry point that guarantees a consistent environment. The Node.js version is pinned in source control via `devbox.lock`.

---

### 2026-05-23 - Refactor to npm workspaces monorepo

**Type:** Infrastructure

**Description:**
Restructured the repository from a flat single-service layout into a proper npm workspaces monorepo following `monorepo-standards.md`. The existing Express service moved into `apps/api-service/`, and a types-only shared library placeholder was added at `packages/types/` (`@workspace/types`). Root tooling, CI, Docker, and all AI guidance files were updated to reflect the new structure.

**Changes:**
- `apps/api-service/` — Express service migrated here from root (`src/`, `tests/`, `Dockerfile`, config files)
- `packages/types/` — new `@workspace/types` types-only package scaffold
- `tsconfig.base.json` — new root shared compiler options; per-app tsconfigs extend it
- `package.json` — replaced with workspace root (private, `workspaces: [apps/*, packages/*]`, workspace-targeted scripts)
- `tsconfig.json` — replaced with IDE-only stub (`"files": []`) extending tsconfig.base.json
- `.eslintrc.json` — root now ignores `apps/` and `packages/`; full config moved to `apps/api-service/.eslintrc.json`
- `docker-compose.yml` — updated build context and Dockerfile path
- `.github/workflows/ci.yml` — updated to workspace-targeted lint/type-check/test commands
- `.github/workflows/release.yml` — updated Dockerfile path to `apps/api-service/Dockerfile`
- `CLAUDE.md`, `GEMINI.md` — rewritten for monorepo structure, commands, and patterns
- `README.md`, `DEVELOPMENT.md`, `CONTRIBUTING.md` — updated commands and layout descriptions

**Impact:**
New apps can be added by creating `apps/<name>/` with its own `package.json` and adding workspace-targeted scripts to the root. Shared TypeScript interfaces belong in `packages/types/`. The `package-lock.json` remains a single file at the root, and `npm install` must always be run from the root to maintain workspace symlinks.

---

### 2026-05-04 - Initial scaffold

**Type:** Infrastructure

**Description:**
Created the project template with a full TypeScript/Express foundation. Includes tooling, testing, Docker, CI, and documentation structure ready for a production service.

**Changes:**
- `src/` — Express app with health endpoint, Pino logging, helmet, cors, error handler, 404 handler
- `tests/` — Integration tests (supertest) and unit tests (Jest + ts-jest)
- `Dockerfile` — Multi-stage build: TypeScript compile → slim Node Alpine runtime
- `docker-compose.yml` — Single-service compose with commented infra placeholders
- `.github/workflows/` — CI (lint + type-check + test on PR), release (Docker push on semver tag)
- Root docs — README, CONTRIBUTING, DEVELOPMENT, CLAUDE, TECHSTACK
- `docs/` — Getting-started, developer-guide, API, and reference doc stubs

**Impact:**
New projects can fork this template and be running a type-safe, linted, tested Express service with Docker support within minutes.
