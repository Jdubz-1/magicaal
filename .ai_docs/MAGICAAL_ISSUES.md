# MagiCaal — Internal Issue Tracker

**Format:** Each issue has a unique ID, severity, status, file location, and description.  
**Severity:** `critical` · `high` · `medium` · `low`  
**Status:** `open` · `in-progress` · `resolved` · `wont-fix`

Issues are grouped by phase of origin. All issues below were identified in the Phase 3 code review (2026-06-15).

---

## Phase 3 Issues

### Bugs — Functionality Broken

---

#### ISS-001 · `critical` · `resolved`

**Title:** Trajectory display never renders — stepId filter uses nodeId instead of DB step UUID

**File:** `apps/web/src/canvas/components/TestRunPanel.svelte:88, 192`

**Description:**  
In the SSE `node.started` handler (line 88), each step is stored as `id: data.nodeId`. The trajectory filter at lines 192 and 202 then checks `t.stepId === step.id`. The trajectory rows returned from the engine API have `stepId` set to the database UUID written by `lifecycle.writeStepStart()` — a different identifier from the graph node ID. The two values will never match. The collapsible trajectory blocks will never render for any `core:react` or `core:planner` step.

**Fix guidance:** The engine needs to emit the DB step UUID in the SSE `node.started` / `node.completed` events, or the TestRunPanel needs to fetch and match by `nodeId` instead of `stepId`.

---

#### ISS-002 · `critical` · `resolved`

**Title:** MCP client direct mode: passes `ctx.agentId` as `nodeId` to `_callMcpTool` — registry lookup always fails

**File:** `packages/nodes/src/nodes/core-mcp-client.ts:62`

**Description:**  
The call `ctxExt._callMcpTool(ctx.agentId, config.toolName, args)` passes `ctx.agentId` as the first argument. The `_callMcpTool` implementation in `context.ts:102` expects `nodeId: string`, which it passes directly to `mcpRegistry.callTool(nodeId, runId, ...)`. The MCP registry stores clients under the key `${nodeId}:${runId}` where `nodeId` is the **graph node ID** of the `core:mcp-client` node (set during `assembleTools()`). Since `ctx.agentId ≠ nodeId`, the lookup always throws "No MCP client found for node".

**Fix guidance:** The `core:mcp-client` node's `execute()` has no access to its own node ID via the `ExecutionContext` interface. The cleanest fix is to handle direct-mode `core:mcp-client` as a special case in `worker.ts` (like `core:tool-call` and `core:react`), passing `nodeDef.id` explicitly.

---

#### ISS-003 · `critical` · `resolved`

**Title:** Expression editor Evaluate button always returns 404 — `/v1/utils/evaluate` endpoint does not exist

**File:** `apps/web/src/routes/studio.ts:212`  
**Also:** `apps/api/src/routes/` (missing route)

**Description:**  
The `/studio/evaluate-expression` route handler (added in Phase 3) proxies to `api.post('/v1/utils/evaluate', ...)`. This endpoint does not exist in `apps/api/src/routes/` or anywhere in the API codebase. Every click of the "▶ Evaluate" button in the Expression Editor will receive a 404. The expression evaluation feature is entirely non-functional.

**Fix guidance:** Either implement a `/v1/utils/evaluate` route in the API (that proxies JSONata evaluation to the engine), or move the evaluation logic server-side in the web app using `@magicaal/nodes`' `evaluate()` utility directly (requires adding `@magicaal/nodes` as a web dep) or a simpler client-side JSONata library.

---

#### ISS-004 · `critical` · `resolved`

**Title:** TypeScript cast syntax in browser `<script>` tags causes JavaScript syntax errors in Admin

**File:** `apps/web/src/routes/admin.ts:1264, 1516`

**Description:**  
Two inline `<script>` tags in the server-rendered HTML contain TypeScript cast syntax: `(e.target as HTMLSelectElement).value`. The `as` keyword is TypeScript-only and is not valid JavaScript. The browser's JS parser throws a `SyntaxError` when it encounters these tags, meaning:
- Line 1264: The JWT config section show/hide toggle on the invocation-auth detail page is broken.
- Line 1516: The transport-type (stdio/http) show/hide toggle on the MCP server create form is broken.

**Fix guidance:** Replace `e.target as HTMLSelectElement` with `/** @type {HTMLSelectElement} */(e.target)` (JSDoc cast) or simply `e.target` with a runtime `.value` access, since both targets are guaranteed to be select elements.

---

#### ISS-005 · `critical` · `resolved`

**Title:** JWT invocation auth never called for real invocations — `runs.controller.ts` still uses old `validateInvocationKey`

**File:** `apps/engine/src/controllers/runs.controller.ts:6, 30`  
**Also:** `apps/engine/src/auth/invocation-auth.ts` (new `validateInvocationRequest` is unused on the hot path)

**Description:**  
The engine's `dispatchRun` handler imports and calls `validateInvocationKey(agentId, authKey)` — the backward-compatibility wrapper that only validates SHA-256 hashed API keys and ignores the agent's configured invocation strategy. The new `validateInvocationRequest(agentId, authHeader)` function (which dispatches to the correct strategy — api-key, jwt, or public) is exported but never called anywhere in the hot path. Agents configured with `strategy: 'jwt'` will have all invocations fail with `INVALID_KEY` (no key hash in DB). Agents configured with `strategy: 'public'` will also fail because `validateInvocationKey` requires a key.

**Fix guidance:** Update `runs.controller.ts` to call `validateInvocationRequest(agentId, req.headers.authorization)` instead of `validateInvocationKey(agentId, authKey)`.

---

#### ISS-006 · `high` · `resolved`

**Title:** `core:tool-call` and `core:react` `execute()` throws `Error` instead of returning `NodeOutput`

**File:** `packages/nodes/src/nodes/core-tool-call.ts:38–42`  
**File:** `packages/nodes/src/nodes/core-react.ts:37–42`

**Description:**  
Both nodes' `execute()` methods throw `new Error(...)` instead of returning `Promise<NodeOutput>`, violating the `NodeModule` interface contract. If either node is called through the node registry directly — in unit tests, non-engine contexts, or if the worker's special-case branch is accidentally bypassed — an unhandled exception is thrown rather than a typed `{ status: 'failed', ... }` response. This also makes it impossible to write node-level unit tests for these types without mocking the entire engine worker.

