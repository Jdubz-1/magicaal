import type {
  AgentGraphDefinition,
  NodeDefinition,
  AssembledTool,
  CanonicalLLMRequest,
  CanonicalMessage,
  CanonicalTool,
  CanonicalToolCall,
  ModelRouterConfig,
} from '@magicaal/core';
import type { NodeOutput } from '@magicaal/sdk-node';
import { RunParams, ExecutionContextImpl as CtxImpl } from './context';
import type { ExecutionContextImpl } from './context';
import { resolveEdges } from './graph-utils';
import { mcpRegistry } from '../mcp/mcp-registry';
import { registry } from '../registry/node-registry';
import { logger } from '../lib/logger';
import { checkAbort, abortError } from './run-control';

// ── Config shapes ─────────────────────────────────────────────────────────────

interface ToolCallConfig {
  inputKey: string;
  outputKey: string;
  systemPrompt?: string;
  maxIterations?: number;
  router?: ModelRouterConfig;
}

interface ToolNodeConfig {
  name: string;
  description: string;
  inputSchema: object;
  inputMapping: Record<string, string>;
  outputMapping: string;
}

interface McpClientConfig {
  serverId: string;
  mode: 'direct' | 'funnel';
  toolName?: string;
  outputKey?: string;
}

// ── assembleTools ─────────────────────────────────────────────────────────────

export async function assembleTools(
  agentNodeId: string,
  graph: AgentGraphDefinition,
  ctx: ExecutionContextImpl,
): Promise<AssembledTool[]> {
  const tools: AssembledTool[] = [];

  for (const edge of graph.toolEdges) {
    if (edge.to !== agentNodeId) continue;
    const sourceNode = graph.nodes[edge.from];
    if (!sourceNode) {
      // Not a node placed in this graph — may be a standalone registered
      // NodeModule referenced by type name (e.g. Caal's this.tool('caal.graph.read', ...)).
      const snapshot = (ctx as unknown as Record<string, unknown>)._registrySnapshot as
        | ReturnType<typeof registry.snapshot>
        | undefined;
      const source = snapshot ?? registry;
      let module;
      try {
        module = source.get(edge.from);
      } catch {
        logger.warn({ toolEdgeFrom: edge.from, agentNodeId }, 'Tool edge source not found as graph node or registered node type — skipping');
        continue;
      }
      tools.push({
        name: module.type,
        description: module.meta.description,
        inputSchema: module.schema.config,
        source: 'native',
        nodeId: edge.from,
      });
      continue;
    }

    if (sourceNode.type === 'core:tool') {
      const cfg = sourceNode.config as unknown as ToolNodeConfig;
      tools.push({
        name: cfg.name,
        description: cfg.description,
        inputSchema: cfg.inputSchema,
        source: 'graph',
        nodeId: sourceNode.id,
      });
    } else if (sourceNode.type === 'core:mcp-client') {
      const cfg = sourceNode.config as unknown as McpClientConfig;
      if (cfg.mode === 'funnel') {
        try {
          const client = await mcpRegistry.getClient(sourceNode.id, cfg.serverId, ctx.runId);
          const mcpTools = await client.listTools();
          for (const t of mcpTools) {
            tools.push({
              name: t.name,
              description: t.description,
              inputSchema: t.inputSchema,
              source: 'mcp',
              nodeId: sourceNode.id,
              mcpToolName: t.name,
            });
          }
        } catch (err) {
          logger.warn({ nodeId: sourceNode.id, err }, 'Failed to list MCP tools — skipping');
        }
      } else if (cfg.mode === 'direct' && cfg.toolName) {
        tools.push({
          name: cfg.toolName,
          description: `MCP tool: ${cfg.toolName}`,
          inputSchema: {},
          source: 'mcp',
          nodeId: sourceNode.id,
          mcpToolName: cfg.toolName,
        });
      }
    }
  }

  return tools;
}

// ── runAgentLoop ──────────────────────────────────────────────────────────────

