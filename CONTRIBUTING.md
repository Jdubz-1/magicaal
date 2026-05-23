# Contributing

Welcome! This is a TypeScript/Express monorepo. Before contributing, read this guide and the [Developer Guide](docs/developer-guide/README.md) to understand the architecture and conventions.

## Complete Developer Resources

| Guide | Description |
|---|---|
| [Architecture](docs/developer-guide/architecture/README.md) | Request lifecycle, layer responsibilities |
| [API Documentation](docs/developer-guide/api/README.md) | Endpoint reference |
| [Contributing Workflow](docs/developer-guide/contributing/README.md) | PR process, branch naming, review checklist |
| [Code Standards](docs/developer-guide/contributing/code-standards.md) | TypeScript rules, naming, file structure |

## Quick Start for Contributors

### First-Time Contributors
1. **[Read the Architecture](docs/developer-guide/architecture/README.md)** — understand the request lifecycle and layer responsibilities
2. **[Set Up Development](docs/getting-started/installation.md)** — get your environment running
3. **[Follow the Contributing Workflow](docs/developer-guide/contributing/README.md)** — branch, PR, review process
4. **[Browse open issues](https://github.com/your-org/your-repo/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22)** — find something to work on

### Experienced Contributors
- **[DEVELOPMENT.md](DEVELOPMENT.md)** — quick reference for local setup and common tasks
- **[Code Standards](docs/developer-guide/contributing/code-standards.md)** — TypeScript and style rules
- **[Open issues](https://github.com/your-org/your-repo/issues)** — current work

## Ways to Contribute

| Type | Description | Get Started |
|---|---|---|
| **Bug Reports** | Help find and fix issues | [Report a Bug](https://github.com/your-org/your-repo/issues/new) |
| **Feature Requests** | Suggest new functionality | [Request a Feature](https://github.com/your-org/your-repo/issues/new) |
| **Code Contributions** | Fix bugs, add features | [Contributing Workflow](docs/developer-guide/contributing/README.md) |
| **Documentation** | Improve guides and examples | [docs/](docs/) |
| **Tests** | Increase coverage | [Testing Guide](docs/developer-guide/contributing/README.md) |

## Development Quick Start

```bash
# Clone
git clone https://github.com/your-org/your-repo.git
cd your-repo

# Install Devbox if not already installed (run "devbox version" to check first)
devbox version || curl -fsSL https://get.jetify.com/devbox | bash

# Enter devbox shell — Node.js 22 LTS activates and npm deps install automatically
devbox shell

# Configure environment
cp apps/api-service/.env.example apps/api-service/.env
# Edit apps/api-service/.env with your values

# Start with hot reload
devbox run dev

# Verify
curl http://localhost:3000/health
# → {"status":"OK","timestamp":"..."}
```

**Important**: Always run `npm install` (or `devbox run setup`) from the **monorepo root**. Running it inside a workspace breaks the symlinks for `@workspace/*` packages.

If you add or remove packages from `devbox.json`, commit both `devbox.json` and `devbox.lock` — the lock file pins the exact Node.js binary for all contributors.

## Architecture Overview

```
Client → Express → middleware chain → router → controller → response
```

All service code lives in `apps/api-service/src/`:

| Layer | File(s) | Responsibility |
|---|---|---|
| Entry | `src/index.ts` | Creates app, binds port |
| App factory | `src/app.ts` | Registers middleware and routes |
| Config | `src/config.ts` | Reads env vars; throws on missing required vars |
| Middleware | `src/middleware/` | Cross-cutting concerns (logging, errors, 404) |
| Routes | `src/routes/` | URL-to-handler mapping |
| Controllers | `src/controllers/` | Request handling logic |
| Lib | `src/lib/` | Shared utilities (logger, etc.) |

Shared types across apps live in `packages/types/` (`@workspace/types`).

## Before You Start

1. **Check existing issues** to avoid duplicate work
2. **Understand the config pattern** — all env vars go through `src/config.ts`, never accessed as bare `process.env` calls in business logic
3. **Understand error handling** — throw errors and let `errorHandler.ts` catch them; don't send responses from multiple places
4. **Run the full check locally** before pushing (inside devbox shell): `devbox run lint && devbox run type-check && devbox run test`

## Code Standards

- **TypeScript strict mode** — `strict: true`, no `any` unless unavoidable and commented
- **No bare `process.env`** — always use `config` from `src/config.ts`
- **Error boundary** — errors propagate to `errorHandler`; controllers do not call `res.status().json()` in catch blocks
- **Test coverage threshold** — 80% lines/branches/functions enforced by Jest; new code must be tested
- **Prettier + ESLint** — run `npm run lint:fix:api-service && npm run format` before committing

## Commit Standards

This project uses [Conventional Commits](https://www.conventionalcommits.org/):

**Format:** `<type>(<scope>): <subject>`

**Types:** `feat`, `fix`, `refactor`, `test`, `docs`, `ci`, `chore`

**Scopes:** `api-service`, `types`, `core`, `routes`, `middleware`, `config`, `tests`, `docs`, `ci`, `docker`

```bash
# New feature or endpoint
git commit -m "feat(api-service): add users CRUD endpoints"

# Bug fix
git commit -m "fix(api-service): correctly propagate status code in errorHandler"

# Shared types
git commit -m "feat(types): add UserPayload shared interface"

# Tests
git commit -m "test(api-service): add integration tests for users endpoints"

# Documentation
git commit -m "docs(developer-guide): add architecture diagram"

# CI/infrastructure
git commit -m "ci(docker): reduce runtime image size with multi-stage optimisation"
```

## Common Development Tasks

### Adding a New Endpoint
1. Create `apps/api-service/src/routes/<name>.ts` — define routes with `express.Router()`
2. Create `apps/api-service/src/controllers/<name>.controller.ts` — implement handlers
3. Register in `apps/api-service/src/routes/index.ts`: `router.use('/<name>', <name>Router)`
4. Add integration tests in `apps/api-service/tests/integration/<name>.test.ts`

### Adding a New Middleware
1. Create `apps/api-service/src/middleware/<name>.ts`
2. Register in `apps/api-service/src/app.ts` in the correct position in the chain

### Adding a Config Variable
1. Add to `apps/api-service/.env.example` with a safe default and a comment
2. Add to `apps/api-service/src/config.ts` — use `requireEnv('VAR')` for required vars
3. Update `docs/reference/README.md` env var table

### Adding a Shared Type
1. Add the interface to `packages/types/src/index.ts`
2. Import in consuming apps with `import type { ... } from '@workspace/types'`

## Getting Help

- **Architecture questions**: [Architecture Guide](docs/developer-guide/architecture/README.md)
- **API questions**: [API Documentation](docs/developer-guide/api/README.md)
- **Bug reports**: [GitHub Issues](https://github.com/your-org/your-repo/issues)

---

**Ready to contribute?**

1. New to the project? Start with **[Getting Started →](docs/getting-started/README.md)**
2. Ready to code? Follow the **[Contributing Workflow →](docs/developer-guide/contributing/README.md)**
3. Docs to improve? See the **[docs/ directory →](docs/)**