**Fix guidance:** Change both `execute()` methods to `return { status: 'failed', outputs: {}, error: { code: 'ENGINE_REQUIRED', message: '...', retryable: false } }`.

---

### Security Issues

---

#### ISS-007 · `high` · `resolved`

**Title:** Trajectory endpoint skips tenant ownership check when `tenantId` param is absent

**File:** `apps/engine/src/controllers/telemetry.controller.ts:104–112` (`getTrajectory`)

**Description:**  
The tenant verification block is `if (tenantId) { ... }` — conditional, not mandatory. If the `tenantId` query parameter is omitted from a call to `GET /internal/telemetry/trajectory/:runId`, the check is silently skipped and trajectory rows are returned for any `runId` regardless of tenant ownership. While the API controller (`apps/api`) always passes `tenantId`, any internal service or misconfigured caller can read cross-tenant trajectory data. Every other telemetry endpoint in this file throws 400 when `tenantId` is absent.

**Fix guidance:** Change the block to `if (!tenantId) throw Object.assign(new Error('tenantId is required'), { status: 400 });` and make the verification mandatory, consistent with the rest of the file.

---

#### ISS-008 · `high` · `resolved`

**Title:** JWKS cache never invalidated on config change; key rotation causes permanent failure until restart

**File:** `apps/engine/src/auth/invocation-auth.ts:53–59, 139–142`

**Description:**  
Two related problems with JWKS caching:

1. **Stale config:** The `jwksCache` Map (line 53) is populated on first use per `jwksUrl` and never invalidated when an admin updates `jwtConfig.jwksUrl` in the database. The engine will continue using the old `RemoteJWKSet` instance indefinitely until restart.

2. **Broken rotation recovery:** When `JWKSNoMatchingKey` is caught (line 139), the cache entry is deleted and the error is immediately re-thrown. There is no retry on the same request. A legitimate key rotation at the IdP will cause the first post-rotation request to fail with `JWT_INVALID_SIGNATURE`. The next request will re-fetch JWKS (cache was cleared), but if the key was recently rotated and propagation isn't complete, it may fail again. No recovery path exists for the caller.

**Fix guidance:** (1) Store the config hash or `jwtConfig.jwksUrl` alongside the cached JWKS set and re-validate on each call. (2) On `JWKSNoMatchingKey`, clear the cache and retry the `jwtVerify` once with a freshly constructed `RemoteJWKSet`.

---

### Missing Error Handling

---

#### ISS-009 · `high` · `resolved`

**Title:** LLM-calling nodes do not catch `ctx.llmCall` errors — unhandled exceptions instead of failed `NodeOutput`

**File:**  
- `packages/nodes/src/nodes/core-planner.ts` (~line 48)  
- `packages/nodes/src/nodes/core-reflection.ts` (~line 44)  
- `packages/nodes/src/nodes/core-context-summarize.ts` (~line 40)  
- `packages/nodes/src/nodes/core-evaluate.ts` (~line 76, llm-judge path)

**Description:**  
All four nodes call `ctx.llmCall(...)` without a try-catch. Network failures, provider 5xx errors, rate limit exhaustion, or open circuit breakers will propagate as uncaught exceptions from `execute()`. The execution worker catches these and marks the step as `NODE_EXECUTION_ERROR`, but the error code and structure are generic rather than typed. Consistently, all other LLM nodes in the codebase (`core:llm-call`, `core:structured-extract`, `core:agentic-router`) wrap their LLM calls in try-catch and return structured `NodeOutput { status: 'failed' }` objects.

**Fix guidance:** Wrap `ctx.llmCall(...)` in try-catch for each node and return `{ status: 'failed', outputs: {}, error: { code: 'LLM_CALL_FAILED', message: err.message, retryable: true } }`.

---

#### ISS-010 · `high` · `resolved`

**Title:** `core:mcp-client` direct mode does not catch `_callMcpTool` errors

**File:** `packages/nodes/src/nodes/core-mcp-client.ts:62`

**Description:**  
`ctxExt._callMcpTool(...)` is called without a try-catch. MCP tool errors (server unavailable, JSON-RPC error, tool not found, timeout) propagate as unhandled exceptions rather than a typed `NodeOutput { status: 'failed' }`. This is inconsistent with the expected node contract.

**Fix guidance:** Wrap in try-catch, return `{ status: 'failed', outputs: {}, error: { code: 'MCP_TOOL_ERROR', message: err.message, retryable: false } }`.

---

#### ISS-011 · `medium` · `resolved`

**Title:** `dispatchSubRun` does not check `response.ok` before parsing JSON in polling loop

**File:** `apps/engine/src/execution/context.ts:126–130`

**Description:**  
`const run = await getResp.json() as { status: string; output?: ... }` is called without first checking `getResp.ok`. If the engine's status endpoint returns a 4xx or 5xx response (engine restarting, run not found, internal error), the response body may be an error object or HTML, which when parsed and accessed as `run.status` will return `undefined`, causing the polling loop to continue forever until the 300-second timeout.

**Fix guidance:** Add `if (!getResp.ok) throw Object.assign(new Error('Sub-run status check failed: ' + getResp.status), { code: 'SUB_RUN_STATUS_ERROR', retryable: false });` before the `.json()` call.

---

#### ISS-012 · `medium` · `resolved`

**Title:** Database handle leak in `mcpRegistry.getServerConfig` when query throws

**File:** `apps/engine/src/mcp/mcp-registry.ts:18–21`

**Description:**  
`const db = new Database(dbPath, { readonly: true });` opens a SQLite handle. If the query on line 20 throws (database locked, I/O error, table missing), `db.close()` is never called. Over time, repeated MCP connections that encounter DB errors will leak handles.

**Fix guidance:** Use try-finally: `try { ... return config; } finally { db.close(); }`.

---

#### ISS-013 · `medium` · `resolved`

**Title:** `testMcpServerInternal` has no timeout — hangs indefinitely on unresponsive MCP server

