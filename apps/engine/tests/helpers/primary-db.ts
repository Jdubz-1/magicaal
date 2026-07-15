import * as crypto from 'node:crypto';
import * as fs from 'node:fs';
import * as os from 'node:os';
import * as path from 'node:path';
import Database from 'better-sqlite3';

/**
 * The primary DB schema the engine reads is owned by apps/api's Drizzle
 * migrations — the engine only ever gets a read-only connection to a DB the
 * API created and migrated. Running those same migration files here means a
 * schema change on the API side (column rename, type change) breaks engine
 * route tests immediately, instead of silently drifting until it breaks in
 * production. See tests/route/README-equivalent context in the route test plan.
 */
const MIGRATIONS_DIR = path.join(__dirname, '../../../api/drizzle/migrations');

interface JournalEntry {
  tag: string;
}

/** Build a fresh primary DB file from apps/api's real migration SQL, in WAL mode. */
export function createPrimaryDb(): string {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'magicaal-engine-route-'));
  const dbFile = path.join(dir, 'primary.db');

  const db = new Database(dbFile);
  const journal = JSON.parse(
    fs.readFileSync(path.join(MIGRATIONS_DIR, 'meta/_journal.json'), 'utf8'),
  ) as { entries: JournalEntry[] };

  for (const entry of journal.entries) {
    const sql = fs.readFileSync(path.join(MIGRATIONS_DIR, `${entry.tag}.sql`), 'utf8');
    for (const statement of sql.split('--> statement-breakpoint')) {
      const trimmed = statement.trim();
      if (trimmed) db.exec(trimmed);
    }
  }

  // The engine's read-only connections assert WAL rather than set it — only a
  // writable connection can flip the mode, and it must happen before any
  // engine module opens its own readonly handle (in production the API does
  // this at boot).
  db.pragma('journal_mode = WAL');
  db.close();

  return dbFile;
}

function nowSeconds(): number {
  return Math.floor(Date.now() / 1000);
}

export interface SeedAgentOptions {
  id?: string;
  tenantId?: string;
  handle?: string;
  status?: 'draft' | 'active' | 'archived';
  enabled?: boolean;
}

export function seedTenant(db: Database.Database, id: string, name = id): void {
  const now = nowSeconds() * 1000;
  db.prepare(
    `INSERT OR IGNORE INTO tenants (id, name, slug, enabled, created_at, updated_at)
     VALUES (?, ?, ?, 1, ?, ?)`,
  ).run(id, name, id, now, now);
}

/** Seed an agent row; ensures its owning tenant exists first. */
export function seedAgent(db: Database.Database, opts: SeedAgentOptions = {}): string {
  const id = opts.id ?? `agent_${crypto.randomUUID()}`;
  const tenantId = opts.tenantId ?? 'tenant-1';
  seedTenant(db, tenantId);

  const now = Date.now();
  db.prepare(
    `INSERT INTO agents
       (id, tenant_id, name, handle, current_version_id, status, authoring_mode, stale, enabled, created_at, updated_at)
     VALUES (?, ?, ?, ?, NULL, ?, 'studio', 0, ?, ?, ?)`,
  ).run(
    id,
    tenantId,
    opts.handle ?? id,
    opts.handle ?? id,
    opts.status ?? 'active',
    opts.enabled === false ? 0 : 1,
    now,
    now,
  );
  return id;
}

/** Seed a published version for an agent and point agents.current_version_id at it. */
export function seedAgentVersion(
  db: Database.Database,
  agentId: string,
  graph: Record<string, unknown>,
): string {
  const id = `ver_${crypto.randomUUID()}`;
  const now = Date.now();
  db.prepare(
    `INSERT INTO agent_versions (id, agent_id, version_number, graph_json, content_hash, created_by, created_at)
     VALUES (?, ?, 1, ?, '', 'seed', ?)`,
  ).run(id, agentId, JSON.stringify(graph), now);
  db.prepare(`UPDATE agents SET current_version_id = ? WHERE id = ?`).run(id, agentId);
  return id;
}

export interface SeedInvocationKeyOptions {
  agentId: string;
  tenantId?: string;
  revoked?: boolean;
  expiresAt?: number | null;
}

/** Returns the raw (pre-hash) key alongside its row id. */
export function seedInvocationKey(
  db: Database.Database,
  opts: SeedInvocationKeyOptions,
): { id: string; rawKey: string } {
  const id = `ik_${crypto.randomUUID()}`;
  const rawKey = `ik_${crypto.randomBytes(16).toString('hex')}`;
  const keyHash = crypto.createHash('sha256').update(rawKey).digest('hex');
  db.prepare(
    `INSERT INTO invocation_keys (id, agent_id, tenant_id, label, key_hash, expires_at, revoked, created_at)
     VALUES (?, ?, ?, 'test key', ?, ?, ?, ?)`,
  ).run(
    id,
    opts.agentId,
    opts.tenantId ?? 'tenant-1',
    keyHash,
    opts.expiresAt ?? null,
    opts.revoked ? 1 : 0,
    Date.now(),
  );
  return { id, rawKey };
}

export function seedInvocationPolicy(
  db: Database.Database,
  agentId: string,
  strategy: 'api-key' | 'jwt' | 'public',
  jwtConfig?: object,
): void {
  db.prepare(
    `INSERT INTO invocation_policies (agent_id, strategy, jwt_config) VALUES (?, ?, ?)`,
  ).run(agentId, strategy, jwtConfig ? JSON.stringify(jwtConfig) : null);
}

export interface SeedInstalledPackageOptions {
  tenantId: string;
  publisher: string;
  name: string;
  version?: string;
  enabled?: boolean;
  licenseStatus?: 'active' | 'grace' | 'expired';
}

/** Entitles a tenant to a package via package_registry + asset_licenses. */
export function seedInstalledPackage(db: Database.Database, opts: SeedInstalledPackageOptions): string {
  seedTenant(db, opts.tenantId);
  const id = `pkg_${crypto.randomUUID()}`;
  db.prepare(
    `INSERT INTO package_registry (id, tenant_id, name, version, publisher, package_type, manifest_json, installed_at, enabled)
     VALUES (?, ?, ?, ?, ?, 'nodes', '{}', ?, ?)`,
  ).run(
    id,
    opts.tenantId,
    opts.name,
    opts.version ?? '1.0.0',
    opts.publisher,
    Date.now(),
    opts.enabled === false ? 0 : 1,
  );
  db.prepare(
    `INSERT INTO asset_licenses (id, package_id, license_type, status) VALUES (?, ?, 'standard', ?)`,
  ).run(`lic_${crypto.randomUUID()}`, id, opts.licenseStatus ?? 'active');
  return id;
}
