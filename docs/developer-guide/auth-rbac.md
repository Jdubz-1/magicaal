# Auth & RBAC

MagiCaal has two distinct auth planes, both implemented in `apps/api/src/middleware/auth.ts` and enforced on the engine side by `apps/engine/src/auth/invocation-auth.ts`.

## Platform Plane (Studio/Admin users)

Standard JWT auth: `POST /v1/auth/login` returns a bearer JWT (`apps/api/src/lib/jwt.ts`) plus a refresh cookie; subsequent requests send `Authorization: Bearer <token>`. `requireAuth` validates the token and populates `req.user`.

### Roles

Four roles, ordered least→most privileged (`ROLE_ORDER` in `middleware/auth.ts`):

```
viewer  <  developer  <  tenant_admin  <  platform_admin
```

Two guard styles are used across routers:
- **`requireRole(...roles)`** — caller's role must be exactly one of the listed roles (e.g. `tenants.ts` restricts tenant creation to `platform_admin` only).
- **`requireMinRole(role)`** — caller's role must be at or above the given level in `ROLE_ORDER` (e.g. `agentsRouter` requires `developer`+ for all agent CRUD).

`platform_admin` operates across tenants; `tenant_admin` and below are scoped to their own tenant (enforced per-controller against `req.user.tenantId`, not just by role).

## Invocation Plane (third-party callers of a published agent)

A **published, publicly-invocable agent** is called by systems outside the platform — these callers never get a platform JWT. `authenticateAgentCaller` (used by `runsRouter`, mounted ahead of `agentsRouter`'s blanket `requireAuth`) resolves whichever of three admits the request:

1. A platform JWT (an internal caller invoking its own agent)
2. An `ik_`-prefixed **invocation key**, scoped to one agent, issued via `POST /v1/agents/{id}/invocation-keys` and checked against that agent's `invocation-policy`
3. No credential at all, if the agent's invocation policy is `public`

Every invocation-plane call is recorded to the per-agent audit trail — see [reference/audit-log.md](../reference/audit-log.md).

## Internal Plane (engine ↔ API)

`requireInternalAuth` guards `apps/api`'s `/internal/*` routes (credential-refresh persistence, marketplace usage flush) and fails closed if `MAGICAAL_MASTER_KEY` is unset. The engine authenticates with a constant-time-compared shared secret (`x-internal-auth` header) — this is not a JWT and is never reachable from outside the deployment network.

## Platform API Keys

Distinct from invocation keys: a **platform API key** (`POST /v1/keys`, `tenant_admin`+) is a tenant-owned credential for scripted/CI access to the full platform API under that tenant's permissions — not scoped to one agent the way an invocation key is.
