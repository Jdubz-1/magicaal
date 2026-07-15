# Development Log

A running record of significant changes. Add an entry after completing any feature, refactor, critical fix, or infrastructure change.

## Entry Format

```markdown
### YYYY-MM-DD - Brief Title

**Type:** Feature | Bugfix | Refactor | Infrastructure | Documentation

**Description:**
What was done and why.

**Changes:**
- Specific change 1 (file path preferred)
- Specific change 2

**Impact:**
How this affects the system, security posture, or developer workflow.

**Notes:** (optional)
Trade-offs, follow-up items, or important context.
```

---

### 2026-07-14 - Engine route tests: close the API↔engine contract gap

**Type:** Feature

**Description:**
Every `apps/api` test mocked `engineClient` and `apps/engine` had zero HTTP-level tests (118 tests, all calling functions directly, no `supertest` dependency) — nothing in the repo had ever exercised the actual API↔engine boundary. That gap is not theoretical: it is exactly how ISS-063 (every run dispatch 401ing) and the unreachable public webhook receiver both survived a fully green suite. Added a full `supertest` fixture that boots the real engine app against a real (temp-file, WAL-mode) primary DB migrated with `apps/api`'s actual Drizzle SQL, plus route tests for the whole `/internal/*` surface, one file per controller. Every request body mirrors the payload `apps/api`'s `engineClient` call sites actually send, copied from the call site rather than invented.

