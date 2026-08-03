# SDK Client (`@magicaal/sdk`)

`packages/sdk-client` is the **published npm package** (published as `@magicaal/sdk`; the workspace name is `@magicaal/sdk-client`) for external applications consuming the MagiCaal API — distinct from `packages/sdk` (`@magicaal/sdk-node`), the internal node-authoring SDK. It ships a dual ESM/CJS build (`dist/esm`, `dist/cjs`, `dist/types`).

## What It Wraps

| Module | Purpose |
|---|---|
| `client.ts` | Top-level client construction (base URL, auth) |
| `agent-client.ts` | Agent CRUD and run dispatch — a typed wrapper over `/v1/agents/*` |
| `run-handle.ts` | A handle for a dispatched run: poll status, fetch steps |
| `stream-client.ts` | Consumes the run SSE stream (`GET /v1/agents/{id}/runs/{runId}/stream`) |
| `session-client.ts` | Session CRUD wrapper |
| `human-review-client.ts` | Submitting review decisions for paused runs |
| `webhook-verifier.ts` | Verifies per-agent webhook HMAC signatures for consumers receiving MagiCaal webhooks |
| `schema-validate.ts` | Validates input/output against an agent's published JSON Schema (`GET /v1/agents/{id}/schema/input\|output`) |
| `workspace-context-builder.ts` | Builds workspace/session context payloads |
| `retry.ts`, `http.ts`, `errors.ts` | Transport-level retry policy, HTTP client, and a typed error hierarchy |

## Versioning

Because this package ships to external consumers, a breaking change to its public exports is treated the same as a public API shape change — see [CONTRIBUTING.md — What Requires an RFC](../../CONTRIBUTING.md#what-requires-an-rfc).
