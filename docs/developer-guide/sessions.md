# Sessions

Sessions give an agent conversational memory across multiple runs — used by the Studio canvas's session-aware agents and by Caal itself.

## Where Sessions Live

- Session rows and their context entries are stored in the primary DB (`apps/api/src/db/schema/sessions.ts`), owned by `apps/api`.
- `apps/engine/src/session/session-manager.ts`'s `SessionManager.loadSession()` fetches a session's resolved context from `apps/api` at run start — over HTTP (`POST`, not `GET`), because the API must apply schema migrations and assert session↔agent↔tenant ownership before returning anything.
- The API-side session endpoints are `GET/POST /v1/agents/{id}/sessions` and `GET/DELETE /v1/agents/{id}/sessions/{sid}`, plus the tenant-wide `GET /v1/sessions` used by the Admin panel.

## Context Schema & Overflow

An agent's `SessionConfig.contextSchema` declares, per key, an update mode (`replace`, `append`, `merge`) and — for `append` keys — `maxItems` and an `OverflowStrategy` (`evict_oldest`, `summarize`, `truncate`). Caal's own agent definition (`agents/caal.agent.ts`) is a concrete example: a `messages` key that appends up to 50 items and evicts the oldest, alongside `replace`/`merge` keys for `lastProposal`/`userPreferences`.

## Schema Migrations

When an agent's `SessionConfig.schemaVersion` is bumped, existing sessions on the old version need their stored context transformed forward. `apps/api/src/lib/session-migration.ts`'s `findMigrationPath()` finds a contiguous chain of `SessionSchemaMigration`s from a session's stored version to the agent's current version and applies each hop's transform (evaluated via `@magicaal/nodes`' expression evaluator, capped at 5 seconds per transform). If no contiguous path exists, the session cannot be loaded.

## Expiry

Sessions have a `ttlSeconds` (part of `SessionConfig`); an expiry sweep runs on the engine side, returning an `{ expired: number }` count.
