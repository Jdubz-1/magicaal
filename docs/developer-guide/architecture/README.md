# Architecture

## System Overview

MagiCaal is three independently deployable Express/Node services plus shared packages:

```
Browser ──HTTP/SSE──► apps/api (BFF, :3000) ──internal REST──► apps/engine (:4000)
                          │                                        │
                     Primary DB (SQLite via Drizzle)      Telemetry Store (SQLite)
                          │                                        │
                     Job Queue (BullMQ + Redis) ◄──────────────────┘

apps/web (Studio canvas + Admin panel, :8080) ──► apps/api
```

- **`apps/api`** — the BFF: auth, agent CRUD, Studio/Admin data layer, engine proxy, boot-time sync of Graph-as-Code agents from `agents/`, OAuth callbacks, Marketplace account/license operations.
- **`apps/engine`** — the graph execution runtime: Node Registry, Execution Worker, Tool Executor, Model Router, MCP client, Marketplace package loader/hot-load. See **[Engine Architecture →](engine.md)**.
- **`apps/web`** — Studio canvas editor (Svelte) + Admin panel (Datastar), talking to `apps/api` only — it never calls the engine directly. See **[Web Architecture →](web.md)**.

Deep dives: **[Model Router →](model-router.md)**, and the cross-cutting subsystem pages under [developer-guide/](../README.md) (auth/RBAC, sessions, MCP, Marketplace, Caal, database).

## Per-Service Request Lifecycle

Each of the three services is a separate Express app but follows the same middleware pipeline:

```
Client (HTTP)
      │
      ▼
helmet          — Security headers (CSP, HSTS, etc.)
      │
cors            — Cross-origin resource sharing
      │
express.json()  — Parse JSON request body
      │
requestLogger   — Log incoming request via pino-http
      │
router          — Match URL to handler
      │
controller      — Execute business logic, return response
      │ (on error: next(err))
      ▼
errorHandler    — Log error, send JSON error response
```

404 responses are handled by `notFound` middleware, registered after all routers but before `errorHandler`.

## Layer Responsibilities

| Layer | Location | Rule |
|---|---|---|
| Config | `src/config.ts` | Single source of truth for env vars; throws at startup on missing required vars |
| Middleware | `src/middleware/` | Cross-cutting concerns only — no business logic |
| Routes | `src/routes/` | URL-to-handler mapping only — no logic |
| Controllers | `src/controllers/` | Business logic and response construction |
| Lib | `src/lib/` | Stateless utilities shared across layers |

This applies identically in `apps/api`, `apps/engine`, and `apps/web` — each has its own instance of every layer.

## Configuration Pattern

`src/config.ts` in each app is a frozen object built once at startup. Any missing required variable throws immediately with a clear error message, preventing the service from starting in a misconfigured state.

```typescript
export const config = Object.freeze({
  port: parseInt(process.env.PORT ?? '3000', 10),
  myRequiredVar: requireEnv('MY_REQUIRED_VAR'),
});
```

## Error Handling

Errors propagate to `src/middleware/errorHandler.ts` via `next(err)`. The handler:
1. Logs the error with Pino (includes stack trace)
2. Reads `err.status` or `err.statusCode` for the HTTP status (defaults to 500)
3. Returns `{ error: message }` JSON

Controllers should never send error responses directly — always call `next(err)`.

## Data & Queue

- **Primary DB** — SQLite (WAL mode) via Drizzle ORM, shared by `apps/api` and `apps/engine` over a mounted volume in Docker. See [Database & Migrations →](../database.md).
- **Telemetry Store** — a separate SQLite file for run/step telemetry, token usage, and trajectory records, so high-volume telemetry writes don't contend with primary-DB reads/writes.
- **Job Queue** — BullMQ + Redis, used for trigger dispatch, per-tenant concurrency control, and rate-limit counters.

## Adding a Feature

See [DEVELOPMENT.md — Adding a New Route](../../../DEVELOPMENT.md#adding-a-new-route) for the step-by-step process.
