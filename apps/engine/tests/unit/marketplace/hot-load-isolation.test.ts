import type { AgentGraphDefinition } from '@magicaal/core';
import type { NodeModule } from '@magicaal/sdk-node';

// Real registry — this test exercises snapshot isolation. Lifecycle and
// logger are mocked as in worker.test.ts.
jest.mock('@/execution/lifecycle');
jest.mock('@/lib/logger', () => ({
  logger: { info: jest.fn(), debug: jest.fn(), warn: jest.fn(), error: jest.fn() },
}));
// Entitlement is covered in execution/entitlement.test.ts; here the test
// tenant owns the package so the gate never interferes with snapshot semantics.
jest.mock('@/registry/entitlements', () => ({
  ...jest.requireActual('@/registry/entitlements'),
  loadEntitledPackages: () => new Set(['test/pkg']),
}));
// The worker checks the Redis-backed abort flag at node boundaries — stub it
// so these tests need no Redis (covered in run-abort.test.ts).
jest.mock('@/execution/run-control', () => ({
  checkAbort: jest.fn().mockResolvedValue(null),
  clearAbort: jest.fn().mockResolvedValue(undefined),
  requestAbort: jest.fn().mockResolvedValue(undefined),
  abortError: jest.fn(),
  isAbortErrorCode: (code: unknown) => code === 'RUN_TIMEOUT' || code === 'RUN_CANCELLED',
}));

import { executeGraph } from '@/execution/worker';
import { registry } from '@/registry/node-registry';
import { lifecycle } from '@/execution/lifecycle';
import { ExecutionContextImpl } from '@/execution/context';

const mockLifecycle = lifecycle as jest.Mocked<typeof lifecycle>;

function testNode(type: string, marker: string, onExecute?: () => Promise<void>): NodeModule {
  return {
    type,
    meta: { name: type, description: 'test node', category: 'data', version: '1.0.0' },
    schema: { config: {}, input: {}, output: {} },
    async execute(ctx) {
      if (onExecute) await onExecute();
      ctx.set('marker', marker);
      return { status: 'complete' as const, outputs: { marker } };
    },
  };
}

function makeGraph(entryType: string, secondType: string): AgentGraphDefinition {
  return {
    version: '1',
    name: 'isolation-test',
    entry: 'gate',
    nodes: {
      gate: { id: 'gate', type: entryType, config: {} },
      emit: { id: 'emit', type: secondType, config: {} },
    },
    edges: [{ id: 'e1', from: 'gate', to: 'emit', type: 'unconditional' }],
    toolEdges: [],
    workspaceEdges: [],
    config: {} as AgentGraphDefinition['config'],
  };
}

function makeCtx(): ExecutionContextImpl {
  return new ExecutionContextImpl({
    runId: 'run-isolation',
    agentId: 'agent-1',
    tenantId: 'tenant-1',
    triggerType: 'api',
    input: {},
  });
}

beforeEach(() => {
  jest.clearAllMocks();
  mockLifecycle.writeStepStart.mockResolvedValue('step-1');
  mockLifecycle.writeStepEnd.mockResolvedValue(undefined);
  mockLifecycle.writeStepFailed.mockResolvedValue(undefined);
});

describe('registry snapshot semantics', () => {
  it('snapshots do not see later hot-loads; the live registry does', () => {
    registry.register(testNode('test:snap-a', 'v1'));
    const snapshot = registry.snapshot();

    const genBefore = registry.generation;
    registry.hotLoad([testNode('test:snap-b', 'new')], 'test/pkg');

    expect(registry.generation).toBe(genBefore + 1);
    expect(() => snapshot.get('test:snap-b')).toThrow(/Unknown node type/);
    expect(registry.get('test:snap-b')).toBeDefined();
    expect(registry.snapshot().get('test:snap-b')).toBeDefined();
  });

  it('hot-loading a new version does not affect existing snapshots', () => {
    registry.register(testNode('test:versioned', 'v1'));
    const snapshot = registry.snapshot();

    registry.hotLoad([testNode('test:versioned', 'v2')], 'test/pkg');

    expect((snapshot.get('test:versioned') as NodeModule).meta.name).toBe('test:versioned');
    // The snapshot still resolves the original module object
    expect(snapshot.get('test:versioned')).not.toBe(registry.get('test:versioned'));
  });
});

describe('in-flight run isolation under hot-load', () => {
  it('a run started before a hot-load executes the node version from its snapshot', async () => {
    let releaseGate: () => void = () => undefined;
    const gateOpened = new Promise<void>((resolve) => {
      releaseGate = resolve;
    });
    let gateReached: () => void = () => undefined;
    const reachedGate = new Promise<void>((resolve) => {
      gateReached = resolve;
    });

    registry.register(
      testNode('test:gate', 'gate', async () => {
        gateReached();
        await gateOpened;
      }),
    );
    registry.register(testNode('test:emit', 'v1'));

    const ctx = makeCtx();
    const run = executeGraph('run-isolation', makeGraph('test:gate', 'test:emit'), ctx);

    // Hot-load a replacement for test:emit while the run is suspended at the gate
    await reachedGate;
    registry.hotLoad([testNode('test:emit', 'v2')], 'test/pkg');

    releaseGate();
    await run;

    // The in-flight run used its snapshot's v1 module
    expect(ctx.get('marker')).toBe('v1');

    // A new run picks up v2
    const ctx2 = makeCtx();
    await executeGraph('run-isolation-2', makeGraph('test:gate', 'test:emit'), ctx2);
    expect(ctx2.get('marker')).toBe('v2');
  });
});
