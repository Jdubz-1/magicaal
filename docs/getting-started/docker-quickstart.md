# Docker Quickstart

The fastest way to run MagiCaal — published Docker images, no build step. For contributing or running from source instead, see [Installation](installation.md).

## Prerequisites

- Docker and Docker Compose v2 (`docker compose version`)
- At least 2 GB RAM and 4 GB free disk space

## Setup

```bash
git clone https://github.com/magicaal/magicaal.git
cd magicaal/deploy
cp .env.example .env
```

Edit `.env` and set two required values — generate each with `openssl rand -hex 32`:
- `MAGICAAL_MASTER_KEY` — encrypts stored integration credentials. **Don't lose it**; losing it means losing access to all stored credentials.
- `JWT_SECRET` (in the `SHARED` section) — signs Studio session tokens.

Then start everything:

```bash
docker compose up -d
```

The first run pulls images and initializes the database — allow 30–60 seconds for health checks to pass.

## Open Studio

```
http://localhost:8080
```

Log in with the default admin credentials created during first-boot seed — check `docker compose logs api` if they aren't obvious from your terminal history.

## What's Running

Three services plus Redis, all defined in `deploy/docker-compose.yml`: `api` (:3000), `engine` (:4000), `web` (:8080), `redis`. See [`deploy/README.md`](../../deploy/README.md) for upgrade instructions, troubleshooting, and the full environment variable walkthrough (also covered by app in [docs/reference/README.md](../reference/README.md)).

## Next Steps

- **[Architecture Overview →](../developer-guide/architecture/README.md)**
- **[API Reference →](../developer-guide/api/README.md)**
