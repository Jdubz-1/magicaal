import { coreCode } from '../../../src/nodes/core-code';
import { makeMockContext } from '../../helpers/mock-context';

// Use virtual: true so Jest creates the mock even when isolated-vm isn't installed
jest.mock(
  'isolated-vm',
  () => {
    class MockExternalCopy {
      private value: unknown;
      constructor(value: unknown) {
        this.value = value;
      }
      copyInto() {
        return this.value;
      }
    }

    // Each MockScript instance captures the code and the _jail reference
    class MockScript {
      private code: string;
      constructor(code: string) {
        this.code = code;
      }
      async run(context: { _jail: Record<string, unknown> }) {
        // Run the user code in the real JS engine (safe: we control test inputs)
        // Build a function from the jail globals so `result` assignment is captured
        const jail = context._jail;
        const keys = Object.keys(jail);
        const vals = Object.values(jail);

        // We need a mutable output carrier
        const output: { _magicaal_result: unknown } = { _magicaal_result: undefined };

        // Replace _magicaal_result setter in jail with our output carrier
        const patchedVals = keys.map((k) =>
          k === '_magicaal_result' ? undefined : vals[keys.indexOf(k)],
        );

        // Execute code; assignments to `result` are picked up via closure via `let result`
        // The code pattern is: let result; <user code>; _magicaal_result = result;
        const fn = new Function(...keys, `
          const _out = arguments[${keys.length}];
          ${this.code.replace('_magicaal_result = result', '_out._magicaal_result = result')}
        `);
        fn(...patchedVals, output);

        jail['_magicaal_result'] = output._magicaal_result;
      }
    }

    class MockVmContext {
      _jail: Record<string, unknown> = {};
      global = {
        set: jest.fn().mockImplementation(async (key: string, value: unknown) => {
          this._jail[key] = value;
        }),
        get: jest.fn().mockImplementation(async (key: string) => {
          const val = this._jail[key];
          return {
            copy: jest.fn().mockResolvedValue(val),
          };
        }),
      };
    }

    class MockIsolate {
      _context: MockVmContext | null = null;

      async createContext() {
        this._context = new MockVmContext();
        return this._context;
      }

      async compileScript(code: string) {
        return new MockScript(code);
      }

      dispose() {
        /* no-op */
      }
    }

    return { Isolate: MockIsolate, ExternalCopy: MockExternalCopy };
  },
  { virtual: true },
);

beforeEach(() => jest.clearAllMocks());

describe('core:code', () => {
  it('executes code and writes result to outputKey', async () => {
    const ctx = makeMockContext({ x: 5 });

    const result = await coreCode.execute(ctx, {
      code: 'result = x * 2;',
      inputKeys: ['x'],
      outputKey: 'answer',
    });

    expect(result.status).toBe('complete');
    expect(ctx.get('answer')).toBe(10);
    expect(ctx.get('_code_result')).toBe(10);
  });

  it('executes code without inputKeys', async () => {
    const ctx = makeMockContext({});

    const result = await coreCode.execute(ctx, {
      code: 'result = 42;',
      outputKey: 'num',
    });

    expect(result.status).toBe('complete');
    expect(ctx.get('num')).toBe(42);
  });

  it('returns CODE_EMPTY for empty code', async () => {
    const ctx = makeMockContext({});

    const result = await coreCode.execute(ctx, {
      code: '   ',
      outputKey: 'result',
    });

    expect(result.status).toBe('failed');
    expect(result.error?.code).toBe('CODE_EMPTY');
  });

  it('makes injected keys available as globals', async () => {
    const ctx = makeMockContext({ a: 3, b: 4 });

    const result = await coreCode.execute(ctx, {
      code: 'result = a + b;',
      inputKeys: ['a', 'b'],
      outputKey: 'sum',
    });

    expect(result.status).toBe('complete');
    expect(ctx.get('sum')).toBe(7);
  });
});
