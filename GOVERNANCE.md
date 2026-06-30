# MagiCaal Governance

## Model: BDFL + RFC Process

MagiCaal uses a **Benevolent Dictator For Life (BDFL)** model with a structured RFC process for significant changes. This model is explicit and documented — clear leadership is a feature, not a flaw, at this stage of the project.

---

## BDFL

**Justin Ward ([@Jdubz-1](https://github.com/Jdubz-1))** holds final decision authority on all matters:

- Architecture and technical direction
- Roadmap prioritization and release timing
- Community policy and Code of Conduct enforcement
- Licensing and commercial decisions
- Core Maintainer appointments and removals

The BDFL model does not mean unilateral decisions in a vacuum. All significant changes go through the RFC process described below. The BDFL's role is to make the final call after community discussion, not to bypass discussion.

---

## RFC Process

A **Request for Comments (RFC)** is required for any proposal that:

- Adds a new node type or node category to `packages/nodes`
- Changes the `AgentGraphDefinition` schema (breaking or non-breaking)
- Changes the `NodeModule` or `ExecutionContext` interface in `packages/sdk`
- Changes the public API shape (`/v1/` routes) in a breaking or additive way
- Changes the Marketplace package format (`.mpack` bundle, `manifest.json`)
- Proposes a new Engine subsystem
- Introduces a new external dependency into a package published to npm (`@magicaal/*`)

RFCs are **not** required for:

- Bug fixes
- Performance improvements with no API or interface change
- New integration packages that conform to the existing package format
- Documentation improvements
- Tooling changes (devbox, CI, Dependabot)
- Refactors that do not change public interfaces

### RFC Lifecycle

```
Draft → Discussion (minimum 7 days) → Final Comment Period (3 days) → Accepted / Rejected / Withdrawn
```

1. Author opens a PR adding `rfcs/NNNN-short-title.md` using the template at `rfcs/0000-template.md`
2. Discussion happens on the PR — anyone may comment
3. The BDFL or a designated Core Maintainer calls the Final Comment Period (FCP)
4. The BDFL makes the final accept/reject decision, stated explicitly in the PR
5. Accepted RFCs are merged to `main`; rejected or withdrawn RFCs are closed but preserved in the PR history

The `rfcs/` directory lives at the monorepo root. The RFC template is at `rfcs/0000-template.md`.

---

## Core Maintainers

The BDFL may designate **Core Maintainers** — individuals with merge authority on specific packages or subsystems.

Core Maintainers can:
- Merge non-RFC changes within their designated subsystem without BDFL review
- Provide non-binding advisory votes during RFC discussion

Core Maintainer status is:
- **Granted** by the BDFL based on demonstrated contribution history and judgment
- **Documented** in `MAINTAINERS.md` with the assigned subsystem and GitHub handle
- **Revocable** by the BDFL with 30 days notice and a documented reason
- **Subject to activity requirements**: 6 months of inactivity results in Emeritus status
- **Emeritus**: former maintainers retain their history and recognition but no merge authority

Security-sensitive changes (auth, cryptography, invocation auth, tenant isolation, credential injection) require BDFL review regardless of CODEOWNERS subsystem assignments.

Current roster: `MAINTAINERS.md`
Automatic review routing: `.github/CODEOWNERS`

---

## Governance Documents

| File | Contents |
|---|---|
| `GOVERNANCE.md` (this file) | BDFL identity, RFC process, Core Maintainer process |
| `MAINTAINERS.md` | Current Core Maintainer roster with subsystems |
| `CODE_OF_CONDUCT.md` | Contributor Covenant v2.1; enforcement contact |
| `CONTRIBUTING.md` | How to contribute, CLA requirement, coding standards, PR process |
| `SECURITY.md` | CVE reporting, disclosure timeline, scope, Hall of Fame |
| `CHANGELOG.md` | Release history (conventional commits + curated highlights) |

---

## Decision-Making Reference

| Decision type | Where it happens |
|---|---|
| Whether to implement feature X | GitHub Discussions → RFC if significant |
| Implementation approach for X | RFC |
| Bug priority | GitHub Issue + milestone label |
| Release timing | GitHub Milestone + BDFL announcement |
| Roadmap phase prioritization | `ROADMAP.md` + community call discussion |
| Code of Conduct enforcement | BDFL + `security@magicaal.dev` |

The roadmap is directional, not a contract. Priorities shift. Communicate changes proactively in GitHub Discussions.
