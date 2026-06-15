import type { NodeModule } from '@magicaal/sdk-node';

interface SubGraphConfig {
  agentId: string;
  inputKey?: string;
  outputKey?: string;
  await?: boolean;
}

export const coreSubGraph: NodeModule<SubGraphConfig> = {
  type: 'core:sub-graph',
  meta: {
    name: 'Sub-Graph',
    description: 'Invokes another agent as a child run. Awaitable or fire-and-forget.',
    category: 'composition',
    icon: 'git-fork',
    version: '1.0.0',
  },
  schema: {
    config: {
      type: 'object',
      required: ['agentId'],
      properties: {
        agentId:   { type: 'string', description: 'ID of the target agent to invoke' },
        inputKey:  { type: 'string', description: 'Context key containing the sub-graph input (default: input)' },
        outputKey: { type: 'string', description: 'Context key to write the sub-graph output (default: sub_graph_output)' },
        await:     { type: 'boolean', description: 'Wait for completion (default: true)' },
      },
    },
    input:  {},
    output: {},
  },
  async execute(ctx, config) {
    const input = ctx.get<Record<string, unknown>>(config.inputKey ?? 'input') ?? {};
    const shouldAwait = config.await !== false;

    const ctxExt = ctx as unknown as {
      dispatchSubRun?: (agentId: string, input: Record<string, unknown>, opts?: { await?: boolean }) => Promise<{ runId: string; output?: Record<string, unknown> }>;
    };

    if (!ctxExt.dispatchSubRun) {
      return {
        status: 'failed',
        outputs: {},
        error: { code: 'SUB_GRAPH_NOT_AVAILABLE', message: 'dispatchSubRun not available outside engine context', retryable: false },
      };
    }

    const result = await ctxExt.dispatchSubRun(config.agentId, input, { await: shouldAwait });

    const outputKey = config.outputKey ?? 'sub_graph_output';
    ctx.set(outputKey, result.output ?? { runId: result.runId });
    ctx.set('_sub_run_id', result.runId);

    return {
      status: 'complete',
      outputs: { [outputKey]: result.output ?? { runId: result.runId }, _sub_run_id: result.runId },
    };
  },
};
