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

### RFC Lifecycle (self-serve)

RFCs are a **self-serve design-note practice, not a gated multi-day process** — there is currently one maintainer, so there is no second reviewer to wait on:

1. Author opens a PR adding `rfcs/NNNN-short-title.md` using the template at `rfcs/0000-template.md`
2. Anyone may comment on the PR — there is no mandatory discussion window
3. The BDFL merges (accepts) or closes (rejects/withdraws) the RFC whenever ready, stating the decision explicitly in the PR
4. Accepted RFCs are merged to `main`; rejected or withdrawn RFCs are closed but preserved in the PR history

The `rfcs/` directory lives at the monorepo root. The RFC template is at `rfcs/0000-template.md`.

**Once a second maintainer is active, or a pattern of substantive external RFC comments emerges,** a fixed discussion window and Final Comment Period return. The trigger list of what requires an RFC doesn't change — only the review cadence around it.

---

## Core Maintainers

The BDFL may designate **Core Maintainers** — individuals with merge authority on specific packages or subsystems — once there's someone to designate. The mechanism is fully documented and ready to use:

- **Granted** by the BDFL based on demonstrated contribution history and judgment
- **Documented** in `MAINTAINERS.md` with the assigned subsystem and GitHub handle
- **Revocable** by the BDFL with 30 days notice and a documented reason; 6 months of inactivity results in Emeritus status

There is currently no Core Maintainer roster — see `MAINTAINERS.md`. Security-sensitive changes (auth, cryptography, invocation auth, tenant isolation, credential injection) require BDFL review regardless of CODEOWNERS subsystem assignments, both now and once Core Maintainers exist.

Automatic review routing: `.github/CODEOWNERS`

---

## Governance Documents

| File | Contents |
|---|---|
| `GOVERNANCE.md` (this file) | BDFL identity, RFC process, Core Maintainer process |
| `MAINTAINERS.md` | Current Core Maintainer roster with subsystems |
| `CODE_OF_CONDUCT.md` | Contributor Covenant v2.1; enforcement contact |
| `CONTRIBUTING.md` | How to contribute, DCO requirement, coding standards, PR process |
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
