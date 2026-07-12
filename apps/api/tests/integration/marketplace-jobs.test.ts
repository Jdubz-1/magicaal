import { eq } from 'drizzle-orm';
import * as crypto from 'node:crypto';
import { runMigrations } from '../../src/db/migrate';
import { db } from '@/db/client';
import { assetLicenses, packageRegistry, marketplaceAccount, tenants } from '@/db/schema';
import { encryptCredentials } from '@/lib/credentials';

jest.mock('../../src/lib/engine-client', () => ({
  engineClient: { get: jest.fn(), post: jest.fn() },
}));

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { engineClient } = require('../../src/lib/engine-client') as {
  engineClient: { get: jest.Mock; post: jest.Mock };
};

import {
  startLicenseValidator,
  licenseHeartbeatTick,
} from '../../src/marketplace/license-validator';
import { startUsageReporter, usageReportTick } from '../../src/marketplace/usage-reporter';

const NOW = 1_700_000_000_000;
const ACCOUNT_KEY = 'mk_marketplace_account_key';
const originalFetch = global.fetch;

beforeAll(async () => {
  await runMigrations();
});

afterEach(async () => {
  global.fetch = originalFetch;
  jest.clearAllMocks();
  await db.delete(assetLicenses);
  await db.delete(packageRegistry);
  await db.delete(marketplaceAccount);
});

async function linkAccount(): Promise<void> {
  await db.insert(marketplaceAccount).values({
    id: crypto.randomUUID(),
    apiKeyEnc: encryptCredentials(ACCOUNT_KEY),
    linkedAt: new Date(),
    updatedAt: new Date(),
  });
}

async function seedLicense(
  status: 'active' | 'grace' | 'expired',
  gracePeriodEndsAt: Date | null = null,
): Promise<string> {
  const tenantId = crypto.randomUUID();
  const packageId = crypto.randomUUID();
  const licenseId = crypto.randomUUID();
  const now = new Date();

  await db.insert(tenants).values({
    id: tenantId,
    name: 'T',
    slug: `t-${tenantId.slice(0, 8)}`,
    enabled: true,
    createdAt: now,
    updatedAt: now,
  });
  await db.insert(packageRegistry).values({
    id: packageId,
    tenantId,
    name: 'demo',
    version: '1.0.0',
    publisher: 'acme',
    packageType: 'nodes',
    manifestJson: '{}',
    installedAt: now,
    enabled: true,
    signatureStatus: 'verified',
  });
  await db.insert(assetLicenses).values({
    id: licenseId,
    packageId,
    licenseType: 'paid',
    status,
    gracePeriodEndsAt,
  });

  return licenseId;
}

async function licenseStatus(id: string): Promise<string> {
  const rows = await db.select().from(assetLicenses).where(eq(assetLicenses.id, id));
  return rows[0].status;
}

describe('MARKETPLACE_ENABLED gating', () => {
  it('neither job starts when the flag is off', () => {
    expect(startLicenseValidator()).toBeNull();
    expect(startUsageReporter()).toBeNull();
  });
});

describe('licenseHeartbeatTick (ISS-061)', () => {
  it('authenticates with the linked MagiCaal Account key', async () => {
    await linkAccount();
    await seedLicense('active');

    const mockFetch = jest
      .fn()
      .mockResolvedValue(new Response(JSON.stringify({ results: [] }), { status: 200 }));
    global.fetch = mockFetch as unknown as typeof fetch;

    await licenseHeartbeatTick(NOW);

    const [, init] = mockFetch.mock.calls[0];
    expect(init.headers.Authorization).toBe(`Bearer ${ACCOUNT_KEY}`);
  });

  it('does not call the Marketplace when no account is linked', async () => {
    await seedLicense('active');

    const mockFetch = jest.fn();
    global.fetch = mockFetch as unknown as typeof fetch;

    await licenseHeartbeatTick(NOW);

    expect(mockFetch).not.toHaveBeenCalled();
  });

  it('leaves a license absent from the response unchanged (no fail-open)', async () => {
    await linkAccount();
    const id = await seedLicense('grace', new Date(NOW + 3600_000));

    // Marketplace answers, but says nothing about this license
    global.fetch = jest
      .fn()
      .mockResolvedValue(
        new Response(JSON.stringify({ results: [{ licenseId: 'someone-else', valid: true }] }), {
          status: 200,
        }),
      ) as unknown as typeof fetch;

    await licenseHeartbeatTick(NOW);

    // Previously this re-activated it — a partial response must not endorse
    expect(await licenseStatus(id)).toBe('grace');
  });

  it('activates a license the Marketplace confirms', async () => {
    await linkAccount();
    const id = await seedLicense('grace', new Date(NOW + 3600_000));

    global.fetch = jest
      .fn()
      .mockResolvedValue(
        new Response(JSON.stringify({ results: [{ licenseId: id, valid: true }] }), {
          status: 200,
        }),
      ) as unknown as typeof fetch;

    await licenseHeartbeatTick(NOW);

    expect(await licenseStatus(id)).toBe('active');
  });

  it('expires a license the Marketplace revokes', async () => {
    await linkAccount();
    const id = await seedLicense('active');

    global.fetch = jest
      .fn()
      .mockResolvedValue(
        new Response(JSON.stringify({ results: [{ licenseId: id, valid: false }] }), {
          status: 200,
        }),
      ) as unknown as typeof fetch;

    await licenseHeartbeatTick(NOW);

    expect(await licenseStatus(id)).toBe('expired');
  });

  it('opens a 72h grace window when the Marketplace is unreachable', async () => {
    await linkAccount();
    const id = await seedLicense('active');

    global.fetch = jest
      .fn()
      .mockRejectedValue(new Error('ECONNREFUSED')) as unknown as typeof fetch;

    await licenseHeartbeatTick(NOW);

    expect(await licenseStatus(id)).toBe('grace');
  });

  it('expires a license whose grace window has lapsed', async () => {
    await linkAccount();
    const id = await seedLicense('grace', new Date(NOW - 1000));

    global.fetch = jest
      .fn()
      .mockRejectedValue(new Error('ECONNREFUSED')) as unknown as typeof fetch;

    await licenseHeartbeatTick(NOW);

    expect(await licenseStatus(id)).toBe('expired');
  });
});

describe('usageReportTick (ISS-061)', () => {
  it('authenticates and reports aggregate run counts only', async () => {
    await linkAccount();
    engineClient.get.mockResolvedValue({ data: { totalRuns: 2 } });

    const mockFetch = jest.fn().mockResolvedValue(new Response('{}', { status: 200 }));
    global.fetch = mockFetch as unknown as typeof fetch;

    await usageReportTick(NOW);

    const [url, init] = mockFetch.mock.calls[0];
    expect(url).toContain('/api/v1/usage/report');
    expect(init.headers.Authorization).toBe(`Bearer ${ACCOUNT_KEY}`);

    const body = JSON.parse(init.body);
    expect(body.totalRuns).toBe(2);
    // aggregate only — no run payloads or tenant identifiers
    expect(Object.keys(body).sort()).toEqual(['periodEnd', 'periodStart', 'totalRuns']);
  });

  it('does not call the Marketplace when no account is linked', async () => {
    const mockFetch = jest.fn();
    global.fetch = mockFetch as unknown as typeof fetch;

    await usageReportTick(NOW);

    expect(mockFetch).not.toHaveBeenCalled();
    expect(engineClient.get).not.toHaveBeenCalled();
  });
});
