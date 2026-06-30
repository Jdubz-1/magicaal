# MagiCaal Roadmap

MagiCaal's development is organized into phases. Each phase ships a meaningful, runnable increment — not a feature flag or partial implementation.

**Current status:** Phase 4 complete. `v0.5.0` is the public baseline release covering Phases 0–4.

---

## Phases

| Phase | Theme | Status | Milestone |
|---|---|---|---|
| 0 | Foundation — monorepo, CI/CD, shared types, Docker | Done | — |
| 1 | Core Engine & Minimal Studio | Done | — |
| 2 | Full Node Set, Production Readiness & Model Router | Done | — |
| 3 | Tool System & Advanced Agent Nodes | Done | — |
| 4 | Graph-as-Code, Session Management & Caal Phase 1 | Done | — |
| 5 | Integrations & Marketplace | In Progress | [Phase 5 Milestone](https://github.com/magicaal/magicaal/milestone/1) |
| 6 | Workspace, Coding Environment & Token Compression | Planned | [Phase 6 Milestone](https://github.com/magicaal/magicaal/milestone/2) |
| 7 | Scale, Ecosystem & SDK Framework Bindings | Planned | [Phase 7 Milestone](https://github.com/magicaal/magicaal/milestone/3) |
| 8 | Model Gateway, FinOps & Cost Governance | Planned | [Phase 8 Milestone](https://github.com/magicaal/magicaal/milestone/4) |

---

## What's Coming

### Phase 5 — Integrations & Marketplace
First-wave integration packages (Slack, GitHub, Gmail, Stripe, Google Workspace, Jira, and more), integration trigger registration, Marketplace plumbing (gated behind `MARKETPLACE_ENABLED=false` at platform launch), air-gapped package installation, and `@magicaal/sdk` Phase 4 (codegen, `WebhookVerifier`).

### Phase 6 — Workspace, Coding Environment & Token Compression
Docker-based development workspaces for coding agents (lifecycle hooks, workspace nodes, permission enforcement) and a transparent token compression layer (`headroom-ai` integration) that reduces LLM API spend across all agents without graph-author changes.

### Phase 7 — Scale, Ecosystem & SDK Framework Bindings
Horizontal engine scaling validation (Redis coordination, distributed BullMQ), Dry Run mode, A2A inbound/outbound, external IdP (OAuth 2.0/OIDC), remaining integration packages (Microsoft 365, Notion, AWS, GitLab, and more), and framework SDK bindings (`@magicaal/react`, `@magicaal/next`, `@magicaal/express`).

### Phase 8 — Model Gateway, FinOps & Cost Governance
Evolution of the Model Router into a full Model Gateway: real-time Cost Ledger (Redis + Telemetry Store), Budget Guard (hard/soft/rate limits), Cost Attribution (run/node/agent/tenant), Anomaly Detector (spike/rate/loop detection), cost-aware routing with `budget_threshold` reactive trigger, `core:budget-guard` node, and the `/admin/finops` FinOps dashboard.

---

## Guiding Principles

This roadmap is **directional, not a contract.** Priorities shift based on community feedback, technical discoveries, and real-world usage patterns. Changes are communicated proactively in [GitHub Discussions → #roadmap](https://github.com/magicaal/magicaal/discussions/categories/roadmap).

The milestone completion percentage on each GitHub Milestone reflects real progress — issues and PRs are linked to milestones as work lands.

---

## Feedback

- **Feature ideas**: open a [Feature Request](https://github.com/magicaal/magicaal/issues/new?template=feature_request.yml) or start a discussion in [GitHub Discussions](https://github.com/magicaal/magicaal/discussions)
- **Roadmap discussion**: [GitHub Discussions → Roadmap](https://github.com/magicaal/magicaal/discussions/categories/roadmap)
- **Significant changes**: see the [RFC process](GOVERNANCE.md#rfc-process)
