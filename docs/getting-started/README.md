# Getting Started

Everything you need to go from zero to a running local instance of MagiCaal.

## Sections

| Guide | Description |
|---|---|
| [Docker Quickstart](docker-quickstart.md) | Fastest path — published images, no build, ready in a few minutes |
| [Installation](installation.md) | Building from source: prerequisites, clone, devbox setup, first run |

## Prerequisites (building from source)

- **[Devbox](https://www.jetify.com/devbox)** — pins Node.js 24 LTS and pnpm 9; installs and manages both for you. This is the only supported way to run Node/pnpm commands in this repo.
- **Git**

Optionally, for the Docker Compose paths (either quickstart or building images locally): **Docker** and **Docker Compose**.

Don't install Node.js or pnpm yourself — `devbox shell` pins and provides the exact versions this repo needs.

## What You'll Have After Setup

Three independently running services:

| Service | Port | Role |
|---|---|---|
| `apps/api` | 3000 | BFF: auth, agent CRUD, engine proxy, boot-time sync |
| `apps/engine` | 4000 | Graph execution runtime |
| `apps/web` | 8080 | Studio canvas editor + Admin panel |

Plus SQLite (via Drizzle) as the primary datastore and Redis (via BullMQ) for the job queue — both required even in local dev.

Continue to **[Docker Quickstart →](docker-quickstart.md)** for the fastest path, or **[Installation →](installation.md)** to build from source.
