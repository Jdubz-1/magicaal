import type { Request, Response, NextFunction } from 'express';

jest.mock('@/lib/logger', () => ({
  logger: { info: jest.fn(), debug: jest.fn(), warn: jest.fn(), error: jest.fn() },
}));

let runRows: Array<Record<string, unknown>> = [];
jest.mock('@/db/telemetry-client', () => ({
  telemetryDb: {
    select: jest.fn(() => ({ from: () => ({ where: async () => runRows }) })),
    insert: jest.fn(() => ({ values: jest.fn().mockResolvedValue(undefined) })),
    update: jest.fn(() => ({ set: () => ({ where: async () => undefined }) })),
  },
}));

jest.mock('@/queue/client', () => ({
  redis: {},
  runTriggerQueue: { add: jest.fn().mockResolvedValue(undefined) },
  runScheduledQueue: { add: jest.fn().mockResolvedValue(undefined) },
  runRetryQueue: { add: jest.fn().mockResolvedValue(undefined) },
}));

jest.mock('@/graph/graph-loader', () => ({
  graphLoader: { invalidate: jest.fn() },
  assertAgentInTenant: jest.fn(),
}));

jest.mock('@/execution/lifecycle', () => ({
  lifecycle: { markRunCancelled: jest.fn().mockResolvedValue(undefined) },
}));

jest.mock('@/execution/run-control', () => ({
  requestAbort: jest.fn().mockResolvedValue(undefined),
}));

import { cancelRun } from '@/controllers/runs.controller';
import { lifecycle } from '@/execution/lifecycle';
import { requestAbort } from '@/execution/run-control';

const mockedMarkCancelled = lifecycle.markRunCancelled as jest.Mock;
const mockedRequestAbort = requestAbort as jest.Mock;

function mockRes() {
  const res: Partial<Response> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
  };
  return res as Response & { status: jest.Mock; json: jest.Mock };
}

async function cancel(runId = 'run-1') {
  const req = { params: { id: runId } } as unknown as Request;
  const res = mockRes();
  const next = jest.fn() as NextFunction & jest.Mock;
  await cancelRun(req, res, next);
  return { res, next };
}

beforeEach(() => {
  jest.clearAllMocks();
  runRows = [];
});

describe('engine cancelRun (ALIGN-001)', () => {
  it('404s for an unknown run', async () => {
    const { next } = await cancel();
    expect(next).toHaveBeenCalledWith(
      expect.objectContaining({ status: 404, code: 'RUN_NOT_FOUND' }),
    );
  });

  it('409s when the run is already terminal', async () => {
    runRows = [{ id: 'run-1', status: 'completed' }];
    const { next } = await cancel();
    expect(next).toHaveBeenCalledWith(
      expect.objectContaining({ status: 409, code: 'RUN_ALREADY_TERMINAL' }),
    );
    expect(mockedRequestAbort).not.toHaveBeenCalled();
  });

  it('sets the abort flag and responds 202 for a running run', async () => {
    runRows = [{ id: 'run-1', status: 'running' }];
    const { res } = await cancel();
    expect(mockedRequestAbort).toHaveBeenCalledWith('run-1', 'cancelled');
    expect(res.status).toHaveBeenCalledWith(202);
    expect(res.json).toHaveBeenCalledWith({ runId: 'run-1', cancelling: true });
    // The executing worker records the terminal state, not the controller
    expect(mockedMarkCancelled).not.toHaveBeenCalled();
  });

  it('marks a pending run cancelled immediately', async () => {
    runRows = [{ id: 'run-1', status: 'pending' }];
    const { res } = await cancel();
    expect(mockedRequestAbort).toHaveBeenCalledWith('run-1', 'cancelled');
    expect(mockedMarkCancelled).toHaveBeenCalledWith('run-1');
    expect(res.json).toHaveBeenCalledWith({ runId: 'run-1', status: 'cancelled' });
  });

  it('marks a suspended run cancelled immediately', async () => {
    runRows = [{ id: 'run-1', status: 'suspended' }];
    const { res } = await cancel();
    expect(mockedMarkCancelled).toHaveBeenCalledWith('run-1');
    expect(res.json).toHaveBeenCalledWith({ runId: 'run-1', status: 'cancelled' });
  });
});
