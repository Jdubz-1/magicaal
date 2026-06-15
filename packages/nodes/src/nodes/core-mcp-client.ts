import type { NodeModule } from '@magicaal/sdk-node';

interface McpClientConfig {
  serverId: string;
  mode: 'direct' | 'funnel';
  toolName?: string;
  inputKey?: string;
  outputKey?: string;
}

export const coreMcpClient: NodeModule<McpClientConfig> = {
  type: 'core:mcp-client',
  meta: {
    name: 'MCP Client',
    description: 'Connects to a registered MCP server. Direct mode: calls a single named tool in graph flow. Funnel mode: exposes all server tools via a tool edge to an agent node.',
    category: 'integration',
    icon: 'plug',
    version: '1.0.0',
  },
  schema: {
    config: {
      type: 'object',
      required: ['serverId', 'mode'],
      properties: {
        serverId:  { type: 'string', description: 'ID of the registered MCP server' },
        mode:      { type: 'string', enum: ['direct', 'funnel'], description: 'direct: single tool call in graph flow; funnel: expose all tools via tool edge' },
        toolName:  { type: 'string', description: 'Tool name to call (direct mode only)' },
        inputKey:  { type: 'string', description: 'Context key containing tool arguments (direct mode)' },
        outputKey: { type: 'string', description: 'Context key to write tool result (direct mode)' },
      },
    },
    input:  { type: 'object', properties: {} },
    output: { type: 'object', properties: {} },
  },
  async execute(ctx, config) {
    if (config.mode === 'funnel') {
      // Funnel mode: assembleTools() in tool-executor reads this node's config to populate tools.
      // This node is a no-op when executed in graph flow.
      return { status: 'complete', outputs: {} };
    }

    // Direct mode: engine worker handles this as a special case (like core:tool-call/react),
    // calling mcpRegistry.callTool() with the engine-level MCP client pool.
    // This fallback is only reached if called outside the engine (e.g., unit tests).
    if (!config.toolName) {
      return {
        status: 'failed',
        outputs: {},
        error: { code: 'MCP_CONFIG_ERROR', message: 'toolName required for direct mode', retryable: false },
      };
    }
    // ctx may expose _callMcpTool if injected by ExecutionContextImpl
    const ctxExt = ctx as unknown as { _callMcpTool?: (nodeId: string, toolName: string, args: Record<string, unknown>) => Promise<unknown> };
    if (!ctxExt._callMcpTool) {
      return {
        status: 'failed',
        outputs: {},
        error: { code: 'MCP_NOT_AVAILABLE', message: 'MCP not available outside engine context', retryable: false },
      };
    }
    // Use _currentNodeId injected by the engine worker before execute() is called
    const nodeId = (ctx as unknown as Record<string, unknown>)._currentNodeId as string | undefined;
    if (!nodeId) {
      return { status: 'failed', outputs: {}, error: { code: 'MCP_NODE_ID_MISSING', message: 'Node ID not available — must run inside the engine', retryable: false } };
    }
    const args = ctx.get<Record<string, unknown>>(config.inputKey ?? 'input') ?? {};
    const outputKey = config.outputKey ?? 'mcp_result';
    try {
      const result = await ctxExt._callMcpTool(nodeId, config.toolName, args);
      ctx.set(outputKey, result);
      return { status: 'complete', outputs: { [outputKey]: result } };
    } catch (err) {
      return { status: 'failed', outputs: {}, error: { code: 'MCP_TOOL_ERROR', message: err instanceof Error ? err.message : String(err), retryable: false } };
    }
  },
};
