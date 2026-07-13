import type { Request, Response } from 'express';

jest.mock('@/lib/logger', () => ({
  logger: { info: jest.fn(), debug: jest.fn(), warn: jest.fn(), error: jest.fn() },
}));

const insertValues = jest.fn().mockResolvedValue(undefined);
jest.mock('@/db/telemetry-client', () => ({
  telemetryDb: { insert: () => ({ values: insertValues }) },
}));

const queueAdd = jest.fn().mockResolvedValue(undefined);
jest.mock('@/queue/client', () => ({
  runTriggerQueue: { add: (...args: unknown[]) => queueAdd(...args) },
  redis: { incr: jest.fn(), expire: jest.fn() },
}));

import { dispatchRun } from '@/controllers/runs.controller';

/**
 * dispatchRun is the seam where invocation auth used to live. It now requires
 * the API — the enforcement point — to state which plane authenticated the
 * caller. These assert the contract, including that an omitted `caller` is a
 * hard error rather than a silent unauthenticated dispatch.
 */
async function run(body: Record<string, unknown>): Promise<{
  status?: number;
  json?: unknown;
  err?: { status?: number; code?: string; message?: string };
}> {
  let status: number | undefined;
  let json: unknown;
  let err: { status?: number; code?: string; message?: string } | undefined;

  const res = {
    status(code: number) {
      status = code;
      return this;
    },
    json(payload: unknown) {
      json = payload;
      return this;
    },
  } as unknown as Response;

  await dispatchRun(
    { body } as Request,
    res,
    (e?: unknown) => {
      if (e) err = e as typeof err;
    },
  );

  return { status, json, err };
}

beforeEach(() => {
  jest.clearAllMocks();
});

const BASE = { agentId: 'agent-1', tenantId: 'tenant-1', input: {} };

describe('dispatchRun caller contract (ISS-063)', () => {
  it('dispatches for a platform caller — Studio, Caal, test suite, sub-graph', async () => {
    const { status, json, err } = await run({
      ...BASE,
      caller: { kind: 'platform', strategy: 'platform' },
    });

    expect(err).toBeUndefined();
    expect(status).toBe(202);
    expect(json).toMatchObject({ runId: expect.stringMatching(/^run_/) });
    expect(queueAdd).toHaveBeenCalledTimes(1);
  });

  it('dispatches for an invocation caller the API already validated', async () => {
    const { status, err } = await run({
      ...BASE,
      caller: { kind: 'invocation', strategy: 'api-key', keyId: 'key-1' },
    });

    expect(err).toBeUndefined();
    expect(status).toBe(202);
    expect(queueAdd).toHaveBeenCalledTimes(1);
  });

  it('refuses a dispatch with no caller — an unauthenticated run must not slip through', async () => {
    const { err } = await run(BASE);

    expect(err).toMatchObject({ status: 400, code: 'CALLER_REQUIRED' });
    expect(queueAdd).not.toHaveBeenCalled();
  });

  it('refuses an unrecognised caller kind', async () => {
    const { err } = await run({ ...BASE, caller: { kind: 'anonymous', strategy: 'none' } });

    expect(err).toMatchObject({ code: 'CALLER_REQUIRED' });
    expect(queueAdd).not.toHaveBeenCalled();
  });

  it('still requires agentId and tenantId', async () => {
    const { err } = await run({ caller: { kind: 'platform', strategy: 'platform' } });

    expect(err).toMatchObject({ status: 400 });
    expect(queueAdd).not.toHaveBeenCalled();
  });
});
