# Reference

## Environment Variables

| Variable | Required | Default | Description |
|---|---|---|---|
| `PORT` | No | `3000` | HTTP server port |
| `NODE_ENV` | No | `development` | Runtime environment: `development`, `production`, `test` |
| `LOG_LEVEL` | No | `info` | Pino log level: `trace`, `debug`, `info`, `warn`, `error`, `fatal` |

Add required variables to this table as you add them to `src/config.ts`.

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
| `500` | Internal Server Error — unexpected server-side failure |

## Docker

See [DEVELOPMENT.md — Docker Build](../../DEVELOPMENT.md) for build and run commands.

The release pipeline (`release.yml`) builds and pushes a Docker image on every semver tag (`v*.*.*`). Required GitHub secrets:

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
