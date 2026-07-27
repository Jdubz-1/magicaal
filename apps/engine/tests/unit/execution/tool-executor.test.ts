import type { AgentGraphDefinition, ModelRouterTarget } from '@magicaal/core';

jest.mock('@/lib/logger', () => ({
  logger: { info: jest.fn(), debug: jest.fn(), warn: jest.fn(), error: jest.fn() },
}));
jest.mock('@/execution/run-control', () => ({
  checkAbort: jest.fn().mockResolvedValue(null),
  abortError: jest.fn(),
}));
jest.mock('@/mcp/mcp-registry', () => ({
  mcpRegistry: { getServerConfig: jest.fn(), releaseForRun: jest.fn() },
}));

import { runAgentLoop } from '../../../src/execution/tool-executor';
import { ExecutionContextImpl } from '../../../src/execution/context';

const mockTarget: ModelRouterTarget = {
  id: 'target-a',
  connectionId: 'conn-a',
  provider: 'openai',
  model: 'gpt-4o',
};

function makeGraph(): AgentGraphDefinition {
  return {
    version: '1',
    name: 'test-graph',
    entry: 'agent',
    nodes: {
      agent: { id: 'agent', type: 'core:tool-call', config: { inputKey: 'task', outputKey: 'answer' } },
    },
    edges: [],
    toolEdges: [],
    workspaceEdges: [],
    config: {} as AgentGraphDefinition['config'],
  };
}

function makeCtx(input: Record<string, unknown>): ExecutionContextImpl {
  return new ExecutionContextImpl({
    runId: 'run-1',
    agentId: 'agent-1',
    tenantId: 'tenant-1',
    triggerType: 'api',
    input,
  });
}

describe('runAgentLoop', () => {
  it('reads its opening message from the configured inputKey', async () => {
    const ctx = makeCtx({ task: 'Please help with X' });
    const llmCallSpy = jest.spyOn(ctx, 'llmCall').mockResolvedValue({
      content: 'Sure thing',
      stopReason: 'end_turn',
      usage: { promptTokens: 1, completionTokens: 1, estimatedCostUsd: 0 },
      routingMeta: { targetUsed: mockTarget, attemptCount: 1, triggerHistory: [] },
    });

    const graph = makeGraph();
    const result = await runAgentLoop(graph.nodes.agent, graph, ctx, 'tool-call');

    expect(result.status).toBe('complete');
    const request = llmCallSpy.mock.calls[0][0];
    expect(request.messages).toEqual([{ role: 'user', content: 'Please help with X' }]);
  });

  it('appends a context-provided systemPromptSuffix to the configured systemPrompt on every iteration', async () => {
    const ctx = makeCtx({ task: 'Do the thing', systemPromptSuffix: 'Tenant-configured addendum.' });
    const llmCallSpy = jest.spyOn(ctx, 'llmCall').mockResolvedValue({
      content: 'Done',
      stopReason: 'end_turn',
      usage: { promptTokens: 1, completionTokens: 1, estimatedCostUsd: 0 },
      routingMeta: { targetUsed: mockTarget, attemptCount: 1, triggerHistory: [] },
    });

    const graph = makeGraph();
    graph.nodes.agent.config = { ...graph.nodes.agent.config, systemPrompt: 'Base prompt.' };
    await runAgentLoop(graph.nodes.agent, graph, ctx, 'tool-call');

    const request = llmCallSpy.mock.calls[0][0];
    expect(request.system).toBe('Base prompt.\n\nTenant-configured addendum.');
  });

  it('uses the bare systemPromptSuffix as the system prompt when the node has none configured', async () => {
    const ctx = makeCtx({ task: 'Do the thing', systemPromptSuffix: 'Only the addendum.' });
    const llmCallSpy = jest.spyOn(ctx, 'llmCall').mockResolvedValue({
      content: 'Done',
      stopReason: 'end_turn',
      usage: { promptTokens: 1, completionTokens: 1, estimatedCostUsd: 0 },
      routingMeta: { targetUsed: mockTarget, attemptCount: 1, triggerHistory: [] },
    });

    const graph = makeGraph();
    await runAgentLoop(graph.nodes.agent, graph, ctx, 'tool-call');

    const request = llmCallSpy.mock.calls[0][0];
    expect(request.system).toBe('Only the addendum.');
  });
});