**File:** `apps/engine/src/controllers/mcp-servers.controller.ts`

**Description:**  
`McpClient.connect()`, `initialize()`, and `listTools()` are called sequentially without any timeout or `AbortSignal`. For stdio transport, if the spawned process starts but never sends the `initialize` response (e.g., infinite startup), the request hangs until the upstream HTTP connection closes. For HTTP transport, no request timeout is set.

**Fix guidance:** Wrap the test sequence in a `Promise.race` against a `setTimeout` reject (e.g., 15 seconds) and ensure the client is disconnected on timeout.

---

#### ISS-014 · `medium` · `resolved`

**Title:** `getRoutingEvents`: `JSON.parse(s.routingMetaJson)` without try-catch causes 500 on malformed data

**File:** `apps/engine/src/controllers/telemetry.controller.ts:160`

**Description:**  
If `routingMetaJson` contains malformed JSON (truncated write, migration artifact, etc.), the `JSON.parse` call throws a `SyntaxError` that propagates uncaught as a 500 error. The same pattern is used in the `getRunDetail` handler but those already parse inside try-catch (at the controller level). The routing events query maps over many rows and should guard each parse individually.

**Fix guidance:** Wrap in try-catch per row, or use a safe-parse helper: `s.routingMetaJson ? tryParseJson(s.routingMetaJson) : null`.

---

### Performance and Correctness Issues

---

#### ISS-015 · `high` · `resolved`

**Title:** `getRoutingEvents` runs query fetches entire tenant runs table with no limit

**File:** `apps/engine/src/controllers/telemetry.controller.ts:150–155`

**Description:**  
After over-fetching up to `limitNum * 5` steps, the code builds a `runsMap` by querying ALL runs for the tenant: `telemetryDb.select(...).from(telemetryRuns).where(eq(telemetryRuns.tenantId, tenantId))` with no `.limit()` clause. On a tenant with thousands of runs this is a full-table scan into memory on every routing-events request.

**Fix guidance:** Restrict the runs query to only the `runId` values found in the fetched steps: `.where(and(eq(telemetryRuns.tenantId, tenantId), inArray(telemetryRuns.id, runIds)))`. Import `inArray` from `drizzle-orm`.

---

#### ISS-016 · `medium` · `resolved`

**Title:** Proactive router triggers can skip all targets with no fallback attempt

**File:** `apps/engine/src/router/router-engine.ts:152–158` (`checkProactiveTriggers`)

**Description:**  
When a proactive trigger fires (`latency_degraded` or `error_rate`), the target is skipped via `continue`. If *every* target in the ordered list triggers a proactive condition, all are skipped and the loop exhausts with no LLM call, throwing "All router targets exhausted — no successful LLM response". The existing circuit-breaker logic (line 37) already has a last-resort fallback: when all circuits are open, it returns `targets` (all of them) and tries anyway. Proactive triggers have no equivalent safety net.

**Fix guidance:** After the proactive-trigger skip loop, if `triggerHistory.length === orderedTargets.length` (all skipped), fall back to attempting the first target regardless.

---

#### ISS-017 · `low` · `resolved`

**Title:** `cost-optimized` router strategy sorts by `promptTokensPerMillion` only — ignores completion cost

**File:** `apps/engine/src/router/router-engine.ts:72–76`

**Description:**  
The `cost-optimized` case sorts targets by `promptTokensPerMillion` only. For reasoning models (e.g., `claude-opus-4-8`, `o3-mini`) where `completionTokensPerMillion` can be 5–10× the prompt cost and completions dominate the bill, this sort order is incorrect and may route to a model that is cheaper for prompts but more expensive overall.

**Fix guidance:** Use a blended cost estimate: `(pricing.promptTokensPerMillion + pricing.completionTokensPerMillion) / 2`, or weight by a typical prompt/completion ratio (e.g., 1:3).

---

### Missing or Incomplete Implementation

---

#### ISS-018 · `high` · `resolved`

**Title:** `ENGINE_INTERNAL_URL` env var used in `dispatchSubRun` is undocumented and will fail in Docker

**File:** `apps/engine/src/execution/context.ts:112`

**Description:**  
`dispatchSubRun` reads `process.env.ENGINE_INTERNAL_URL` with a fallback of `'http://localhost:4000'`. The env var is not declared in `apps/engine/src/config.ts`, not listed in `apps/engine/.env.example`, and not documented. In Docker Compose, the engine container is accessible as `http://engine:4000` (or via the internal network), not `localhost`. Any graph that uses `core:sub-graph` or `core:handoff` in Docker will fail silently with connection refused.

**Fix guidance:** Add `engineInternalUrl: process.env.ENGINE_INTERNAL_URL ?? 'http://localhost:4000'` to `apps/engine/src/config.ts`. Add `ENGINE_INTERNAL_URL=http://engine:4000` to `apps/engine/.env.example`. Update Docker Compose `.env` accordingly.

---

#### ISS-019 · `medium` · `resolved`

**Title:** `formatServer` in MCP controller omits the `env` field from responses

**File:** `apps/api/src/controllers/mcp-servers.controller.ts:129` (`formatServer`)

**Description:**  
`formatServer` parses and returns `args` (from `argsJson`) but does not include `env` (available as `row.envJson`). Any consumer — the Studio's Node Configuration Panel when displaying an MCP client node, or a developer building tooling against the API — cannot see the configured environment variables via `GET /v1/mcp-servers` or `GET /v1/mcp-servers/:id`.

**Fix guidance:** Add `env: row.envJson ? JSON.parse(row.envJson) as Record<string, string> : null` to the returned object in `formatServer`.

---

#### ISS-020 · `medium` · `resolved`

**Title:** Trajectory tool inputs (`toolInputs`) are silently dropped — not written to the telemetry DB

**File:** `apps/engine/src/execution/lifecycle.ts` (`writeTrajectorySteps`)

**Description:**  
The `TrajectoryStep` interface has a `toolInputs?: Record<string, unknown>` field that is populated by `runAgentLoop` for each tool invocation. The `writeTrajectorySteps` function maps steps to DB rows but includes only `thought`, `action`, and `observation` — `toolInputs` is dropped. The `trajectories` table has no `tool_inputs` column. As a result, the actual arguments passed to each tool call are lost from the telemetry record, making debugging of agentic behavior harder.