export async function runAgentLoop(
  nodeDef: NodeDefinition,
  graph: AgentGraphDefinition,
  ctx: ExecutionContextImpl,
  mode: 'tool-call' | 'react',
): Promise<NodeOutput> {
  const config = nodeDef.config as unknown as ToolCallConfig;
  const maxIterations = config.maxIterations ?? 10;
  const inputKey = config.inputKey ?? 'input';
  const outputKey = config.outputKey ?? 'output';

  const tools = await assembleTools(nodeDef.id, graph, ctx);
  const canonicalTools: CanonicalTool[] = tools.map((t) => ({
    name: t.name,
    description: t.description,
    inputSchema: t.inputSchema,
  }));

  const initialInput = ctx.get(inputKey);
  const conversation: CanonicalMessage[] = [
    { role: 'user', content: typeof initialInput === 'string' ? initialInput : JSON.stringify(initialInput) },
  ];

  // A tenant-level system prompt suffix (or any other caller-supplied
  // addendum) rides in on ctx.data rather than static node config, since it
  // varies per invocation, not per compiled graph.
  const promptSuffix = ctx.get<string>('systemPromptSuffix');
  const system = [config.systemPrompt, promptSuffix].filter(Boolean).join('\n\n') || undefined;

  let lastRoutingMeta: NodeOutput['routingMeta'];

  for (let iteration = 1; iteration <= maxIterations; iteration++) {
    // Cooperative abort — long agentic loops honour cancellation/timeout
    // between LLM iterations, not just at graph-node boundaries.
    const abort = await checkAbort(ctx.runId);
    if (abort) throw abortError(abort);

    const request: CanonicalLLMRequest = {
      system,
      messages: conversation,
      tools: canonicalTools.length > 0 ? canonicalTools : undefined,
      metadata: { agentNodeId: nodeDef.id, mode, iteration },
    };

    const response = await ctx.llmCall(request, config.router ?? null);
    lastRoutingMeta = response.routingMeta;

    if (mode === 'react') {
      ctx.recordTrajectoryStep({
        iteration,
        reasoning: response.content,
        llmResponse: response.content,
      });
    }

    if (!response.toolCalls || response.toolCalls.length === 0) {
      ctx.set(outputKey, response.content);
      return {
        status: 'complete',
        outputs: { [outputKey]: response.content },
        routingMeta: lastRoutingMeta,
      };
    }

    // Invoke tools — parallel for tool-call, serial for react
    let toolResults: Array<{ toolCall: CanonicalToolCall; content: string }>;
    if (mode === 'tool-call') {
      toolResults = await Promise.all(
        response.toolCalls.map((tc) => invokeToolCall(tc, tools, graph, ctx)),
      );
    } else {
      toolResults = [];
      for (const tc of response.toolCalls) {
        toolResults.push(await invokeToolCall(tc, tools, graph, ctx));
      }
    }

    for (const { toolCall, content } of toolResults) {
      if (mode === 'react') {
        ctx.recordTrajectoryStep({
          iteration,
          toolSelected: toolCall.name,
          toolInputs: toolCall.input,
          toolOutputs: { result: content },
        });
      }
    }

    // Build tool_result messages
    const assistantContent: Array<{ type: 'text'; text: string } | { type: 'tool_use'; id: string; name: string; input: Record<string, unknown> }> = [
      { type: 'text', text: response.content },
      ...response.toolCalls.map((tc) => ({
        type: 'tool_use' as const,
        id: tc.id,
        name: tc.name,
        input: tc.input,
      })),
    ];
    conversation.push({ role: 'assistant', content: assistantContent });

    for (const { toolCall, content } of toolResults) {
      conversation.push({
        role: 'tool_result',
        content,
        toolCallId: toolCall.id,
      });
    }
  }

  return {
    status: 'failed',
    outputs: {},
    error: {
      code: 'MAX_ITERATIONS_REACHED',
      message: `Agent node "${nodeDef.id}" exceeded maxIterations (${maxIterations})`,
      retryable: false,
    },
  };
}

// ── Tool invocation helpers ───────────────────────────────────────────────────

async function invokeToolCall(
  toolCall: CanonicalToolCall,
  tools: AssembledTool[],
  graph: AgentGraphDefinition,
  ctx: ExecutionContextImpl,
): Promise<{ toolCall: CanonicalToolCall; content: string }> {
  const tool = tools.find((t) => t.name === toolCall.name);
  if (!tool) {
    logger.warn({ toolName: toolCall.name }, 'Unknown tool called by LLM');
    return { toolCall, content: JSON.stringify({ error: `Unknown tool: ${toolCall.name}` }) };
  }

  try {
    let content: string;
    if (tool.source === 'graph') {
      content = await invokeGraphTool(tool.nodeId, toolCall.input, graph, ctx);
    } else if (tool.source === 'native') {
      content = await invokeNativeTool(tool.nodeId, toolCall.input, ctx);
    } else {
      content = await invokeMcpTool(tool.nodeId, tool.mcpToolName!, toolCall.input, ctx);
    }
    return { toolCall, content };
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    logger.warn({ toolName: toolCall.name, err: msg }, 'Tool invocation failed');
    return { toolCall, content: JSON.stringify({ error: msg }) };
  }
}

