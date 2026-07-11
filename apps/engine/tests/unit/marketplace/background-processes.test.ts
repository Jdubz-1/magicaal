import Database from 'better-sqlite3';

jest.mock('@/lib/logger', () => ({
  logger: { info: jest.fn(), debug: jest.fn(), warn: jest.fn(), error: jest.fn() },
}));
jest.mock('@/db/telemetry-client', () => ({
  telemetryDb: {
    select: jest.fn().mockReturnValue({
      from: jest.fn().mockReturnValue({
        where: jest.fn().mockResolvedValue([{ id: 'run-1' }, { id: 'run-2' }]),
      }),
    }),
  },
}));

import { startLicenseValidator, licenseHeartbeatTick } from '@/marketplace/license-validator';
import { startUsageReporter, usageReportTick } from '@/marketplace/usage-reporter';

const originalFetch = global.fetch;

afterEach(() => {
  global.fetch = originalFetch;
  jest.clearAllMocks();
});

describe('MARKETPLACE_ENABLED gating', () => {
  it('license validator never starts when the flag is off', () => {
    // config.marketplaceEnabled is false under test env (MARKETPLACE_ENABLED unset)
    expect(startLicenseValidator()).toBeNull();
  });

  it('usage reporter never starts when the flag is off', () => {
    expect(startUsageReporter()).toBeNull();
  });
});

function makeLicenseDb(): Database.Database {
  const db = new Database(':memory:');
  db.exec(`
    CREATE TABLE asset_licenses (
      id TEXT PRIMARY KEY,
      package_id TEXT NOT NULL,
      license_type TEXT NOT NULL,
      expires_at INTEGER,
      last_validated_at INTEGER,
      grace_period_ends_at INTEGER,
      status TEXT NOT NULL DEFAULT 'active'
    );
  `);
  return db;
}

describe('licenseHeartbeatTick', () => {
  const NOW = 1_700_000_000_000;

  it('marks licenses active on a successful heartbeat', async () => {
    const db = makeLicenseDb();
    db.prepare(
      `INSERT INTO asset_licenses (id, package_id, license_type, status, grace_period_ends_at)
       VALUES ('lic-1', 'pkg-1', 'paid', 'grace', 123)`,
    ).run();

    global.fetch = jest.fn().mockResolvedValue(
      new Response(JSON.stringify({ results: [{ licenseId: 'lic-1', valid: true }] }), {
        status: 200,
      }),
    ) as typeof fetch;

    await licenseHeartbeatTick(db, NOW);

    const row = db.prepare(`SELECT * FROM asset_licenses WHERE id = 'lic-1'`).get() as {
      status: string;
      grace_period_ends_at: number | null;
    };
    expect(row.status).toBe('active');
    expect(row.grace_period_ends_at).toBeNull();
  });

  it('expires licenses the Marketplace revokes', async () => {
    const db = makeLicenseDb();
    db.prepare(
      `INSERT INTO asset_licenses (id, package_id, license_type, status)
       VALUES ('lic-1', 'pkg-1', 'paid', 'active')`,
    ).run();

    global.fetch = jest.fn().mockResolvedValue(
      new Response(JSON.stringify({ results: [{ licenseId: 'lic-1', valid: false }] }), {
        status: 200,
      }),
    ) as typeof fetch;

    await licenseHeartbeatTick(db, NOW);

    const row = db.prepare(`SELECT status FROM asset_licenses WHERE id = 'lic-1'`).get() as {
      status: string;
    };
    expect(row.status).toBe('expired');
  });

  it('starts a 72h grace window when the Marketplace is unreachable', async () => {
    const db = makeLicenseDb();
    db.prepare(
      `INSERT INTO asset_licenses (id, package_id, license_type, status)
       VALUES ('lic-1', 'pkg-1', 'paid', 'active')`,
    ).run();

    global.fetch = jest.fn().mockRejectedValue(new Error('ECONNREFUSED')) as typeof fetch;

    await licenseHeartbeatTick(db, NOW);

    const row = db.prepare(`SELECT * FROM asset_licenses WHERE id = 'lic-1'`).get() as {
      status: string;
      grace_period_ends_at: number;
    };
    expect(row.status).toBe('grace');
    expect(row.grace_period_ends_at).toBe(Math.floor((NOW + 72 * 3600 * 1000) / 1000));
  });

  it('expires licenses whose grace window has lapsed', async () => {
    const db = makeLicenseDb();
    const lapsed = Math.floor((NOW - 1000) / 1000);
    db.prepare(
      `INSERT INTO asset_licenses (id, package_id, license_type, status, grace_period_ends_at)
       VALUES ('lic-1', 'pkg-1', 'paid', 'grace', ${lapsed})`,
    ).run();

    global.fetch = jest.fn().mockRejectedValue(new Error('ECONNREFUSED')) as typeof fetch;

    await licenseHeartbeatTick(db, NOW);

    const row = db.prepare(`SELECT status FROM asset_licenses WHERE id = 'lic-1'`).get() as {
      status: string;
    };
    expect(row.status).toBe('expired');
  });
});

describe('usageReportTick', () => {
  it('reports aggregate run counts only', async () => {
    const mockFetch = jest.fn().mockResolvedValue(new Response('{}', { status: 200 }));
    global.fetch = mockFetch as typeof fetch;

    await usageReportTick(1_700_000_000_000);

    const [url, init] = mockFetch.mock.calls[0];
    expect(url).toContain('/api/v1/usage/report');
    const body = JSON.parse(init.body);
    expect(body.totalRuns).toBe(2);
    // aggregate only — no run payloads or tenant identifiers
    expect(Object.keys(body).sort()).toEqual(['periodEnd', 'periodStart', 'totalRuns']);
  });
});
