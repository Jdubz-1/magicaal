import type { NodeModule } from '@magicaal/sdk-node';
import type { ExecutionContext } from '@magicaal/sdk-node';

interface CodeConfig {
  code: string;
  inputKeys?: string[];
  outputKey: string;
  timeoutMs?: number;
  memoryMb?: number;
}

export const coreCode: NodeModule<CodeConfig> = {
  type: 'core:code',
  meta: {
    name: 'Code',
    description:
      'Executes a JavaScript snippet in an isolated VM sandbox. Input context keys are injected as read-only globals. The snippet must assign to the `result` variable; its value is written to outputKey. No network or filesystem access inside the sandbox.',
    category: 'code',
    icon: 'terminal',
    version: '1.0.0',
  },
  schema: {
    config: {
      type: 'object',
      required: ['code', 'outputKey'],
      properties: {
        code: {
          type: 'string',
          description: 'JavaScript code to execute. Must assign to `result`. Example: `result = input * 2;`',
        },
        inputKeys: {
          type: 'array',
          items: { type: 'string' },
          description: 'Context keys to inject as read-only globals inside the sandbox',
        },
        outputKey: {
          type: 'string',
          description: 'Context key to write the `result` value to',
        },
        timeoutMs: {
          type: 'number',
          description: 'Maximum execution time in milliseconds (default: 5000)',
        },
        memoryMb: {
          type: 'number',
          description: 'Maximum heap memory in MB (default: 64)',
        },
      },
    },
    input: {},
    output: {
      type: 'object',
      properties: {
        _code_result: {},
      },
    },
  },

  async execute(ctx: ExecutionContext, config: CodeConfig) {
    if (!config.code || !config.code.trim()) {
      return {
        status: 'failed' as const,
        outputs: {},
        error: {
          code: 'CODE_EMPTY',
          message: 'The code property is empty',
          retryable: false,
        },
      };
    }

    const timeoutMs = config.timeoutMs ?? 5_000;
    const memoryMb = config.memoryMb ?? 64;

    // Collect inputs from context
    const inputs: Record<string, unknown> = {};
    for (const key of config.inputKeys ?? []) {
      const value = ctx.get<unknown>(key);
      if (value !== undefined) {
        inputs[key] = value;
      }
    }

    try {
      // Lazy-load isolated-vm (optional native dep — unavailable if native build failed)
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      let ivm: typeof import('isolated-vm');
      try {
        ivm = (await import('isolated-vm')) as typeof import('isolated-vm');
      } catch {
        return {
          status: 'failed' as const,
          outputs: {},
          error: {
            code: 'CODE_SANDBOX_UNAVAILABLE',
            message: 'isolated-vm native module is not available in this environment. Ensure the package is installed with native bindings.',
            retryable: false,
          },
        };
      }

      const isolate = new ivm.Isolate({ memoryLimit: memoryMb });

      try {
        const vmContext = await isolate.createContext();
        const jail = vmContext.global;
        await jail.set('undefined', undefined);

        // Inject input values as read-only globals using ExternalCopy for serialisation
        for (const [key, value] of Object.entries(inputs)) {
          await jail.set(key, new ivm.ExternalCopy(value).copyInto({ release: true }));
        }

        // Wrap user code: user assigns to `result`, we extract it via a sentinel global
        const wrappedCode = `
          let result;
          ${config.code}
          _magicaal_result = result;
        `;

        await jail.set('_magicaal_result', undefined);

        const script = await isolate.compileScript(wrappedCode);
        await script.run(vmContext, { timeout: timeoutMs });

        const resultRef = await jail.get('_magicaal_result', { reference: true });
        const result = await resultRef.copy();

        ctx.set(config.outputKey, result);
        ctx.set('_code_result', result);

        return {
          status: 'complete' as const,
          outputs: {
            [config.outputKey]: result,
            _code_result: result,
          },
        };
      } finally {
        isolate.dispose();
      }
    } catch (err) {
      if (!(err instanceof Error)) {
        return {
          status: 'failed' as const,
          outputs: {},
          error: { code: 'CODE_EXECUTION_FAILED', message: 'Unknown error', retryable: false },
        };
      }

      const msg = err.message.toLowerCase();

      if (msg.includes('script execution timed out') || msg.includes('execution timed out')) {
        return {
          status: 'failed' as const,
          outputs: {},
          error: {
            code: 'CODE_TIMEOUT',
            message: `Code execution timed out after ${timeoutMs}ms`,
            retryable: false,
          },
        };
      }

      if (msg.includes('memory limit')) {
        return {
          status: 'failed' as const,
          outputs: {},
          error: {
            code: 'CODE_MEMORY_EXCEEDED',
            message: `Code exceeded memory limit of ${memoryMb}MB`,
            retryable: false,
          },
        };
      }

      // Syntax error detection
      if (
        err instanceof SyntaxError ||
        msg.includes('syntaxerror') ||
        msg.includes('unexpected token') ||
        msg.includes('unexpected end of input')
      ) {
        return {
          status: 'failed' as const,
          outputs: {},
          error: {
            code: 'CODE_SYNTAX_ERROR',
            message: err.message,
            retryable: false,
          },
        };
      }

      return {
        status: 'failed' as const,
        outputs: {},
        error: {
          code: 'CODE_EXECUTION_FAILED',
          message: err.message,
          retryable: false,
        },
      };
    }
  },
};
