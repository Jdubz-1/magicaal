import type { NodeModule } from '@magicaal/sdk-node';
import type { ExecutionContext } from '@magicaal/sdk-node';

interface SessionReadConfig {
  reads: Record<string, string>; // { contextKey: sessionKey }
}

export const coreSessionRead: NodeModule<SessionReadConfig> = {
  type: 'core:session-read',
  meta: {
    name: 'Session Read',
    description:
      'Reads values from the session context into the run context. Values are already preloaded at run start; this node makes them explicit in the graph flow.',
    category: 'session',
    icon: 'database',
    version: '1.0.0',
  },
  schema: {
    config: {
      type: 'object',
      required: ['reads'],
      properties: {
        reads: {
          type: 'object',
          description: 'Mapping of { targetContextKey: sessionKey }. Reads the given session keys into run context.',
          additionalProperties: { type: 'string' },
        },
      },
    },
    input: {},
    output: {},
  },

  async execute(ctx: ExecutionContext, config: SessionReadConfig) {
    const outputs: Record<string, unknown> = {};
    for (const [targetKey, sessionKey] of Object.entries(config.reads)) {
      const value = ctx.get(sessionKey);
      if (value !== undefined) {
        ctx.set(targetKey, value);
        outputs[targetKey] = value;
      }
    }
    return { status: 'complete' as const, outputs };
  },
};
