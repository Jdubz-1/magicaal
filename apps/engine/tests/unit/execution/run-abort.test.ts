import type { AgentGraphDefinition } from '@magicaal/core';

jest.mock('@/registry/node-registry');
jest.mock('@/execution/lifecycle');
jest.mock('@/lib/logger', () => ({
  logger: { info: jest.fn(), debug: jest.fn(), warn: jest.fn(), error: jest.fn() },
}));
// Full mock — the real module owns a Redis connection via queue/client
jest.mock('@/execution/run-control', () => ({
  checkAbort: jest.fn().mockResolvedValue(null),
  clearAbort: jest.fn().mockResolvedValue(undefined),
  requestAbort: jest.fn().mockResolvedValue(undefined),
  abortError: (reason: 'cancelled' | 'timeout') =>
    Object.assign(new Error(reason), {
      code: reason === 'timeout' ? 'RUN_TIMEOUT' : 'RUN_CANCELLED',
      retryable: false,
    }),
  isAbortErrorCode: (code: unknown) => code === 'RUN_TIMEOUT' || code === 'RUN_CANCELLED',
}));

import { executeGraph } from '@/execution/worker';
import { registry } from '@/registry/node-registry';
import { lifecycle } from '@/execution/lifecycle';
import { checkAbort } from '@/execution/run-control';
import { ExecutionContextImpl } from '@/execution/context';

const mockRegistry = registry as jest.Mocked<typeof registry>;
const mockLifecycle = lifecycle as jest.Mocked<typeof lifecycle>;
const mockedCheckAbort = checkAbort as jest.Mock;

function makeCtx(): ExecutionContextImpl {
  return new ExecutionContextImpl({
    runId: 'run-1',
    agentId: 'agent-1',
    tenantId: 'tenant-1',
    triggerType: 'api',
    input: {},
  });
}

const graph: AgentGraphDefinition = {
  version: '1',
  name: 'abort-graph',
  entry: 'a',
  nodes: {
    a: { id: 'a', type: 'core:noop', config: {} },
    b: { id: 'b', type: 'core:noop', config: {} },
  },
  edges: [{ id: 'e1', from: 'a', to: 'b', type: 'unconditional' }],
  toolEdges: [],
  workspaceEdges: [],
  config: {} as AgentGraphDefinition['config'],
};

const noopModule = {
  type: 'core:noop',
  meta: { name: 'noop', description: '', category: 'data' as const, version: '1.0.0' },
  schema: { config: {}, input: {}, output: {} },
  execute: jest.fn().mockResolvedValue({ status: 'complete', outputs: {} }),
};

beforeEach(() => {
  jest.clearAllMocks();
  mockedCheckAbort.mockResolvedValue(null);
  mockLifecycle.writeStepStart.mockResolvedValue('step-1');
  mockLifecycle.writeStepEnd.mockResolvedValue(undefined);
  mockLifecycle.writeStepFailed.mockResolvedValue(undefined);
  // Automocked snapshot() returns undefined → worker falls back to the
  // (automocked) registry; built-in nodes have no owning package.
  mockRegistry.get.mockReturnValue(noopModule as unknown as ReturnType<typeof registry.get>);
  noopModule.execute.mockClear();
});

describe('executeGraph cooperative abort (ALIGN-001/002)', () => {
  it('runs to completion when no abort flag is set', async () => {
    await executeGraph('run-1', graph, makeCtx());
    expect(noopModule.execute).toHaveBeenCalledTimes(2);
  });

  it('throws RUN_CANCELLED before executing another node once the flag is set', async () => {
    // First boundary check passes, second sees the cancel flag
    mockedCheckAbort.mockResolvedValueOnce(null).mockResolvedValue('cancelled');

    await expect(executeGraph('run-1', graph, makeCtx())).rejects.toMatchObject({
      code: 'RUN_CANCELLED',
    });
    expect(noopModule.execute).toHaveBeenCalledTimes(1);
  });

  it('throws RUN_TIMEOUT when the flag reason is timeout', async () => {
    mockedCheckAbort.mockResolvedValue('timeout');

    await expect(executeGraph('run-1', graph, makeCtx())).rejects.toMatchObject({
      code: 'RUN_TIMEOUT',
    });
    expect(noopModule.execute).not.toHaveBeenCalled();
  });
});
