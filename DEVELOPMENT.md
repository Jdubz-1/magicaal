# Development Guide

Everything you need to set up and work with this monorepo locally.

## Prerequisites

Install [Devbox](https://www.jetify.com/devbox) once on your machine. It manages Node.js and npm for this project — no other manual tool installation needed.

```bash
# Check if devbox is already installed
devbox version

# If not installed, run the installer
curl -fsSL https://get.jetify.com/devbox | bash
```

## Monorepo Layout

```
webgentic-template-monorepo/
├── package.json              # Workspace root — private, declares workspaces
├── tsconfig.base.json        # Shared TypeScript compiler options
│
├── packages/
│   └── types/                # @workspace/types — shared TypeScript interfaces
│
├── apps/
│   └── api-service/          # Runnable Express API service
│       ├── src/
│       │   ├── index.ts          Entry: creates app, binds port
│       │   ├── app.ts            App factory: middleware + routes
│       │   ├── config.ts         Frozen env config; throws on missing required vars
│       │   ├── routes/
│       │   │   ├── index.ts      Aggregates all routers
│       │   │   └── health.ts     GET /health
│       │   ├── controllers/
│       │   │   └── health.controller.ts
│       │   ├── middleware/
│       │   │   ├── errorHandler.ts   4-arg Express error boundary
│       │   │   ├── notFound.ts       404 catch-all
│       │   │   └── requestLogger.ts  pino-http request logging
│       │   ├── lib/
│       │   │   └── logger.ts         Pino logger singleton
│       │   └── types/
│       │       └── express.d.ts      Express Request augmentation
│       ├── tests/
│       │   ├── integration/      Supertest against real Express app
│       │   └── unit/             Pure logic tests
│       ├── Dockerfile
│       └── .env.example
│
├── .github/workflows/        CI and release pipelines
├── docker-compose.yml        Local dev compose
└── docs/                     All documentation
```

## Architecture

```
Client (HTTP)
      │
      ▼
┌─────────────────────────────────────────┐
│         apps/api-service                │
│                                         │
│  helmet ──── cors ──── json parser      │
│                                         │
│  requestLogger (pino-http)              │
│                                         │
│  GET /health ──────────────────────►  OK│
│  GET /*      ──────────────────────► 404│
│                                         │
│  errorHandler (4-arg boundary)          │
└─────────────────────────────────────────┘
```

## Development Commands

All commands run from the **monorepo root**, inside the devbox shell:

| Command | Description |
|---|---|
| `devbox shell` | Enter dev environment (Node.js 22 LTS, auto-installs deps) |
| `devbox run dev` | Start api-service with hot reload (nodemon + ts-node) |
| `devbox run build` | Compile TypeScript to `dist/` |
| `devbox run type-check` | Type-check without emitting |
| `devbox run lint` | Check for lint errors |
| `devbox run test` | Run test suite |
| `devbox run test:cov` | Run tests with coverage report |
| `devbox run format` | Format all files with Prettier |
| `devbox run setup` | Re-run npm install (after adding packages) |

The underlying `npm run <workspace-script>` commands (e.g. `npm run dev:api-service`) also work inside the shell.

## Environment Setup

1. Copy the example env file:
   ```bash
   cp apps/api-service/.env.example apps/api-service/.env
   ```

2. Edit `apps/api-service/.env`:
   ```
   PORT=3000
   NODE_ENV=development
   LOG_LEVEL=info
   ```

| Variable | Required | Default | Description |
|---|---|---|---|
| `PORT` | No | `3000` | HTTP server port |
| `NODE_ENV` | No | `development` | Runtime environment (`development`, `production`, `test`) |
| `LOG_LEVEL` | No | `info` | Pino log level (`trace`, `debug`, `info`, `warn`, `error`) |

## Running Locally

```bash
# 1. Install Devbox if not already installed
#    Run "devbox version" first — if it prints a version, skip this step
devbox version || curl -fsSL https://get.jetify.com/devbox | bash

# 2. Enter the dev shell — Node.js 22 LTS activates and npm install runs automatically
devbox shell

# 3. Configure environment
cp apps/api-service/.env.example apps/api-service/.env
# Edit with your values

# 4. Start with hot reload
devbox run dev

# 5. Test the health endpoint
curl http://localhost:3000/health
# → {"status":"OK","timestamp":"2026-01-01T00:00:00.000Z"}
```

## Docker Build

The Dockerfile uses a multi-stage build. The build context must be the **monorepo root** so Docker can copy from `packages/`.

```bash
# ✅ Correct — build context is monorepo root
docker build -f apps/api-service/Dockerfile -t api-service .

# Run the container
docker run -p 3000:3000 \
  -e NODE_ENV=production \
  api-service

# ❌ Wrong — build context is wrong, COPY packages/ will fail
docker build apps/api-service/

# ❌ Wrong — don't run ts-node in production
docker run api-service ts-node src/index.ts
```

## Adding a New Route

Each feature area lives in its own router + controller pair inside `apps/api-service/src/`:

```
src/routes/<name>.ts                   Route definitions (express.Router)
src/controllers/<name>.controller.ts   Request handlers
```

Then register in `src/routes/index.ts`:
```typescript
router.use('/<name>', <name>Router);
```

Add integration tests in `tests/integration/<name>.test.ts`.

## Adding a Shared Type

Add interfaces to `packages/types/src/index.ts`, then import them in apps with `import type`:

```typescript
// packages/types/src/index.ts
export interface MyPayload { id: string; }

// In any app
import type { MyPayload } from '@workspace/types';
```

## Common Issues

| Issue | Cause | Fix |
|---|---|---|
| `node: command not found` | Not inside the devbox shell | Run `devbox shell` to enter the environment |
| Node version mismatch | Running npm from the host shell | Always use `devbox shell` or `devbox run <command>` |
| `Cannot find module '@workspace/types'` | `npm install` run from inside a workspace | Always run `npm install` (or `devbox run setup`) from the monorepo root |
| `Missing required environment variable: X` | A required env var is absent | Add the variable to `apps/api-service/.env`; see `src/config.ts` |
| Hot reload not triggering | File saved outside `src/` | nodemon watches `src/` only — check `apps/api-service/nodemon.json` |
| `Cannot find module '@/...'` | Path aliases not registered | `ts-node` must be invoked with `-r tsconfig-paths/register` (already in `nodemon.json`) |
| Docker build fails: cannot COPY `packages/` | Build context is the app dir, not monorepo root | Run `docker build -f apps/api-service/Dockerfile .` from the root |
| Tests fail with type errors | tsconfig mismatch | Run `devbox run type-check` for full diagnostics |
