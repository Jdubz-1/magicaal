# Installation (Building from Source)

If you just want to run MagiCaal, use the **[Docker Quickstart](docker-quickstart.md)** instead — it needs no build step. This page is for contributors and anyone who needs to run services from source with hot reload.

## 1. Install Devbox

```bash
devbox version || curl -fsSL https://get.jetify.com/devbox | bash
```

## 2. Clone the Repository

```bash
git clone https://github.com/magicaal/magicaal.git
cd magicaal
```

## 3. Enter the Dev Shell

```bash
devbox shell
```

This activates Node.js 24 LTS and pnpm 9, and automatically runs `pnpm install` from the monorepo root on first entry.

## 4. Configure Environment

Each app has its own env file — there is no single root `.env.example`:

```bash
cp apps/api/.env.example apps/api/.env
cp apps/engine/.env.example apps/engine/.env
cp apps/web/.env.example apps/web/.env
```

At minimum, set `MAGICAAL_MASTER_KEY` and `JWT_SECRET` in `apps/api/.env` and `apps/engine/.env` (generate each with `openssl rand -hex 32`; `JWT_SECRET` must match across `apps/api` and `apps/web`). The full variable reference is in [docs/reference/README.md](../reference/README.md).

You'll also need Redis reachable at `REDIS_URL` (default `redis://localhost:6379`) — run one locally (`docker run -p 6379:6379 redis`) or point it at an existing instance.

## 5. Start the Services

Each runs in its own terminal, all inside the devbox shell:

```bash
devbox run dev                                          # apps/api    :3000
devbox run -- pnpm --filter @magicaal/engine run dev     # apps/engine :4000
devbox run -- pnpm --filter @magicaal/web run dev        # apps/web    :8080
```

## 6. Verify

```bash
curl http://localhost:3000/health
curl http://localhost:4000/health
```

Open `http://localhost:8080` for the Studio UI.

## Running the Test Suite

```bash
devbox run test               # apps/api
devbox run -- pnpm --filter @magicaal/engine run test
devbox run -- pnpm --filter @magicaal/web run test
```

## Next Steps

- **[Architecture Overview →](../developer-guide/architecture/README.md)** — how the platform is structured
- **[Contributing →](../developer-guide/contributing/README.md)** — branch strategy, DCO, PR process
- **[DEVELOPMENT.md →](../../DEVELOPMENT.md)** — full command reference and common issues
