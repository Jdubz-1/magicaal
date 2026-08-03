# Node Authoring

Node types are the platform's extensibility surface — both the 50 built-in `core:*` nodes in `packages/nodes` and any Marketplace package node are `NodeModule` implementations against the same SDK.

## The SDK (`@magicaal/sdk-node`, `packages/sdk/`)

Three interfaces, exported from `packages/sdk/src/index.ts`:

- **`NodeModule<TConfig>`** (`src/node.ts`) — the node implementation itself: metadata (type, category, config schema) plus an `execute` function receiving the resolved config and an `ExecutionContext`, returning a `NodeOutput`.
- **`ExecutionContext`** (`src/context.ts`) — what a node's `execute()` receives: resolved credentials (`ResolvedCredentials`), session access, and trajectory recording (`TrajectoryStep`) for observability. Implemented by `ExecutionContextImpl` in `apps/engine/src/execution/context.ts`.
- **`ProviderAdapter`** (`src/provider.ts`) — the interface LLM provider integrations implement to plug into the [Model Router](architecture/model-router.md).

Integration packages additionally implement `IntegrationPackage`, `IntegrationTriggerHandler`, and the `IntegrationAuthSchema`/`IntegrationAuthField`/`IntegrationOAuthConfig` types (`src/integration.ts`) — see [Integrations](../reference/integrations/README.md) for that pattern.

## Adding a Node

1. Create `packages/nodes/src/nodes/<category>-<name>.ts`, exporting a `NodeModule<TConfig>`. Follow an existing file for the pattern — e.g. `core-http-request.ts` for a stateless tool node, `core-llm-call.ts` for one that goes through the Model Router.
2. Register it wherever the existing node list is aggregated in `packages/nodes/src/`.
3. Add unit tests under `packages/nodes/tests/unit/`.
4. Add it to the catalog — a one-line entry in [reference/node-catalog.md](../reference/node-catalog.md), plus a full config-reference page in [reference/nodes/](../reference/nodes/README.md) (`reference/nodes/core-<type>.md`) following the existing pages' format: config table, output keys, behavior notes, example.

Adding a node within an **existing** category does not require an RFC. A **new** category, or any change to the `NodeModule`/`ExecutionContext` interfaces themselves, does — see [CONTRIBUTING.md — What Requires an RFC](../../CONTRIBUTING.md#what-requires-an-rfc).

## Graph-as-Code (alternative authoring path)

Nodes are also composed via `packages/compiler`'s `@Agent`/`AgentGraph` TypeScript API instead of the Studio canvas — see [Graph-as-Code](graph-as-code.md).
