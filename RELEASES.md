# MagiCaal — Release & Branch Management

This document covers the full branching model, day-to-day development flow, release process, and hotfix procedure. The short version is in [`CONTRIBUTING.md → Branch Strategy`](CONTRIBUTING.md#branch-strategy).

---

## Branch Overview

```
main          ──────────────────────────────────────────── production; tagged releases only
               ↑ PR when QA passes                ↑ hotfix PR (rare)
qa            ──────────────────────────────────────────── pre-release validation
               ↑ PR when feature-complete
DEV-main      ──────────────────────────────────────────── primary integration branch
               ↑ ↑ ↑ PRs from feature/fix branches
feat/api/...
feat/engine/...
fix/web/...
```

| Branch | Protected | Who merges to it | Purpose |
|---|---|---|---|
| `main` | Yes | BDFL only, from `qa` or `hotfix/*` | Stable, production-ready code; every merge is tagged |
| `qa` | Yes | BDFL only, from `DEV-main` | Pre-release validation; RC tags cut from here |
| `DEV-main` | Yes | PRs from feature/fix branches; BDFL direct-push for trivial fixes | Primary development integration |
| `feat/*` | No | PR to `DEV-main` | New features |
| `fix/*` | No | PR to `DEV-main` | Bug fixes |
| `hotfix/*` | No | PR directly to `main` | Emergency production patches (rare) |

OSS contributor PRs always target **`DEV-main`**, never `qa` or `main`.

---

## Branch Naming

```bash
feat/<scope>/<short-description>     # New feature
fix/<scope>/<short-description>      # Bug fix
hotfix/<short-description>           # Emergency patch off main
chore/<short-description>            # Tooling, deps, docs

# Examples:
feat/api/session-expiry-endpoint
feat/engine/headroom-compressor
fix/web/canvas-edge-render
fix/nodes/react-loop-termination
hotfix/auth-bypass-cve-2026-xxxx
chore/devbox/upgrade-node-22-lts
```

`<scope>` matches conventional commit scopes: `api`, `engine`, `web`, `core`, `sdk`, `nodes`, `integrations`, `caal`, `compiler`, `cli`, `middleware`, `config`, `tests`, `docs`, `ci`, `docker`, `devbox`.

---

## Day-to-Day Development Flow

```
1. Branch off DEV-main
   git checkout DEV-main && git pull
   git checkout -b feat/engine/headroom-compressor

2. Develop, commit with conventional commits
   feat(engine): add HeadroomCompressor service
   feat(nodes): add core:compression-config node
   test(engine): add compression integration tests

3. Open a PR targeting DEV-main
   gh pr create --base DEV-main --title "feat(engine): HeadroomCompressor"

4. CI runs on the PR (lint, typecheck, test, build)

5. BDFL reviews and merges to DEV-main
```

For trivial fixes (typos, single-line config change, doc update), the BDFL may commit directly to `DEV-main` without a PR. All external contributor work must go through a PR.

---

## Release Flow (Phase-Milestone Driven)

Releases are cut when a roadmap phase (or significant sub-milestone within a phase) is complete. There is no fixed time cadence — the trigger is "this phase is done and tested."

### Step 1 — Feature freeze on DEV-main

When a phase is feature-complete:
- Announce on Discord `#contributors` that `DEV-main` is in feature freeze
- No new feature PRs merge to `DEV-main` until the release is out
- Bug fixes targeting the release may still merge during freeze

### Step 2 — Promote DEV-main → qa

```bash
git checkout qa
git pull
git merge --no-ff DEV-main -m "chore(release): promote DEV-main to qa for v0.X.0"
git push
```

### Step 3 — Cut a Release Candidate (optional, for larger releases)

For significant releases (new phase, major feature), cut an RC tag from `qa`:

```bash
git tag v0.6.0-rc.1
git push origin v0.6.0-rc.1
```

This triggers `release.yml` — Docker images are pushed (`ghcr.io/magicaal/api:v0.6.0-rc.1`), npm packages are published with the `next` tag, and a **pre-release** GitHub Release is created. The pre-release flag is set automatically because the tag contains a hyphen.

Run the RC on a staging deployment. Fix any issues on `qa` directly (or via short-lived `fix/*` branches off `qa`), back-merge fixes to `DEV-main`, and cut additional RCs as needed (`-rc.2`, `-rc.3`).

For small patch releases, skip the RC.

### Step 4 — Promote qa → main

When validation passes:

```bash
git checkout main
git pull
git merge --no-ff qa -m "chore(release): promote qa to main for v0.X.0"
git push
```

### Step 5 — Cut the release tag

```bash
git tag v0.6.0
git push origin v0.6.0
```

`release.yml` runs automatically:
1. **Docker job** — builds and pushes `ghcr.io/magicaal/{api,engine,web}:v0.6.0` and `:latest` (non-prerelease tags only)
2. **npm-publish job** — publishes `@magicaal/sdk`, `@magicaal/compiler`, `@magicaal/cli` to npm
3. **github-release job** — creates a GitHub Release; body is extracted from `CHANGELOG.md` for this version

### Step 6 — Post-release

```bash
# Back-merge main into DEV-main to pick up any release-only commits
git checkout DEV-main
git merge --no-ff main -m "chore(release): back-merge main into DEV-main post-v0.X.0"
git push

# Lift the feature freeze
# Announce the release on Discord #announcements (the GitHub release bot handles this automatically)
```

Add a `DEVLOG.md` entry and commit it as `docs(devlog): vX.Y.Z release`.

---

## Versioning

MagiCaal uses [Semantic Versioning](https://semver.org) (`MAJOR.MINOR.PATCH`).

| Version bump | When |
|---|---|
| `MINOR` (`v0.X.0`) | Phase completion or significant feature milestone |
| `PATCH` (`v0.X.Y`) | Bug fixes, security patches, small improvements within a phase |
| `MAJOR` (`v1.0.0`) | First GA release (breaking changes + stability commitment) |

**Pre-releases:** append `-rc.N` for release candidates (e.g., `v0.6.0-rc.1`). The `release.yml` workflow automatically marks these as GitHub pre-releases. Pre-release npm packages are published with `--tag next` so `npm install @magicaal/sdk` doesn't pull them by default.

Until `v1.0.0`, minor versions (`v0.X.0`) may include breaking changes between phases. Breaking changes within a phase are avoided but not guaranteed. Post-`v1.0.0`, breaking changes require a major bump.

---

## Hotfix Flow (Emergency Production Patches)

Use this only for critical issues in production that cannot wait for the normal `DEV-main → qa → main` cycle (e.g., security vulnerability, data-loss bug).

```bash
# 1. Branch off main (NOT DEV-main)
git checkout main && git pull
git checkout -b hotfix/auth-bypass-cve-2026-xxxx

# 2. Fix, test locally
# Small fix — the change must be minimal and targeted
git commit -m "fix(api): patch invocation auth bypass (CVE-2026-XXXX)"

# 3. PR directly to main
gh pr create --base main --title "fix(api): critical auth bypass hotfix"
# BDFL reviews and merges

# 4. Tag a patch release from main
git checkout main && git pull
git tag v0.5.1
git push origin v0.5.1

# 5. Back-merge to qa and DEV-main
git checkout qa
git merge --no-ff main -m "chore(hotfix): back-merge v0.5.1 hotfix into qa"
git push

git checkout DEV-main
git merge --no-ff main -m "chore(hotfix): back-merge v0.5.1 hotfix into DEV-main"
git push
```

If the hotfix is a security vulnerability, coordinate with `security@magicaal.dev` and follow the [SECURITY.md](SECURITY.md) disclosure timeline before tagging.

---

## What Triggers CI/CD

| Event | Workflow | What runs |
|---|---|---|
| PR to any branch | `ci.yml` | lint, typecheck, test, build |
| Push to `DEV-main` | `ci.yml` | lint, typecheck, test, build |
| Push to `qa` | `ci.yml` | lint, typecheck, test, build |
| Push to `main` | `ci.yml` | lint, typecheck, test, build |
| Tag `v*.*.*` | `release.yml` | Docker build+push, npm publish, GitHub Release |
| Push to `main` or PR to `main` | `codeql.yml` | SAST scan |
| Schedule (Mon 08:00 UTC) | `codeql.yml` | Weekly SAST scan |

---

## Branch Protection Summary

Configure in GitHub → Settings → Branches:

| Branch | Require PR | Required checks | Allow force push | Allow direct push |
|---|---|---|---|---|
| `main` | Yes (≥1 review) | CI pass | No | No |
| `qa` | Yes (≥1 review) | CI pass | No | No |
| `DEV-main` | Yes for external contributors; BDFL may push directly | CI pass on PRs | No | BDFL only |

---

## CHANGELOG Maintenance

Every user-visible change gets a `CHANGELOG.md` entry. The format follows [Keep a Changelog](https://keepachangelog.com/).

- Add entries as you work — don't batch them at release time
- Group under `## [Unreleased]` during development
- At release time, rename `[Unreleased]` to `[X.Y.Z] — YYYY-MM-DD`
- The `github-release` job in `release.yml` extracts this section automatically for the GitHub Release body

```markdown
## [Unreleased]

### Added
- core:compression-config node for per-agent compression policy

### Fixed
- Engine: correctly resume suspended runs after redis restart
```