**Fix guidance:** Add a `tool_inputs_json TEXT` column to the `telemetry_trajectories` table (new Drizzle migration), populate it in `writeTrajectorySteps` as `JSON.stringify(s.toolInputs)`, and surface it in the trajectory API response and Studio display.

---

#### ISS-021 · `medium` · `resolved`

**Title:** `core:reduce` uses hardcoded `_fanout_results` key — breaks with multiple sequential fan-out/reduce pairs

**File:** `packages/nodes/src/nodes/core-reduce.ts:30`  
**Also:** `apps/engine/src/execution/worker.ts` (fan-out special case sets `'_fanout_results'`)

**Description:**  
The fan-out worker block writes results to `ctx.set('_fanout_results', branchResults)` and `core:reduce` reads from `ctx.get('_fanout_results')`. Both sides hardcode this key. A graph with two sequential fan-out/reduce pairs in the same execution context (A → FanOut1 → Reduce1 → FanOut2 → Reduce2) will have `_fanout_results` overwritten by FanOut2 before Reduce1 runs, causing Reduce1 to read FanOut2's results.

**Fix guidance:** Add a `resultsKey?: string` config field to `core:fan-out` (defaulting to `'_fanout_results'`) and use the same key in `core:reduce`'s `resultsKey` config field. The worker fan-out block should use `nodeDef.config.resultsKey ?? '_fanout_results'` when writing.

---

#### ISS-022 · `low` · `resolved`

**Title:** Dead code in `tool-executor.ts` — never-used variable assignment

**File:** `apps/engine/src/execution/tool-executor.ts:287`

**Description:**  
`const node = ctx.data.__graph ? undefined : undefined;` — both conditional branches evaluate to `undefined`, the variable is never used, and this line was left as a placeholder comment. Produces a TypeScript "variable is declared but its value is never read" warning if strict linting is enabled.

**Fix guidance:** Delete the line.

---

### Convention and Minor Issues

---

#### ISS-023 · `medium` · `resolved`

**Title:** Expression editor field mode persists across node selection — causes state pollution

**File:** `apps/web/src/canvas/components/NodeConfigPanel.svelte`

**Description:**  
`exprFieldKey` (expression editor mode flag) is a component-level `let` variable that is never reset when the selected node changes. If the user opens the expression editor for a field on Node A, then selects Node B which has a field with the same key name, the expression editor appears for that field on Node B even though the user never enabled it there. If Node B has no field with that key, the state is orphaned but invisible until the user selects Node A again.

**Fix guidance:** Add a reactive `$: if (node) { exprFieldKey = null; evalResult = {}; }` statement to reset state on node prop change.

---

#### ISS-024 · `medium` · `resolved`

**Title:** Value picker generates syntactically invalid JSONata — nodeId used as output key instead of actual output key name

**File:** `apps/web/src/canvas/components/NodeConfigPanel.svelte:143`

**Description:**  
`insertUpstreamRef(key, upstream.id, upstream.id)` passes the graph node ID (e.g., `node-abc-123`) as both the `nodeId` and `outputKey` arguments. The function generates `$.node-abc-123`. In JSONata, identifiers containing hyphens must be backtick-quoted; unquoted, the hyphen is parsed as a subtraction operator, producing a parse error at runtime. Additionally, nodes write outputs under named keys (e.g., `output`, `_condition`, `result`), not under their node ID — so even if quoted, this would reference a non-existent context key.

*Note: This is a pre-existing Phase 2 issue made more visible by the Phase 3 expression editor. Not introduced in Phase 3.*

**Fix guidance:** The value picker should offer the actual output key names from the upstream node's output schema (from `nodeTypeDef.schema.output.properties`), not the node ID.

---

#### ISS-025 · `medium` · `resolved`

**Title:** `testMcpServer` route allows `developer` role — inconsistent with `create`/`delete` requiring `tenant_admin`

**File:** `apps/api/src/routes/mcp-servers.ts:19`

**Description:**  
`createMcpServer` (line 17) and `deleteMcpServer` (line 18) require `requireMinRole('tenant_admin')`. `testMcpServer` (line 19) only requires `requireAuth` (any authenticated user, including developers). Testing an MCP server causes the engine to spawn a subprocess or make an outbound HTTP request to an arbitrary host, which could be abused for SSRF by a developer-role user who can create MCP server records through other means.

**Fix guidance:** Add `requireMinRole('tenant_admin')` to the test route, or at minimum `requireMinRole('developer')` with explicit documentation of the trust boundary.

---

#### ISS-026 · `medium` · `resolved`

**Title:** `getSchemaInput`/`getSchemaOutput` return empty object `{}` for absent schema instead of a distinct response

**File:** `apps/api/src/controllers/agents.controller.ts:403, 415`

**Description:**  
When the Start node has no `inputSchema` configured (or no Start node exists), `getSchemaInput` returns `{ inputSchema: {} }`. The SDK's `agent.validate(input)` method treats an empty schema as "accepts anything", which is incorrect — it should mean "schema not configured". The caller cannot distinguish a valid empty-schema from an unconfigured schema.

**Fix guidance:** Return `res.status(404).json({ error: 'No input schema defined on this agent' })` when `inputSchema` is absent; similarly for output. Or return `{ inputSchema: null }` and document the null-means-absent contract.

---

#### ISS-027 · `low` · `resolved`

**Title:** `_callMcpTool` dynamic import uses `.js` extension — fails in Jest/ts-jest test environment

**File:** `apps/engine/src/execution/context.ts:103`

**Description:**  
`await import('../mcp/mcp-registry.js')` uses the `.js` extension. In the project's Jest/ts-jest configuration (which uses `preset: 'ts-jest'` and resolves `.ts` files), this extension causes `Cannot find module` errors. All other imports in the engine codebase use extension-less paths.

**Fix guidance:** Change to `await import('../mcp/mcp-registry')`.

---

#### ISS-028 · `low` · `resolved`

**Title:** MCP `initialize()` returns before `initialized` notification is guaranteed delivered

