import type { NodeModule } from '@magicaal/sdk-node';
import type { ExecutionContext } from '@magicaal/sdk-node';
import { evaluate } from '../utils/jsonata';

interface MemoryWriteEntry {
  key: string;
  valueExpression: string;
  mode?: 'replace' | 'append' | 'increment';
}

interface MemoryWriteConfig {
  writes: MemoryWriteEntry[];
}

export const coreMemoryWrite: NodeModule<MemoryWriteConfig> = {
  type: 'core:memory-write',
  meta: {
    name: 'Memory Write',
    description:
      'Writes one or more computed values into the in-run context memory. Values are resolved from JSONata expressions against the current context data. Use mode "append" to grow an array, "increment" to add a number, or "replace" (default) to overwrite.',
    category: 'data',
    icon: 'edit-3',
    version: '1.0.0',
  },
  schema: {
    config: {
      type: 'object',
      required: ['writes'],
      properties: {
        writes: {
          type: 'array',
          items: {
            type: 'object',
            required: ['key', 'valueExpression'],
            properties: {
              key: {
                type: 'string',
                description: 'Context key to write to',
              },
              valueExpression: {
                type: 'string',
                description: 'JSONata expression evaluated against current context data',
              },
              mode: {
                type: 'string',
                enum: ['replace', 'append', 'increment'],
                description: '"replace": overwrite (default). "append": add to array. "increment": add number to existing.',
              },
            },
          },
          description: 'Array of write operations to perform atomically',
        },
      },
    },
    input: {},
    output: {
      type: 'object',
      properties: {
        _memory_keys_written: { type: 'array', items: { type: 'string' } },
      },
    },
  },

  async execute(ctx: ExecutionContext, config: MemoryWriteConfig) {
    const keysWritten: string[] = [];

    for (const write of config.writes) {
      let value: unknown;
      try {
        value = await evaluate(write.valueExpression, ctx.data);
      } catch (err) {
        return {
          status: 'failed' as const,
          outputs: {},
          error: {
            code: 'MEMORY_WRITE_EXPRESSION_ERROR',
            message: `Expression "${write.valueExpression}" for key "${write.key}" failed: ${err instanceof Error ? err.message : String(err)}`,
            retryable: false,
          },
        };
      }

      const mode = write.mode ?? 'replace';

      if (mode === 'append') {
        const existing = ctx.get(write.key);
        const arr = Array.isArray(existing) ? [...existing, value] : [value];
        ctx.set(write.key, arr);
      } else if (mode === 'increment') {
        const existing = ctx.get<number>(write.key) ?? 0;
        ctx.set(write.key, existing + Number(value ?? 1));
      } else {
        ctx.set(write.key, value);
      }

      keysWritten.push(write.key);
    }

    ctx.set('_memory_keys_written', keysWritten);

    return {
      status: 'complete' as const,
      outputs: { _memory_keys_written: keysWritten },
    };
  },
};
