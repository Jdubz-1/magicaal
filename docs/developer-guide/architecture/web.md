# Web Architecture

`apps/web` (port 8080) serves the Studio canvas editor and the Admin panel. It talks only to `apps/api` (via `src/lib/api-client.ts`) — never to `apps/engine` directly.

## Two Rendering Models

The app mixes two distinct UI approaches for its two areas:

- **Admin panel & Studio shell** (`src/routes/admin.ts`, `src/routes/studio.ts`) — server-rendered HTML via `src/views/layout.ts`, using [Datastar](https://data-star.dev/) for hypermedia-driven interactivity (no client-side SPA framework for these pages).
- **Studio canvas** (`src/canvas/`) — a client-side Svelte 5 app (`App.svelte`), mounted into the server-rendered shell via `src/canvas/main.ts` (`mount(App, { target: '#canvas-mount' })`), built separately with Vite (`pnpm run build:canvas`).

## Routes

| Router | Guard | Purpose |
|---|---|---|
| `src/routes/auth.ts` | — | Login/session cookie handling |
| `src/routes/studio.ts` | `requireSession` | Agent list, canvas shell, per-agent editor pages |
| `src/routes/admin.ts` | `requireAdminSession` | Tenant/user/role management, Marketplace panel |

Session cookies are managed in `src/middleware/session.ts` and are separate from the API's JWT — the web app authenticates to `apps/api` on the user's behalf via `src/lib/api-client.ts`.

## Canvas Components (`src/canvas/components/`)

Key pieces: `Canvas.svelte` (the graph surface, using `@dagrejs/dagre` for auto-layout), `NodeConfigPanel.svelte` / `AgentConfigPanel.svelte` (per-node and per-agent config forms), `ConnectionSelect.svelte` (picking an integration connection for a node), `ExpressionEditor.svelte` / `LintPanel.svelte` (CodeMirror-based expression editing with validation), `TestCasesPanel.svelte` / `TestRunPanel.svelte` (the test-case system from `/v1/agents/{id}/test-cases`), `PromptVersionPanel.svelte` (prompt version diff/promote UI), `ProposalReviewUI.svelte` / `CaalPanel.svelte` (Caal's graph-editing conversation surface — see [Caal →](../caal.md)), `SessionContextPanel.svelte` (live session state inspector), `ToolPanel.svelte`.

State lives in `src/canvas/stores/` (`graph.ts`, `connections.ts`, `nodeTypes.ts`, `run.ts`, plus undo stacks `autoPlacementUndo.ts`/`caalUndo.ts`).

## Adding a Canvas Component

New `.svelte` files go in `src/canvas/components/`; shared state goes in `src/canvas/stores/`. Follow the existing panel components for the config-panel pattern (props in, store writes out).
