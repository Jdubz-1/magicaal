# Caal

Caal is the AI assistant built into Studio — it explains, suggests, and modifies a user's agent graph via conversation, rather than being a separate product.

## Caal Is an Agent

Caal is itself defined as a Graph-as-Code agent: `agents/caal.agent.ts`, a `CaalAssistantAgent` built with `@magicaal/compiler`'s `@Agent`/`AgentGraph` API (see [Graph-as-Code](graph-as-code.md)). It runs through the same engine, node registry, and Model Router as any user-authored agent — there is no separate "Caal runtime."

Its config declares `session: { enabled: true, schemaVersion: 1, ... }` with a `contextSchema` for `messages` (append, evict-oldest at 50 items), `lastProposal` (replace), `userPreferences` (merge), and `proposalHistory` (append, evict-oldest at 20) — see [Sessions](sessions.md) for how that's enforced.

## API Surface

- `POST /v1/caal/invoke` — invoke Caal against a target agent graph (any authenticated user)
- `GET /v1/caal/sessions/{agentId}` — the caller's Caal conversation history for a given target agent
- `GET`/`PATCH /v1/caal/config` — tenant-level Caal configuration (`PATCH` requires `tenant_admin`+)

`apps/api/src/controllers/caal.controller.ts` implements `invokeCaal`/`getCaalSession`; `caal-config.controller.ts` implements the config endpoints. `invokeCaal` polls the engine for run completion for up to `CAAL_INVOKE_TIMEOUT_MS` (default 120s) before returning a `CAAL_STILL_RUNNING` status — there is no SSE stream for Caal invocations.

## Caal's Tools

`packages/integrations/caal/src/tools/` gives Caal's graph a structured way to inspect and modify the canvas: `canvas.ts`, `graph.ts`, `platform.ts`, `proposal.ts`. Proposed graph edits surface in the Studio canvas via `ProposalReviewUI.svelte` (`apps/web/src/canvas/components/`) and `CaalPanel.svelte`, backed by the `caalUndo.ts` store — Caal proposes; the user reviews and applies.
