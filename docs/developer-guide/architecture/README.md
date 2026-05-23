# Architecture

## Request Lifecycle

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

## Configuration Pattern

`src/config.ts` is a frozen object built once at startup. Any missing required variable throws immediately with a clear error message, preventing the service from starting in a misconfigured state.

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

## Adding a Feature

See [DEVELOPMENT.md — Adding a New Route](../../../DEVELOPMENT.md) for the step-by-step process.
