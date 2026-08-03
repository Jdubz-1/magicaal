# RFC Process

Some changes need a design note before implementation. This is currently a self-serve design-note practice — write it, merge it when ready, no mandatory discussion window. See [GOVERNANCE.md](../../../GOVERNANCE.md) for the full process context (MagiCaal's sole-developer/BDFL governance model).

## What Requires an RFC

- New node type or node category
- `AgentGraphDefinition` schema change (breaking or additive)
- `NodeModule` or `ExecutionContext` interface change (`packages/sdk`)
- Public API shape change (`/v1/` routes) — breaking or additive
- Marketplace package format change
- New Engine subsystem
- New external dependency in an npm-published package

## What Doesn't

- Bug fixes
- Performance improvements with no interface change
- New integration packages conforming to the existing format (see [Integrations](../../reference/integrations/README.md))
- Documentation improvements
- Tooling changes (devbox, CI, Dependabot)

## Writing One

Copy [`rfcs/0000-template.md`](../../../rfcs/0000-template.md) to `rfcs/NNNN-short-title.md` (next sequential number). Sections: Summary (three sentences max), Motivation, Detailed Design, and the rest of the template's headings. [`rfcs/0001-graph-schema-v1.md`](../../../rfcs/0001-graph-schema-v1.md) is a real example of an `AgentGraphDefinition` schema RFC.

Open a PR with the RFC file; merge it once you're confident in the design, then implement in a follow-up PR referencing it.
