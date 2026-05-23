# [project-name]

[One-sentence description of what this service does and why it exists.]

## Quick Start

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
# Edit apps/api-service/.env — add your values

# Start with hot reload
devbox run dev

# Verify
curl http://localhost:3000/health
# → {"status":"OK","timestamp":"..."}
```

## What's in this repo

```
apps/
└── api-service/    # Express API service (TypeScript)

packages/
└── types/          # @workspace/types — shared TypeScript interfaces

docs/               # Developer and reference documentation
```

## Documentation

| Guide | Description |
|---|---|
| [Getting Started](docs/getting-started/README.md) | Prerequisites, installation, first run |
| [Developer Guide](docs/developer-guide/README.md) | Architecture, adding features, contributing |
| [API Reference](docs/developer-guide/api/README.md) | Endpoint documentation |
| [Reference](docs/reference/README.md) | Config variables, error codes, Docker |
| [DEVELOPMENT.md](DEVELOPMENT.md) | Local setup and common tasks |
| [CONTRIBUTING.md](CONTRIBUTING.md) | Contribution workflow and standards |
| [TECHSTACK.md](TECHSTACK.md) | Library inventory |
| [CLAUDE.md](CLAUDE.md) | AI dev guidance — architecture, patterns, pitfalls |

---

> **Template note**: Replace `[project-name]` and bracketed placeholders throughout this repo.
> Delete the `reference_docs/` directory before first use — it contains only template guidance material.
