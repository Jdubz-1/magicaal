# Contributing Workflow

## Branch Naming

```
feat/<short-description>      — new feature
fix/<short-description>       — bug fix
refactor/<short-description>  — code change with no behaviour change
docs/<short-description>      — documentation only
ci/<short-description>        — CI/CD or infrastructure
```

## PR Process

1. Branch from `main`
2. Make your changes — keep PRs focused on one concern
3. Run the full local check:
   ```bash
   npm run lint && npm run type-check && npm test
   ```
4. Push and open a PR against `main`
5. Address review feedback; squash fixup commits before merge

## PR Checklist

- [ ] `npm run lint` passes
- [ ] `npm run type-check` passes
- [ ] `npm test` passes and coverage stays ≥ 80%
- [ ] New code has corresponding tests
- [ ] New env vars are documented in `.env.example` and `docs/reference/README.md`
- [ ] DEVLOG.md updated if this is a significant change
- [ ] Commit messages follow Conventional Commits format

## Commit Standards

See [CONTRIBUTING.md — Commit Standards](../../../CONTRIBUTING.md#commit-standards) for the full format and scope list.

## Code Review Guidelines

**Reviewers:**
- Focus on correctness, security, and architectural fit — not style (Prettier handles that)
- Approve if the change is correct and tested, even if you'd have done it differently

**Authors:**
- Respond to every comment — either fix it or explain why not
- Don't take review feedback personally; the goal is a better codebase
