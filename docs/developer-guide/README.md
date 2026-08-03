# Developer Guide

Reference for engineers working on the MagiCaal platform (`apps/api`, `apps/engine`, `apps/web`, and the shared `packages/`).

## Architecture

| Guide | Description |
|---|---|
| [Architecture Overview](architecture/README.md) | System overview, per-service request lifecycle, layer responsibilities |
| [Engine](architecture/engine.md) | Execution runtime: worker, scheduler, node registry, tool executor |
| [Web](architecture/web.md) | Studio canvas (Svelte) + Admin panel (Datastar) |
| [Model Router](architecture/model-router.md) | Routing strategies, circuit breaker, provider adapters, reactive triggers |

## Platform Subsystems

| Guide | Description |
|---|---|
| [API Reference](api/README.md) | REST endpoint reference — points at the live OpenAPI spec |
| [Auth & RBAC](auth-rbac.md) | Platform/invocation/internal auth planes, roles |
| [Sessions](sessions.md) | Session context, schema migrations, overflow strategies |
| [Database & Migrations](database.md) | Drizzle schema, primary vs. telemetry DB, migration workflow |
| [Node Authoring](node-authoring.md) | `NodeModule`/`ExecutionContext`/`ProviderAdapter`, how to add a node |
| [Graph-as-Code](graph-as-code.md) | `packages/compiler` — TypeScript agent authoring as an alternative to the canvas |
| [AGENTS.md — Graph-as-Code Authoring](AGENTS.md) | Instruction set for an AI coding agent generating `*.agent.ts` files: full API reference, config shapes, validity rules, pitfalls checklist |
| [MCP Client](mcp.md) | Connecting agents to external MCP servers |
| [Marketplace](marketplace.md) | `.mpack` packages, signing/verification, air-gapped mode |
| [Caal](caal.md) | The built-in AI assistant |

## Contributing

| Guide | Description |
|---|---|
| [Contributing](contributing/README.md) | PR workflow, branch strategy, DCO, review process |
| [Code Standards](contributing/code-standards.md) | TypeScript rules, naming conventions, file structure |
| [RFC Process](contributing/rfc-process.md) | What requires a design note before implementation |

## Key Entry Points

- **[CLAUDE.md](../../CLAUDE.md)** — patterns, pitfalls, and architectural invariants (also read by AI assistants)
- **[DEVELOPMENT.md](../../DEVELOPMENT.md)** — local setup, commands, and common issues
- **[CONTRIBUTING.md](../../CONTRIBUTING.md)** — contribution guide and commit standards
