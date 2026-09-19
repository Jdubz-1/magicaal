---
RFC: 0002
Title: Model Provider Presets
Start Date: 2026-09-18
PR: https://github.com/Jdubz-1/magicaal/pull/18
Status: Draft
---

# RFC 0002 — Model Provider Presets

## Summary

Model providers become a catalog-driven kind of Integration Connection: each `ProviderAdapter` may declare a descriptor (display name, credential fields, suggested models), the engine serves those descriptors as a catalog, and two new `/v1/llm` routes let an operator connect a provider from a preset — key verified against the provider before it is stored, with an optional router policy created in the same request. This RFC exists because the work adds public `/v1/` routes and extends an SDK interface, both of which [CONTRIBUTING.md](../CONTRIBUTING.md#what-requires-an-rfc) puts behind an RFC.

## Motivation

Connecting a model provider today means writing two JSON documents by hand.

1. **Admin → Integrations → Add Connection** takes a free-text `service`, an auth type, and a credentials blob. Nothing tells the operator that the field must be spelled `api_key`, or that `service` must match a registered adapter id exactly — a typo produces a saved connection that silently resolves to no credentials at run time.
2. The connection is useless until its UUID is pasted into a `ModelRouterConfig` by hand, either as a Named Router Policy or inline on a `core:llm-call` node.

A wrong key is not discovered at save time; it surfaces later as `No credentials for target, skipping` followed by `All router targets exhausted` on a run the operator has already paid to reach. Every provider connected this way repeats the same steps, and the Studio node editor offers only a raw JSON textarea for the router.

This matters beyond first-run convenience: the in-Studio Caal assistant routes through a tenant's own router policy, so "no supported way to connect a provider" and "Caal cannot answer" are the same problem.

## Detailed Design

### Provider descriptors (`packages/sdk`)

`ProviderAdapter` gains two **optional** members, so existing and third-party adapters compile unchanged:

```typescript
export interface ProviderModelOption {
  id: string;                 // model id sent to the provider
  label: string;              // shown in the picker
  contextWindow?: number;
  recommended?: boolean;      // preselected when the user has not chosen
}

export interface ProviderDescriptor {
  provider: string;           // equals integration_connections.service and ModelRouterTarget.provider
  displayName: string;
  description: string;
  apiKeyUrl?: string;         // "Get an API key" link
  authFields: IntegrationAuthField[];   // reused from integration.ts
  models: ProviderModelOption[];        // curated; a custom id is always allowed
}

export interface CredentialValidationResult {
  ok: boolean;
  reason?: 'invalid_key' | 'unreachable' | 'unknown';
  message?: string;
}

export interface ProviderAdapter {
  readonly provider: string;
  readonly descriptor?: ProviderDescriptor;
  validateCredentials?(credentials: ResolvedCredentials): Promise<CredentialValidationResult>;
  // …existing call/stream/translateError
}
```

`authFields` deliberately reuses `IntegrationAuthField` — the same shape the Admin connection form already renders for integration packages — so one form renderer serves both.

### Engine

- Adapters for `anthropic`, `openai` and `google` declare descriptors and implement `validateCredentials` as a token-free `GET` against the provider's list-models endpoint (`adapters/validate.ts`). 401/403 → `invalid_key`; a network error or 5 s timeout → `unreachable`; other non-2xx → `unknown`. The key travels in headers only — Google's included, which is why the check does not use its `?key=` query form.
- `provider-adapter-registry.listDescriptors()` returns descriptors for registered adapters.
- Internal routes: `GET /internal/llm/providers`, `POST /internal/llm/providers/:provider/validate`.

### Public API (the part this RFC exists for)

**`GET /v1/llm/providers`** — any authenticated user (Studio's model picker needs it). Proxies the engine catalog.

```json
[{ "provider": "anthropic", "displayName": "Anthropic", "description": "…",
   "apiKeyUrl": "https://…", "authFields": [{ "key": "api_key", "label": "API key", "type": "secret", "required": true }],
   "models": [{ "id": "claude-sonnet-5", "label": "Claude Sonnet 5", "recommended": true }] }]
```

**`POST /v1/llm/providers/:provider/connections`** — `tenant_admin`+, since it stores credentials.

```jsonc
{
  "displayName": "Anthropic",            // optional; defaults to the descriptor's
  "credentials": { "api_key": "sk-…" },  // required; keys come from authFields
  "skipValidation": false,               // optional escape hatch, see 424 below
  "routerPolicy": { "create": true, "model": "claude-sonnet-5", "name": "prod" }  // optional
}
```

| Status | Meaning |
|---|---|
| `201` | `{ connection, routerPolicy? }` — credentials never echoed |
| `400` | Unknown/missing required `authFields`, or `routerPolicy.create` without a `model` |
| `404` | `PROVIDER_NOT_FOUND` — no adapter with that id |
| `422` | `PROVIDER_KEY_INVALID` — the provider rejected the key; nothing stored |
| `424` | `PROVIDER_UNREACHABLE` — could not verify; resubmit with `skipValidation: true` |

The connection insert and the router-policy insert run in one transaction, so a failed policy cannot leave a half-configured provider behind. Both reuse the existing row builders (`newConnectionRow`, `newRouterPolicyRow`) shared with the manual endpoints, so credentials are encrypted with `MAGICAAL_MASTER_KEY` on exactly one code path.

The created policy is the minimal single-target form:

```json
{ "strategy": "priority",
  "targets": [{ "id": "primary", "connectionId": "<new>", "provider": "anthropic", "model": "claude-sonnet-5" }],
  "triggers": [] }
```

### Storage: no new table, no migration

A connection **is** a model provider when its `service` matches a registered adapter id. `integration_connections` is unchanged, credential resolution is unchanged (`credential-resolver.ts` already looks up by `target.connectionId`), and every existing manually-created connection keeps working. Removing an adapter simply removes its presets; the rows remain and still resolve.

### Studio and Admin

- `core:llm-call`'s `router` config property gains `format: 'model-router'`. The schema type stays `object`, so the compiler, graph validator and every non-Studio consumer are unaffected — the format is a rendering hint, the same mechanism `format: 'connection'` already uses for integration nodes.
- The node editor renders connection + model dropdowns, with an Advanced (JSON) mode that opens automatically for any router it cannot represent (multiple targets, triggers, non-priority strategy), so existing graphs are never silently rewritten.
- Admin gains a Model Providers section on Integrations, a per-provider connect form generated from the descriptor, and a quick-build helper on Create Router Policy. The generic "+ Add Connection" form stays for anything without an adapter.

## Drawbacks

- **Curated model lists go stale.** Provider line-ups change faster than this repo releases. Mitigated by always allowing a custom model id, but a stale list is still a wrong default in the UI.
- **Saving a key makes an outbound call.** In an air-gapped or egress-filtered deployment every save returns 424 until the operator opts out with `skipValidation`. That is a worse first-run experience than the previous no-op.
- **The catalog couples the API to the engine.** `GET /v1/llm/providers` is a proxy; if the engine is down, the Admin page falls back to the manual form rather than showing presets.
- **`service` remains an untyped string.** This RFC adds a well-lit path but does not close the free-text one, so a typo'd manual connection can still exist. Adding a `kind` column was rejected below.
- **Provider support is still hardcoded per adapter.** Each adapter pins its own base URL, so OpenAI-compatible endpoints (Azure, Ollama, OpenRouter, vLLM) remain unreachable — a frequently requested case this does not address.

## Alternatives

- **Presets inside the existing form.** A dropdown that fills the free-text fields. Less code, but keeps the model picker and router policy as separate manual steps, so the two-JSON-documents problem survives.
- **Hardcode the provider list in the web app.** Simplest, and rejected: the UI would drift from the adapters that actually exist, and a new adapter would need a matching UI change in another workspace.
- **Model providers as integration packages.** Providers would become `IntegrationPackage`s like Slack or GitHub. Conceptually tidy and rejected as a bigger change: integration packages carry nodes and trigger handlers that a provider has no use for, and the adapter registry would then have two sources of truth.
- **Keys in environment variables.** Simple for single-tenant deployments, but MagiCaal is multi-tenant: each tenant pays for its own usage, and an env var cannot express that.
- **Fetch the model list live from the provider.** Always current, but needs a valid key before the picker can render and makes the form depend on provider uptime. The curated list plus a custom field gets most of the benefit offline.
- **Do nothing.** Every provider setup stays a two-document manual exercise with no verification, and Caal stays unusable until an operator hand-writes a router policy.

## Unresolved Questions

- **Should `integration_connections` eventually gain an explicit `kind` (`'model_provider' | 'integration'`)?** Deriving it from `service` works and needs no migration, but it means the distinction is computed in several places. Deferred until a second consumer needs it.
- **How are curated model lists maintained?** Options: manual updates per release, a build-time fetch, or a small hosted catalog. This RFC assumes manual updates and takes the staleness cost.
- **Do OpenAI-compatible endpoints belong behind this same preset, via a per-connection `base_url` auth field?** That would extend descriptors to cover a family of providers rather than one, and needs its own design for how an adapter reports which fields alter its transport.
