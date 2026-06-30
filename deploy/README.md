# MagiCaal — Quick Deploy

Get MagiCaal running in 5 steps using the published Docker images (no build required).

## Prerequisites

- Docker and Docker Compose v2 (`docker compose version`)
- A machine with at least 2 GB RAM and 4 GB free disk space

## Setup

**1. Clone the repository and move to the deploy directory:**

```bash
git clone https://github.com/magicaal/magicaal.git
cd magicaal/deploy
```

**2. Copy the example environment file:**

```bash
cp .env.example .env
```

**3. Edit `.env` — two values are required:**

```bash
# Generate secure random values:
openssl rand -hex 32   # run twice — use the first value for MAGICAAL_MASTER_KEY
                       # and the second for both JWT_SECRET occurrences

# Then edit .env:
nano .env   # or vim, code, etc.
```

Set `MAGICAAL_MASTER_KEY` to a random 32-byte hex string. This encrypts stored integration credentials — **do not lose it**.

Set both `JWT_SECRET` values (in the API section and the WEB section) to the **same** random string.

**4. Start all services:**

```bash
docker compose up -d
```

The first run pulls images and initializes the database. Allow 30–60 seconds for all health checks to pass.

**5. Open the Studio:**

```
http://localhost:8080
```

Log in with the default admin credentials created during first-boot seed (check your terminal with `docker compose logs api` if the default credentials aren't obvious).

---

## Verify

```bash
# Check all services are healthy
docker compose ps

# Spot-check the API
curl http://localhost:3000/health

# Spot-check the engine
curl http://localhost:4000/health
```

## Stopping and Starting

```bash
docker compose down        # stop services (data is preserved in volumes)
docker compose down -v     # stop services AND delete all data (fresh start)
docker compose up -d       # start again
```

## Upgrading

```bash
docker compose pull        # pull latest images
docker compose up -d       # restart with new images (migrations run automatically)
```

## Next Steps

- **Full configuration reference:** [docs.magicaal.dev/operations/configuration](https://docs.magicaal.dev/operations/configuration)
- **Air-gapped Marketplace setup:** [docs.magicaal.dev/marketplace/air-gapped](https://docs.magicaal.dev/marketplace/air-gapped)
- **Connecting integrations:** [docs.magicaal.dev/integrations](https://docs.magicaal.dev/integrations)
- **Backup and restore:** [docs.magicaal.dev/operations/backup](https://docs.magicaal.dev/operations/backup)
- **Running behind a reverse proxy (HTTPS):** [docs.magicaal.dev/operations/reverse-proxy](https://docs.magicaal.dev/operations/reverse-proxy)

## Troubleshooting

**Services not starting:** `docker compose logs api` / `docker compose logs engine` — look for missing env var errors.

**`docker compose up` fails on image pull:** The images are hosted at `ghcr.io/magicaal/`. If you're in an air-gapped environment, pull the images on a connected machine and transfer them, or build from source using the root `docker-compose.yml`.

**Data persists across restarts:** volumes `magicaal_db` and `magicaal_redis` persist data between `docker compose down` and `docker compose up`. Use `docker compose down -v` to wipe all data.
