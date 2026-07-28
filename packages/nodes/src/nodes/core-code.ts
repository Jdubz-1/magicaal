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
      // Lazy-load isolated-vm (optional native dep — unavailable if native build failed).
      // isolated-vm is a native CJS addon with no JS source for Node's ESM/CJS
      // interop to statically analyze, so a dynamic import() only ever yields
      // { default: <the real exports> } — never the named exports directly.
      // Unwrapping .default here was missing entirely, so every real
      // (non-mocked) invocation threw "ivm.Isolate is not a constructor",
      // which the outer catch below silently downgraded to the generic
      // CODE_EXECUTION_FAILED instead of the dedicated sandbox-unavailable
      // path — this node has never actually executed real code in production.
      let ivm: typeof import('isolated-vm');
      try {
        const mod = (await import('isolated-vm')) as typeof import('isolated-vm') & {
          default?: typeof import('isolated-vm');
        };
        ivm = mod.default ?? mod;
        if (typeof ivm.Isolate !== 'function') {
          throw new Error('isolated-vm module loaded but Isolate export is missing');
        }
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
        // A fresh V8 context already has `undefined` as a non-configurable
        // global binding — explicitly .set()-ing it was legacy defensive
        // code copied from an old isolated-vm example, never functionally
        // required, and isolated-vm 6 rejects assigning a raw `undefined`
        // value through .set() at all ("Set failed"), so this would now
        // throw where it previously silently did nothing useful.

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
        // A memory-limit violation now disposes the isolate itself before
        // script.run()'s promise rejects (isolated-vm 6). Disposing again
        // here threw "Isolate is already disposed" — and since a finally
        // block's throw silently replaces whatever the try block was
        // already throwing, that discarded the original, correctly-worded
        // "...due to memory limit" error the catch below pattern-matches on,
        // and every OOM was misreported as generic CODE_EXECUTION_FAILED.
        if (!isolate.isDisposed) isolate.dispose();
      }
    } catch (err) {
      // Duck-type rather than `instanceof Error`: isolated-vm's native addon
      // throws real Error objects, but `new.target`/prototype identity for
      // an error constructed inside a native module doesn't always match
      // the calling realm's Error constructor — under Jest specifically
      // (jest-environment-node sandboxes tests in a separate vm context)
      // `instanceof Error` came back false for a completely genuine timeout/
      // memory-limit error with a normal .message, silently discarding it
      // as "Unknown error" and masking every specific error code below.
      const hasMessage = (e: unknown): e is { message: string } =>
        typeof e === 'object' && e !== null && typeof (e as { message?: unknown }).message === 'string';

      if (!hasMessage(err)) {
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