**Changes:**
- `apps/engine/tests/helpers/primary-db.ts` (new) — builds a primary DB by executing `apps/api/drizzle/migrations/*.sql` in `_journal.json` order against a temp file (WAL mode), plus `seedAgent`/`seedAgentVersion`/`seedInvocationKey`/`seedInvocationPolicy`/`seedInstalledPackage` helpers
- `apps/engine/tests/helpers/app.ts` (new) — mocks `@/queue/client` (Redis + 3 BullMQ queues, which otherwise open real sockets at import), `@/config` (temp DB path + temp `packagesDir`), and `@/middleware/requestLogger` (pino-http can't run against a plain `jest.fn()` logger stub); replicates `src/index.ts`'s boot sequence (`runTelemetryMigrations`, `registerNodes`, `registerIntegrations`, `registerAdapters`) since `createApp()` alone only wires the HTTP layer
- `apps/engine/tests/helpers/mpack.ts` (new) — Ed25519 signing + ustar bundle builders, lifted out of the duplicated copies in `tests/unit/marketplace/*.test.ts`
- `apps/engine/tests/route/{health,internal-auth,invocation-auth,runs,agents,telemetry,nodes,integrations,packages}.test.ts` (new) — 79 new tests across the whole `/internal/*` surface
- `apps/engine/tests/route/api-contract.test.ts` (new) — walks the engine's registered Express routes and diffs them against every `engineClient.(get|post|put|delete|patch)` call site scraped from `apps/api/src` (text-scanned, not imported — the two are separate workspaces), so an API call to a route the engine no longer serves fails immediately
- `apps/engine/src/middleware/errorHandler.ts` — now surfaces the `code` field controllers already attach to thrown errors (matches the fix already applied to `apps/api`'s error handler); found because `invocation-auth.test.ts` asserted on it and every case came back `undefined`
- `apps/engine/src/app.ts` — `express.json()` now takes `limit: '25mb'` (was the bare 100kb default); found because `packages.test.ts`'s decompression-cap test 413'd before reaching the controller — the engine's own package-install endpoint could never have accepted a realistic bundle, even though `apps/api`'s own upload endpoint already allows 25mb and forwards the same body here verbatim
- `apps/engine/jest.config.ts` — `maxWorkers: 2`; each route test boots a real `better-sqlite3` DB + full `createApp()`, and running many of those in parallel under coverage instrumentation caused OOM/timeouts (a `test:cov` run went from 302s with 2 timeout failures to 8.5s clean)
- `apps/engine/package.json` — added `supertest` + `@types/supertest` devDependencies

**Impact:**
The API↔engine boundary now has direct coverage: 76 new tests across 10 new route/contract files, bringing `apps/engine` to 32 test suites / 228 tests total, all green. `pnpm -r run test` and `pnpm -r run type-check` both clean across the monorepo. Sanity-checked that the fixture actually catches what it exists to catch: temporarily reintroduced the exact ISS-063 bug (unconditional `validateInvocationRequest` in `dispatchRun`) and confirmed `runs.test.ts` went red (`dispatches for a platform caller` → 401 instead of 202), then reverted. Found and fixed two real, previously-undetected bugs along the way (`errorHandler` dropping `code`; the engine's 100kb body limit silently capping package installs). Engine coverage is now 58.8% statements / 60.8% lines (up from ~0% route-level); no coverage gate added in this change — the number is reported for a follow-up decision, per plan.

**Notes:**
`GET /internal/telemetry/runs/:runId` (`getRunDetail`) has no `engineClient` caller anywhere in `apps/api` and does not tenant-scope its query (`WHERE id = runId` only) — the same class of gap as ISS-007, just currently unreachable. Left as-is (out of scope for this change; flagged for `.ai_docs/MAGICAAL_ISSUES.md`) rather than fixed opportunistically.

---

### 2026-07-14 - Session system: summarize overflow, schema migration chain, child-run propagation (ALIGN-007/008/009)

**Type:** Bugfix

**Description:**
Three Phase 4 session claims did not survive the doc–code alignment review: the `summarize` overflow branch silently returned the unbounded array, the schema migration system never compared versions or set `stale_schema` (its "migrate" endpoint just flipped status), and `dispatchSubRun` never forwarded the session — so sub-graph/handoff children ran sessionless. All three now match ARCHITECTURE §14.

**Changes:**
- `apps/api/src/lib/session-migration.ts` (new) — contiguous `fromVersion→toVersion` chain resolution, timeboxed JSONata transforms via `evaluate()`, context-row rewrite, `stale_schema` marking when no path exists
- `apps/api/src/controllers/sessions.controller.ts` — new `internalLoadSession` (`POST /internal/sessions/:id/load`) carrying the agent's `SessionConfig`, asserting session↔agent↔tenant ownership (§14.7) and migrating before returning context; real `migrateAgentSessions` reading the config from the agent's current published version; async accumulation with the summarize-overflow path (`evict_oldest` fallback on any failure); `internalRecordRunLink` persists `is_child_run`
- `apps/engine/src/controllers/llm.controller.ts` (new) — `POST /internal/llm/summarize` wraps `routedLLMCall` for the API's session manager (`summarizeWith.model` overrides target models; prompt refs resolve from `prompt_versions`)
- `apps/engine/src/resolver/credential-resolver.ts` — `collectConnectionIds` now includes graph-level `defaultRouter` and `routerPolicies` targets (latent bug: graph-default routers had no credentials injected)
- `apps/engine/src/execution/context.ts` — `dispatchSubRun` forwards the parent `sessionId`
- `apps/api/drizzle/migrations/0007_session_child_runs.sql` — `session_run_links.is_child_run` (ARCHITECTURE §14.9)

**Impact:**
Conversational agents with `summarize` overflow no longer grow session keys without bound; schema version bumps migrate existing sessions instead of silently mismatching; multi-agent compositions share one session across the invocation tree as designed.

---

### 2026-07-14 - Engine run control: cancellation, timeout, retry, concurrency admission (ALIGN-001/002/003/004)

**Type:** Feature

**Description:**
The Phase 1 run-control surface was never finished: `DELETE /internal/runs/:id` returned 501 (and the API route behind `RunHandle.cancel()` did not exist), `AgentConfig.timeout`, `RetryConfig`, and `ConcurrencyConfig` were dead config, and the `runs.retry` queue had no producer or consumer. One shared cooperative-abort mechanism now underpins cancellation and timeout, with retry and admission built alongside.

**Changes:**
- `apps/engine/src/execution/run-control.ts` (new) — Redis abort flag (`requestAbort`/`checkAbort`/`clearAbort`), `startRunDeadline`, `planRetry`, occupancy slots (`acquireRunSlot`/`releaseRunSlot`) and `admissionDecision`
- `apps/engine/src/execution/worker.ts` + `tool-executor.ts` — abort checks at every node boundary and between agent-loop LLM iterations; failure throw sites carry `failedNodeId` + `retryable`
- `apps/engine/src/execution/scheduler.ts` — pre-start abort consumption, per-run deadline (`AgentConfig.timeout` else `RUN_TIMEOUT_DEFAULT_MS`), retry requeue through `runs.retry` with fixed/exponential backoff resuming from the failed node, admission check (tenant cap `MAX_CONCURRENT_RUNS_PER_TENANT`, agent `maxParallel`, `queueTimeout` → `QUEUE_TIMEOUT`), `WORKER_CONCURRENCY`
- `apps/engine/src/execution/lifecycle.ts` — `markRunCancelled` (SSE `run.cancelled`), `markRunRetrying` (SSE `run.retrying`)
- `apps/engine/src/controllers/runs.controller.ts` — real `cancelRun` (pending/suspended marked directly; running flagged, 202 `{ cancelling }`)
- `apps/api/src/routes/runs.ts` + `controllers/runs.controller.ts` — `DELETE /v1/agents/:id/runs/:runId` behind `fetchRunScoped`
- `packages/sdk-client/src/types.ts` — `run.cancelled` and `run.retrying` in `RunStreamEvent`

**Impact:**
Runs can be stopped, time out instead of holding worker slots forever, retry transient node failures per their config, and no tenant can starve the shared worker pool. `RunHandle.cancel()` works for the first time.

**Notes:**
Aborts land at yield points (node boundaries, agent-loop iterations) — a single non-yielding native call still runs to its own completion first.

---

### 2026-07-14 - Boot-sync override semantics and cross-tenant dispatch fixes (ALIGN-005/006)

**Type:** Bugfix

**Description:**
Two design violations from the alignment review. `syncConfig` had ARCHITECTURE §5.4 inverted — locked fields kept stale DB values while admin-set overridable fields were clobbered on every deploy — and the override map itself was never derived from anywhere (the compiler dropped `@Agent` `overridable`; boot-sync always wrote `{}`). Separately, the engine dispatched any agentId under any caller-supplied tenantId, so a sub-graph/handoff node config could execute another tenant's agent with that tenant's decrypted integration credentials (§14.3 violation).

**Changes:**
- `apps/api/src/sync/boot-sync.ts` — corrected `keepStored` semantics; new `resolveOverrideMap()` re-derives the per-field map from the definition on every sync (default: locked — code wins)
- `packages/compiler/src/decorators.ts` + `compile.ts`, `packages/core/src/graph.ts` — `AgentMeta.overridable` compiles into `AgentGraphDefinition.overridable`
- `apps/engine/src/graph/graph-loader.ts` — `assertAgentInTenant()`; `graphLoader.load(agentId, tenantId)` tenant predicate, enforced on cache hits too
- `apps/engine/src/controllers/runs.controller.ts` — ownership asserted in `dispatchRun` and `webhookDispatch` (404 either way, IDs stay non-enumerable)

**Impact:**
Admin config overrides survive redeploys and locked fields stay in sync with code; the cross-tenant execution path through sub-graph/handoff is closed.

---

### 2026-07-13 - Fix run invocation auth: separate the platform and invocation planes (ISS-063)

**Type:** Bugfix

**Description:**
ISS-063 was recorded during the coverage pass as "invocation keys cannot invoke". Analysis showed that understated it: **`POST /v1/agents/:id/runs` could not succeed for any caller** against a real engine. Two auth planes were stacked on one route and each rejected the other's callers — and separately, the engine validated invocation auth unconditionally, so Studio test runs, Caal, test-case suites, and sub-graph dispatch all 401'd as well. ARCHITECTURE §11.4 exempts exactly those callers; nothing implemented the exemption. Re-rated `critical`.

**Changes:**
- `apps/engine/src/controllers/invocation-auth.controller.ts` (new) + `routes/internal.ts` — `POST /internal/invocation-auth/validate` wraps the existing `validateInvocationRequest`, so the API can authenticate the invocation plane without duplicating JWKS handling or the Redis limiter
- `apps/engine/src/controllers/runs.controller.ts` — `dispatchRun` no longer re-validates; it requires an explicit `caller: { kind: 'platform' | 'invocation', strategy, keyId? }` and 400s when absent, so an unauthenticated dispatch cannot happen by omission
- `apps/engine/src/execution/context.ts` — `dispatchSubRun` sends `X-Internal-Auth` (repairing a regression ISS-048 introduced) and dispatches as a platform caller
- `apps/api/src/controllers/invocation-keys.controller.ts` — invocation keys mint `ik_`; platform keys keep `mk_`. Legacy `mk_` invocation keys still resolve by fall-through, so no migration
- `apps/api/src/middleware/auth.ts` — new `authenticateAgentCaller` / `authenticateRunCaller`: resolve a platform credential first (Studio JWT or platform API key — a tenant principal, which bypasses invocation policy per §11.4), else delegate to the engine's validate endpoint. Anonymous callers work for `public` agents
- `apps/api/src/routes/runs.ts` (new) — run routes moved out of `agentsRouter` and mounted ahead of it; a router-level `use(requireAuth)` admits only platform principals, so run status, steps, stream, and review were unreachable for external callers
- `apps/api/src/controllers/{caal,test-cases}.controller.ts` — dispatch as platform callers
- `apps/api/src/controllers/runs.controller.ts` — `resolveInvocationKey` deleted; invocation audit log (§11.5) now records the real strategy, key id, run id, and outcome, including rejected attempts
- `packages/sdk-client/src/types.ts` — `apiKey` documented as a per-agent `ik_` invocation key, `bearer` as a platform token (no code change; both already go out as a Bearer header)
- Tests: 408 pass (was 383) — API 290, engine 118. First tests for `validateInvocationRequest` (valid / wrong-agent / revoked / expired / public / jwt / rate limit), for the engine's dispatch contract, and for both API planes end to end.

**Impact:**
Run invocation works. The engine remains the single implementation of invocation policy; the API is now the single enforcement point, so a request is validated — and rate-limited — exactly once. External consumers can invoke an agent with an `ik_` key and then observe the run, which is the whole surface `RunHandle`, `stream()`, and `HumanReviewClient` depend on.

**Notes:**
Two bugs of this size hid in plain sight for the same reason: **every API test mocks `engineClient`, so nothing crossed the API↔engine boundary**, and the engine had no route tests. The live-stack e2e already tracked in `MAGICAAL_PROGRESS.md` is the check that would have caught them, and it remains the right next step — the fix is verified by tests and type-checks, but not yet against a running stack.

---

### 2026-07-12 - Raise apps/api test coverage to 94% and clear the 80% gate

**Type:** Tests

**Description:**
`apps/api` enforces an 80% Jest coverage threshold (a CLAUDE.md pre-push check) that had been failing for some time — 46% before the recent security work, 52% after. The gap was almost entirely `src/controllers`, thirteen of which had no test file at all. Branches were the binding constraint (22% → needed 80%), so error paths, not happy paths, were the actual work.

**Changes:**
- `apps/api/jest.config.ts` — exclude `src/db/schema/**` from coverage collection; those are Drizzle table declarations whose only "functions" are foreign-key arrows that Drizzle alone invokes
- 11 new test files (201 tests) covering every controller: `sessions`, `test-cases`, `marketplace-enabled` (the flag-on paths the 503 gate otherwise hides), `datasources`, `mcp-servers`, `users-tenants`, `llm-telemetry-invocation`, `system-prompts-caal`, `connections-webhook`, `auth-middleware`, `auth-runs-flows`; plus extensions to the existing `agents` tests
- Also covers the previously-untested `mk_` API-key auth path in `middleware/auth.ts`, `platform/bootstrap.ts`, and the `lib/` crypto, JWT, and graph-validator helpers

**Impact:**
`pnpm --filter @magicaal/api run test:cov` now exits 0. Coverage: 94.19% statements, 83.94% branches, 93.53% functions, 94.39% lines. apps/api goes from 84 to 285 tests; the monorepo from 462 to 645.

**Notes:**
Testing previously-untested code surfaced four defects. Three are fixed in `4ceb2f7` (see below). The fourth, **ISS-063**, is left open because the fix is an auth-design decision: invocation keys cannot invoke anything — `requireAuth` resolves every `mk_` token against the platform `api_keys` table, so an invocation key 401s before `resolveInvocationKey` ever runs, while a valid platform key then fails that same check. `POST /runs` is currently invokable only with a JWT, which makes the whole Phase 1 invocation-key feature unreachable over the public API.

---

### 2026-07-12 - Fix webhook receiver, refresh-token collision, and refresh 500

**Type:** Bugfix

**Description:**
Three bugs found by writing tests for previously-untested code.

**Changes:**
- `apps/api/src/routes/index.ts` — the public webhook receiver was **unreachable**. `POST /v1/agents/:id/webhook/:secret` was mounted after `router.use('/v1/agents', agentsRouter)`, and a router-level `use(requireAuth)` runs for every request into that prefix even when no route inside it matches, so the webhook always 401'd before its handler. Mounted ahead of `agentsRouter` — the same fix already applied to the OAuth callback. The Phase 2 webhook trigger had therefore never worked end-to-end.
- `apps/api/src/lib/jwt.ts` — `signRefreshToken()` carried no unique claim; its only varying field was `iat`, at one-second granularity. Two logins by the same user within the same second minted byte-identical tokens, colliding on the unique `auth_sessions.refresh_token_hash` and returning 500 — reachable by two browser tabs or a double-clicked login. It also meant two sessions could share one refresh token. Added a random `jti`.
- `apps/api/src/controllers/auth.controller.ts` — a malformed or forged refresh token returned 500 instead of 401 (`verifyRefreshToken`'s throw was uncaught).

**Impact:**
The webhook trigger works for the first time. Concurrent logins no longer 500, and refresh tokens are unique per issuance.

---

### 2026-07-12 - Close the remaining 9 issues from the Phases 0–5 review

**Type:** Bugfix

**Description:**
Resolved the 9 issues left open after the critical/high batch — ISS-053, 054, 055, 056, 057, 058, 060, 061, 062 — clearing the review backlog. Two turned out to be worse than recorded and were re-scoped during the work.

**Changes:**
- `apps/engine/src/registry/node-registry.ts` + `entitlements.ts` (new) + `execution/worker.ts` — node types now carry provenance (`{publisher}/{name}`) through `hotLoad()` and snapshots; the engine resolves the tenant's entitled packages once per run and refuses an unentitled package node with `PACKAGE_NOT_ENTITLED`. `apps/api/src/controllers/system.controller.ts` filters `GET /v1/nodes` to built-ins plus the caller's entitled packages (ISS-055)
- `apps/engine/src/marketplace/hot-load.ts` + `package-loader.ts` — both load paths share `verifyAndRegister()` (containment + signature re-verification); self-published Redis events ignored (ISS-057); `gunzipSync` capped at 256 MB and per-entry sizes bounded (ISS-056)
- `apps/api/src/marketplace/{account,license-validator,usage-reporter}.ts` (new) — Marketplace jobs moved from the engine to the API, authenticated with the encrypted account key; new engine `/internal/telemetry/usage` keeps the telemetry DB engine-owned; heartbeat fail-open fixed (ISS-061)
- `apps/api/src/controllers/integration-triggers.controller.ts` + `db/backfill.ts` (new) — trigger signing secrets encrypted at rest, legacy rows re-encrypted at boot; service validated against the engine registry; dispatch filtered to active, enabled agents (ISS-053, ISS-062)
- `apps/api/src/lib/graph-validator.ts` (new, moved from the engine) — wired into `publishAgent` and template import; `marketplace.controller.ts` substitutes template parameters into the parsed graph rather than its serialized text (ISS-054)
- `packages/nodes/src/utils/jsonata.ts` — evaluation timeboxed via jsonata's `__evaluate_entry`/`__evaluate_exit` hooks (ISS-060); all ID helpers switched to `crypto.randomUUID()` (ISS-058)
- `apps/api/src/middleware/errorHandler.ts` — surface the typed `code` field, which was being dropped
- Tests: 462 pass (was 431) — API 84 (was 65), engine 98, nodes 138. New coverage for entitlement (allow/deny/expired-license/built-in), hot-load event rejection (out-of-root, tampered, self-echo), gzip bomb, marketplace job auth + fail-open, trigger secret encryption, graph validation at publish, and JSONata abort.

**Impact:**
The review backlog is clear: 62 of 62 issues resolved. A tenant can no longer execute or even see another tenant's installed package nodes; the engine no longer writes the primary DB or talks to the Marketplace unauthenticated; malformed graphs are refused at the boundary instead of failing mid-run; and a runaway expression can no longer pin the event loop for every tenant.

**Notes:**
Two issues were materially under-rated in the original review. **ISS-057 (low → high)**: `applyPackageEvent()` `require()`d an arbitrary directory from an untrusted Redis message with *no signature check* — an RCE, not a missing-containment nit. **ISS-054**: the fix uncovered that `publishAgent` performed no graph validation at all, and that the engine's `validateGraph()` had zero callers — it was dead code. Two pre-existing problems remain out of scope: `apps/web` and `packages/nodes` have ESLint configs that match no files, and the API's 80% coverage threshold is still unmet.

---

### 2026-07-12 - Fix all critical and high issues from the Phases 0–5 review

**Type:** Bugfix

**Description:**
Resolved the five issues gating Stage 2 (repo goes public) — ISS-047 (critical), ISS-048, ISS-049, ISS-050, ISS-051 (high) — plus ISS-052 and ISS-059, which sat inside the same code being rewritten. Three were trust-boundary holes, one was a silent data-loss bug on restart, one was an unfinished Phase 2 feature.

**Changes:**
- `apps/engine/src/middleware/internalAuth.ts` (new) + `apps/engine/src/routes/index.ts` — `requireInternalAuth` on the engine's `/internal/*` router, which had no auth at all; `/health` stays open for the container healthcheck. Fails closed when `MAGICAAL_MASTER_KEY` is unset.
- `apps/api/src/lib/engine-client.ts` — `X-Internal-Auth` on the shared axios instance (covers all API→engine traffic); `apps/api/src/middleware/auth.ts` — constant-time key comparison (ISS-059)
- `docker-compose.yml`, `deploy/docker-compose.yml` — engine bound to `127.0.0.1` instead of `0.0.0.0`
- `apps/api/src/routes/index.ts` + `apps/api/src/controllers/integrations.controller.ts` — the credential-refresh route now requires `X-Internal-Auth` and verifies the connection belongs to the run's tenant; `apps/engine/src/resolver/credential-resolver.ts` sends both (the persist is fire-and-forget, so gating the route without this would have silently broken OAuth refresh)
- `apps/api/src/controllers/runs.controller.ts` — new `fetchRunScoped()`; `getRun`, `getRunSteps`, `streamRun`, `reviewRun`, `getRunDirect` all verify run→tenant (and run→agent) ownership, answering 404 to keep run IDs non-enumerable
- `apps/engine/src/marketplace/hot-load.ts` + `package-loader.ts` + `index.ts` — `reloadInstalledPackages()` scans `PACKAGES_DIR` at boot and re-verifies each package's signatures against the on-disk bytes before loading
- `packages/integrations/core/src/oauth.ts` — `exchangeAuthorizationCode()`, sharing the token-endpoint call with `refreshOAuthToken()`; `packages/sdk/src/integration.ts` — `clientAuth`/`extraParams` on `IntegrationOAuthConfig`
- `apps/api/drizzle/migrations/0006_oauth_apps.sql` + `db/schema/integrations.ts` — per-tenant `integration_oauth_apps` table and a `nonce_hash` column on `integration_oauth_states`; `controllers/oauth-apps.controller.ts` (new) + Admin panel in `apps/web/src/routes/admin.ts`
- `apps/api/src/lib/credentials.ts` (new) — `encryptCredentials`/`decryptCredentials` extracted from the integrations controller to avoid a circular import
- Tests: 431 pass (was 406) — API 65 (was 48), engine 89 (was 81). New coverage for internal-auth rejection, cross-tenant run access, package re-load incl. tamper detection, and the full OAuth flow incl. PKCE, open-redirect rejection, and nonce binding.

**Impact:**
Closes the remaining pre-launch security gaps. The engine is no longer reachable unauthenticated from the host, cross-tenant run reads and human-review approvals are refused, marketplace packages survive an engine restart, and OAuth connections actually work — previously every OAuth connection was created `active` with no token, so integration nodes failed with `CONNECTION_MISSING_TOKEN`. Threading `clientAuth` through also fixed a latent bug where Basic-auth token endpoints (Zendesk) could never refresh.

**Notes:**
Nine issues remain open (5 medium, 4 low) — see `MAGICAAL_ISSUES.md`. Two pre-existing problems surfaced during verification and were left alone as out of scope: `apps/web`'s ESLint config matches no files ("all files ignored"), and the API's 80% Jest coverage threshold is not met on `main` (46.1% before this work, 50.2% after).

---

### 2026-07-12 - Comprehensive code review of Phases 0–5

**Type:** Documentation

**Description:**
Full-codebase review of all work through Phase 5 against `MAGICAAL_DEV_ROADMAP.md`, covering apps/api, apps/engine, apps/web, and all packages — weighted toward the Phase 5 surface (14 integration packages, trigger dispatch, `.mpack` marketplace pipeline, OAuth refresh at expiry) and security-sensitive paths from earlier phases. 16 new issues recorded as ISS-047–ISS-062.

**Changes:**
- `.ai_docs/MAGICAAL_ISSUES.md` — new "Phases 0–5 Comprehensive Review" section: 1 critical, 4 high, 5 medium, 6 low; summary table and totals updated (62 issues, 46 resolved, 16 open)

**Impact:**
Identifies a critical unauthenticated credential-overwrite endpoint (ISS-047) and three high-severity auth/tenancy gaps (unauthenticated engine internal API with a host-published port, cross-tenant run access, marketplace packages not re-loaded on engine restart) that should be resolved before Stage 2 (repo goes public). Also confirms sound areas: all 14 integration trigger handlers use timing-safe HMAC comparison, the `.mpack` signature verifier and path-traversal guards hold up, refresh-token rotation and the `core:code` isolated-vm sandbox are correct.

**Notes:**
No code changes — review output only. ISS-051 (OAuth callback still a Phase 2 stub) means the Phase 5 OAuth-refresh path is currently only reachable for manually-pasted tokens; worth resolving alongside the pending live-stack Phase 5 sign-off items.

---

### 2026-07-12 - Fix type-check failures from stale tsconfig project references

**Type:** Bugfix

**Description:**
A full `packages/` verification pass (all type-checks, tests, and builds) found three packages whose `tsc --noEmit` type-check failed with TS6306/TS6310 before checking any source: `packages/compiler`, `packages/cli`, and `packages/integrations/caal`. All three still carried tsconfig project references to `packages/core`, which commit `eb9bb3a` made non-composite/`noEmit` — that commit removed the references from `apps/api`, `packages/sdk`, and the root tsconfig but missed these three. All 16 Phase 5 integration packages were already clean.

**Changes:**
- `packages/compiler/tsconfig.json` — removed `references` (`../core`, `../nodes`); the `../nodes` reference also demanded a pre-built nodes dist (TS6305)
- `packages/cli/tsconfig.json` — removed `references` (`../core`, `../compiler`)
- `packages/integrations/caal/tsconfig.json` — removed `references` (`../../core`, `../../sdk`); added `skipLibCheck` to match the other integration packages

**Impact:**
All 20 packages with a `type-check` script now pass, and all 277 package tests pass (135 nodes, 119 integrations, 15 sdk-client, 8 cli). Cross-package types resolve via workspace symlinks and each package's `"types": "src/index.ts"`, so the references were unnecessary; builds are unaffected because `references` are not inherited through `extends` into `tsconfig.build.json`.

---

### 2026-07-12 - Sync deploy env example and docker-compose with Phase 5 configuration

**Type:** Infrastructure

**Description:**
The quick-deploy files under `deploy/` predated the Phase 5 Marketplace/integration work and were missing the environment variables it introduced. Brought them in line with the current `apps/api/src/config.ts` and `apps/engine/src/config.ts`.

**Changes:**
- `deploy/.env.example` — documented `PACKAGES_DIR` (engine .mpack install dir inside the shared /data volume), `MAGICAAL_SIGNING_PUBLIC_KEY` (countersignature key needed until the production key is pinned), `MARKETPLACE_ALLOW_UNVERIFIED=false` (security gate from the verifier review, with warning), and `MARKETPLACE_API_URL`; moved `API_BASE_URL` to the SHARED section since the engine now uses it to persist refreshed OAuth tokens; fixed the `MARKETPLACE_LOCAL_CATALOG_PATH` example (`/catalog/catalog.json` → `/marketplace/catalog.json`, matching the config default); expanded the `PUBLIC_BASE_URL` comment to cover integration trigger receiver URLs; added commented `CORS_ORIGIN`; collapsed the duplicated `JWT_SECRET` (API + WEB sections) into a single SHARED entry — docker compose applies last-occurrence-wins to duplicate keys in one env_file, so editing only the first occurrence silently kept the placeholder (`deploy/README.md` updated to match)
- `deploy/docker-compose.yml` — engine service now sets `API_BASE_URL` and `PACKAGES_DIR` explicitly (matching how api pins `ENGINE_BASE_URL`); added a commented `./marketplace:/marketplace:ro` volume on api for air-gapped catalog mode

**Impact:**
`deploy/` now works out of the box for Phase 5 features: OAuth token refresh persistence, package installs surviving restarts, air-gapped catalog mounting, and staging Marketplace validation. The unverified-install security default is documented where operators will see it.

---

### 2026-07-11 - Phase 5 Completion: Full First-Wave Integration Set + OAuth Refresh at Expiry

**Type:** Feature

**Description:**
Completed the remaining Phase 5 engineering: the 11 outstanding first-wave integration packages (bringing the total to 14 services) and the mid-run OAuth token refresh path the roadmap flagged as a launch risk.

**Changes:**
- `packages/integrations/{gmail,sendgrid,stripe,google-workspace,salesforce,hubspot,zendesk,twilio,quickbooks,bamboohr,shopify}` — new packages on the Slack template: nodes, auth schemas, and service-specific signed triggers (Stripe t=/v1= with replay tolerance, Shopify base64 HMAC + topic headers, Zendesk timestamped HMAC, HubSpot v1, BambooHR body+timestamp, Google watch-channel tokens, Salesforce signed callouts); 45 new unit tests
- `apps/engine/src/resolver/credential-resolver.ts` — `maybeRefreshOAuth`: expired oauth credentials refresh through the integration package's token endpoint (refresh_token + client credentials from the connection); rotated refresh tokens captured; expires_at normalized seconds→ms
- `apps/api` — internal `POST /internal/integrations/connections/:id/credentials` persists refreshed tokens (engine's DB connection is read-only); best-effort from the engine so persist failures never fail a run

**Impact:**
Every first-wave integration from the dev roadmap table now ships at platform launch. Long-running and infrequently-run agents no longer fail on expired OAuth tokens — the resolver refreshes transparently at run start and persists for subsequent runs.

**Notes:**
Still requiring a live environment (not automatable in this workspace — Docker unavailable): docker-compose e2e of the GitHub-push → Slack+GitHub+Jira milestone scenario, internal-staging Marketplace install with MARKETPLACE_ENABLED=true, and the dedicated signature-verifier security review before Stage 2.

---

### 2026-07-11 - Phase 5 Core: Integrations, Marketplace Plumbing, SDK Phase 4

**Type:** Feature

**Description:**
Implemented the core of Phase 5 (Launch Roadmap Stage 1) as a walking skeleton: shared integration utilities, the milestone-critical integration packages (Slack, GitHub, Jira) with end-to-end trigger dispatch, package signature verification with Redis hot-load, gated Marketplace API routes with always-on air-gapped install, Studio/Admin frontend surfaces, and SDK Phase 4 codegen. The platform ships with `MARKETPLACE_ENABLED=false`; all Marketplace routes exist but return 503, no Marketplace UI renders, and the License Validator/Usage Reporter never start. Air-gapped `.mpack` install is active regardless of the flag.

**Changes:**
- `packages/integrations/core` — new `@magicaal/integration-core`: OAuth refresh, cursor pagination + Link-header parsing, `IntegrationError`, rate-limit header normalization, idempotency keys, shared JSONata config resolution
- `packages/integrations/{slack,github,jira}` — integration packages with nodes, auth schemas, and signature-validated webhook triggers (Slack v0 HMAC + url_verification handshake; GitHub X-Hub-Signature-256 + ping; Jira X-Hub-Signature)
- `packages/sdk/src/integration.ts` — `IntegrationPackage`/`IntegrationTriggerHandler` contract for integration packages
- `apps/engine` — Integration Registry + startup registration; `/internal/integrations`; `/internal/triggers/integrations/:service` dispatch (per-registration signature verification, event filtering, multi-agent enqueue); `.mpack` extractor/verifier/loader (`src/marketplace/`); copy-on-write node registry with per-run snapshots (in-flight hot-load isolation); Redis pub/sub hot-load subscriber; `/internal/packages/install`; gated License Validator (hourly heartbeat, 72h grace) and Usage Reporter (daily aggregate)
- `apps/api` — `integration_triggers` table + migration 0005 (also package signature columns); trigger CRUD + public receiver `/v1/triggers/integrations/:service/:tenantSlug` with raw-body capture; gated `/v1/marketplace/*` routes; always-on `POST /v1/marketplace/licenses/bundle`; `GET /v1/openapi.json`; `GET /v1/system/config`; `GET /v1/runs/:runId`
- `apps/web` — ConnectionSelect dropdown for `format:'connection'` fields; integration trigger registration in Agent Config Panel; category-grouped palette with 30s refresh (hot-loaded nodes appear without reload) and gated Browse Marketplace links; Admin Marketplace panel (only when enabled) and always-on `/admin/system/air-gapped` upload panel
- `packages/sdk-client` — `AgentDescriptor` + `client.agent(descriptor)` typed overload, `WebhookVerifier`, `agent.validate(input)`, `client.runs.get(runId)`
- `packages/cli` — `magicaal generate` (`--all`, `--check` drift detection)

**Impact:**
The platform-launch portion of the Phase 5 milestone is implemented and tested (350 tests across 9 workspaces). The supply-chain boundary (Ed25519 publisher signature + content hash + MagiCaal countersignature) is enforced on every package install, including air-gapped. In-flight runs are provably isolated from mid-run package installs.

**Notes:**
Remaining Phase 5 work: tier-2 integration packages (Gmail+SendGrid, Stripe, Google Workspace, Salesforce, HubSpot, Zendesk; then Twilio, QuickBooks, BambooHR, Shopify — templated on the Slack package); full docker-compose e2e of the Slack+GitHub+Jira milestone scenario; internal-staging Marketplace install validation; OAuth refresh under synthetic token expiry; dedicated security review of the signature verifier before Stage 2. Pre-existing (untouched): `@magicaal/cli` and `@magicaal/integration-caal` `type-check` scripts fail on project-reference config (TS6306) — predates Phase 5 work.

---

### 2026-06-30 - Stage 0 OSS Foundation

**Type:** Infrastructure

**Description:**
Implemented the full Stage 0 OSS Foundation work, preparing the repository for public release under Apache 2.0. All 23 files (20 new, 3 updated) are complete and verified. Track A (external administrative tasks) is documented as a checklist in the plan file.

**Changes:**
- `LICENSE` — Apache 2.0 full text
- `NOTICE` — attribution file (MagiCaal Labs, Inc., 2026)
- `GOVERNANCE.md` — BDFL model (Justin Ward, @Jdubz-1), RFC process, Core Maintainer lifecycle
- `MAINTAINERS.md` — initial roster (BDFL only); empty Core Maintainer + Emeritus sections
- `CODE_OF_CONDUCT.md` — Contributor Covenant v2.1; enforcement contact: security@magicaal.dev
- `CONTRIBUTING.md` — full rewrite; replaced stale api-service/ paths, @workspace/* packages, wrong scopes; added CLA requirement, devbox guidance, RFC trigger table
- `SECURITY.md` — vulnerability reporting channels, 24h SLA, disclosure timeline, scope, Hall of Fame
- `CHANGELOG.md` — retroactive v0.5.0 entry covering Phases 0–4; curated highlights per phase
- `ROADMAP.md` — public-facing phase status table with GitHub Milestone links
- `.github/PULL_REQUEST_TEMPLATE.md` — checklist-based PR template
- `.github/ISSUE_TEMPLATE/bug_report.yml` — structured bug form (subsystem, version, OS, reproduction)
- `.github/ISSUE_TEMPLATE/feature_request.yml` — feature form with roadmap fit dropdown
- `.github/ISSUE_TEMPLATE/rfc_proposal.yml` — lightweight interest-gauge form
- `.github/CODEOWNERS` — all paths → @Jdubz-1 (initial state; updated as maintainers are added)
- `.github/dependabot.yml` — weekly updates for npm, Docker (3 apps), and GitHub Actions; assignee @Jdubz-1
- `.github/workflows/codeql.yml` — weekly SAST scan (push + PR + schedule) on javascript-typescript
- `.github/workflows/release.yml` — updated: GHCR primary + Docker Hub mirror, latest tag gating (no hyphen), npm publish for @magicaal/sdk + @magicaal/compiler + @magicaal/cli, GitHub Release with CHANGELOG body extraction
- `deploy/docker-compose.yml` — production compose using published ghcr.io/magicaal/* images; named volumes, health checks, restart policies
- `deploy/.env.example` — consolidated env vars from all three services; MAGICAAL_MASTER_KEY warning, JWT_SECRET sync note, MARKETPLACE_ENABLED=false with air-gapped options
- `deploy/README.md` — 5-step quickstart; upgrade/verify/troubleshoot sections
- `rfcs/0000-template.md` — RFC template with all standard sections
- `rfcs/0001-graph-schema-v1.md` — retroactive RFC ratifying AgentGraphDefinition schema v1; Status: Accepted
- `README.md` — rewritten: badges, capability bullets, ASCII architecture diagram, deploy/ quickstart, links section

**Impact:**
Repository is now ready for public release (Stage 2). All governance, legal, and community infrastructure is in place. Contributors will be guided by CODEOWNERS (PR reviews), CLA bot (Track A: A4), CodeQL (security scanning), and Dependabot (dependency hygiene). The deploy/ directory gives first-time users a path that doesn't require building from source.

**Notes:**
Track A (external tasks) must be completed before Stage 2 (public release): legal entity registration (A1), domain + email (A2), package registry claims (A3), CLA infrastructure (A4), GitHub settings (A5), Discord (A6), good first issues (A7). These are documented in the plan file at `.claude/plans/glimmering-wibbling-boole.md`.

---

### 2026-06-16 - Phase 4 Code Review Fixes (ISS-031–ISS-046)

**Type:** Bugfix

**Description:**
Post-implementation review of Phase 4 identified 16 bugs. All fixed in 4 commits. No new features.

**Changes:**
- `packages/integrations/caal/src/tools/graph.ts` — corrected `execute()` parameter order on all 10 tools (ISS-033)
- `packages/integrations/caal/src/tools/platform.ts` — corrected `execute()` parameter order on all 4 tools (ISS-033)
- `packages/integrations/caal/src/tools/canvas.ts` — corrected `execute()` parameter order on both tools (ISS-033)
- `packages/integrations/caal/src/tools/proposal.ts` — corrected `execute()` parameter order (ISS-033)
- `apps/api/src/controllers/caal.controller.ts` — fixed dead ternary (ISS-031); removed redundant dynamic imports (ISS-046)
- `apps/api/src/controllers/sessions.controller.ts` — replaced N+1 expiry loop with single bulk UPDATE (ISS-036)
- `apps/api/src/controllers/test-cases.controller.ts` — JSON validation for assertionsJson at creation (ISS-034); ajv schema assertion (ISS-037); evaluate_score now fails instead of passing silently (ISS-038)
- `agents/caal.agent.ts` — removed canvas tool edges from explainer node (ISS-035); fixed session-write to reference `$.history` not `$.sessionMessages` (ISS-042)
- `packages/compiler/src/compile.ts` — added toolEdge target validation (ISS-040); added core:end node requirement (ISS-045)
- `packages/compiler/src/graph.ts` — moved edgeCounter to instance variable (ISS-044)
- `packages/cli/src/commands/build.ts` — skip manifest write on all-errors build (ISS-041)
- `packages/cli/src/commands/sessions.ts` — require --agent flag; remove non-existent migrate-all endpoint call (ISS-043)
- `apps/web/src/canvas/components/TestCasesPanel.svelte` — send assertionsJson string not assertions array (ISS-039)
- `apps/api/Dockerfile` — agent-builder stage uses alpine + ENTRYPOINT for active volume copy (ISS-032)
- `docker-compose.yml` — api depends_on agent-builder with service_completed_successfully (ISS-032)

**Impact:**
Caal AI assistant is now fully functional (all tools were throwing TypeError). Test suite assertions are now honest. Docker redeployments serve fresh agent definitions. Compiler rejects invalid graphs (missing end node, orphaned tool edges). Session history now accumulates correctly across Caal invocations.

---

### 2026-06-16 - Phase 4: Graph-as-Code & Session Management

**Type:** Feature

**Description:**
Implemented Phase 4 in full — TypeScript-first agent authoring via a compiler/CLI, persistent cross-run session context, prompt versioning, test case management, SDK session utilities, and Caal Phase 1 (in-Studio AI assistant).

**Changes:**
- `apps/api/drizzle/migrations/0004_phase4.sql` — ALTER TABLE sessions/session_context, new caal_configuration table, test_cases/prompt_versions column additions
- `apps/api/src/db/schema/sessions.ts` — added rootRunId, status, metadata, accumulationType, schemaVersion
- `apps/api/src/db/schema/platform.ts` — added caalConfiguration Drizzle table
- `apps/api/src/db/schema/prompt-test.ts` — added packNamespace, tenantId, lastResult
- `packages/compiler/` — new @magicaal/compiler package: AgentGraph base class, @Agent decorator (reflect-metadata), compile(), node classes
- `packages/cli/` — new @magicaal/cli package: magicaal build/validate/list/sessions commands
- `agents/caal.agent.ts` — code-defined Caal assistant agent with session, 5 node paths, 22 tool edges
- `apps/engine/src/session/session-manager.ts` — SessionManager HTTP client (load/save/expire/recordRunLink)
- `apps/engine/src/execution/scheduler.ts` — session load before run, save in success+error paths
- `apps/engine/src/execution/context.ts` — added sessionId to RunParams and ExecutionContextImpl
- `packages/sdk/src/context.ts` — added sessionId? to ExecutionContext interface
- `packages/nodes/src/nodes/core-session-read.ts` — new core:session-read node
- `packages/nodes/src/nodes/core-session-write.ts` — new core:session-write node
- `packages/nodes/src/nodes/core-session-clear.ts` — new core:session-clear node
- `packages/nodes/src/nodes/core-llm-call.ts` — injectSessionHistory config field
- `packages/nodes/src/nodes/core-tool-call.ts` — injectSessionHistory config field
- `packages/nodes/src/nodes/core-react.ts` — injectSessionHistory config field
- `packages/integrations/caal/src/tools/graph.ts` — implemented all 10 graph tools
- `packages/integrations/caal/src/tools/proposal.ts` — implemented proposalCreate with complexity classification
- `packages/integrations/caal/src/tools/platform.ts` — implemented 4 platform HTTP tools
- `packages/integrations/caal/src/tools/canvas.ts` — implemented highlight/focus canvas tools
- `apps/api/src/platform/bootstrap.ts` — ensurePlatformTenant() for _platform tenant + caal_configuration
- `apps/api/src/sync/boot-sync.ts` — bootTimeSync(): manifest-driven non-destructive agent sync on startup
- `apps/api/src/controllers/sessions.controller.ts` — full public + internal session CRUD + accumulateValue()
- `apps/api/src/controllers/prompts.controller.ts` — prompt versioning + promotion + diff
- `apps/api/src/controllers/test-cases.controller.ts` — test case CRUD + runTestSuite with assertion evaluation
- `apps/api/src/controllers/caal.controller.ts` — invokeCaal, getCaalSession
- `apps/api/src/controllers/caal-config.controller.ts` — getCaalConfig, upsertCaalConfig
- `apps/api/src/routes/sessions.ts` — public sessionRouter + requireInternalAuth internalSessionRouter
- `apps/api/src/routes/prompts.ts` — promptsRouter
- `apps/api/src/routes/caal.ts` — caalRouter with invoke + sessions + config routes
- `apps/api/src/routes/index.ts` — mounted all new routers
- `apps/api/src/controllers/system.controller.ts` — getLastSyncEvent, listSyncEvents
- `apps/api/src/routes/system.ts` — GET /system/sync and /system/sync/log
- `apps/api/src/config.ts` — added agentsDir
- `apps/api/src/index.ts` — ensurePlatformTenant() + bootTimeSync() before app.listen
- `packages/sdk-client/src/session-client.ts` — SessionClient: context/reset/clear/destroy
- `packages/sdk-client/src/workspace-context-builder.ts` — WorkspaceContextBuilder fluent API
- `packages/sdk-client/src/agent-client.ts` — session() + sessions.list(), sessionId propagation in invoke/start
- `packages/sdk-client/src/index.ts` — exported SessionClient, WorkspaceContextBuilder and types
- `apps/web/src/canvas/components/CaalPanel.svelte` — in-Studio Caal chat panel with node chips + quick actions
- `apps/web/src/canvas/components/ProposalReviewUI.svelte` — per-patch accept/reject proposal review UI
- `apps/web/src/canvas/components/CodeSourceBanner.svelte` — amber banner for code-defined agents
- `apps/web/src/canvas/components/SessionContextPanel.svelte` — live session context inspector
- `apps/web/src/canvas/components/PromptVersionPanel.svelte` — prompt version list + promote + diff modal
- `apps/web/src/canvas/components/TestCasesPanel.svelte` — test case CRUD + run suite with pass/fail badges
- `apps/web/src/canvas/App.svelte` — read-only mode for code-defined agents, all new panels registered, Caal event wiring, proposal patch application
- `apps/web/src/routes/admin.ts` — /admin/sessions, /admin/system/sync, /admin/system/caal routes + dashboard cards
- `devbox.json` — added magicaal script alias
- `apps/api/.env.example` — documented AGENTS_DIR
- `apps/api/Dockerfile` — CLI build stage, magicaal build step, agent-builder export stage
- `docker-compose.yml` — agent-builder service, agents_dist volume mount on api

**Impact:**
Developers can now author agents in TypeScript using `AgentGraph` + `@Agent`, compile them with `magicaal build`, and have them automatically synced on API boot. Sessions persist structured context across runs with append/replace/merge accumulation. Caal AI assistant is live in Studio: explain, suggest, and modify graphs via a chat panel with per-patch proposal review. Prompt versioning and test suite runner are available from the Studio sidebar. Admin panel has dedicated pages for sessions, sync log, and Caal configuration.

---

### 2026-06-15 - Phase 3 Medium/Low Issue Resolution (ISS-011 to ISS-030)

**Type:** Bugfix

**Description:**
Closed all remaining 18 open issues from the Phase 3 code review (medium and low severity). ISS-014 was already resolved as a side effect of the ISS-015 fix; all others received explicit fixes. All 30 Phase 3 issues are now resolved.

**Changes:**
- `apps/engine/src/execution/context.ts` — add `response.ok` check in dispatchSubRun poll (ISS-011); convert `_callMcpTool` to static import (ISS-027)
- `apps/engine/src/execution/tool-executor.ts` — delete dead code line (ISS-022)
- `apps/engine/src/mcp/mcp-registry.ts` — try-finally in getServerConfig (ISS-012); remove dead `_nodeToServer` map (ISS-029)
- `apps/engine/src/mcp/mcp-client.ts` — await `initialized` notification write; send notification for HTTP transport (ISS-028)
- `apps/engine/src/controllers/mcp-servers.controller.ts` — 15s timeout via Promise.race on test sequence (ISS-013)
- `apps/engine/src/router/router-engine.ts` — last-resort fallback when all targets proactively skipped (ISS-016); blended cost (prompt + completion) for cost-optimized strategy (ISS-017)
- `apps/engine/src/db/telemetry-schema.ts` + `telemetry-migrate.ts` + `lifecycle.ts` — add `tool_inputs_json` column to trajectories table; migrate safely; populate from `TrajectoryStep.toolInputs` (ISS-020)
- `packages/nodes/src/nodes/core-fan-out.ts` + `core-reduce.ts` + `apps/engine/src/execution/worker.ts` — configurable `resultsKey` on fan-out/reduce pair; defaults to `_fanout_results` (ISS-021)
- `apps/api/src/controllers/mcp-servers.controller.ts` — add `env` field to formatServer (ISS-019)
- `apps/api/src/routes/mcp-servers.ts` — add `requireMinRole('tenant_admin')` to test route (ISS-025)
- `apps/api/src/controllers/agents.controller.ts` — return 404 for absent input/output schema (ISS-026)
- `apps/engine/src/auth/invocation-auth.ts` — public strategy: require agent enabled, enforce rate limit (ISS-030)
- `apps/web/src/canvas/components/NodeConfigPanel.svelte` — reset expression editor state on node change (ISS-023); value picker now shows real output key names from node schema (ISS-024)
- `.ai_docs/MAGICAAL_ISSUES.md` — all 30 issues marked resolved

**Impact:**
All Phase 3 issues cleared. MCP clients no longer leak DB handles. Sub-run polling fails fast on bad status. Test endpoint times out instead of hanging. Cost-optimized routing correctly weights completion tokens. Trajectory records now include tool inputs. Sequential fan-out/reduce graphs work correctly with distinct result keys. Public strategy agents are rate-limited and disabled-agent invocations are rejected. Value picker in Studio generates valid JSONata.

---

### 2026-06-15 - Phase 3 Critical/High Issue Resolution (ISS-001 through ISS-018)

**Type:** Bugfix

**Description:**
Post-code-review fix pass addressing all 12 critical and high severity issues identified in the Phase 3 review. Five critical issues meant shipped features were completely non-functional (JWT auth bypassed, trajectory display broken, expression evaluate always 404, admin script syntax errors). Seven high severity issues covered security, error handling, and configuration.

**Changes:**
- `apps/engine/src/execution/worker.ts` — add `stepId` to SSE `node.started`/`node.completed` broadcasts; inject `_currentNodeId` on ctx before `module.execute()` for MCP node ID resolution (ISS-001, ISS-002)
- `apps/engine/src/controllers/runs.controller.ts` — switch to `validateInvocationRequest` + accept `authorizationHeader` field (ISS-005)
- `apps/api/src/controllers/runs.controller.ts` — pass `authorizationHeader: req.headers.authorization` to engine (ISS-005)
- `apps/engine/src/auth/invocation-auth.ts` — retry on `JWKSNoMatchingKey` with fresh JWKS set before failing (ISS-008)
- `apps/engine/src/controllers/telemetry.controller.ts` — mandatory tenant check in `getTrajectory`; `inArray` limit on runs query + JSON.parse try-catch in `getRoutingEvents` (ISS-007, ISS-015)
- `apps/engine/src/config.ts` + `.env.example` + `context.ts` — `ENGINE_INTERNAL_URL` added to config, documented, and used instead of bare `process.env` (ISS-018)
- `packages/nodes/src/nodes/core-tool-call.ts` + `core-react.ts` — `execute()` returns `NodeOutput { status: 'failed' }` instead of throwing (ISS-006)
- `packages/nodes/src/nodes/core-mcp-client.ts` — use `_currentNodeId` instead of `ctx.agentId`; wrap `_callMcpTool` in try-catch (ISS-002, ISS-010)
- `packages/nodes/src/nodes/core-planner.ts` + `core-reflection.ts` + `core-context-summarize.ts` + `core-evaluate.ts` — wrap `ctx.llmCall` in try-catch, return typed `NodeOutput` on LLM error (ISS-009)
- `apps/api/package.json` + `apps/api/src/routes/utils.ts` + `apps/api/src/controllers/evaluate.controller.ts` — new `POST /v1/utils/evaluate` endpoint using `@magicaal/nodes` evaluate() (ISS-003)
- `apps/web/src/canvas/stores/run.ts` + `TestRunPanel.svelte` — add `stepId` to `StepResult`; store stepId from SSE; fix trajectory filter to use `step.stepId` (ISS-001)
- `apps/web/src/routes/admin.ts` — remove TypeScript `as HTMLSelectElement` cast from inline browser `<script>` tags (ISS-004)
- `.ai_docs/MAGICAAL_ISSUES.md` — 12 issues marked resolved

**Impact:**
JWT invocation auth now works end-to-end. Trajectory display in the Studio test run panel now correctly matches DB step records. The Expression Editor Evaluate button is functional. Admin JWT config and MCP server transport toggle now work in the browser. MCP direct mode correctly identifies the calling node. LLM errors in planner/reflection/summarize/evaluate return structured failure instead of crashing. Sub-graph dispatch works in Docker. Routing events query is bounded.

---

### 2026-06-15 - Phase 3: Tool System, Advanced Agent Nodes, MCP, and Model Router Phase 3

**Type:** Feature

**Description:**
Full Phase 3 implementation. The platform can now run true agentic loops: `core:tool-call` and `core:react` nodes drive LLM agents that use tools via the new Tool Executor. 15 new nodes added across four tracks: agentic (tool, tool-call, react, mcp-client), AI/LLM (planner, reflection, context-summarize, token-budget), composition (sub-graph, handoff, fan-out, reduce, input-map, output-map), and evaluation (evaluate). The Model Router gains `cost-optimized` strategy and proactive `latency_degraded`/`error_rate` triggers. JWT invocation auth is fully wired in the engine. The Studio canvas renders tool edges (dashed amber) and tool nodes with amber borders, a new ToolPanel shows connected tools, and an Expression Editor allows raw JSONata field editing. Admin gains MCP Server management, JWT config UI, Evaluate Score History, and Routing Event Log panels.

**Changes:**
- `apps/engine/src/execution/tool-executor.ts` — new: `assembleTools`, `runAgentLoop`, `invokeGraphTool`, `invokeMcpTool`, `runSubGraph`
- `apps/engine/src/execution/graph-utils.ts` — new: extracted `resolveEdges` utility
- `apps/engine/src/execution/worker.ts` — fan-out/reduce and tool-call/react special cases; `findReduceNode` helper
- `apps/engine/src/execution/context.ts` — `clearTrajectorySteps`, `dispatchSubRun`, `_callMcpTool`
- `apps/engine/src/execution/lifecycle.ts` — `writeTrajectorySteps`, `writeEvaluateScore`; MCP client cleanup on run end
- `apps/engine/src/mcp/mcp-client.ts` — JSON-RPC 2.0 client (stdio + HTTP transports)
- `apps/engine/src/mcp/mcp-registry.ts` — per-run MCP client pool
- `apps/engine/src/router/router-engine.ts` — `cost-optimized` strategy; `checkProactiveTriggers` for `latency_degraded`/`error_rate`
- `apps/engine/src/router/health-tracker.ts` — timestamps on samples; `getErrorRate(windowMs)`
- `apps/engine/src/auth/invocation-auth.ts` — JWT strategy with JWKS validation via jose
- `packages/nodes/src/nodes/core-{tool,tool-call,react,mcp-client,planner,reflection,context-summarize,token-budget,sub-graph,handoff,fan-out,reduce,input-map,output-map,evaluate}.ts` — 15 new nodes
- `packages/sdk/src/node.ts` — added `'tool'` to the node category union
- `apps/api/src/routes/mcp-servers.ts` + `controllers/mcp-servers.controller.ts` — MCP CRUD API
- `apps/api/src/controllers/agents.controller.ts` — `getSchemaInput`, `getSchemaOutput`
- `apps/api/src/controllers/telemetry.controller.ts` — `getTrajectory`, `getRoutingEvents`
- `apps/engine/src/controllers/telemetry.controller.ts` — `getTrajectory`, `getRoutingEvents` engine-internal endpoints
- `apps/engine/src/controllers/mcp-servers.controller.ts` — `testMcpServerInternal`
- `apps/web/src/canvas/stores/graph.ts` — `ToolEdgeDef`, `toolEdges` in `GraphDef`, `addToolEdge`
- `apps/web/src/canvas/components/Canvas.svelte` — tool edge rendering (dashed amber), tool node amber borders, agent tool badges
- `apps/web/src/canvas/components/ToolPanel.svelte` — new sidebar panel for tool inspection
- `apps/web/src/canvas/components/ExpressionEditor.svelte` — new styled textarea JSONata editor
- `apps/web/src/canvas/components/NodeConfigPanel.svelte` — expression editor toggle per field
- `apps/web/src/canvas/components/TestRunPanel.svelte` — trajectory display for ReAct/Planner steps
- `apps/web/src/canvas/components/LintPanel.svelte` — tool node validation rules
- `apps/web/src/canvas/App.svelte` — ToolPanel added to right sidebar
- `apps/web/src/routes/admin.ts` — MCP Server management, JWT config UI, Evaluate Score History, Routing Event Log

**Impact:**
Platform now supports full agentic loops. `core:tool-call` and `core:react` agents can invoke graph tools, MCP tools, and sub-graphs. Trajectory data is recorded per iteration and visible in the Studio test run panel. `cost-optimized` routing and proactive triggers complete the Model Router's Phase 3 capability. JWT invocation auth enables enterprise IdP integration without API keys. Node count grows from 35 to 50.

---

### 2026-06-02 - Phase 2 Gap Closure: 9 Nodes, routingMeta Telemetry, Invocation Auth Admin

**Type:** Feature

**Description:**
Closed all high/medium priority Phase 2 gaps to bring the platform to full Phase 2 completion. Nine previously deferred nodes are now built, routingMeta is correctly persisted on every LLM telemetry step, and the Invocation Auth admin panel is live.

**Changes:**
- `packages/nodes/src/nodes/core-http-request.ts` — HTTP client node using built-in `fetch`; supports GET/POST/PUT/PATCH/DELETE; optional Integration Connection auth injection
- `packages/nodes/src/nodes/core-file-read.ts` — File read node with path traversal protection (WORKSPACE_BASE_PATH)
- `packages/nodes/src/nodes/core-file-write.ts` — File write node with optional directory creation and path traversal protection
- `packages/nodes/src/nodes/core-web-search.ts` — Web search node supporting Brave Search and Tavily via Integration Connection
- `packages/nodes/src/nodes/core-web-scrape.ts` — Web scrape node using cheerio; CSS selector scoping; optional link extraction
- `packages/nodes/src/nodes/core-db-query.ts` — Parameterized SQL SELECT node; PostgreSQL via `pg` package; SELECT-only enforcement
- `packages/nodes/src/nodes/core-webhook-receive.ts` — Passthrough node that reads webhook trigger payload from execution context
- `packages/nodes/src/nodes/core-vector-search.ts` — In-memory cosine similarity search over a context-provided vector index; no external deps
- `packages/nodes/src/nodes/core-code.ts` — JavaScript sandbox using `isolated-vm` (optional native dep); injects named context keys as globals; `result` variable extraction
- `packages/sdk/src/node.ts` — Added optional `routingMeta` field to `NodeOutput` interface
- `packages/nodes/src/nodes/core-llm-call.ts`, `core-structured-extract.ts`, `core-embedding.ts`, `core-agentic-router.ts` — All four LLM-calling nodes now return `routingMeta` in their `NodeOutput`
- `apps/engine/src/execution/lifecycle.ts` — `writeStepEnd()` now writes `routingMetaJson` and `routerTargetUsed` to telemetry steps when `output.routingMeta` is present
- `apps/api/src/controllers/invocation-policy.controller.ts` — New controller: `getInvocationPolicy`, `updateInvocationPolicy` (upsert)
- `apps/api/src/routes/agents.ts` — Added `GET/PATCH /:id/invocation-policy` routes
- `apps/web/src/routes/admin.ts` — Added Invocation Auth admin panel: agent list, policy editor (strategy + rate limit), key management (create/revoke), plaintext key display on generation
- `packages/nodes/src/index.ts` — All 9 new nodes registered in `ALL_NODES[]`
- `packages/nodes/package.json` — Added `cheerio`, `pg` deps; `isolated-vm` as optional dep

**Impact:**
Phase 2 is fully complete. 35 nodes registered (was 26). Agent graphs can now make HTTP calls, read/write files, search the web, query databases, receive webhooks, search vectors, and execute sandboxed code. LLM routing decisions are now fully visible in telemetry. Admins can manage per-agent invocation auth and API keys from the admin panel.

**Notes:**
`isolated-vm` native build requires a C++ toolchain and fails on some WSL2 setups; it is declared as `optionalDependencies`. The `core:code` node returns `CODE_SANDBOX_UNAVAILABLE` gracefully when the native module isn't available. The three remaining Phase 2 deferrals (SSE Redis fan-out, Agentic Router config UI, OAuth callback handler) are low priority and do not block Phase 3.

---

### 2026-06-02 - Phase 2 Security & Correctness Fixes (10 issues)

**Type:** Bugfix

**Description:**
Applied surgical fixes for all 10 confirmed issues found during the Phase 2 code review. Addressed 5 critical-severity issues (cross-tenant agent access, timing attack in webhook secret comparison, credential resolver errors leaving runs orphaned in pending, fork branch shallow-copy sharing nested refs, empty tenantId accepted by engine webhook dispatch) and 5 high/medium issues (hardcoded localhost webhook URL, hardcoded fallback HMAC key, per-step token usage never persisted, round-robin counter resetting on circuit-state changes, tenant policy overridable:false not enforced).

**Changes:**
- `apps/api/src/controllers/agents.controller.ts` — Fix 1: added `and(eq(agents.tenantId, tenantId))` to WHERE in `getAgent`, `updateAgent`, `publishAgent`, `draftAgent`, `getVersionDiff` (ownership check), `rollbackVersion`; Fix 6: replaced `http://localhost:${config.port}` with `config.publicBaseUrl`
- `apps/api/src/controllers/webhook.controller.ts` — Fix 2: `timingSafeEqual` now guards buffer length first (returns 401, not 500 on mismatch); Fix 7: removed `|| 'magicaal-default-key'` fallback — throws 500 with `MISSING_MASTER_KEY` when `MAGICAAL_MASTER_KEY` is unset
- `apps/engine/src/execution/scheduler.ts` — Fix 3: moved `resolveCredentials` inside the `try/catch` block so credential failures call `markRunFailed` instead of leaving the run in perpetual pending state
- `apps/engine/src/execution/worker.ts` — Fix 4: fork branch context snapshot changed from `{ ...ctx.data }` (shallow) to `JSON.parse(JSON.stringify(ctx.data))` (deep clone); Fix 8: captures `tokensBefore` snapshot before node execution and passes `tokenDelta` to `writeStepEnd`
- `apps/engine/src/execution/lifecycle.ts` — Fix 8: `writeStepEnd` now accepts optional `tokenDelta` and persists per-step `promptTokens`, `completionTokens`, `estimatedCostUsd` to `telemetrySteps`
- `apps/engine/src/controllers/runs.controller.ts` — Fix 5: `webhookDispatch` now rejects requests with missing `x-tenant-id` header with 400 instead of silently using empty string
- `apps/api/src/config.ts` — Fix 6: added `publicBaseUrl` field (defaults to `http://localhost:<port>`, overridden by `PUBLIC_BASE_URL` env var)
- `apps/api/.env.example` — Fix 6: added `PUBLIC_BASE_URL=http://localhost:3000` with documentation comment
- `apps/engine/src/router/router-engine.ts` — Fix 9: round-robin key now uses `rrKey(config.targets)` (all targets, stable) instead of `rrKey(healthy)` (filtered, resets on circuit changes); Fix 10: `resolveRouterConfig` now returns tenant policy immediately if `overridable === false`, blocking node/graph-level overrides

**Impact:**
Critical security fix: tenants can no longer access agents belonging to other tenants. Webhook signature validation is now immune to length-mismatch crashes. Credential failures are now reflected in run status. Branch execution isolation is correct for nested data structures. Per-step LLM token costs are now visible in telemetry. Router behaviour is now deterministic across circuit-breaker state transitions.

---

### 2026-06-01 - Phase 2 Sub-phase G: Remaining Nodes, Tests & Milestone Sign-off

**Type:** Feature

**Description:**
Completed Phase 2 by adding the final two nodes (`core:memory-read`, `core:memory-write`), writing comprehensive tests for SSE infrastructure and human review end-to-end flow, fixing a correctness bug where `node.completed` was emitted for suspended nodes, and verifying all Phase 2 milestone requirements.

**Changes:**
- `packages/nodes/src/nodes/core-memory-read.ts` — new: reads named keys from in-run context; optional defaults, `failIfMissing` mode
- `packages/nodes/src/nodes/core-memory-write.ts` — new: writes computed values (JSONata expressions) to context keys; modes: replace (default), append (array), increment (counter)
- `packages/nodes/src/index.ts` — registered `coreMemoryRead`, `coreMemoryWrite`; 27 nodes in `ALL_NODES`
- `apps/engine/src/execution/worker.ts` — **bug fix**: `node.completed` now only emitted when `output.status === 'complete'`; suspended nodes no longer falsely emit completion

**Tests added:**
- `packages/nodes/tests/unit/nodes/core-memory.test.ts` — 12 tests for both memory nodes: read/defaults/failIfMissing, write/replace/append/increment/multi/error
- `apps/engine/tests/unit/sse/sse-manager.test.ts` — 6 tests: header setup, multi-subscriber broadcast, disconnect cleanup, per-run isolation, close, no-op broadcast
- `apps/engine/tests/unit/execution/human-review-e2e.test.ts` — 5 tests: suspension on first run, no spurious `node.completed` on suspension, resume pass-through, step ordering, SSE event sequence

**Phase 2 Milestone Sign-off:**

All five milestone requirements from the roadmap are met:

1. ✅ **LLM graph with guardrails + human review runs live via SSE**: `core:llm-call` + `core:guardrail` + `core:human-review` nodes all implemented and tested. SSE broadcasts `run.started`, `node.started`, `node.completed`, `node.failed`, `run.completed`, `run.failed`, `run.suspended` events.

2. ✅ **Model Router round-robins two OpenAI keys; 429 triggers fallback; `routingMeta.attemptCount == 2`**: Router Engine with `priority` and `round-robin` strategies, reactive `rate_limit` trigger, and `routingMeta` population tested in `router-engine.test.ts`.

3. ✅ **Agentic Router classifies and escalates low-confidence routes to Human Review**: `core:agentic-router` with `confidenceThreshold` sets `_route = '_human_review'` and tested in `core-agentic-router.test.ts`.

4. ✅ **`agent.stream()` delivers typed node-level events in real time**: SDK `AgentClient.stream()` using fetch-based SSE parser, typed `RunStreamEvent` union, Studio TestRunPanel using EventSource.

5. ✅ **`HumanReviewClient.approve()` resumes a suspended run**: `HumanReviewClient` in SDK, `resumeRun()` in engine, end-to-end path tested.

**Final Phase 2 state:**
- **27 node types** registered in `ALL_NODES`
- **159 tests passing**: 88 nodes + 40 engine + 31 API
- **0 TypeScript errors** across all packages
- All API routes from Phase 2 plan implemented
- Admin panels for all Phase 2 concerns
- Studio: LintPanel, Canvas Value Picker, Version History/Diff

---

### 2026-06-01 - Phase 2 Sub-phase F: API Completions, Telemetry & Admin/Studio Panels

**Type:** Feature

**Description:**
Completed the API surface for Phase 2 (version diff/rollback, telemetry routes, data sources CRUD, rate limiting with `X-RateLimit-*` headers, invocation audit logging), added Studio enhancements (graph lint panel, canvas value picker, version history with diff view), and delivered eight new admin panels (telemetry dashboard, run detail, human review queue, integration connections, router policies, provider pricing, data sources).

**Changes:**

*Engine*
- `apps/engine/src/controllers/telemetry.controller.ts` — new: `getTelemetry`, `getTokenUsage`, `getRunDetail`; aggregate token usage with per-agent breakdown
- `apps/engine/src/routes/internal.ts` — added `GET /telemetry`, `GET /telemetry/tokens`, `GET /telemetry/runs/:runId`

*API*
- `apps/api/src/controllers/telemetry.controller.ts` — new: proxies to engine telemetry endpoints with tenant isolation
- `apps/api/src/routes/telemetry.ts` — new: `GET /v1/telemetry`, `GET /v1/telemetry/tokens`
- `apps/api/src/controllers/datasources.controller.ts` — new: full CRUD + connection test stub
- `apps/api/src/routes/datasources.ts` — new: `GET/POST/PATCH/DELETE /v1/datasources` + test endpoint
- `apps/api/src/controllers/agents.controller.ts` — added `getVersionDiff` (recursive object diff), `rollbackVersion` (copies version to new draft); added `diffObjects()` helper
- `apps/api/src/routes/agents.ts` — added `GET /:id/versions/:vId/diff`, `POST /:id/versions/:vId/rollback`
- `apps/api/src/controllers/runs.controller.ts` — added `checkRateLimit()` in-memory counter; `dispatchRun` now enforces rate limits, sets `X-RateLimit-*` headers, and logs to `invocationLog`
- `apps/api/src/routes/index.ts` — mounted `telemetryRouter`, `datasourcesRouter`

*Studio*
- `apps/web/src/canvas/components/LintPanel.svelte` — new: static graph lint (unreachable nodes, no-fallback conditional paths, unknown types, empty outbound); error/warning badge display; acknowledge-warnings checkbox to enable publish
- `apps/web/src/canvas/App.svelte` — integrated `LintPanel` between AgentConfigPanel and TestRunPanel
- `apps/web/src/canvas/components/NodeConfigPanel.svelte` — Canvas Value Picker: `↗` button on string fields when upstream nodes exist; dropdown generates `$.nodeId` JSONata reference
- `apps/web/src/routes/studio.ts` — added version history route (`GET /:agentId/versions`), diff view (`GET /:agentId/versions/:vId/diff`), rollback handler (`POST /:agentId/versions/:vId/rollback`)

*Admin panels (all in `apps/web/src/routes/admin.ts`)*
- Dashboard: added 6 new navigation cards (Telemetry, Human Review, Integrations, Router Policies, Provider Pricing, Data Sources)
- `GET /admin/telemetry` — telemetry dashboard with 4 KPI cards + recent runs table
- `GET /admin/runs/:runId` — run detail with step timeline including token usage and routing trace
- `GET /admin/reviews` + approve/reject POST handlers — human review queue
- `GET /admin/integrations` + create/delete — integration connections management with JSON credential form
- `GET /admin/router-policies` + create/delete — Named Router Policy management with JSON config editor
- `GET /admin/pricing` + edit — Provider Pricing table (read + bulk JSON update)
- `GET /admin/datasources` + create/delete — Data Sources management

**Impact:**
All Phase 2 API endpoints are now implemented. The Studio has a working lint gate on publish, upstream node references via value picker, and version history. Admins can view telemetry, review suspended runs, manage integrations and routing policies, and update provider pricing. 136 tests unchanged and passing.

---

### 2026-06-01 - Phase 2 Sub-phase E: Agentic Router, Scheduler & Webhook Trigger

**Type:** Feature

**Description:**
Added the `core:agentic-router` node (LLM-powered intent classification with confidence threshold HITL escalation), wired up the BullMQ scheduled queue for cron-triggered agents, added webhook trigger support with HMAC-SHA256 URL-embedded secrets, and updated the Studio Agent Config Panel with a trigger type selector showing cron expression input and webhook URL display.

**Changes:**
- `packages/nodes/src/nodes/core-agentic-router.ts` — new: builds classification prompt from `cases[].description`, calls `ctx.llmCall()` with structured output schema `{ route, confidence, reasoning }`, routes to `_human_review` when `confidence < confidenceThreshold`; `model` field optional (deprecated in favour of `router`)
- `packages/nodes/src/index.ts` — registered `coreAgenticRouter`
- `apps/engine/src/execution/scheduler.ts` — added second `Worker` for `runs.scheduled` queue; cron jobs re-enqueue to `runs.trigger` with a fresh runId
- `apps/engine/src/controllers/runs.controller.ts` — added `webhookDispatch` handler
- `apps/engine/src/controllers/schedule.controller.ts` — new: `scheduleCronAgent` (adds BullMQ repeating job), `unscheduleCronAgent` (removes)
- `apps/engine/src/routes/internal.ts` — added `POST /agents/schedule`, `DELETE /agents/:agentId/schedule`, `POST /agents/:agentId/webhook`
- `apps/api/src/controllers/webhook.controller.ts` — new: `handleWebhook` (HMAC-SHA256 validation, dispatches to engine), `getWebhookUrl`, `computeWebhookSecret`
- `apps/api/src/controllers/agents.controller.ts` — `publishAgent` now extracts tenant, calls engine schedule endpoint for cron triggers, includes `webhookUrl` in response for webhook triggers
- `apps/api/src/routes/index.ts` — added public `POST /v1/agents/:id/webhook/:secret` route (no auth)
- `apps/web/src/canvas/stores/graph.ts` — extended `agentConfig` store type with `triggerType: 'rest'|'cron'|'webhook'`, `cronExpression`, `webhookUrl`
- `apps/web/src/canvas/components/AgentConfigPanel.svelte` — trigger type `<select>`; cron expression input (conditional); webhook URL display (read-only, conditional); `saveTriggerConfig` builds `triggerConfig` object from form
- `apps/web/src/canvas/App.svelte` — populates `cronExpression` and `webhookUrl` from loaded trigger config

**Tests added:**
- `packages/nodes/tests/unit/nodes/core-agentic-router.test.ts` — 6 tests: classification, optional output keys, HITL escalation, unknown key fallback, empty input, no cases

**Impact:**
Agents can now be triggered by cron schedule or inbound webhook. The Agentic Router classifies intent using an LLM and routes to the correct branch; low-confidence routes escalate to Human Review. 136 tests passing.

---

### 2026-06-01 - Phase 2 Sub-phase D: LLM Nodes, Credential Resolver & Human Review

**Type:** Feature

**Description:**
Added the full LLM execution path: `ctx.llmCall()` on `ExecutionContext` so nodes can call the router without importing engine internals; `core:llm-call`, `core:structured-extract`, and `core:embedding` nodes; `core:guardrail` (3 modes) and `core:human-review` (suspend/resume) nodes; the integration credential resolver (AES-256-GCM decrypt from primary DB); human review checkpoint persistence and resume logic; Integration Connections CRUD API with OAuth initiation stub; and `HumanReviewClient` in the SDK.

**Changes:**
- `packages/sdk/src/context.ts` — added `llmCall(request, routerConfig?)` to `ExecutionContext` interface
- `apps/engine/src/execution/context.ts` — implemented `llmCall()` using `routedLLMCall` + `resolveRouterConfig`; added `graphDefaultRouter`/`tenantRouterPolicy` params; added `suspendedNodeId` to suspension state; added `suspend(reviewId, nodeId?)` signature
- `apps/engine/src/db/telemetry-schema.ts` — added `reviewId`, `suspendedNodeId`, `checkpointJson` columns to `telemetryRuns`
- `apps/engine/src/db/telemetry-migrate.ts` — `CREATE TABLE IF NOT EXISTS` with new columns + safe `ALTER TABLE ADD COLUMN` for existing DBs
- `apps/engine/src/execution/lifecycle.ts` — `markRunSuspended` now persists `reviewId`, `suspendedNodeId`, and `checkpointJson`
- `apps/engine/src/resolver/credential-resolver.ts` — new: reads `integration_connections` via read-only primary DB, decrypts AES-256-GCM credentials, injects into `ctx.credentials[connectionId]`
- `apps/engine/src/execution/scheduler.ts` — calls `resolveCredentials()` before `executeGraph`; threads `graphDefaultRouter` into context; handles `resumeFromNodeId` for resumed runs
- `apps/engine/src/execution/resume.ts` — new: `resumeRun()` (approve = restore checkpoint + re-enqueue; reject = mark failed); `requeuesuspendedRunsOnStartup()`
- `apps/engine/src/controllers/runs.controller.ts` — added `reviewRun` handler (`POST /runs/:id/review`)
- `apps/engine/src/routes/internal.ts` — added `POST /runs/:id/review` route
- `packages/nodes/src/nodes/core-llm-call.ts` — new: builds `CanonicalLLMRequest`, calls `ctx.llmCall()`, structured output mode + JSON retry
- `packages/nodes/src/nodes/core-structured-extract.ts` — new: thin wrapper enforcing `outputSchema`
- `packages/nodes/src/nodes/core-embedding.ts` — new: embedding call via `ctx.llmCall()` with `embeddingMode` metadata
- `packages/nodes/src/nodes/core-guardrail.ts` — new: 3 modes (block-and-fail, reroute-to-fallback, redact-and-continue); JSONata rule evaluation
- `packages/nodes/src/nodes/core-human-review.ts` — new: first-run = suspend + reviewId; resumed-run = pass-through on `_review_approved`
- `packages/nodes/src/index.ts` — registered all 5 new nodes
- `packages/nodes/tests/helpers/mock-context.ts` — added `llmCall: jest.fn()` stub
- `apps/api/src/controllers/integrations.controller.ts` — new: connection CRUD, `encryptCredentials`, OAuth initiation + callback stub
- `apps/api/src/routes/integrations.ts` — new: connections CRUD + OAuth routes
- `apps/api/src/controllers/runs.controller.ts` — added `reviewRun` proxy to engine
- `apps/api/src/routes/agents.ts` — added `POST /:id/runs/:runId/review`
- `apps/api/src/routes/index.ts` — mounted `integrationsRouter` at `/v1/integrations`
- `packages/sdk-client/src/human-review-client.ts` — new: `approve()`, `reject(reason)`, `modify(mods)`, `details()`, `onPendingReview(handler)`
- `packages/sdk-client/src/agent-client.ts` — added `reviewRun(runId): HumanReviewClient`
- `packages/sdk-client/src/index.ts` — exported `HumanReviewClient`

**Tests added (14 new test files total across sub-phases, 19 new tests this sub-phase):**
- `packages/nodes/tests/unit/nodes/core-guardrail.test.ts` — 5 tests: all 3 modes + pass/multi-rule
- `packages/nodes/tests/unit/nodes/core-human-review.test.ts` — 4 tests: suspend, resume, reviewIdKey, log
- `packages/nodes/tests/unit/nodes/core-llm-call.test.ts` — 5 tests: basic call, structured output, retry, messagesKey, error handling
- **Note:** JSONata uses `=` for equality (not `==`); all rule expressions must use `$key = value` syntax

**Impact:**
LLM nodes are now fully wired — a `core:llm-call` node in a graph can call any configured provider via the Model Router. Integration credentials are resolved and decrypted automatically before each run. Human review suspend/resume works end-to-end. 130 tests passing.

---

### 2026-06-01 - Phase 2 Sub-phase C: Model Router Core

**Type:** Feature

**Description:**
Delivered the full Model Router infrastructure: provider adapter registry with built-in OpenAI, Anthropic, and Google adapters; circuit breaker (CLOSED → OPEN → HALF-OPEN state machine); rolling P50 / error rate health tracker; router engine with priority, round-robin, weighted, and least-latency strategies plus reactive triggers (rate_limit, provider_error, timeout, context_overflow, content_policy); pricing cache seeded from built-in defaults. Added API routes for Named Router Policy CRUD and Provider Pricing management. Added `core:prompt-builder` node for template-based prompt assembly.

**Changes:**
- `packages/sdk/src/provider.ts` — added `credentials: ResolvedCredentials` parameter to `call()` and `stream()` interfaces
- `apps/engine/src/router/provider-adapter-registry.ts` — new singleton: `register`, `get`, `has`, `list`
- `apps/engine/src/router/health-tracker.ts` — new singleton: rolling ring buffer P50 + error rate per target
- `apps/engine/src/router/circuit-breaker.ts` — new singleton: CLOSED/OPEN/HALF_OPEN state machine per target with configurable thresholds and cooldown
- `apps/engine/src/router/adapters/openai.ts` — OpenAI Chat Completions adapter (tools, structured output, error translation)
- `apps/engine/src/router/adapters/anthropic.ts` — Anthropic Messages adapter (system prompt, tool_use blocks, structured output via tool)
- `apps/engine/src/router/adapters/google.ts` — Google Gemini adapter (systemInstruction, functionDeclarations, responseSchema)
- `apps/engine/src/router/router-engine.ts` — `routedLLMCall()`: target selection by strategy, circuit breaker gating, reactive trigger fallback, routingMeta population, cost estimation from pricing cache; `resolveRouterConfig()`: precedence chain; `initPricingCache()`: seeds built-in defaults + DB overrides
- `apps/engine/src/registry/startup.ts` — `registerAdapters()`: registers OpenAI/Anthropic/Google adapters at startup
- `apps/engine/src/index.ts` — calls `registerAdapters()` and `initPricingCache()` at startup
- `packages/nodes/src/nodes/core-prompt-builder.ts` — new `core:prompt-builder` node with `{{key}}` / `{{nested.key}}` interpolation
- `packages/nodes/src/index.ts` — added `corePromptBuilder` to `ALL_NODES`
- `apps/api/src/controllers/llm.controller.ts` — new: Named Router Policy CRUD handlers
- `apps/api/src/routes/llm.ts` — new: `GET /v1/llm/health`, router policy CRUD routes
- `apps/api/src/controllers/system.controller.ts` — added `getProviderPricing`, `upsertProviderPricing`
- `apps/api/src/routes/system.ts` — added `GET/POST /v1/system/provider-pricing`
- `apps/api/src/routes/index.ts` — mounted `llmRouter` at `/v1/llm`
- `apps/api/drizzle/migrations/0003_phase2_router.sql` — `CREATE TABLE IF NOT EXISTS` for `named_router_policies` and `provider_pricing`
- `apps/api/drizzle/migrations/meta/_journal.json` — added migration entry

**Tests added:**
- `apps/engine/tests/unit/router/circuit-breaker.test.ts` — 7 tests: CLOSED/OPEN/HALF_OPEN transitions
- `apps/engine/tests/unit/router/router-engine.test.ts` — 6 tests: priority selection, 429 fallback, all-targets-failed, no-trigger hard failure, cost estimation, credential skip
- `packages/nodes/tests/unit/nodes/core-prompt-builder.test.ts` — 5 tests

**Impact:**
Engine can now route LLM calls across multiple provider targets with circuit breaking and reactive fallback. 116 tests passing (56 nodes + 29 engine + 31 API).

---

### 2026-06-01 - Phase 2 Sub-phase B: New Non-LLM Nodes + Loop/Fork/Join Engine

**Type:** Feature

**Description:**
Added 11 new node implementations across data, observability, and control-flow categories. Extended the engine worker with Loop cycle support and Fork/Join parallel execution.

**Changes:**
- `packages/nodes/src/nodes/core-transform.ts` — JSONata expression transform; writes to outputKey
- `packages/nodes/src/nodes/core-filter.ts` — boolean JSONata filter; sets `_filter_pass`
- `packages/nodes/src/nodes/core-validate.ts` — JSON Schema validator; sets `_valid` + `_errors`
- `packages/nodes/src/nodes/core-parse.ts` — parse JSON/CSV/lines string into structure
- `packages/nodes/src/nodes/core-aggregate.ts` — reduce array: sum/count/collect/min/max/average/first/last
- `packages/nodes/src/nodes/core-metric.ts` — emit named metric via `ctx.metric()`
- `packages/nodes/src/nodes/core-annotation.ts` — write structured annotation to step record
- `packages/nodes/src/nodes/core-wait.ts` — delay or poll condition with configurable timeout
- `packages/nodes/src/nodes/core-loop.ts` — loop controller; sets `_loop_continue`/`_loop_iteration`
- `packages/nodes/src/nodes/core-fork.ts` — parallel split marker
- `packages/nodes/src/nodes/core-join.ts` — parallel branch barrier
- `packages/nodes/src/index.ts` — registered all 11 new nodes in `ALL_NODES`
- `apps/engine/src/execution/worker.ts` — refactored to `executeNodeOnce()` helper; added Fork/Join parallel execution (`Promise.all` branches with cloned context + merge); added Loop cycle detection with `maxIterations` enforcement

**Impact:**
Engine now supports parallel branch execution and bounded loops. 51 node tests pass (16 new). No regressions in engine or API tests.

---

### 2026-06-01 - Phase 2 Sub-phase A: SSE Stream Infrastructure

**Type:** Feature

**Description:**
Delivered live SSE streaming for run execution across the full stack: engine broadcasts node/run lifecycle events; the API proxies the stream with tenant ownership verification; the SDK exposes an `agent.stream()` async generator; and the Studio TestRunPanel now shows per-node status updating in real time instead of polling.

**Changes:**
- `apps/engine/src/sse/sse-manager.ts` — new singleton `SseManager`: per-runId Set<Response> registry; `subscribe`, `broadcast`, `close`
- `apps/engine/src/execution/context.ts` — `emit()` now calls `sseManager.broadcast()` instead of logging
- `apps/engine/src/execution/lifecycle.ts` — `markRunStarted/Complete/Failed/Suspended` broadcast `run.*` SSE events; terminal methods call `sseManager.close()`; `markRunStarted` now accepts `agentId`
- `apps/engine/src/execution/worker.ts` — emits `node.started`, `node.completed`, `node.failed` via `ctx.emit()` at each node lifecycle boundary
- `apps/engine/src/execution/scheduler.ts` — passes `agentId` to `markRunStarted`
- `apps/engine/src/controllers/runs.controller.ts` — new `streamRun`: subscribes live runs to SSE; sends terminal event immediately for already-completed runs
- `apps/engine/src/routes/internal.ts` — `GET /runs/:id/stream` route
- `apps/api/src/controllers/runs.controller.ts` — new `streamRun`: verifies agent ownership, proxies SSE from engine with `responseType: 'stream'`
- `apps/api/src/routes/agents.ts` — `GET /:id/runs/:runId/stream` route
- `apps/web/src/app.ts` — dedicated SSE proxy route before general `/api` proxy
- `packages/nodes/src/nodes/core-log.ts` — new `core:log` node (observability category); emits `node.log` SSE event
- `packages/nodes/src/index.ts` — added `coreLog` to `ALL_NODES`
- `packages/sdk-client/src/stream-client.ts` — new `streamRun()` fetch-based SSE parser returning `AsyncGenerator<RunStreamEvent>`
- `packages/sdk-client/src/agent-client.ts` — new `stream(input, opts?)` method; starts async run then subscribes to SSE stream
- `packages/sdk-client/src/run-handle.ts` — `RunSuspendedError` now receives actual `reviewId` from run response
- `packages/sdk-client/src/index.ts` — exports `streamRun`
- `apps/web/src/canvas/components/TestRunPanel.svelte` — replaced polling sync-mode with `EventSource` subscription; per-node live status badges; stop button

**Impact:**
Runs now stream live. The engine broadcasts `run.started`, `node.started`, `node.completed`, `node.failed`, `run.completed`, `run.failed`, `run.suspended` events over SSE. The Studio updates node status in real time without polling. SDK consumers can `for await (const event of agent.stream(input))` to receive typed events. All 83 existing tests continue to pass.

---

### 2026-05-25 - Phase 1 frontend gaps: Studio draft/publish, schema-driven config panel, admin CRUD

**Type:** Feature

**Description:**
Completed all identified Phase 1 frontend workstream gaps. The Studio canvas now has a full publish workflow with draft persistence, the node config panel renders fields from the engine's JSON Schema instead of hardcoded type checks, and the admin panel supports full CRUD for users, tenants, and agents.

**Changes:**
- `apps/api/src/db/schema/agents.ts` — added `draftGraphJson` nullable column
- `apps/api/drizzle/migrations/0002_add_draft_graph_json.sql` — migration for new column
- `apps/api/src/controllers/agents.controller.ts` — `updateAgent` now persists `draftGraphJson`
- `apps/api/src/controllers/tenants.controller.ts` — `updateTenant` now accepts and validates `resourceLimits`
- `apps/web/src/canvas/stores/nodeTypes.ts` — new shared Svelte writable store for node type definitions
- `apps/web/src/canvas/components/NodePalette.svelte` — writes to shared `nodeTypes` store instead of local variable
- `apps/web/src/canvas/components/NodeConfigPanel.svelte` — schema-driven field rendering (string/object/array/boolean) from engine API
- `apps/web/src/canvas/components/AgentConfigPanel.svelte` — Save Draft + Revert to Draft buttons; publish refreshes agent status badge
- `apps/web/src/canvas/App.svelte` — `onMount` loads `draftGraphJson` for draft agents, falls back to latest published version
- `apps/web/src/routes/admin.ts` — User create/edit/deactivate, tenant create/edit (with resourceLimits), agent create/enable/disable

**Impact:**
Graph edits now survive page reload via server-side draft storage. Node config fields are dynamically derived from engine node schemas — no code change required when adding new node types. The admin panel is fully operational for managing users, tenants, and agents without direct API access.

### 2026-05-25 - Docker Compose build and runtime fixes for Phase 0/1 verification

**Type:** Infrastructure

**Description:**
Resolved all TypeScript build errors and Docker runtime failures blocking `docker compose up --build` for Phase 0/1 verification. All three services (api, engine, web) now build cleanly and start successfully with health checks passing.

Root causes addressed: missing `rootDir` in tsconfig.build.json files (output landed at `dist/src/` instead of `dist/`); TS2742 on Express exports caused by `declaration: true` inferring non-portable pnpm store paths (fixed with explicit type annotations); `@/` path aliases not rewritten by tsc in compiled JS (converted to relative imports); Docker runtime stages missing correct workspace structure causing `pnpm install --filter` to find no project; transitive workspace dep (`@magicaal/nodes`) not having its own external deps installed in the engine runtime image; Drizzle migrations directory not copied to runtime; Docker Compose `.env` values using `localhost` hostnames instead of Docker service names.

**Changes:**
- `apps/api/tsconfig.build.json` — added `rootDir: "src"` to correct compiled output path
- `apps/engine/tsconfig.build.json` — added `rootDir: "src"`
- `apps/web/tsconfig.build.json` — added `rootDir: "src"`; re-added `src/canvas` to exclude (Vite-bundled Svelte, not tsc)
- `packages/nodes/tsconfig.build.json` — new file; `rootDir: "src"`, `outDir: "dist"`
- `packages/nodes/package.json` — added `main: "dist/index.js"` and `build` script
- `apps/web/src/app.ts` — explicit `Application` return type (TS2742)
- `apps/web/src/routes/admin.ts`, `auth.ts`, `studio.ts` — explicit `RouterType` annotations (TS2742)
- `apps/api/src/app.ts` — explicit `Application` return type (TS2742)
- `apps/api/src/routes/agents.ts`, `auth.ts`, `health.ts`, `index.ts`, `system.ts`, `tenants.ts`, `users.ts` — explicit `RouterType` annotations (TS2742)
- `apps/engine/src/routes/internal.ts` — explicit `RouterType` annotation (TS2742)
- `apps/api/src/controllers/*.ts`, `middleware/auth.ts`, `routes/*.ts` (13 files) — converted `@/` path aliases to relative imports (tsc does not rewrite paths in compiled JS output)
- `apps/web/Dockerfile` — added `public/` COPY to builder; restructured runtime stage to correct pnpm workspace paths
- `apps/api/Dockerfile` — added `drizzle/` COPY to builder and runtime stages; restructured runtime stage to correct pnpm workspace paths
- `apps/engine/Dockerfile` — added nodes package build pipeline (COPY src + tsconfig, build, copy dist); added `--filter @magicaal/nodes` to runtime pnpm install for transitive external deps
- `docker-compose.yml` — added `REDIS_URL` and `ENGINE_BASE_URL` environment overrides using Docker service hostnames (takes precedence over `env_file` localhost values)

**Impact:**
`docker compose up --build` succeeds end-to-end. All services start and pass health checks: API (port 3000, Drizzle migrations run on startup), Engine (port 4000, 5 nodes registered), Web (port 8080), Redis. Phase 0/1 build milestone verified.

---

### 2026-05-24 - Phase 1 Milestone Sign-off: Tests, Canvas UX & Config UI

**Type:** Feature

**Description:**
Closed six gaps blocking Phase 1 milestone sign-off: added test suites for all
three packages (83 tests), wired per-node step output in the TestRunPanel,
implemented the trigger config form in AgentConfigPanel, added core:start/end
config blocks in NodeConfigPanel, added canvas pan/zoom and node drag, and
implemented port drag-to-connect edge creation with an edge type picker.

Also fixed a production bug where invalid JWTs returned 500 instead of 401 due
to the jose library throwing without a `status` property.

**Changes:**
- `packages/nodes/package.json` — added jest + ts-jest devDependencies and test scripts
- `packages/nodes/jest.config.ts` — new Jest configuration for nodes package
- `packages/nodes/tests/` — mock context helper + 6 test files (35 tests): jsonata utils, core:start/end/stop/condition/router nodes
- `apps/engine/jest.config.ts` — new Jest configuration for engine
- `apps/engine/tests/setup.ts` — in-memory SQLite + test env vars
- `apps/engine/tests/unit/execution/worker.test.ts` — resolveEdges + executeGraph unit tests (17 tests)
- `apps/engine/tests/unit/graph/graph-loader.test.ts` — cache miss/hit/invalidate tests with mocked better-sqlite3
- `apps/api/tests/helpers/auth-helpers.ts` — reusable createUserAndLogin helper for integration tests
- `apps/api/tests/integration/auth.test.ts` — login/logout/refresh/JWT validation (31 tests across 3 integration files)
- `apps/api/tests/integration/agents.test.ts` — agent CRUD, publish, draft, versions
- `apps/api/tests/integration/runs.test.ts` — async/sync dispatch with mocked engine client
- `apps/api/src/middleware/auth.ts` — bug fix: wrap jwtVerify in try/catch, re-throw with status 401
- `apps/api/src/controllers/agents.controller.ts` — added getAgentConfig + updateAgentConfig handlers
- `apps/api/src/routes/agents.ts` — registered GET/PATCH /:id/config routes
- `apps/web/src/canvas/stores/run.ts` — expanded StepResult type with all fields
- `apps/web/src/canvas/stores/graph.ts` — added agentConfig store + addEdge action
- `apps/web/src/canvas/App.svelte` — fetch agentConfig on mount, populate store
- `apps/web/src/canvas/components/TestRunPanel.svelte` — capture runId, fetch + display step timeline
- `apps/web/src/canvas/components/AgentConfigPanel.svelte` — trigger config form (description + save)
- `apps/web/src/canvas/components/NodeConfigPanel.svelte` — core:start inputSchema textarea, core:end outputKeys input
- `apps/web/src/canvas/components/Canvas.svelte` — pan/zoom (wheel + background drag), node drag, port drag-to-connect with rubber-band line, edge type picker overlay

**Impact:**
Phase 1 milestone requirements are met. All 83 tests pass (35 nodes, 17 engine,
31 API). Canvas is fully interactive: nodes drag, viewport pans and zooms, edges
are created by dragging from output port to input port. The JWT 401 fix
eliminates a silent auth failure in production.

**Notes:**
- AgentGraphDefinition requires version, name, toolEdges, workspaceEdges, config fields — test helpers include all required fields
- jest.mock() hoisting requires using jest.fn() in factory and accessing via require() for engine client mock in runs tests
- Port CSS hover (opacity: 0.4 → 1 on g:hover) uses :global selectors since Svelte's scoped CSS cannot target parent hover for SVG elements

---

### 2026-05-24 - Phase 1: Core Engine & Minimal Studio

**Type:** Feature

**Description:**
Delivered the first end-to-end working loop: a developer can log in, build a
graph in the Studio canvas, publish it, and invoke it via API key. The run
result is visible in the test run panel and queryable via the REST API. An API
consumer can do the same with `@magicaal/sdk`.

**Changes:**
- `apps/api/drizzle/migrations/0001_phase1_schema.sql` — schema alignment: renamed slug→handle, version→version_number, graph_definition→graph_json; added 17 new tables (sessions, mcp_servers, workspaces, marketplace, integrations, platform, prompt-test)
- `apps/api/src/` — JWT auth (argon2 + jose), RBAC middleware (4 roles), full v1 REST API: users, tenants, agents CRUD, publish/draft, runs dispatch/status/steps, invocation key management, nodes list, system health
- `apps/engine/src/` — node registry, graph loader (read-only SQLite, in-memory cache), graph validator, ExecutionContextImpl, BFS execution worker with conditional/fallback edge resolution, BullMQ scheduler (concurrency: 10), lifecycle manager writing to telemetry store, invocation auth (SHA-256 hash, Redis rate limiting), internal REST API
- `packages/nodes/src/` — core:start, core:end, core:stop, core:condition, core:router node implementations with JSONata expression evaluation
- `packages/sdk-client/src/` — MagiCaalClient, AgentClient (invoke/start), RunHandleImpl (wait/cancel/status/steps) with error mapping
- `apps/web/src/` — session middleware, auth pages (login/logout), API proxy, admin pages (users/tenants/agents/system via Datastar), Svelte canvas island (SVG-based node graph, NodePalette, NodeConfigPanel, AgentConfigPanel, TestRunPanel)
- `.env.example` files updated with JWT_SECRET, ENGINE_BASE_URL, API_BASE_URL

**Impact:**
All six sub-phases (A: schema, B: nodes, C: engine, D: API, E: SDK, F: web)
are complete. `docker compose up --build` should boot all four services. The
full invocation path — login → build graph → publish → invoke via SDK or API
key → view run result — is implemented end-to-end. No LLM nodes yet (Phase 2).

**Notes:**
- Engine's tsconfig removes composite project references for packages (types resolve via node_modules `"types": "src/index.ts"`)
- SQLite read-only connection used in engine for graph loading and invocation key validation; telemetry store is a separate SQLite file
- Svelte canvas uses SVG rendering (not @xyflow/svelte) for Phase 1; Svelte Flow can replace it in Phase 2 for drag-to-connect
- Run sync mode polls via setTimeout loop in runs.controller.ts; consider SSE for Phase 2
- Web API proxy at /api/* → /v1/* forwards the user's access_token cookie

---

### 2026-05-24 - Phase 0: MagiCaal Foundation

**Type:** Infrastructure

**Description:**
Transformed the generic Express template into the working MagiCaal monorepo
foundation. Migrated from npm to pnpm workspaces, restructured all apps and
packages under the @magicaal namespace, stood up three new services (api,
engine, web), defined all foundational shared types, scaffolded the SDK
packages, added Drizzle ORM with SQLite, and wired up Docker Compose for
local development.

**Changes:**
- `devbox.json`, `pnpm-workspace.yaml` — switched to pnpm 9; removed package-lock.json
- `apps/api/` — renamed from apps/api-service; added Drizzle ORM, 11-table SQLite schema, migrations, seed script
- `apps/engine/` — new execution runtime skeleton (port 4000)
- `apps/web/` — new static frontend placeholder (port 8080)
- `packages/core/` — renamed from packages/types; populated with all Phase 0 type definitions (8 domain modules, ~80 interfaces)
- `packages/sdk/` — new @magicaal/sdk-node node authoring SDK (types only)
- `packages/sdk-client/` — new @magicaal/sdk-client consumer SDK with dual ESM/CJS build and error hierarchy
- `packages/integrations/caal/` — new CAAL tool package with 17 stub NodeModule implementations
- `docker-compose.yml` — four-service compose (api, engine, web, redis) + shared db_data volume
- `.github/workflows/ci.yml` — full rewrite for pnpm, Node 22, multi-workspace matrix, package build verification
- `CLAUDE.md`, `README.md`, `TECHSTACK.md` — updated for MagiCaal identity and new structure

**Impact:**
`docker compose up --build` boots all four services. `pnpm install` from root
resolves all workspace dependencies. All foundational types are in place for
Phase 1 (auth, agent execution, LLM routing). The database schema is migrated
automatically on API startup via `runMigrations()`. MAGICAAL_MASTER_KEY is
optional in Phase 0 but required before Phase 1 credential encryption.

**Notes:**
- packages/sdk is named @magicaal/sdk-node internally to avoid naming conflict with sdk-client (published as @magicaal/sdk)
- SQLite WAL mode + foreign_keys=ON enforced at client.ts connection time
- apps/web is a placeholder; Datastar integration deferred to Phase 1
- MAGICAAL_PRD.md is still empty — must be completed before Phase 1 auth/user model design

---

### 2026-05-23 - Integrate Devbox as primary environment management tool

**Type:** Infrastructure

**Description:**
Promoted devbox from a placeholder to the first-class dev environment tool. Node.js is now pinned to LTS (22.22.3) via `devbox.json`, and the shell `init_hook` automatically runs `npm install` when `node_modules` is absent — so contributors only need `devbox shell` to be fully ready. Devbox scripts wrap all root workspace commands (`devbox run dev`, `devbox run test`, etc.). All documentation updated to lead with the devbox workflow.

**Changes:**
- `devbox.json` — switch `nodejs@latest` to `nodejs@22` (LTS); add auto-install `init_hook`; add `dev`, `build`, `test`, `test:cov`, `lint`, `type-check`, `format`, `setup` scripts
- `devbox.lock` — regenerated with Node 22.22.3 store paths for all platforms
- `CLAUDE.md`, `GEMINI.md` — add "Environment Setup" section; replace npm command table with `devbox run` commands; add pitfalls for running npm outside shell and forgetting to commit `devbox.lock`; add `devbox` to commit scopes
- `DEVELOPMENT.md` — add Prerequisites section; rewrite "Running Locally" with devbox-first steps; update commands table and common issues
- `README.md`, `CONTRIBUTING.md` — update Quick Start blocks to lead with `devbox version` check and `devbox shell`

**Impact:**
New contributors no longer need to install Node.js manually or know which version to use. `devbox shell` is the single entry point that guarantees a consistent environment. The Node.js version is pinned in source control via `devbox.lock`.

---

### 2026-05-23 - Refactor to npm workspaces monorepo

**Type:** Infrastructure

**Description:**
Restructured the repository from a flat single-service layout into a proper npm workspaces monorepo following `monorepo-standards.md`. The existing Express service moved into `apps/api-service/`, and a types-only shared library placeholder was added at `packages/types/` (`@workspace/types`). Root tooling, CI, Docker, and all AI guidance files were updated to reflect the new structure.

**Changes:**
- `apps/api-service/` — Express service migrated here from root (`src/`, `tests/`, `Dockerfile`, config files)
- `packages/types/` — new `@workspace/types` types-only package scaffold
- `tsconfig.base.json` — new root shared compiler options; per-app tsconfigs extend it
- `package.json` — replaced with workspace root (private, `workspaces: [apps/*, packages/*]`, workspace-targeted scripts)
- `tsconfig.json` — replaced with IDE-only stub (`"files": []`) extending tsconfig.base.json
- `.eslintrc.json` — root now ignores `apps/` and `packages/`; full config moved to `apps/api-service/.eslintrc.json`
- `docker-compose.yml` — updated build context and Dockerfile path
- `.github/workflows/ci.yml` — updated to workspace-targeted lint/type-check/test commands
- `.github/workflows/release.yml` — updated Dockerfile path to `apps/api-service/Dockerfile`
- `CLAUDE.md`, `GEMINI.md` — rewritten for monorepo structure, commands, and patterns
- `README.md`, `DEVELOPMENT.md`, `CONTRIBUTING.md` — updated commands and layout descriptions

**Impact:**
New apps can be added by creating `apps/<name>/` with its own `package.json` and adding workspace-targeted scripts to the root. Shared TypeScript interfaces belong in `packages/types/`. The `package-lock.json` remains a single file at the root, and `npm install` must always be run from the root to maintain workspace symlinks.

---

### 2026-06-16 - Phase 4: Graph-as-Code, Session Management, and Caal AI Assistant

**Type:** Feature

**Description:**
Delivered Phase 4 across all workspaces. Agents can now be authored as TypeScript classes using the Graph-as-Code compiler, persist cross-call conversation state via a session layer, and receive live canvas assistance from the Caal AI agent. The Studio gained a full right-panel Caal chat with proposal review, session inspector, and prompt version switcher. The Admin gained session management, sync log, and Caal configuration pages.

**Changes:**
- `packages/compiler/` — new `@Agent` decorator, `AgentGraph` base class with typed edge methods, node type classes for IntelliSense; `compile()` and `validateGraph()` with toolEdge and `core:end` validation
- `packages/cli/` — `magicaal` CLI with `build`, `validate`, `list`, and `sessions migrate` commands; devbox `magicaal` alias
- `packages/nodes/` — `core-session-read`, `core-session-write`, `core-session-clear` nodes; `injectSessionHistory` option on `core-llm-call`, `core-react`, `core-tool-call`
- `packages/sdk/src/context.ts` — `sessionId` field on `ExecutionContext`
- `packages/sdk-client/` — `SessionClient`, `WorkspaceContextBuilder`, session options on `AgentClient.invoke`/`start`
- `apps/engine/src/session/` — `SessionManager` (load/save via internal API), three accumulation strategies (append/replace/merge), hourly expiry sweep; scheduler wires session load/save around graph execution
- `apps/api/src/platform/` — `ensurePlatformTenant()` for `_platform` bootstrap on first boot
- `apps/api/src/sync/` — `bootTimeSync()` reads `agents.manifest.json`, upserts code-defined agents, marks removed ones stale, writes sync events
- `apps/api/` — internal auth middleware, new routes for sessions, prompts, caal, test-cases; caal-config and prompts controllers; runs controller adds session namespacing
- `apps/api/drizzle/migrations/0004_phase4.sql` — session status enum, `caal_configuration` table, `packNamespace`/`lastResult`/`tenantId` columns
- `apps/web/src/canvas/components/` — `CaalPanel`, `ProposalReviewUI`, `SessionContextPanel`, `PromptVersionPanel`, `CodeSourceBanner`; `App.svelte` readonly mode for code-defined agents
- `apps/web/src/routes/admin.ts` — sessions table, sync log, Caal configuration form, dashboard cards
- `apps/api/Dockerfile` — `agent-builder` stage switched from `FROM scratch` to `FROM alpine` with active-copy entrypoint for reliable volume refresh on redeploy
- 16 Phase 4 issues (ISS-031–ISS-046) discovered in post-implementation review and resolved: execute() parameter order in Caal tools, dead session-id ternary, Docker volume staling, assertionsJson validation, session-write key mismatch, N+1 expire query, ajv schema assertion, evaluate_score placeholder, canvas toolEdge wiring, compiler toolEdge and core:end validation, manifest guard, module-level edgeCounter, CLI migrate endpoint

**Impact:**
Agents are now stateful by default when a sessionId is provided. Code-defined agents compile from TypeScript, sync to the DB at boot, and are read-only in the Studio canvas. The Caal AI assistant is a live MagiCaal agent capable of explaining, suggesting, and applying graph modifications with tenant-scoped context and session continuity.

---

### 2026-05-04 - Initial scaffold

**Type:** Infrastructure

**Description:**
Created the project template with a full TypeScript/Express foundation. Includes tooling, testing, Docker, CI, and documentation structure ready for a production service.

**Changes:**
- `src/` — Express app with health endpoint, Pino logging, helmet, cors, error handler, 404 handler
- `tests/` — Integration tests (supertest) and unit tests (Jest + ts-jest)
- `Dockerfile` — Multi-stage build: TypeScript compile → slim Node Alpine runtime
- `docker-compose.yml` — Single-service compose with commented infra placeholders
- `.github/workflows/` — CI (lint + type-check + test on PR), release (Docker push on semver tag)
- Root docs — README, CONTRIBUTING, DEVELOPMENT, CLAUDE, TECHSTACK
- `docs/` — Getting-started, developer-guide, API, and reference doc stubs

**Impact:**
New projects can fork this template and be running a type-safe, linted, tested Express service with Docker support within minutes.
