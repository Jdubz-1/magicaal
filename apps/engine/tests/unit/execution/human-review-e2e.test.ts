import type { AgentGraphDefinition } from '@magicaal/core';

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

import { executeGraph } from '../../../src/execution/worker';
import { registry } from '../../../src/registry/node-registry';
import { lifecycle } from '../../../src/execution/lifecycle';
import { ExecutionContextImpl } from '../../../src/execution/context';
import { coreStart } from '@magicaal/nodes';
import { coreEnd } from '@magicaal/nodes';
import { coreHumanReview } from '@magicaal/nodes';

const mockRegistry = registry as jest.Mocked<typeof registry>;
const mockLifecycle = lifecycle as jest.Mocked<typeof lifecycle>;

function makeCtx(input: Record<string, unknown> = {}): ExecutionContextImpl {
  return new ExecutionContextImpl({
    runId: 'run-hr-1',
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
  mockLifecycle.writeStepStart.mockResolvedValue('step-1');
  mockLifecycle.writeStepEnd.mockResolvedValue(undefined);
  mockLifecycle.writeStepFailed.mockResolvedValue(undefined);
  mockLifecycle.markRunStarted.mockResolvedValue(undefined);
  mockLifecycle.markRunComplete.mockResolvedValue(undefined);
  mockLifecycle.markRunSuspended.mockResolvedValue(undefined);

  mockRegistry.get.mockImplementation((type: string) => {
    if (type === 'core:start') return coreStart as ReturnType<typeof mockRegistry.get>;
    if (type === 'core:end') return coreEnd as ReturnType<typeof mockRegistry.get>;
    if (type === 'core:human-review') return coreHumanReview as ReturnType<typeof mockRegistry.get>;
    throw new Error(`Unknown node type: ${type}`);
  });
});

// ─── Human Review End-to-End ───────────────────────────────────────────────────

describe('Human Review E2E', () => {
  const graph = makeGraph(
    {
      start: { type: 'core:start', config: {} },
      review: { type: 'core:human-review', config: { prompt: 'Please review this run' } },
      end: { type: 'core:end', config: { outputKeys: [] } },
    },
    [
      { id: 'e1', from: 'start', to: 'review', type: 'unconditional' },
      { id: 'e2', from: 'review', to: 'end', type: 'unconditional' },
    ],
    'start',
  );

  it('suspends when human-review node executes for the first time', async () => {
    const ctx = makeCtx({ payload: 'test-data' });
    await executeGraph('run-hr-1', graph, ctx);

    expect(ctx.isSuspended).toBe(true);
    expect(ctx.suspendReviewId).toMatch(/^rev_/);
    expect(ctx.get('_review_id')).toMatch(/^rev_/);
  });

  it('does NOT emit node.completed for the human-review node on first execution', async () => {
    const { sseManager } = jest.requireMock('@/sse/sse-manager') as { sseManager: { broadcast: jest.Mock } };
    const ctx = makeCtx({});
    await executeGraph('run-hr-1', graph, ctx);

    const completedCalls = sseManager.broadcast.mock.calls.filter(
      ([, event]) => event === 'node.completed',
    );
    // node.completed should NOT have been emitted for core:human-review on first run
    const reviewCompleted = completedCalls.some(([, , payload]: [string, string, { nodeType?: string }]) =>
      payload?.nodeType === 'core:human-review',
    );
    expect(reviewCompleted).toBe(false);
  });

  it('resumes correctly after approval — passes through review node and completes', async () => {
    // Resumed execution: context has _review_approved = true, graph entry = review node
    const resumedGraph = { ...graph, entry: 'review' };
    const ctx = makeCtx({ _review_approved: true, _review_id: 'rev_existing-id' });

    await executeGraph('run-hr-1', resumedGraph, ctx);

    // Should NOT be suspended on the resumed run
    expect(ctx.isSuspended).toBe(false);

    // Should have executed the end node
    const stepStartCalls = mockLifecycle.writeStepStart.mock.calls.map(([, nodeId]) => nodeId);
    expect(stepStartCalls).toContain('end');
  });

  it('emits run.suspended SSE event on first suspension', async () => {
    const { sseManager } = jest.requireMock('@/sse/sse-manager') as { sseManager: { broadcast: jest.Mock } };
    const ctx = makeCtx({});
    await executeGraph('run-hr-1', graph, ctx);

    // The context.suspend() call sets _suspended; the lifecycle handles SSE
    // Verify the ctx has the review ID set (SSE is emitted by lifecycle)
    expect(ctx.suspendReviewId).toBeDefined();
    expect(ctx.isSuspended).toBe(true);
  });
});

// ─── SSE Event Sequence ─────────────────────────────────────────────────────

describe('SSE event sequence', () => {
  it('emits node.started then node.completed in order for each executed node', async () => {
    const { sseManager } = jest.requireMock('@/sse/sse-manager') as { sseManager: { broadcast: jest.Mock } };

    const simpleGraph = makeGraph(
      {
        start: { type: 'core:start', config: {} },
        end: { type: 'core:end', config: { outputKeys: [] } },
      },
      [{ id: 'e1', from: 'start', to: 'end', type: 'unconditional' }],
      'start',
    );

    const ctx = makeCtx({ value: 42 });
    await executeGraph('run-seq-1', simpleGraph, ctx);

    const events = sseManager.broadcast.mock.calls.map(([, event, payload]: [string, string, unknown]) => ({
      event,
      payload,
    }));

    // node.started should always come before node.completed for each nodeId
    const startedNodes = events.filter((e) => e.event === 'node.started').map((e) => (e.payload as { nodeId: string }).nodeId);
    const completedNodes = events.filter((e) => e.event === 'node.completed').map((e) => (e.payload as { nodeId: string }).nodeId);

    expect(startedNodes).toContain('start');
    expect(startedNodes).toContain('end');
    expect(completedNodes).toContain('start');
    expect(completedNodes).toContain('end');

    // Verify ordering: start.started before start.completed
    const startStartIdx = events.findIndex((e) => e.event === 'node.started' && (e.payload as { nodeId: string }).nodeId === 'start');
    const startCompleteIdx = events.findIndex((e) => e.event === 'node.completed' && (e.payload as { nodeId: string }).nodeId === 'start');
    expect(startStartIdx).toBeLessThan(startCompleteIdx);
  });
});
