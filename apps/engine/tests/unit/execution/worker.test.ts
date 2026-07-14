import type { AgentGraphDefinition } from '@magicaal/core';

// Must mock before importing worker (jest.mock is hoisted)
jest.mock('@/registry/node-registry');
jest.mock('@/execution/lifecycle');
jest.mock('@/lib/logger', () => ({
  logger: { info: jest.fn(), debug: jest.fn(), warn: jest.fn(), error: jest.fn() },
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

import { resolveEdges, executeGraph } from '../../../src/execution/worker';
import { registry } from '../../../src/registry/node-registry';
import { lifecycle } from '../../../src/execution/lifecycle';
import { ExecutionContextImpl } from '../../../src/execution/context';

const mockRegistry = registry as jest.Mocked<typeof registry>;
const mockLifecycle = lifecycle as jest.Mocked<typeof lifecycle>;

function makeCtx(input: Record<string, unknown> = {}): ExecutionContextImpl {
  return new ExecutionContextImpl({
    runId: 'run-1',
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
});

describe('resolveEdges', () => {
  it('returns all unconditional targets when present', async () => {
    const edges: AgentGraphDefinition['edges'] = [
      { id: 'e1', from: 'a', to: 'b', type: 'unconditional' },
      { id: 'e2', from: 'a', to: 'c', type: 'unconditional' },
    ];
    const result = await resolveEdges(edges, 'a', {});
    expect(result).toEqual(['b', 'c']);
  });

  it('ignores unconditional edges when none exist, returns matching conditional', async () => {
    const edges: AgentGraphDefinition['edges'] = [
      { id: 'e1', from: 'a', to: 'b', type: 'conditional', condition: '$._condition = true' },
      { id: 'e2', from: 'a', to: 'c', type: 'conditional', condition: '$._condition = false' },
    ];
    const result = await resolveEdges(edges, 'a', { _condition: true });
    expect(result).toEqual(['b']);
  });

  it('falls back to fallback edge when no conditional matches', async () => {
    const edges: AgentGraphDefinition['edges'] = [
      { id: 'e1', from: 'a', to: 'b', type: 'conditional', condition: '$._condition = true' },
      { id: 'e2', from: 'a', to: 'fallback-node', type: 'fallback' },
    ];
    const result = await resolveEdges(edges, 'a', { _condition: false });
    expect(result).toEqual(['fallback-node']);
  });

  it('returns empty array when no edges exist from node', async () => {
    const result = await resolveEdges([], 'a', {});
    expect(result).toEqual([]);
  });

  it('returns empty array when conditional fails and no fallback', async () => {
    const edges: AgentGraphDefinition['edges'] = [
      { id: 'e1', from: 'a', to: 'b', type: 'conditional', condition: '$._condition = true' },
    ];
    const result = await resolveEdges(edges, 'a', { _condition: false });
    expect(result).toEqual([]);
  });

  it('skips conditional edges with evaluation errors and falls back', async () => {
    const edges: AgentGraphDefinition['edges'] = [
      { id: 'e1', from: 'a', to: 'b', type: 'conditional', condition: '$[[[invalid' },
      { id: 'e2', from: 'a', to: 'c', type: 'fallback' },
    ];
    const result = await resolveEdges(edges, 'a', {});
    expect(result).toEqual(['c']);
  });
});

describe('executeGraph', () => {
  it('executes a linear start → end graph', async () => {
    const mockStart = { execute: jest.fn().mockResolvedValue({ status: 'complete', outputs: { x: 1 } }) };
    const mockEnd = { execute: jest.fn().mockResolvedValue({ status: 'complete', outputs: { x: 1 } }) };

    mockRegistry.get.mockImplementation((type: string) => {
      if (type === 'core:start') return mockStart as any;
      if (type === 'core:end') return mockEnd as any;
      throw new Error(`Unknown type: ${type}`);
    });

    const graph = makeGraph(
      {
        start: { type: 'core:start', config: {} },
        end: { type: 'core:end', config: {} },
      },
      [{ id: 'e1', from: 'start', to: 'end', type: 'unconditional' }],
      'start',
    );

    const ctx = makeCtx({ input: 'hello' });
    await executeGraph('run-1', graph, ctx);

    expect(mockStart.execute).toHaveBeenCalledTimes(1);
    expect(mockEnd.execute).toHaveBeenCalledTimes(1);
    expect(mockLifecycle.writeStepStart).toHaveBeenCalledTimes(2);
    expect(mockLifecycle.writeStepEnd).toHaveBeenCalledTimes(2);
  });

  it('stops early when node returns _terminated: true', async () => {
    const mockStop = {
      execute: jest.fn().mockResolvedValue({
        status: 'complete',
        outputs: { _terminated: true },
      }),
    };
    const mockEnd = { execute: jest.fn() };

    mockRegistry.get.mockImplementation((type: string) => {
      if (type === 'core:stop') return mockStop as any;
      if (type === 'core:end') return mockEnd as any;
      throw new Error(`Unknown type: ${type}`);
    });

    const graph = makeGraph(
      {
        stop: { type: 'core:stop', config: {} },
        end: { type: 'core:end', config: {} },
      },
      [{ id: 'e1', from: 'stop', to: 'end', type: 'unconditional' }],
      'stop',
    );

    await executeGraph('run-1', graph, makeCtx());

    expect(mockStop.execute).toHaveBeenCalledTimes(1);
    expect(mockEnd.execute).not.toHaveBeenCalled();
  });

  it('throws and calls writeStepFailed when node throws', async () => {
    const err = new Error('Node blew up');
    const mockBad = { execute: jest.fn().mockRejectedValue(err) };

    mockRegistry.get.mockReturnValue(mockBad as any);

    const graph = makeGraph(
      { bad: { type: 'core:bad', config: {} } },
      [],
      'bad',
    );

    await expect(executeGraph('run-1', graph, makeCtx())).rejects.toThrow('Node blew up');
    expect(mockLifecycle.writeStepFailed).toHaveBeenCalledWith('step-1', expect.objectContaining({ code: 'NODE_EXECUTION_ERROR' }));
  });

  it('does not revisit nodes already in the visited set', async () => {
    const mockNode = { execute: jest.fn().mockResolvedValue({ status: 'complete', outputs: {} }) };
    mockRegistry.get.mockReturnValue(mockNode as any);

    const graph = makeGraph(
      { a: { type: 'any', config: {} }, b: { type: 'any', config: {} } },
      [
        { id: 'e1', from: 'a', to: 'b', type: 'unconditional' },
        { id: 'e2', from: 'b', to: 'a', type: 'unconditional' }, // cycle back
      ],
      'a',
    );

    await executeGraph('run-1', graph, makeCtx());
    // each node visited exactly once despite the cycle
    expect(mockNode.execute).toHaveBeenCalledTimes(2);
  });
});
