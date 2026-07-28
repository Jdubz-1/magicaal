import { coreCode } from '../../../src/nodes/core-code';
import { makeMockContext } from '../../helpers/mock-context';

// Deliberately does NOT mock isolated-vm — core-code.test.ts's mock is a
// hand-written simulation of the sandbox and cannot reproduce real V8/isolated-vm
// behavior (module interop shape, dispose-on-OOM timing, exact thrown error
// text). Those exact details broke silently across the isolated-vm 4 -> 6
// bump — this suite exercises the real native module so a future version bump
// with the same kind of drift fails a test instead of failing only in
// production. Skips itself when the optional native dependency isn't
// installed/buildable in the current environment, consistent with core:code's
// own graceful-degradation design.
let isolatedVmAvailable = true;
try {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  require('isolated-vm');
} catch {
  isolatedVmAvailable = false;
}

const maybeDescribe = isolatedVmAvailable ? describe : describe.skip;

maybeDescribe('core:code (real isolated-vm, unmocked)', () => {
  it('executes real code in the real sandbox and writes the result to outputKey', async () => {
    const ctx = makeMockContext({ x: 21 });
    const result = await coreCode.execute(ctx, {
      code: 'result = x * 2;',
      inputKeys: ['x'],
      outputKey: 'out',
    });
    expect(result.status).toBe('complete');
    expect(ctx.get('out')).toBe(42);
  });

  it('maps a real timeout to CODE_TIMEOUT, not the generic CODE_EXECUTION_FAILED fallback', async () => {
    const ctx = makeMockContext({});
    const result = await coreCode.execute(ctx, {
      code: 'while (true) {}',
      outputKey: 'out',
      timeoutMs: 200,
    });
    expect(result.status).toBe('failed');
    expect(result.error?.code).toBe('CODE_TIMEOUT');
  }, 10_000);

  it('maps a real memory-limit violation to CODE_MEMORY_EXCEEDED, not "Isolate is already disposed" (ISS: finally-block double-dispose masked the real error)', async () => {
    const ctx = makeMockContext({});
    const result = await coreCode.execute(ctx, {
      code: `
        let arrs = [];
        while (true) { arrs.push(new Array(1e6).fill(0)); }
      `,
      outputKey: 'out',
      memoryMb: 16,
      timeoutMs: 10_000,
    });
    expect(result.status).toBe('failed');
    expect(result.error?.code).toBe('CODE_MEMORY_EXCEEDED');
  }, 15_000);
});
