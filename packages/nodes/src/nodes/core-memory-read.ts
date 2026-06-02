import type { NodeModule } from '@magicaal/sdk-node';
import type { ExecutionContext } from '@magicaal/sdk-node';

interface MemoryReadConfig {
  keys: string[];
  defaultValues?: Record<string, unknown>;
  failIfMissing?: boolean;
}

export const coreMemoryRead: NodeModule<MemoryReadConfig> = {
  type: 'core:memory-read',
  meta: {
    name: 'Memory Read',
    description:
      'Reads one or more named keys from the in-run context memory and makes them available for downstream nodes. Optional defaultValues are used when a key is not yet set. Pair with core:memory-write to manage intermediate state across graph sections.',
    category: 'data',
    icon: 'book-open',
    version: '1.0.0',
  },
  schema: {
    config: {
      type: 'object',
      required: ['keys'],
      properties: {
        keys: {
          type: 'array',
          items: { type: 'string' },
          description: 'Context keys to read. Each value is surfaced as-is for downstream nodes.',
        },
        defaultValues: {
          type: 'object',
          description: 'Default values to use when a key is not set. Object where keys match the keys array.',
        },
        failIfMissing: {
          type: 'boolean',
          description: 'If true, the node fails when any key is missing and has no default (default: false)',
        },
      },
    },
    input: {},
    output: {
      type: 'object',
      description: 'All read keys are available in the context data after execution',
      properties: {
        _memory_keys_read: { type: 'array', items: { type: 'string' } },
        _memory_missing_keys: { type: 'array', items: { type: 'string' } },
      },
    },
  },

  async execute(ctx: ExecutionContext, config: MemoryReadConfig) {
    const keysRead: string[] = [];
    const missingKeys: string[] = [];

    for (const key of config.keys) {
      const existing = ctx.get(key);
      if (existing !== undefined) {
        keysRead.push(key);
      } else {
        const defaultVal = config.defaultValues?.[key];
        if (defaultVal !== undefined) {
          ctx.set(key, defaultVal);
          keysRead.push(key);
        } else {
          missingKeys.push(key);
        }
      }
    }

    if (config.failIfMissing && missingKeys.length > 0) {
      return {
        status: 'failed' as const,
        outputs: {},
        error: {
          code: 'MEMORY_KEYS_MISSING',
          message: `Required memory keys not found: ${missingKeys.join(', ')}`,
          retryable: false,
        },
      };
    }

    ctx.set('_memory_keys_read', keysRead);
    ctx.set('_memory_missing_keys', missingKeys);

    return {
      status: 'complete' as const,
      outputs: { _memory_keys_read: keysRead, _memory_missing_keys: missingKeys },
    };
  },
};