**File:** `apps/engine/src/mcp/mcp-client.ts` (`initialize()` method)

**Description:**  
The `initialized` notification is written to `stdin` via `this._process?.stdin?.write(notification)` but the call is not awaited and no callback confirms the bytes were flushed. `initialize()` returns immediately after this write. A rapid subsequent call to `listTools()` could arrive at the MCP server before the `initialized` notification, violating the MCP protocol handshake sequence (the server must receive `initialized` before serving requests).

**Fix guidance:** Wrap the notification write in a `new Promise((resolve, reject) => this._process?.stdin?.write(notification, (err) => err ? reject(err) : resolve()))` and await it before returning from `initialize()`.

---

#### ISS-029 · `low` · `resolved`

**Title:** `_nodeToServer` map in MCP registry is populated but never read — dead state

**File:** `apps/engine/src/mcp/mcp-registry.ts:45`

**Description:**  
`this._nodeToServer.set(nodeId, serverId)` is called in `getClient()` but `_nodeToServer` is never read anywhere in `mcp-registry.ts` or the broader codebase. This map was likely intended for a `callTool(nodeId, ...)` lookup that is now served directly via the `_clients` map key `${nodeId}:${runId}`.

**Fix guidance:** Remove the `_nodeToServer` Map and the `this._nodeToServer.set(...)` line to eliminate dead state.

---

#### ISS-030 · `low` · `resolved`

**Title:** `validateInvocationRequest` public strategy does not check if the agent is enabled

**File:** `apps/engine/src/auth/invocation-auth.ts:84`

**Description:**  
The `'public'` strategy branch queries the `agents` table for `tenant_id` but performs no `enabled` check. An admin-disabled public-strategy agent will still pass invocation auth. The `api-key` strategy has the same gap. While the API layer may check agent enabled state separately, the defense-in-depth at the auth level is missing.

**Fix guidance:** Add `WHERE id = ? AND enabled = 1` to the agent query in both `validateApiKey` (for the lookup) and the `public` branch; throw `403 AGENT_DISABLED` if not found.

---

---

## Phase 4 Issues

All issues below were identified in the Phase 4 code review (2026-06-16). Phase 4 added: Graph-as-Code compiler/CLI, Session Manager, session nodes, boot-time sync, prompt/test-case/Caal routes, SDK SessionClient, and Studio/Admin additions.

### Bugs — Functionality Broken

---

#### ISS-031 · `critical` · `resolved`

**Title:** Dead ternary in `invokeCaal` — `clientSessionId` from request body always ignored

**File:** `apps/api/src/controllers/caal.controller.ts:37-39`

**Description:**  
Both branches of the ternary produce identical strings:
```typescript
const sessionId = clientSessionId
  ? `_platform:caal-assistant:${tenantId}:${userId}:${agentId ?? 'global'}`
  : `_platform:caal-assistant:${tenantId}:${userId}:${agentId ?? 'global'}`;
```
The `clientSessionId` value extracted from the request body is accepted but never used. Every invocation from the same `userId` + `agentId` goes to the same session regardless of what `sessionId` the client sends. It is impossible for a caller to specify a custom session or create multiple independent Caal sessions for the same user/agent pair.

**Fix guidance:** Use `clientSessionId` as the session suffix when provided:
```typescript
const sessionId = `_platform:caal-assistant:${tenantId}:${userId}:${clientSessionId ?? agentId ?? 'global'}`;
```

---

#### ISS-032 · `critical` · `resolved`

**Title:** `agents_dist` Docker volume not re-populated on redeployment — stale agents served after rebuild

**File:** `docker-compose.yml:7-8`, `apps/api/Dockerfile:52-53`

**Description:**  
The `agent-builder` service targets `FROM scratch AS agent-builder` and copies compiled agent JSON into the image at `/agents-out`. Docker Compose mounts the named volume `agents_dist:/agents-out`. Docker only initialises a named volume from image contents on first creation (when the volume is empty). On every subsequent `docker-compose up` after rebuilding the image with new agent definitions, the volume already exists and Docker does not re-copy from the updated image. The API service continues serving the stale agent definitions from the first-ever build.

**Fix guidance:** Change `agent-builder` to a non-scratch base (e.g., `FROM alpine AS agent-builder`) with an entrypoint that actively copies files into the volume at container start:
```dockerfile
FROM alpine AS agent-builder
COPY --from=builder /monorepo/dist/agents /agents-src
ENTRYPOINT ["/bin/sh", "-c", "cp -r /agents-src/. /agents-out/ && echo 'Agents copied'"]
```
Mount `agents_dist:/agents-out` on the service so the copy happens at every `up`. The `api` service `depends_on: agent-builder: condition: service_completed_successfully` ensures ordering.

---

#### ISS-033 · `critical` · `resolved`

**Title:** All Caal integration tools have reversed `execute(config, ctx)` parameter order — every tool throws `TypeError` at runtime

**File:** `packages/integrations/caal/src/tools/graph.ts` (all execute methods)  
**Also:** `packages/integrations/caal/src/tools/platform.ts` (all execute methods)

**Description:**  
The `NodeModule` interface in `packages/sdk/src/node.ts:39` declares:
```typescript
execute(ctx: ExecutionContext, config: TConfig): Promise<NodeOutput>;
```
Every Caal integration tool uses the reversed signature `execute(_config, ctx)` or `execute(config, ctx)`. At runtime, the execution engine calls `node.execute(ctx, config)`, so:
- The first parameter (named `_config` or `config`) actually receives the `ExecutionContext`
- The second parameter (named `ctx`) actually receives the config object `{}`

When any tool body calls `ctx.get(...)` or `ctx.set(...)`, it is calling `.get()` on a plain config object, which has no such method → `TypeError: ctx.get is not a function`. Every Caal tool (all 13 in graph.ts and platform.ts) will throw this error on invocation. The entire Caal tool layer is non-functional.

Additionally, tools with non-empty config (e.g., `graphGetNode`, `graphAddNode`, `platformGetNodeSchema`) cast their first parameter — the actual ExecutionContext — to a config interface: `const cfg = config as { nodeId: string }`, which causes the extracted values to be undefined.

