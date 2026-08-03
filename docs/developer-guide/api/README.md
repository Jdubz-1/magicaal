# API Reference

Base URL: `http://localhost:3000` (development) — this page covers **`apps/api`**, the public BFF. `apps/engine` also exposes a small internal REST surface (`apps/engine/src/routes/internal.ts`) used only for API→Engine calls; it is not part of the public API and has no external base URL.

## Source of Truth

The full endpoint reference is generated from `apps/api/src/openapi/spec.ts` and served live:

```
GET /v1/openapi.json
```

Paste that URL into [Swagger Editor](https://editor.swagger.io/), Postman, or Insomnia for an interactive, always-current view of every route, parameter, and request/response shape — no separately maintained endpoint table lives in this page, so it can't drift out of sync the way it did before.

When you add or change a route, update `apps/api/src/openapi/spec.ts` in the same PR — see [DEVELOPMENT.md — Adding a New Route](../../../DEVELOPMENT.md#adding-a-new-route).

## Authentication

- **Platform principals** (Studio/Admin users): `Authorization: Bearer <JWT>`, obtained from `POST /v1/auth/login`. Refresh via the `POST /v1/auth/refresh` cookie flow.
- **Agent invocation** (third-party callers of a published agent's `/runs` endpoint): either a platform JWT, an `ik_`-prefixed invocation key issued via `POST /v1/agents/{id}/invocation-keys`, or no credential at all if the agent's invocation policy is `public`.
- **Internal engine→API calls** (credential refresh persistence, marketplace usage flush): a separate internal auth scheme (`requireInternalAuth`), not reachable from outside the deployment.

## Route Groups

The OpenAPI `tags` group routes by area — Auth, Agents, Runs, Sessions, Test Cases, Users, Tenants, API Keys, Data Sources, MCP, Prompts, Caal, Integrations, Triggers, Marketplace, Telemetry, Platform. Each maps to one router in `apps/api/src/routes/` and one or more controllers in `apps/api/src/controllers/`.

## Webhooks & Triggers

Two endpoint families accept unauthenticated external calls, verified by a secret in the URL or a provider signature rather than a bearer token:
- `POST /v1/agents/{id}/webhook/{secret}` — per-agent HMAC-secret webhook
- `POST /v1/triggers/integrations/{service}/{tenantSlug}` — integration event receiver (Slack, GitHub, Stripe, etc.)

## Server-Sent Events

`GET /v1/agents/{id}/runs/{runId}/stream` returns `text/event-stream` for live run-lifecycle events instead of JSON.
