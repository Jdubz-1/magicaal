# Contributing Workflow

For the full contributor guide (DCO, dev environment, coding standards, monorepo layout) see **[CONTRIBUTING.md](../../../CONTRIBUTING.md)**. This page covers the day-to-day PR workflow.

## Developer Certificate of Origin (DCO)

Every commit must carry a `Signed-off-by` trailer — add `-s` when committing:

```bash
git commit -s -m "fix(api): correctly propagate status code in errorHandler"
```

A DCO bot checks every PR commit automatically and blocks the PR if any commit is missing the trailer. If it flags one, amend it (`git commit --amend -s`) and force-push your branch — the bot re-checks and clears the block. See [CONTRIBUTING.md — DCO](../../../CONTRIBUTING.md#developer-certificate-of-origin-dco) for details.

## Branch Naming & Strategy

MagiCaal uses a two-branch flow: `DEV-main` → `main`. **All feature and fix branches target `DEV-main`, never `main` directly** — `main` only receives code that's ready to release and is tagged on every merge.

```
feat/<scope>/<description>      — new feature
fix/<scope>/<description>       — bug fix
refactor/<scope>/<description>  — code change with no behaviour change
docs/<description>              — documentation only
ci/<description>                — CI/CD or infrastructure
```

`<scope>` matches a conventional commit scope (`api`, `engine`, `web`, `nodes`, etc. — see [CONTRIBUTING.md — Commit Standards](../../../CONTRIBUTING.md#commit-standards) for the full list).

See [CONTRIBUTING.md — Branch Strategy](../../../CONTRIBUTING.md#branch-strategy) for the full flow, including `hotfix/*` and how `DEV-main` promotes to `main`.

## PR Process

1. Branch from `DEV-main`
2. Make your changes — keep PRs focused on one concern; commit with `git commit -s`
3. Run the full local check:
   ```bash
   devbox run lint && devbox run type-check && devbox run test
   ```
   For `apps/engine` or `apps/web`, substitute `devbox run -- pnpm --filter @magicaal/<app> run <script>`.
4. Add a `CHANGELOG.md` entry if the change is user-visible
5. If this is significant work (new feature, refactor, critical bug fix, infra/security change), add a `DEVLOG.md` entry — see [CLAUDE.md — Development Tracking](../../../CLAUDE.md#development-tracking)
6. Push and open a PR against `DEV-main`
7. Address review feedback; the DCO bot auto-clears once every commit is signed off

## PR Checklist

- [ ] Every commit has a DCO `Signed-off-by` trailer (`git commit -s`)
- [ ] `devbox run lint` passes
- [ ] `devbox run type-check` passes
- [ ] `devbox run test` passes and coverage stays ≥ 80%
- [ ] New code has corresponding tests
- [ ] New env vars are added to the relevant `.env.example` and to `docs/reference/README.md`
- [ ] New/changed API routes are reflected in `apps/api/src/openapi/spec.ts`
- [ ] `DEVLOG.md` updated if this is a significant change
- [ ] Commit messages follow Conventional Commits format

## Commit Standards

See [CONTRIBUTING.md — Commit Standards](../../../CONTRIBUTING.md#commit-standards) for the full format and scope list.

## RFC Process

Some changes require a design note before implementation — see **[RFC Process](rfc-process.md)**.

## Code Review Guidelines

**Reviewers:**
- Focus on correctness, security, and architectural fit — not style (Prettier handles that)
- Approve if the change is correct and tested, even if you'd have done it differently

**Authors:**
- Respond to every comment — either fix it or explain why not
- Don't take review feedback personally; the goal is a better codebase

The BDFL reviews and merges; typical response time is 1–3 business days. See [GOVERNANCE.md](../../../GOVERNANCE.md) for merge authority details.