**Fix guidance:** Swap parameter order in all Caal tool `execute` methods to match the interface:
```typescript
// Before (wrong)
async execute(_config, ctx) {
  const graphState = ctx.get('graphState');

// After (correct)
async execute(ctx, _config) {
  const graphState = ctx.get('graphState');
```
Apply this fix to all tools in `graph.ts` and `platform.ts`. Tools that use config values (e.g., `graphGetNode`) additionally need `const cfg = config as { nodeId: string }` where `config` is the second (correct) parameter.

---

#### ISS-034 · `high` · `resolved`

**Title:** `assertionsJson` stored without JSON validation — malformed input causes 500 on test suite run

**File:** `apps/api/src/controllers/test-cases.controller.ts:36`  
**Also:** Line 202 (`runTestSuite`)

**Description:**  
`createTestCase` accepts `assertionsJson` as a plain string and stores it directly in the DB without validating it is well-formed JSON. In `runTestSuite` (line 202), `JSON.parse(tc.assertionsJson)` is called inside the per-test-case loop with no try-catch. If a test case was created with malformed JSON (e.g., via a direct API call or a frontend bug), the entire suite run throws an unhandled exception and returns a 500 response — failing all test cases rather than isolating the broken one.

**Fix guidance:** In `createTestCase`, validate before INSERT:
```typescript
try { JSON.parse(assertionsJson); }
catch { throw Object.assign(new Error('assertionsJson is not valid JSON'), { status: 400 }); }
```
Also wrap the `JSON.parse` in `runTestSuite` in a try-catch that marks just that test case as failed with `error: 'Invalid assertionsJson'`.

---

#### ISS-035 · `high` · `resolved`

**Title:** Canvas tool edges wired to `explainer` (`core:llm-call`) — highlight/focus never fires on explain path

**File:** `agents/caal.agent.ts:172-175`

**Description:**  
`caal.canvas.highlight` and `caal.canvas.focus` are wired to the `explainer` node via `this.tool(...)`:
```typescript
this.tool('caal.canvas.highlight', 'explainer');
this.tool('caal.canvas.focus', 'explainer');
```
`explainer` is a `core:llm-call` node. `core:llm-call` is not an agentic loop — it does not support tool calls. The execution engine only invokes tool edges for `core:tool-call` and `core:react` nodes. These tool edges are silently ignored at runtime. Canvas highlight and focus are therefore never triggered from the explain/question path.

**Fix guidance:** Remove `this.tool('caal.canvas.highlight', 'explainer')` and `this.tool('caal.canvas.focus', 'explainer')`. Canvas effects from explain/question responses must be handled by the `response-assembler` transform outputting highlight/focus keys that the Studio frontend interprets from the final run output (already done for `canvasHighlight` / `canvasFocus` in the response-assembler expression).

---

### Bugs — Data Integrity and Correctness

---

#### ISS-036 · `medium` · `resolved`

**Title:** `internalExpireSessions` fetches all active sessions then queries each individually — N+1 pattern

**File:** `apps/api/src/controllers/sessions.controller.ts:349-366`

**Description:**  
`internalExpireSessions` issues a broad `SELECT` for all sessions with `status = 'active'` across all tenants (no LIMIT), then iterates the result and issues one UPDATE per row. For deployments with thousands of active sessions this produces N+1 DB queries and holds the result set in memory. This is called on an hourly scheduler interval.

**Fix guidance:** Replace the loop with a single bulk UPDATE:
```typescript
await db
  .update(sessions)
  .set({ status: 'expired', updatedAt: new Date() })
  .where(and(eq(sessions.status, 'active'), lte(sessions.expiresAt, new Date())));
```

---

#### ISS-037 · `medium` · `resolved`

**Title:** `schema` assertion type ignores the provided JSON Schema — always passes for any object

**File:** `apps/api/src/controllers/test-cases.controller.ts:211-214`

**Description:**  
The `schema` assertion branch performs only a `typeof caseOutput === 'object'` check:
```typescript
passed = typeof caseOutput === 'object' && caseOutput !== null;
```
It completely ignores `assertion.schema` (the JSON Schema value the developer configured). A test asserting `{ type: 'object', required: ['name'] }` passes even when the output contains no `name` field. Schema assertions are non-functional as quality gates.

**Fix guidance:** Install `ajv` and validate the output against the schema:
```typescript
import Ajv from 'ajv';
const ajv = new Ajv();
const valid = ajv.validate(assertion.schema, caseOutput);
passed = valid;
message = valid ? undefined : ajv.errorsText();
```

---

#### ISS-038 · `medium` · `resolved`

**Title:** `evaluate_score` assertion always returns `passed = true` — quality gates never enforced

**File:** `apps/api/src/controllers/test-cases.controller.ts:215-218`

**Description:**  
The `evaluate_score` branch unconditionally sets `passed = true`:
```typescript
passed = true;
message = 'evaluate_score assertions require manual review';
```
A test suite containing `evaluate_score` assertions always reports 100% pass regardless of actual output quality. Developers will see green test runs even when LLM outputs do not meet their quality threshold. The test suite dashboard is misleading.

**Fix guidance:** Either block `evaluate_score` assertions at creation time with a 400 error ("evaluate_score is not yet supported") so developers are not silently misled, or implement the score evaluation logic against telemetry data.

---

#### ISS-039 · `medium` · `resolved`

**Title:** `TestCasesPanel.svelte` sends wrong field name to `createTestCase` — no assertions ever stored

**File:** `apps/web/src/canvas/components/TestCasesPanel.svelte`

**Description:**  
The panel builds a request body with `{ assertions: assertionsArray }` (an array value under the key `assertions`). The `createTestCase` controller reads `req.body.assertionsJson` (a JSON string). The field name mismatch means the controller never receives the assertions. Every test case created from the Studio UI is stored with `assertionsJson = undefined`, which is inserted as an empty or null value. When the suite runs, `JSON.parse(undefined)` throws a 500 error (see also ISS-034).

**Fix guidance:** In `TestCasesPanel.svelte`, stringify the array before sending:
```typescript
body: JSON.stringify({ ..., assertionsJson: JSON.stringify(assertions) })
```

