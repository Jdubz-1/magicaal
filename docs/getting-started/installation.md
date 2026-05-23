# Installation

## 1. Clone the Repository

```bash
git clone https://github.com/your-org/your-repo.git
cd your-repo
```

## 2. Install Dependencies

```bash
npm install
```

All dependencies (production and dev) are installed in one step from the project root.

## 3. Configure Environment

```bash
cp .env.example .env
```

Edit `.env` and fill in any required values. The full variable reference is in [docs/reference/README.md](../reference/README.md).

Minimum for local development:
```
PORT=3000
NODE_ENV=development
LOG_LEVEL=info
```

## 4. Start the Service

```bash
npm run dev
```

You should see log output like:
```json
{"level":"info","msg":"Server started","port":3000,"env":"development"}
```

## 5. Verify

```bash
curl http://localhost:3000/health
```

Expected response:
```json
{"status":"OK","timestamp":"2026-01-01T00:00:00.000Z"}
```

## Running the Test Suite

```bash
npm test
```

## Next Steps

- **[Architecture Overview →](../developer-guide/architecture/README.md)** — understand how the service is structured
- **[Adding a New Endpoint →](../developer-guide/contributing/README.md)** — start contributing
- **[DEVELOPMENT.md →](../../DEVELOPMENT.md)** — quick command reference
