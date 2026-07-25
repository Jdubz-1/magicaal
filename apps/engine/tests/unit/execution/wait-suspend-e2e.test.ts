import type { AgentGraphDefinition } from '@magicaal/core';
import type { NodeModule } from '@magicaal/sdk-node';

// Mocks must be declared before imports
jest.mock('@/registry/node-registry');
jest.mock('@/execution/lifecycle');
jest.mock('@/sse/sse-manager', () => ({
  sseManager: { subscribe: jest.fn(), broadcast: jest.fn(), close: jest.fn() },
}));
jest.mock('@/router/router-engine', () => ({
  routedLLMCall: jest.fn(),
  resolveRouterConfig: jest.fn().mockReturnValue(null),
  initPricingCache: jest.fn(),
}));
jest.mock('@/lib/logger', () => ({
  logger: { info: jest.fn(), debug: jest.fn(), warn: jest.fn(), error: jest.fn() },
}));
jest.mock('@/execution/run-control', () => ({
  checkAbort: jest.fn().mockResolvedValue(null),
  clearAbort: jest.fn().mockResolvedValue(undefined),
  requestAbort: jest.fn().mockResolvedValue(undefined),
  abortError: jest.fn(),
  isAbortErrorCode: (code: unknown) => code === 'RUN_TIMEOUT' || code === 'RUN_CANCELLED',
}));

import { executeGraph } from '../../../src/execution/worker';
import { registry } from '../../../src/registry/node-registry';
import { lifecycle } from '../../../src/execution/lifecycle';
import { ExecutionContextImpl } from '../../../src/execution/context';
import { coreStart } from '@magicaal/nodes';
import { coreEnd } from '@magicaal/nodes';
import { coreWait } from '@magicaal/nodes';

const mockRegistry = registry as jest.Mocked<typeof registry>;
const mockLifecycle = lifecycle as jest.Mocked<typeof lifecycle>;

let sideEffectCalls = 0;
const sideEffectNode: NodeModule = {
  type: 'test:side-effect',
  meta: { name: 'Side Effect', description: 'test double', category: 'code', version: '1.0.0' },
  schema: { config: { type: 'object' }, input: {}, output: {} },
  async execute() {
    sideEffectCalls++;
    return { status: 'complete' as const, outputs: {} };
  },
};

function makeCtx(input: Record<string, unknown> = {}): ExecutionContextImpl {
  return new ExecutionContextImpl({
    runId: 'run-wait-1',
    agentId: 'agent-1',
    tenantId: 'tenant-1',
    triggerType: 'api',
    input,
  });
}

function makeGraph(
  nodes: Record<string, { type: string; config: Record<string, unknown> }>,
  edges: AgentGraphDefinition['edges'],
  entry: string,
): AgentGraphDefinition {
  const fullNodes: AgentGraphDefinition['nodes'] = {};
  for (const [id, n] of Object.entries(nodes)) {
    fullNodes[id] = { id, ...n };
  }
  return {
    version: '1',
    name: 'test-graph',
    entry,
    nodes: fullNodes,
    edges,
    toolEdges: [],
    workspaceEdges: [],
    config: {} as AgentGraphDefinition['config'],
  };
}

beforeEach(() => {
  jest.clearAllMocks();
  sideEffectCalls = 0;
  mockLifecycle.writeStepStart.mockResolvedValue('step-1');
  mockLifecycle.writeStepEnd.mockResolvedValue(undefined);
  mockLifecycle.writeStepFailed.mockResolvedValue(undefined);
  mockLifecycle.markRunStarted.mockResolvedValue(undefined);
  mockLifecycle.markRunComplete.mockResolvedValue(undefined);
  mockLifecycle.markRunSuspended.mockResolvedValue(undefined);

  mockRegistry.get.mockImplementation((type: string) => {
    if (type === 'core:start') return coreStart as ReturnType<typeof mockRegistry.get>;
    if (type === 'core:end') return coreEnd as ReturnType<typeof mockRegistry.get>;
    if (type === 'core:wait') return coreWait as ReturnType<typeof mockRegistry.get>;
    if (type === 'test:side-effect') return sideEffectNode as ReturnType<typeof mockRegistry.get>;
    throw new Error(`Unknown node type: ${type}`);
  });
});

describe('core:wait suspend/resume E2E (ALIGN-031)', () => {
  const graph = makeGraph(
    {
      start: { type: 'core:start', config: {} },
      sideEffect: { type: 'test:side-effect', config: {} },
      wait: { type: 'core:wait', config: { mode: 'delay', delayMs: 60_000 } },
      end: { type: 'core:end', config: { outputKeys: [] } },
    },
    [
      { id: 'e1', from: 'start', to: 'sideEffect', type: 'unconditional' },
      { id: 'e2', from: 'sideEffect', to: 'wait', type: 'unconditional' },
      { id: 'e3', from: 'wait', to: 'end', type: 'unconditional' },
    ],
    'start',
  );

  it('suspends at the wait node with suspendedNodeId correctly set (regression for the prerequisite fix)', async () => {
    const ctx = makeCtx({});
    await executeGraph('run-wait-1', graph, ctx);

    expect(ctx.isSuspended).toBe(true);
    expect(ctx.suspendReviewId).toMatch(/^wait_/);
    expect(ctx.suspendedNodeId).toBe('wait');
    expect(ctx.resumeAt).toBeGreaterThan(Date.now());
    expect(sideEffectCalls).toBe(1);
  });

  it('resuming from the suspended node does not replay the upstream side effect', async () => {
    const first = makeCtx({});
    await executeGraph('run-wait-1', graph, first);
    expect(sideEffectCalls).toBe(1);

    // Mirrors what the scheduler does on resume: override entry with the
    // suspended node id and carry the checkpointed data forward.
    mockLifecycle.writeStepStart.mockClear();
    const resumedGraph = { ...graph, entry: first.suspendedNodeId! };
    const resumed = makeCtx(first.data);
    await executeGraph('run-wait-1', resumedGraph, resumed);

    expect(sideEffectCalls).toBe(1); // still 1 — not re-executed
    expect(resumed.isSuspended).toBe(false);
    const stepStartCalls = mockLifecycle.writeStepStart.mock.calls.map(([, nodeId]) => nodeId);
    expect(stepStartCalls).toContain('end');
    expect(stepStartCalls).not.toContain('sideEffect');
  });
});