async function invokeGraphTool(
  toolNodeId: string,
  args: Record<string, unknown>,
  graph: AgentGraphDefinition,
  ctx: ExecutionContextImpl,
): Promise<string> {
  const toolNode = graph.nodes[toolNodeId];
  if (!toolNode) throw new Error(`Tool node ${toolNodeId} not found in graph`);
  const cfg = toolNode.config as unknown as ToolNodeConfig;

  // Build sub-context data: apply inputMapping (LLM arg name → context key)
  const subData: Record<string, unknown> = { ...ctx.data };
  for (const [argName, contextKey] of Object.entries(cfg.inputMapping ?? {})) {
    if (args[argName] !== undefined) {
      subData[contextKey] = args[argName];
    }
  }
  // Also spread all args directly for nodes that read from well-known keys
  Object.assign(subData, args);

  const subCtx = new CtxImpl({
    runId: ctx.runId,
    agentId: ctx.agentId,
    tenantId: ctx.tenantId,
    triggerType: ctx.triggerType,
    input: subData,
    graphDefaultRouter: ctx.graphDefaultRouter,
    tenantRouterPolicy: ctx.tenantRouterPolicy,
  } as RunParams);
  // Share credentials
  Object.assign((subCtx as unknown as { credentials: Record<string, unknown> }).credentials, ctx.credentials);

  // Run the downstream action graph from this tool node's outbound flow edges
  const nextNodeIds = await resolveEdges(graph.edges, toolNodeId, subCtx.data);
  await runSubGraph(ctx.runId, graph, subCtx, nextNodeIds, null);

  const result = subCtx.get(cfg.outputMapping);
  return result !== undefined ? JSON.stringify(result) : '{}';
}

async function invokeNativeTool(
  moduleType: string,
  args: Record<string, unknown>,
  ctx: ExecutionContextImpl,
): Promise<string> {
  const snapshot = (ctx as unknown as Record<string, unknown>)._registrySnapshot as
    | ReturnType<typeof registry.snapshot>
    | undefined;
  const source = snapshot ?? registry;
  const module = source.get(moduleType);

  // Invoked directly against the shared ctx (no forked sub-context) — these
  // tools accumulate staged state across calls within one agentic loop
  // (e.g. Caal's _caal_patches), which a fork would never see.
  const output = await module.execute(ctx, args);
  if (output.status === 'failed') {
    return JSON.stringify({ error: output.error?.message ?? 'Tool execution failed' });
  }
  return JSON.stringify(output.outputs ?? {});
}

async function invokeMcpTool(
  mcpClientNodeId: string,
  toolName: string,
  args: Record<string, unknown>,
  ctx: ExecutionContextImpl,
): Promise<string> {
  // The mcpRegistry was populated by assembleTools using the node's serverId
  const result = await mcpRegistry.callTool(mcpClientNodeId, ctx.runId, toolName, args);
  return typeof result === 'string' ? result : JSON.stringify(result);
}

// ── Sub-graph runner ──────────────────────────────────────────────────────────

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let _executeNodeOnce: ((runId: string, node: NodeDefinition, ctx: any) => Promise<NodeOutput>) | null = null;

// Injected by worker.ts to avoid circular import
export function registerExecuteNodeOnce(
  fn: (runId: string, node: NodeDefinition, ctx: ExecutionContextImpl) => Promise<NodeOutput>,
): void {
  _executeNodeOnce = fn;
}

export async function runSubGraph(
  runId: string,
  graph: AgentGraphDefinition,
  ctx: ExecutionContextImpl,
  startNodeIds: string[],
  stopAtNodeId: string | null,
): Promise<void> {
  if (!_executeNodeOnce) throw new Error('executeNodeOnce not registered — worker not initialised');

  const queue = [...startNodeIds];
  const visited = new Set<string>();

  while (queue.length > 0) {
    const nodeId = queue.shift()!;
    if (visited.has(nodeId) || nodeId === stopAtNodeId) continue;
    visited.add(nodeId);

    const nodeDef = graph.nodes[nodeId];
    if (!nodeDef) continue;

    const output = await _executeNodeOnce(runId, nodeDef, ctx);
    if (output.status === 'suspended' || ctx.isSuspended) return;
    if (output.outputs?._terminated === true) return;

    const nextIds = await resolveEdges(graph.edges, nodeId, ctx.data);
    queue.push(...nextIds.filter((id) => !visited.has(id) && id !== stopAtNodeId));
  }
}
