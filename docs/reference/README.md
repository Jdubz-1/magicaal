# Reference

## Sections

| Guide | Description |
|---|---|
| [Core Types](core-types.md) | `@magicaal/core` — shared types across all apps and packages |
| [SDK Client](sdk-client.md) | `@magicaal/sdk` — published npm package for external API consumers |
| [CLI](cli.md) | `@magicaal/cli` — `magicaal` binary for Graph-as-Code agents |
| [Node Catalog](node-catalog.md) | Prose overview of the 53 built-in `core:*` node types, by category |
| [Node Reference](nodes/README.md) | Per-node config reference — the source of truth for Graph-as-Code node config |
| [Integrations](integrations/README.md) | The 16 `packages/integrations/*` vendor packages |
| [Audit Log](audit-log.md) | Invocation-plane audit trail |

## Environment Variables

Each app has its own `.env.example`; there is no single root env file. `deploy/.env.example` is the Docker Compose quickstart's env file and adds a few Compose-only variables on top of the same shared set.

### Shared (used by both `apps/api` and `apps/engine`)

| Variable | Required | Default | Description |
|---|---|---|---|
| `MAGICAAL_MASTER_KEY` | Yes (Phase 1+) | — | AES-256 key encrypting stored integration credentials at rest. Losing it means losing access to all stored credentials. Generate with `openssl rand -hex 32`. |
| `DATABASE_URL` | No | `file:/data/magicaal.db` | Primary SQLite DB (via Drizzle ORM). `apps/api` and `apps/engine` share the same file via a volume mount. |
| `TELEMETRY_DATABASE_URL` | No | `file:/data/magicaal-telemetry.db` | Separate SQLite file for run/step telemetry, token usage, trajectory records. |
| `REDIS_URL` | No | `redis://localhost:6379` | BullMQ job queue backend. |
| `MARKETPLACE_ENABLED` | No | `false` | Enables Marketplace connectivity. When `false`, `/v1/marketplace/*` returns 503 (except `licenses/bundle`, which is air-gapped-only and always active) and the engine's License Validator/Usage Reporter never start. |
| `MARKETPLACE_API_URL` | No | `https://marketplace.magicaal.dev` | Override to point at an internal staging Marketplace. |

### `apps/api` (port 3000)

| Variable | Required | Default | Description |
|---|---|---|---|
| `PORT` | No | `3000` | HTTP server port |
| `NODE_ENV` | No | `development` | `development` \| `production` \| `test` |
| `LOG_LEVEL` | No | `info` | Pino log level |
| `PUBLIC_BASE_URL` | No | `http://localhost:3000` | Public API hostname; used for webhook URLs returned to callers |
| `ENGINE_BASE_URL` | No | `http://localhost:4000` | Where the API proxies to the engine |
| `JWT_SECRET` | Yes | — | Signs Studio session tokens; must match `apps/web`'s `JWT_SECRET`. Generate with `openssl rand -hex 32`. |
| `SEED_ON_BOOT` | No | (unset) | If `true`, seeds a default `admin@dev.local` / `admin` account on first boot if no platform_admin exists. **Never set in production.** |
| `AGENTS_DIR` | No | `/agents` | Directory where compiled Graph-as-Code agent JSON files are mounted for boot-time sync |
| `MARKETPLACE_CATALOG_SOURCE` | No | `remote` | `remote` (marketplace.magicaal.dev) or `local` (air-gapped `catalog.json`) |
| `MARKETPLACE_LOCAL_CATALOG_PATH` | No | `/marketplace/catalog.json` | Used when `MARKETPLACE_CATALOG_SOURCE=local` |
| `CAAL_INVOKE_TIMEOUT_MS` | No | `120000` | How long `invokeCaal` polls the engine before returning `CAAL_STILL_RUNNING` |

### `apps/engine` (port 4000)

