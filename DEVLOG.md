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
