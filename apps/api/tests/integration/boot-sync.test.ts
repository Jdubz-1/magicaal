import { mkdtempSync, writeFileSync, rmSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { eq } from 'drizzle-orm';
import { runMigrations } from '../../src/db/migrate';
import { db } from '../../src/db/client';
import { agents, agentConfig, agentVersions } from '../../src/db/schema';
import { bootTimeSync, resolveOverrideMap } from '../../src/sync/boot-sync';
import { ensurePlatformTenant } from '../../src/platform/bootstrap';

const HANDLE = 'sync-test-agent';

function writeAgentFiles(
  dir: string,
  definition: Record<string, unknown>,
): void {
  writeFileSync(join(dir, `${HANDLE}.agent.json`), JSON.stringify(definition), 'utf8');
  writeFileSync(
    join(dir, 'agents.manifest.json'),
    JSON.stringify({ agents: [{ handle: HANDLE, file: `${HANDLE}.agent.json`, hash: 'unused' }] }),
    'utf8',
  );
}

function definitionWith(
  trigger: Record<string, unknown>,
  concurrency: Record<string, unknown>,
  retry: Record<string, unknown>,
): Record<string, unknown> {
  return {
    version: '1.0',
    handle: HANDLE,
    name: 'Sync Test Agent',
    entry: 'start',
    nodes: {
      start: { id: 'start', type: 'core:start', config: {} },
      end: { id: 'end', type: 'core:end', config: {} },
    },
    edges: [{ id: 'e1', from: 'start', to: 'end', type: 'unconditional' }],
    toolEdges: [],
    workspaceEdges: [],
    config: { trigger, concurrency, retry },
    // trigger and retry stay locked (default); concurrency is admin-overridable
    overridable: { concurrency: true },
  };
}

describe('resolveOverrideMap', () => {
  it('defaults every field to locked when overridable is absent or false', () => {
    expect(resolveOverrideMap(undefined)).toEqual({ trigger: 'locked', concurrency: 'locked', retry: 'locked' });
    expect(resolveOverrideMap(false)).toEqual({ trigger: 'locked', concurrency: 'locked', retry: 'locked' });
  });

  it('opens every field when overridable is true', () => {
    expect(resolveOverrideMap(true)).toEqual({
      trigger: 'overridable',
      concurrency: 'overridable',
      retry: 'overridable',
    });
  });

  it('applies per-field flags with locked as the default', () => {
    expect(resolveOverrideMap({ concurrency: true })).toEqual({
      trigger: 'locked',
      concurrency: 'overridable',
      retry: 'locked',
    });
  });
});

describe('bootTimeSync — syncConfig override semantics (ALIGN-005)', () => {
  let agentsDir: string;

  beforeAll(async () => {
    await runMigrations();
    await ensurePlatformTenant();
    agentsDir = mkdtempSync(join(tmpdir(), 'magicaal-boot-sync-'));
  });

  afterAll(() => {
    rmSync(agentsDir, { recursive: true, force: true });
  });

  it('inserts a new code-defined agent with the derived override map', async () => {
    writeAgentFiles(
      agentsDir,
      definitionWith(
        { type: 'cron', expression: '0 * * * *' },
        { maxParallel: 5, queueTimeout: 30000 },
        { maxAttempts: 1, backoff: 'fixed', delayMs: 0 },
      ),
    );

    const result = await bootTimeSync(agentsDir);
    expect(result.inserted).toBe(1);
    expect(result.errors).toEqual([]);

    const agentRow = (await db.select().from(agents).where(eq(agents.handle, HANDLE)))[0]!;
    const cfg = (await db.select().from(agentConfig).where(eq(agentConfig.agentId, agentRow.id)))[0]!;
    expect(JSON.parse(cfg.overrideMap)).toEqual({
      trigger: 'locked',
      concurrency: 'overridable',
      retry: 'locked',
    });
  });

  it('locked fields take the code value; admin-set overridable fields are preserved', async () => {
    const agentRow = (await db.select().from(agents).where(eq(agents.handle, HANDLE)))[0]!;

    // Admin overrides the (overridable) concurrency setting
    const adminConcurrency = JSON.stringify({ maxParallel: 99, queueTimeout: 1000 });
    await db
      .update(agentConfig)
      .set({ concurrency: adminConcurrency })
      .where(eq(agentConfig.agentId, agentRow.id));

    // Redeploy with every config field changed in code
    writeAgentFiles(
      agentsDir,
      definitionWith(
        { type: 'cron', expression: '30 * * * *' },
        { maxParallel: 10, queueTimeout: 60000 },
        { maxAttempts: 3, backoff: 'exponential', delayMs: 500 },
      ),
    );

    const result = await bootTimeSync(agentsDir);
    expect(result.updated).toBe(1);
    expect(result.errors).toEqual([]);

    const cfg = (await db.select().from(agentConfig).where(eq(agentConfig.agentId, agentRow.id)))[0]!;
    // Locked fields sync from code
    expect(JSON.parse(cfg.triggerConfig)).toEqual({ type: 'cron', expression: '30 * * * *' });
    expect(JSON.parse(cfg.retry)).toEqual({ maxAttempts: 3, backoff: 'exponential', delayMs: 500 });
    // Admin-set overridable field survives the redeploy
    expect(JSON.parse(cfg.concurrency)).toEqual({ maxParallel: 99, queueTimeout: 1000 });

    // A new version was cut for the changed definition
    const versions = await db.select().from(agentVersions).where(eq(agentVersions.agentId, agentRow.id));
    expect(versions).toHaveLength(2);
  });
});
