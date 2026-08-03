# Invocation Audit Log

Every call to a published agent's invocation-plane endpoints (`POST /v1/agents/{id}/runs` and friends, authenticated via JWT, `ik_` invocation key, or — for `public` agents — no credential) is recorded to an audit trail, independent of run telemetry.

## Reading the Log

```
GET /v1/agents/{id}/invocation-log
```

Query params: `status` (`dispatched` | `rejected`), `limit` (default 50, max 200), `offset`. Implemented in `apps/api/src/controllers/invocation-log.controller.ts`'s `getInvocationLog`, scoped to the requesting tenant (`assertAgentOwnedByTenant`) and ordered newest-first.

## What's Recorded

Both accepted (`dispatched`) and rejected invocation attempts are logged — a rejected entry (bad/revoked invocation key, policy mismatch) is itself a useful signal for detecting misuse, not just a 401 response.

## Relationship to Telemetry

This is distinct from the [telemetry store](../developer-guide/database.md) (`GET /v1/telemetry`, `/v1/telemetry/tokens`), which tracks run/step execution detail and token usage for *all* runs. The invocation log specifically tracks *who called this agent and whether they were let in* — the [Auth & RBAC](../developer-guide/auth-rbac.md) audit trail for the invocation plane.
