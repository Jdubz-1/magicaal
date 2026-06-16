import type { NodeModule } from '@magicaal/sdk-node';
import type { ExecutionContext } from '@magicaal/sdk-node';

interface SessionClearConfig {
  keys?: string[];
}

export const coreSessionClear: NodeModule<SessionClearConfig> = {
  type: 'core:session-clear',
  meta: {
    name: 'Session Clear',
    description:
      'Marks session context keys for deletion at run end. If no keys are specified, clears all session context. Deleted keys are set to undefined in the run context.',
    category: 'session',
    icon: 'trash',
    version: '1.0.0',
  },
  schema: {
    config: {
      type: 'object',
      properties: {
        keys: {
          type: 'array',
          items: { type: 'string' },
          description: 'Specific session keys to clear. If omitted, a full clear is scheduled at run end.',
        },
      },
    },
    input: {},
    output: {},
  },

  async execute(ctx: ExecutionContext, config: SessionClearConfig) {
    if (config.keys && config.keys.length > 0) {
      for (const key of config.keys) {
        ctx.set(key, undefined);
      }
      // Signal to the session manager which keys to clear
      const existingClearSet = ctx.get<string[]>('_session_clear_keys') ?? [];
      ctx.set('_session_clear_keys', [...new Set([...existingClearSet, ...config.keys])]);
    } else {
      ctx.set('_session_clear_all', true);
    }

    return { status: 'complete' as const, outputs: {} };
  },
};
