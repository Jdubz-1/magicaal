# CLI (`@magicaal/cli`)

`packages/cli` ships the `magicaal` binary for working with [Graph-as-Code](../developer-guide/graph-as-code.md) agents (`*.agent.ts` files under `agents/`). Run it via `devbox run magicaal` (root `devbox.json` maps this to `node packages/cli/dist/index.js`) or, from source, `pnpm --filter @magicaal/cli run build` then invoke the built binary.

## Commands (`packages/cli/src/commands/`)

| Command | Purpose |
|---|---|
| `build` | Compiles `*.agent.ts` files (via `@magicaal/compiler`) into `AgentGraphDefinition` JSON, writing a content-hashed manifest — this is the output `AGENTS_DIR` boot-time sync consumes |
| `validate` | Compiles every `*.agent.ts` under an agents directory and reports `CompileError`s without writing output — used in CI to catch broken agent definitions before merge |
| `generate` | Generates JSON Schema for an agent's input/output from its compiled definition |
| `list` | Lists agents found under an agents directory, reading `AgentGraph`/`AgentMeta` decorator metadata via `reflect-metadata` |
| `sessions migrate --agent <handle>` | Runs a session schema migration for a given agent against a live API (`--api-url`, `--token`) |

## Typical Flow

```bash
magicaal validate ./agents        # fail fast on compile errors
magicaal build ./agents --out ./dist/agents
magicaal generate ./agents         # emit input/output JSON Schemas
```

The `build` output directory is what gets mounted at `AGENTS_DIR` in `apps/api` for boot-time sync — see [DEVELOPMENT.md](../../DEVELOPMENT.md) and [docs/reference/README.md](README.md#appsapi-port-3000).