| Variable | Required | Default | Description |
|---|---|---|---|
| `PORT` | No | `4000` | HTTP server port |
| `NODE_ENV` | No | `development` | `development` \| `production` \| `test` |
| `LOG_LEVEL` | No | `info` | Pino log level |
| `ENGINE_INTERNAL_URL` | No | `http://localhost:4000` | Loopback URL for sub-run dispatch (`core:sub-graph`, `core:handoff`); use `http://engine:4000` in Docker |
| `RUN_TIMEOUT_DEFAULT_MS` | No | `600000` | Deadline for runs whose agent declares no `AgentConfig.timeout` |
| `MAX_CONCURRENT_RUNS_PER_TENANT` | No | `10` | Platform-wide cap until per-tenant DB resource limits exist |
| `WORKER_CONCURRENCY` | No | `10` | BullMQ worker concurrency for the run trigger queue |
| `TELEMETRY_RETENTION_DAYS` | No | `90` | Terminal runs (and steps/trajectories/scores) older than this are deleted by an hourly sweep; `0` or negative disables |
| `MARKETPLACE_ALLOW_UNVERIFIED` | No | `false` | **Danger:** allows installing packages lacking a MagiCaal countersignature. Package code runs with full engine privileges — no sandbox exists yet for unverified packages. |

### `apps/web` (port 8080)

| Variable | Required | Default | Description |
|---|---|---|---|
| `PORT` | No | `8080` | HTTP server port |
| `NODE_ENV` | No | `development` | `development` \| `production` \| `test` |
| `LOG_LEVEL` | No | `info` | Pino log level |
| `API_BASE_URL` | No | `http://api:3000` | Backend API URL, used server-side for SSR/proxy requests |
| `JWT_SECRET` | Yes | — | Must match `apps/api`'s `JWT_SECRET` |
| `MARKETPLACE_ENABLED` | No | `false` | Controls whether the Admin Marketplace panel and Studio "Browse Marketplace" links render |

### `deploy/` (Docker Compose quickstart only)

Adds `API_PORT`, `ENGINE_PORT`, `WEB_PORT` (host-side port mappings), `CORS_ORIGIN` (browser origin allowed by CORS behind a reverse proxy), `PACKAGES_DIR` (`/data/packages`, where installed `.mpack` packages are extracted), and `MAGICAAL_SIGNING_PUBLIC_KEY` (Ed25519 key verifying Marketplace package countersignatures) on top of the shared set above. See [`deploy/.env.example`](../../deploy/.env.example) for the full annotated file.

## Error Response Format

All error responses follow a consistent JSON shape:

```json
{ "error": "Human-readable error message" }
```

HTTP status codes:
| Code | Meaning |
|---|---|
| `400` | Bad request — invalid input |
| `401` | Unauthorised — missing or invalid credentials |
| `403` | Forbidden — authenticated but not permitted |
| `404` | Not Found — route or resource does not exist |
| `422` | Unprocessable — e.g. package signature verification failed |
| `500` | Internal Server Error — unexpected server-side failure |
| `503` | Service unavailable — e.g. Marketplace routes when `MARKETPLACE_ENABLED=false` |

## Docker

Each of `apps/api`, `apps/engine`, and `apps/web` has its own Dockerfile; all must be built from the **monorepo root** so `COPY packages/` resolves:

```bash
docker build -f apps/api/Dockerfile .
docker build -f apps/engine/Dockerfile .
docker build -f apps/web/Dockerfile .
```

For running without building at all, see the [Docker Compose quickstart](../getting-started/docker-quickstart.md) in `deploy/`. The release pipeline (`release.yml`) builds and pushes images on every semver tag (`v*.*.*`). Required GitHub secrets:

| Secret | Description |
|---|---|
| `REGISTRY_USERNAME` | Docker registry username |
| `REGISTRY_TOKEN` | Docker registry access token or password |

## Log Format

In development, logs are pretty-printed by pino. In production (`NODE_ENV=production`), logs are JSON and intended to be consumed by a log aggregator.

Request log fields (added by pino-http):
- `req.method`, `req.url`, `req.remoteAddress`
- `res.statusCode`
- `responseTime` (ms)
