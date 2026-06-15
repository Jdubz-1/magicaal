import type { NodeModule } from '@magicaal/sdk-node';

interface HandoffConfig {
  agentId: string;
  messageKey: string;
  outputKey?: string;
}

export const coreHandoff: NodeModule<HandoffConfig> = {
  type: 'core:handoff',
  meta: {
    name: 'Handoff',
    description: 'Delegates to a target agent with an explicit handoff message. Fire-and-forget; recorded as a named delegation event in the run trace.',
    category: 'composition',
    icon: 'send',
    version: '1.0.0',
  },
  schema: {
    config: {
      type: 'object',
      required: ['agentId', 'messageKey'],
      properties: {
        agentId:    { type: 'string', description: 'ID of the target agent' },
        messageKey: { type: 'string', description: 'Context key containing the handoff message' },
        outputKey:  { type: 'string', description: 'Context key to write the dispatched run ID' },
      },
    },
    input:  {},
    output: {},
  },
  async execute(ctx, config) {
    const message = ctx.get(config.messageKey) ?? '';

    const ctxExt = ctx as unknown as {
      dispatchSubRun?: (agentId: string, input: Record<string, unknown>, opts?: { await?: boolean }) => Promise<{ runId: string; output?: Record<string, unknown> }>;
    };

    if (!ctxExt.dispatchSubRun) {
      return {
        status: 'failed',
        outputs: {},
        error: { code: 'HANDOFF_NOT_AVAILABLE', message: 'dispatchSubRun not available outside engine context', retryable: false },
      };
    }

    ctx.emit('handoff', { targetAgentId: config.agentId, message: String(message), timestamp: new Date().toISOString() });

    const result = await ctxExt.dispatchSubRun(config.agentId, { message }, { await: false });
    const outputKey = config.outputKey ?? '_handoff_run_id';
    ctx.set(outputKey, result.runId);

    return { status: 'complete', outputs: { [outputKey]: result.runId } };
  },
};
