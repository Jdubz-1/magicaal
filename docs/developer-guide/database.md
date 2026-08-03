# Database & Migrations

## Two Databases

- **Primary DB** — SQLite (WAL mode), `apps/api/src/db/schema/`, shared by `apps/api` and `apps/engine` over a mounted volume (`DATABASE_URL`, default `file:/data/magicaal.db`). Schema modules: `agents`, `auth` (users/tenants/roles), `integrations`, `invocation`, `marketplace`, `mcp`, `platform`, `prompt-test`, `sessions`, `workspace`.
- **Telemetry Store** — a separate SQLite file (`TELEMETRY_DATABASE_URL`) owned by `apps/engine` (`apps/engine/src/db/telemetry-schema.ts`), so high-volume run/step/token telemetry writes don't contend with the primary DB. `telemetry-retention.ts` sweeps rows older than `TELEMETRY_RETENTION_DAYS` (default 90).

Both use [Drizzle ORM](https://orm.drizzle.team/). All access goes through the Drizzle client — never raw SQL outside migration files:

```typescript
// ✅ Correct
import { db } from '@/db/client';
import { agents } from '@/db/schema';
const rows = await db.select().from(agents).where(eq(agents.tenantId, tenantId));

// ❌ Never — raw SQL outside migrations
sqlite.prepare('SELECT * FROM agents').all();
```

## Migration Workflow

1. Edit schema files in `apps/api/src/db/schema/`
2. Generate the migration:
   ```bash
   devbox run -- pnpm --filter @magicaal/api exec drizzle-kit generate
   ```
3. Commit both the schema change and the generated migration file together

Migrations in `apps/api/drizzle/migrations/` run automatically at API startup, before `app.listen()` — there is no separate manual migration step in normal operation. `db:migrate`/`seed` scripts exist for one-off/local use.
