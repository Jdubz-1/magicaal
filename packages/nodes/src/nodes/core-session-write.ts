import type { NodeModule } from '@magicaal/sdk-node';
import type { ExecutionContext } from '@magicaal/sdk-node';
import { evaluate } from '../utils/jsonata';

interface SessionWriteConfig {
  writes: Record<string, unknown>; // { sessionKey: valueOrJSONataExpression }
}

export const coreSessionWrite: NodeModule<SessionWriteConfig> = {
  type: 'core:session-write',
  meta: {
    name: 'Session Write',
    description:
      'Writes values to the session context immediately (mid-run). Each value can be a literal or a JSONata expression evaluated against the current run context.',
    category: 'session',
    icon: 'database',
    version: '1.0.0',
  },
  schema: {
    config: {
      type: 'object',
      required: ['writes'],
      properties: {
        writes: {
          type: 'object',
          description:
            'Mapping of { sessionKey: valueOrJSONata }. String values starting with $ are treated as JSONata expressions.',
          additionalProperties: {},
        },
      },
    },
    input: {},
    output: {},
  },

  async execute(ctx: ExecutionContext, config: SessionWriteConfig) {
    const outputs: Record<string, unknown> = {};

    for (const [sessionKey, valueOrExpr] of Object.entries(config.writes)) {
      let value: unknown = valueOrExpr;

      if (typeof valueOrExpr === 'string' && valueOrExpr.trim().startsWith('$')) {
        try {
          value = await evaluate(valueOrExpr, ctx.data);
        } catch {
          // Fall back to literal if evaluation fails
          value = valueOrExpr;
        }
      }

      // Write to run context so saveSession picks it up at run end
      ctx.set(sessionKey, value);
      outputs[sessionKey] = value;
    }

    return { status: 'complete' as const, outputs };
  },
};