---

#### ISS-040 · `medium` · `resolved`

**Title:** Compiler does not validate that `toolEdge` target node IDs exist — orphaned tool edges compile silently

**File:** `packages/compiler/src/compile.ts`

**Description:**  
`compile()` validates that both `from` and `to` node IDs on regular edges exist in the node map, but performs no equivalent check on `toolEdges`. A typo such as `this.tool('caal.graph.read', 'mdoifier')` (misspelled node ID) passes compilation and produces a compiled JSON file with a dangling tool edge. At runtime the execution engine finds no node matching `mdoifier` and silently drops the tool edge, leaving the intended agent node without its tool.

**Fix guidance:** After `const { nodes, edges, toolEdges } = snapshot;`, add:
```typescript
for (const te of toolEdges) {
  if (!nodes[te.to]) {
    details.push(`toolEdge target node "${te.to}" does not exist`);
  }
}
```

---

#### ISS-041 · `medium` · `resolved`

**Title:** `build.ts` writes empty manifest when all agents fail to compile — marks all synced agents stale on next boot

**File:** `packages/cli/src/commands/build.ts:99-101`

**Description:**  
The manifest is written unconditionally at line 100 regardless of outcome:
```typescript
writeFileSync(manifestPath, JSON.stringify({ agents: built }, null, 2), 'utf8');
```
If every agent file fails to compile (build errors), `built` is `[]` and `agents.manifest.json` is written as `{ "agents": [] }`. On the next API boot, `bootTimeSync` reads this empty manifest and marks every existing `code-defined` agent as `stale: true` (lines 58-75 of `boot-sync.ts`), effectively removing them from service — despite the failure being a compilation error, not an intentional deletion.

**Fix guidance:** Skip manifest write when `built.length === 0 && errors.length > 0`:
```typescript
if (built.length === 0 && errors.length > 0) {
  console.warn('No agents compiled successfully — manifest not written to prevent accidental staling.');
} else {
  writeFileSync(manifestPath, JSON.stringify({ agents: built }, null, 2), 'utf8');
}
```

---

#### ISS-042 · `medium` · `resolved`

**Title:** `caal.agent.ts` session-write references `$.sessionMessages` but context-assembler renames it to `history`

**File:** `agents/caal.agent.ts:118`  
**Also:** Lines 44-50 (context-assembler expression)

**Description:**  
`session-read` maps the session key `messages` into context as `sessionMessages`. The `context-assembler` transform then renames it:
```jsonata
"history": $.sessionMessages ?? []
```
If the execution engine replaces context data with a node's transform output (standard behaviour for `core:transform`), the key `sessionMessages` no longer exists in context after `context-assembler` runs. The LLM nodes and downstream nodes operate on the assembled context. When `session-write` executes, its expression:
```
messages: '$append($.sessionMessages ?? [], [{"role":"user",...}])'
```
evaluates `$.sessionMessages` as `undefined`, so `$append([], [...])` produces only the current turn. The conversation history is never accumulated — each Caal session always shows only the most recent exchange.

**Fix guidance:** Either (a) reference `$.history` in the session-write expression instead of `$.sessionMessages`, or (b) preserve the original key by including it in the context-assembler output: `"sessionMessages": $.sessionMessages ?? []`.

---

### Convention and Minor Issues

---

#### ISS-043 · `low` · `resolved`

**Title:** CLI `sessions migrate` without `--agent` calls a non-existent API endpoint

**File:** `packages/cli/src/commands/sessions.ts:13-14`

**Description:**  
When `--agent` is omitted (global migration), the CLI calls:
```
POST {apiUrl}/v1/agents/sessions/migrate-all
```
No such route exists in the API. The `sessionRouter` is mounted at `/v1/agents/:id/sessions` (agent-scoped); there is no global `/v1/agents/sessions/migrate-all` handler. The command will always receive a 404 and report a failure.

**Fix guidance:** Either implement `POST /internal/sessions/migrate-stale` (referenced in the admin handler) and update the CLI to call that internal endpoint (with the appropriate auth header), or scope the CLI command to always require `--agent`.

---

#### ISS-044 · `low` · `resolved`

**Title:** Module-level `edgeCounter` in `graph.ts` — edge IDs are non-deterministic across multi-agent builds

**File:** `packages/compiler/src/graph.ts:10`

**Description:**  
`let edgeCounter = 0;` is module-level state shared across all `AgentGraph` instances in a process. In a single `magicaal build` run that compiles multiple agents, each subsequent agent's edge IDs start where the previous agent left off (e.g., `e_1…e_12` for agent A, `e_13…e_24` for agent B). The IDs are therefore not stable across builds: adding a new agent or reordering compile order changes the IDs of all subsequent agents. This causes spurious content-hash differences, triggering unnecessary version inserts in `bootTimeSync` even when agent logic is unchanged.

**Fix guidance:** Move `edgeCounter` to an instance variable inside `AgentGraph`:
```typescript
private _edgeCounter = 0;
// Then use: id: `e_${++this._edgeCounter}`
```

---

#### ISS-045 · `low` · `resolved`

**Title:** Compiler does not require a `core:end` node — graphs without end node compile and run indefinitely

**File:** `packages/compiler/src/compile.ts`

**Description:**  
`compile()` validates that every non-Start node has at least one inbound edge, but does not check that a `core:end` node exists. A graph without `core:end` compiles successfully. At runtime, execution reaches a terminal node with no outbound edges (which is treated as a dead end, not a proper graph completion), and the run may not write its final status or emit its output correctly, depending on engine implementation.

**Fix guidance:** After snapshot validation, add:
```typescript
const hasEndNode = Object.values(nodes).some(n => n.type === 'core:end');
if (!hasEndNode) {
  details.push('Graph must contain at least one core:end node');
}
```

---

#### ISS-046 · `low` · `resolved`

**Title:** `getCaalSession` uses redundant dynamic imports for already-statically-available modules

**File:** `apps/api/src/controllers/caal.controller.ts:93-95`

