import type { AgentGraphDefinition } from '@magicaal/core';

jest.mock('better-sqlite3');
jest.mock('@/lib/logger', () => ({
  logger: { info: jest.fn(), debug: jest.fn(), warn: jest.fn(), error: jest.fn() },
}));

import Database from 'better-sqlite3';

const mockGet = jest.fn();
const mockPrepare = jest.fn().mockReturnValue({ get: mockGet });
const mockDb = { prepare: mockPrepare, pragma: jest.fn() };

(Database as unknown as jest.Mock).mockReturnValue(mockDb);

// Import after mock setup so the module-level sqlite is fresh
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { graphLoader } = require('../../../src/graph/graph-loader') as {
  graphLoader: {
    load(id: string, tenantId: string): Promise<AgentGraphDefinition>;
    invalidate(id: string): void;
    invalidateAll(): void;
  };
};

const sampleGraph: AgentGraphDefinition = {
  version: '1',
  name: 'test-graph',
  entry: 'start',
  nodes: { start: { id: 'start', type: 'core:start', config: {} } },
  edges: [],
  toolEdges: [],
  workspaceEdges: [],
  config: {} as AgentGraphDefinition['config'],
};

beforeEach(() => {
  jest.clearAllMocks();
  mockPrepare.mockReturnValue({ get: mockGet });
  graphLoader.invalidateAll();
});

describe('GraphLoader.load', () => {
  it('parses and returns graph from database', async () => {
    mockGet.mockReturnValue({ graph_json: JSON.stringify(sampleGraph) });
    const result = await graphLoader.load('agent-1', 't1');
    expect(result).toEqual(sampleGraph);
    expect(mockPrepare).toHaveBeenCalledTimes(1);
  });

  it('returns cached result on second call without hitting DB again', async () => {
    mockGet.mockReturnValue({ graph_json: JSON.stringify(sampleGraph) });

    await graphLoader.load('agent-cache', 't1');
    await graphLoader.load('agent-cache', 't1');

    expect(mockGet).toHaveBeenCalledTimes(1);
  });

  it('throws AGENT_NOT_FOUND when row is not found', async () => {
    mockGet.mockReturnValue(undefined);
    await expect(graphLoader.load('missing-agent', 't1')).rejects.toMatchObject({
      code: 'AGENT_NOT_FOUND',
    });
  });

  it('queries different agents independently', async () => {
    mockGet
      .mockReturnValueOnce({ graph_json: JSON.stringify({ ...sampleGraph, entry: 'a' }) })
      .mockReturnValueOnce({ graph_json: JSON.stringify({ ...sampleGraph, entry: 'b' }) });

    const r1 = await graphLoader.load('agent-a', 't1');
    const r2 = await graphLoader.load('agent-b', 't1');

    expect(r1.entry).toBe('a');
    expect(r2.entry).toBe('b');
  });
});

describe('GraphLoader.invalidate', () => {
  it('removes a single agent from cache, forcing re-fetch', async () => {
    mockGet.mockReturnValue({ graph_json: JSON.stringify(sampleGraph) });

    await graphLoader.load('agent-x', 't1');
    graphLoader.invalidate('agent-x');
    await graphLoader.load('agent-x', 't1');

    expect(mockGet).toHaveBeenCalledTimes(2);
  });

  it('does not affect other cached agents', async () => {
    mockGet.mockReturnValue({ graph_json: JSON.stringify(sampleGraph) });

    await graphLoader.load('agent-keep', 't1');
    await graphLoader.load('agent-remove', 't1');
    graphLoader.invalidate('agent-remove');
    await graphLoader.load('agent-keep', 't1'); // should use cache

    expect(mockGet).toHaveBeenCalledTimes(2); // agent-keep once, agent-remove once
  });
});

describe('GraphLoader.invalidateAll', () => {
  it('clears all entries from cache', async () => {
    mockGet.mockReturnValue({ graph_json: JSON.stringify(sampleGraph) });

    await graphLoader.load('a1', 't1');
    await graphLoader.load('a2', 't1');
    graphLoader.invalidateAll();
    await graphLoader.load('a1', 't1');
    await graphLoader.load('a2', 't1');

    expect(mockGet).toHaveBeenCalledTimes(4);
  });
});
