import type { AgentGraphDefinition, ModelRouterTarget } from '@magicaal/core';
import type { NodeModule, ExecutionContext } from '@magicaal/sdk-node';

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

import { runAgentLoop, assembleTools } from '../../../src/execution/tool-executor';
import { ExecutionContextImpl } from '../../../src/execution/context';
import { registry } from '../../../src/registry/node-registry';

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

describe('native tools (tool edges whose source is a registered node type, not a graph node)', () => {
  const NATIVE_TOOL_TYPE = 'test.native.stage-patch';
  let executeSpy: jest.Mock;

  beforeEach(() => {
    executeSpy = jest.fn(async (ctx: ExecutionContext, args: { note: string }) => {
      // Mutates the *shared* ctx.data directly — mirroring Caal's tools,
      // which stage state (e.g. _caal_patches) across multiple calls within
      // one agentic loop. A forked sub-context (like invokeGraphTool uses)
      // would never let this be visible to the caller.
      const staged = (ctx.get<string[]>('staged') ?? []).concat(args.note);
      ctx.set('staged', staged);
      return { status: 'complete', outputs: { staged } };
    });

    const nativeToolModule: NodeModule = {
      type: NATIVE_TOOL_TYPE,
      meta: { name: 'Stage Patch', description: 'Stage a test patch', category: 'integration', version: '0.1.0' },
      schema: {
        config: { type: 'object', properties: { note: { type: 'string' } }, required: ['note'] },
        input: {},
        output: {},
      },
      execute: executeSpy,
    };
    registry.register(nativeToolModule);
  });

  function makeGraphWithNativeTool(): AgentGraphDefinition {
    const graph = makeGraph();
    graph.toolEdges = [{ id: 'te-1', from: NATIVE_TOOL_TYPE, to: 'agent' }];
    return graph;
  }

  it('assembleTools resolves a tool edge whose source is a registered node type rather than a graph node', async () => {
    const ctx = makeCtx({ task: 'go' });
    const graph = makeGraphWithNativeTool();

    const tools = await assembleTools('agent', graph, ctx);

    expect(tools).toEqual([
      {
        name: NATIVE_TOOL_TYPE,
        description: 'Stage a test patch',
        inputSchema: { type: 'object', properties: { note: { type: 'string' } }, required: ['note'] },
        source: 'native',
        nodeId: NATIVE_TOOL_TYPE,
      },
    ]);
  });

  it('invokes the native tool module directly against the shared ctx, so its side effects are visible to the caller', async () => {
    const ctx = makeCtx({ task: 'go' });
    const graph = makeGraphWithNativeTool();

    const llmCallSpy = jest.spyOn(ctx, 'llmCall');
    llmCallSpy
      .mockResolvedValueOnce({
        content: 'Staging a patch',
        stopReason: 'tool_use',
        usage: { promptTokens: 1, completionTokens: 1, estimatedCostUsd: 0 },
        toolCalls: [{ id: 'call-1', name: NATIVE_TOOL_TYPE, input: { note: 'first' } }],
        routingMeta: { targetUsed: mockTarget, attemptCount: 1, triggerHistory: [] },
      })
      .mockResolvedValueOnce({
        content: 'Done',
        stopReason: 'end_turn',
        usage: { promptTokens: 1, completionTokens: 1, estimatedCostUsd: 0 },
        routingMeta: { targetUsed: mockTarget, attemptCount: 1, triggerHistory: [] },
      });

    const result = await runAgentLoop(graph.nodes.agent, graph, ctx, 'tool-call');

    expect(result.status).toBe('complete');
    expect(executeSpy).toHaveBeenCalledTimes(1);
    // The execute call received the very same ctx passed into runAgentLoop —
    // not a forked copy — so its mutation of ctx.data is visible here.
    expect(executeSpy.mock.calls[0][0]).toBe(ctx);
    expect(ctx.get('staged')).toEqual(['first']);

    const toolResultMessage = llmCallSpy.mock.calls[1][0].messages.find(
      (m) => m.role === 'tool_result',
    );
    expect(toolResultMessage?.content).toBe(JSON.stringify({ staged: ['first'] }));
  });
});