**Description:**  
`getCaalSession` performs three dynamic `await import(...)` calls at the bottom of the function:
```typescript
const { sessionContext } = await import('../db/schema');
const { sessions } = await import('../db/schema');
const { eq: eqOp } = await import('drizzle-orm');
```
`sessions` and `sessionContext` could be added to the top-level static import from `'../db/schema'`. `eq` is already statically imported at the top of the file as `eq` but is redundantly re-imported as `eqOp`. The double `import('../db/schema')` call is evaluated twice per request, adding unnecessary module resolution overhead on every `getCaalSession` call.

**Fix guidance:** Add `sessions`, `sessionContext` to the top-level `import { ... } from '../db/schema'` and use the existing `eq` directly. Remove all three dynamic import lines.

---

## Issue Summary

| ID | Severity | Status | Title |
|---|---|---|---|
| ISS-001 | critical | **resolved** | Trajectory display never renders — stepId filter uses nodeId |
| ISS-002 | critical | **resolved** | MCP direct mode: `ctx.agentId` passed as nodeId — registry lookup always fails |
| ISS-003 | critical | **resolved** | Expression editor Evaluate always 404 — `/v1/utils/evaluate` missing |
| ISS-004 | critical | **resolved** | TypeScript cast syntax in browser `<script>` tags — JS syntax error |
| ISS-005 | critical | **resolved** | JWT invocation auth never called — `runs.controller.ts` uses old wrapper |
| ISS-006 | high | **resolved** | `core:tool-call` / `core:react` `execute()` throws instead of returning `NodeOutput` |
| ISS-007 | high | **resolved** | Trajectory tenant check optional — cross-tenant data possible |
| ISS-008 | high | **resolved** | JWKS cache not invalidated on config change; key rotation breaks auth |
| ISS-009 | high | **resolved** | 4 LLM nodes missing try-catch on `ctx.llmCall` — unhandled exceptions |
| ISS-010 | high | **resolved** | MCP direct mode `_callMcpTool` missing try-catch |
| ISS-011 | medium | **resolved** | `dispatchSubRun` poll: missing `response.ok` check before JSON parse |
| ISS-012 | medium | **resolved** | DB handle leak in `mcp-registry.getServerConfig` on query error |
| ISS-013 | medium | **resolved** | MCP test endpoint has no timeout — hangs on unresponsive servers |
| ISS-014 | medium | **resolved** | `getRoutingEvents`: `JSON.parse(routingMetaJson)` without try-catch |
| ISS-015 | high | **resolved** | `getRoutingEvents` runs query fetches entire tenant table — no limit |
| ISS-016 | medium | **resolved** | Proactive triggers can skip all targets with no fallback |
| ISS-017 | low | **resolved** | `cost-optimized` ignores completion tokens — incorrect for reasoning models |
| ISS-018 | high | **resolved** | `ENGINE_INTERNAL_URL` undocumented — `dispatchSubRun` fails in Docker |
| ISS-019 | medium | **resolved** | `formatServer` omits `env` field from API response |
| ISS-020 | medium | **resolved** | Trajectory `toolInputs` silently dropped — no DB column |
| ISS-021 | medium | **resolved** | Hardcoded `_fanout_results` key breaks with sequential fan-out/reduce pairs |
| ISS-022 | low | **resolved** | Dead code in `tool-executor.ts:287` |
| ISS-023 | medium | **resolved** | Expression editor field mode persists across node changes |
| ISS-024 | medium | **resolved** | Value picker generates syntactically invalid JSONata (nodeId as output key) |
| ISS-025 | medium | **resolved** | `testMcpServer` route allows developer role — inconsistent authz |
| ISS-026 | medium | **resolved** | Schema endpoints return `{}` for absent schema instead of 404 or null |
| ISS-027 | low | **resolved** | `_callMcpTool` dynamic import uses `.js` extension — fails in Jest |
| ISS-028 | low | **resolved** | MCP `initialized` notification not awaited before `listTools` |
| ISS-029 | low | **resolved** | `_nodeToServer` map in MCP registry is populated but never read |
| ISS-030 | low | **resolved** | `validateInvocationRequest` public strategy skips `enabled` check |
| ISS-031 | critical | **resolved** | Dead ternary in `invokeCaal` — `clientSessionId` always ignored |
| ISS-032 | critical | **resolved** | `agents_dist` volume not re-populated on redeployment — stale agents served |
| ISS-033 | critical | **resolved** | Caal integration tools `execute()` params reversed — all tools throw `TypeError` |
| ISS-034 | high | **resolved** | `assertionsJson` stored without JSON validation — 500 on test suite run |
| ISS-035 | high | **resolved** | Canvas tool edges wired to `explainer` (`core:llm-call`) — silently ignored |
| ISS-036 | medium | **resolved** | `internalExpireSessions` N+1 query — one UPDATE per session row |
| ISS-037 | medium | **resolved** | `schema` assertion ignores provided JSON Schema — always passes for any object |
| ISS-038 | medium | **resolved** | `evaluate_score` always returns `passed = true` — quality gates never enforced |
| ISS-039 | medium | **resolved** | `TestCasesPanel.svelte` sends `assertions` field — controller expects `assertionsJson` |
| ISS-040 | medium | **resolved** | Compiler does not validate `toolEdge` target node IDs — orphaned edges compile silently |
| ISS-041 | medium | **resolved** | `build.ts` writes empty manifest on total compile failure — marks all agents stale |
| ISS-042 | medium | **resolved** | `caal.agent.ts` session-write uses `$.sessionMessages` but assembler renames it to `history` |
| ISS-043 | low | **resolved** | CLI `sessions migrate` (no `--agent`) calls non-existent `/v1/agents/sessions/migrate-all` |
| ISS-044 | low | **resolved** | Module-level `edgeCounter` in `graph.ts` — non-deterministic edge IDs across multi-agent builds |
| ISS-045 | low | **resolved** | Compiler does not require `core:end` node — graphs without end node compile successfully |
| ISS-046 | low | **resolved** | `getCaalSession` uses redundant dynamic imports for already-imported modules |

**Total:** 46 issues · 8 critical · 9 high · 19 medium · 10 low  
**Phase 3:** 30 issues (all resolved) · **Phase 4:** 16 issues (all resolved)  
**Resolved:** 46 (all issues resolved) · **Open:** 0
