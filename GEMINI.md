# GEMINI.md

This file provides guidance to the Gemini CLI when working with code in this repository.

## Monorepo Structure

```
webgentic-template-monorepo/
├── package.json              # Workspace root — private, declares workspaces
├── tsconfig.base.json        # Shared TypeScript compiler options
│
├── packages/
│   └── types/                # @workspace/types — shared interfaces, no build step
│
├── apps/
│   └── api-service/          # Express API service
│       ├── src/
│       ├── tests/
│       └── Dockerfile
│
└── docs/
```

**Workspace rules:**
- Always run `npm install` from the **monorepo root** — never from inside a workspace.
- `packages/` holds shared libraries only; `apps/` holds runnable services.
- `@workspace/types` is a types-only package — import with `import type { ... } from '@workspace/types'`.

## Environment Setup

This repo uses [Devbox](https://www.jetify.com/devbox) to manage the dev environment. Devbox pins Node.js 22 LTS and runs `npm install` automatically on shell entry.

```bash
# Check if devbox is already installed
devbox version

# If not installed, run the installer (one-time, system-level)
curl -fsSL https://get.jetify.com/devbox | bash

# Enter the dev shell — Node.js LTS is activated and npm install runs automatically
devbox shell
```

## Development Commands

All commands are run from the **monorepo root**, inside the devbox shell:

| Command | Purpose |
|---|---|
| `devbox shell` | Enter the dev environment (activates Node.js 22 LTS, auto-installs deps) |
| `devbox run dev` | Start api-service with hot reload |
| `devbox run build` | Compile TypeScript to `dist/` |
| `devbox run type-check` | Type-check without emitting |
| `devbox run lint` | ESLint check |
| `devbox run test` | Run Jest test suite |
| `devbox run test:cov` | Tests with coverage report |
| `devbox run format` | Prettier format all files |
| `devbox run setup` | Re-run npm install (after adding packages) |

The underlying `npm run <workspace-script>` commands (e.g. `npm run build:api-service`) still work inside the devbox shell. `devbox run` is the recommended entry point.

## Architecture Overview

Single Express service (`apps/api-service`). Request lifecycle:

```
Client → helmet → cors → json → requestLogger → router → controller → response
                                                                ↓ (on error)
                                                          errorHandler
```

| File/Dir | Responsibility |
|---|---|
| `apps/api-service/src/index.ts` | Entry: creates app, binds port |
| `apps/api-service/src/app.ts` | App factory: registers all middleware and routers |
| `apps/api-service/src/config.ts` | Frozen env config; throws `Error` on missing required vars |
| `apps/api-service/src/routes/` | URL routing — one file per feature area |
| `apps/api-service/src/controllers/` | Request handlers — one file per feature area |
| `apps/api-service/src/middleware/errorHandler.ts` | 4-arg Express error boundary |
| `apps/api-service/src/middleware/notFound.ts` | 404 catch-all — registered last |
| `apps/api-service/src/middleware/requestLogger.ts` | pino-http middleware |
| `apps/api-service/src/lib/logger.ts` | Pino logger singleton |
| `apps/api-service/src/types/express.d.ts` | Express `Request` augmentation |

## Config Pattern

All environment variables are centralised in `src/config.ts`. Never call `process.env` directly in business logic.

```typescript
// apps/api-service/src/config.ts
export function requireEnv(key: string): string {
  const val = process.env[key];
  if (!val) throw new Error(`Missing required environment variable: ${key}`);
  return val;
}

export const config = Object.freeze({
  port: parseInt(process.env.PORT ?? '3000', 10),
  // Required vars throw at startup — fast failure:
  // myServiceUrl: requireEnv('MY_SERVICE_URL'),
});

// ✅ Correct — always read from config
import { config } from '../config';
const url = config.myServiceUrl;

// ❌ Never do this
const url = process.env.MY_SERVICE_URL;
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

// ❌ Wrong — bypasses errorHandler, loses structured logging
export const myHandler: RequestHandler = async (req, res) => {
  try {
    const data = await doSomething();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Something went wrong' });
  }
};
```

To return a specific HTTP status from an error, attach `status` or `statusCode` to the thrown object:

```typescript
const err = Object.assign(new Error('Not authorised'), { status: 401 });
throw err;
```

## Auth Pattern (when needed)

This template ships without an auth layer. When adding auth:

1. Create `src/middleware/auth.ts` implementing `RequestHandler`
2. Extend `Express.Request` in `src/types/express.d.ts` with the verified payload type
3. Read the verified payload from `req.user` in controllers — **never** from URL params or request body
4. Register the middleware in `src/app.ts` or on individual routers

```typescript
// src/types/express.d.ts — replace unknown with your payload type
interface Request {
  user?: { id: string; role: string };
}

// src/controllers/example.controller.ts
// ✅ Correct
const userId = req.user!.id;

// ❌ Never
const userId = req.query.user_id;
```

## TypeScript Conventions

- `strict: true` — no implicit `any`
- Explicit return types on all exported functions
- Path alias `@/*` resolves to `src/*` within `api-service` — use it for imports crossing more than one directory level
- `import type` for type-only imports, including all `@workspace/types` imports

## Shared Types Package

`packages/types/` is a types-only package (`@workspace/types`). Use it for interfaces that are shared across multiple apps.

```typescript
// packages/types/src/index.ts — define interfaces here
export interface MySharedType { ... }

// In any app — always use import type
import type { MySharedType } from '@workspace/types';
```

No build step needed — TypeScript resolves source files directly via the `types` field in `packages/types/package.json`.

## Adding a New Route

```
apps/api-service/src/routes/<name>.ts              → Router definition
apps/api-service/src/controllers/<name>.controller.ts → Request handlers
apps/api-service/tests/integration/<name>.test.ts  → Supertest integration tests
```

Register in `apps/api-service/src/routes/index.ts`:
```typescript
router.use('/<name>', <name>Router);
```

## Adding a New App

1. Create `apps/<name>/` with the structure from `apps/api-service/` as a reference
2. Add workspace-targeted scripts to the root `package.json`: `dev:<name>`, `build:<name>`, `test:<name>`, etc.
3. Add a CI job step or new job for the new app in `.github/workflows/ci.yml`
4. Add a `Dockerfile` at `apps/<name>/Dockerfile` using the monorepo root as build context

## Docker

Always build from the **monorepo root**:

```bash
# ✅ Correct
docker build -f apps/api-service/Dockerfile .

# ❌ Wrong — build context is wrong, COPY of packages/ will fail
docker build apps/api-service/
```

## Common Pitfalls

1. **`npm install` inside a workspace**: Always run from the monorepo root. Running inside a workspace breaks symlinks for `@workspace/*` packages.

2. **`process.env` outside config.ts**: Always use `config` from `src/config.ts`. Bare `process.env` calls scatter configuration.

3. **Sending a response after `next(err)`**: Calling `next(err)` hands control to `errorHandler`. Any `res.json()` after that triggers "headers already sent".

4. **Middleware order in `app.ts`**: `requestLogger` must come before routes; `notFound` and `errorHandler` must be last, in that order.

5. **`outDir` confusion**: Type-checking uses `tsconfig.json` (no `outDir`). Building uses `tsconfig.build.json`. Run `devbox run build` (or `npm run build:api-service`) — not `tsc` directly.

6. **Docker build missing `package-lock.json`**: The Dockerfile uses `npm ci` which requires a lockfile. Always commit `package-lock.json`.

7. **Test coverage below threshold**: Jest enforces 80% coverage. Check `devbox run test:cov` before pushing.

8. **Importing `@workspace/types` at runtime**: Types are erased at compile time. Always use `import type` — a plain `import` will fail in the Docker runtime image.

9. **Wrong Docker build context**: Always run `docker build -f apps/api-service/Dockerfile .` from the monorepo root. Building from within the app directory will fail because the Dockerfile copies from `packages/`.

10. **Running npm outside the devbox shell**: Node.js version and npm may differ from the locked devbox environment. Always enter `devbox shell` first, or use `devbox run <command>` directly.

11. **Changing devbox packages without committing `devbox.lock`**: After `devbox add` or `devbox rm`, commit both `devbox.json` and `devbox.lock`. The lock file pins the exact binary for all contributors.

## Commit Standards

Format: `<type>(<scope>): <subject>`

Scopes: `api-service`, `types`, `core`, `routes`, `middleware`, `config`, `tests`, `docs`, `ci`, `docker`, `devbox`

```bash
feat(api-service): add users CRUD endpoints
fix(api-service): correctly propagate status code in errorHandler
feat(types): add UserPayload shared interface
test(api-service): add integration tests for users endpoints
docs(developer-guide): add architecture decision record
ci(docker): cache npm install layer in release workflow
chore(devbox): add ripgrep to dev environment
```

**No AI attribution**: Commits must not contain `Co-Authored-By: Gemini`, `Generated with Gemini CLI`, or any reference to AI assistance.

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
