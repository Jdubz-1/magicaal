import { evaluate, evaluateBoolean, evaluateString } from '../../../src/utils/jsonata';

describe('evaluate', () => {
  it('evaluates a simple expression', async () => {
    const result = await evaluate('$.foo', { foo: 42 });
    expect(result).toBe(42);
  });

  it('returns undefined for missing key', async () => {
    const result = await evaluate('$.missing', { foo: 1 });
    expect(result).toBeUndefined();
  });

  it('evaluates arithmetic', async () => {
    const result = await evaluate('$.a + $.b', { a: 3, b: 4 });
    expect(result).toBe(7);
  });

  it('returns undefined for an expression that references nothing', async () => {
    const result = await evaluate('$.nonexistent.deep', {});
    expect(result).toBeUndefined();
  });
});

describe('evaluateBoolean', () => {
  it('returns true for truthy expression', async () => {
    expect(await evaluateBoolean('$.score > 5', { score: 10 })).toBe(true);
  });

  it('returns false for falsy expression', async () => {
    expect(await evaluateBoolean('$.score > 5', { score: 1 })).toBe(false);
  });

  it('coerces truthy value to boolean', async () => {
    expect(await evaluateBoolean('$.val', { val: 'hello' })).toBe(true);
  });

  it('coerces undefined to false', async () => {
    expect(await evaluateBoolean('$.missing', {})).toBe(false);
  });
});

describe('evaluateString', () => {
  it('returns string value', async () => {
    expect(await evaluateString('$.name', { name: 'low' })).toBe('low');
  });

  it('coerces number to string', async () => {
    expect(await evaluateString('$.num', { num: 7 })).toBe('7');
  });

  it('returns empty string for undefined', async () => {
    expect(await evaluateString('$.missing', {})).toBe('');
  });
});

describe('timeboxing (ISS-060)', () => {
  it('aborts a CPU-bound expression instead of pinning the event loop', async () => {
    const started = Date.now();

    // Unbounded without a guard: this would run for minutes on the event loop
    await expect(
      evaluate('$sum([1..10000000].($ * $))', {}, { timeoutMs: 200 }),
    ).rejects.toThrow(/time budget/);

    // Aborted mid-flight rather than running to completion
    expect(Date.now() - started).toBeLessThan(5_000);
  });

  it('aborts infinite recursion', async () => {
    // jsonata applies tail-call optimization, so this does not grow the stack —
    // it spins forever. The time budget, not the depth bound, is what stops it.
    await expect(
      evaluate('($f := function($n) { $f($n + 1) }; $f(0))', {}, { timeoutMs: 200 }),
    ).rejects.toThrow(/time budget/);
  });

  it('leaves ordinary expressions untouched', async () => {
    expect(await evaluate('$sum([1..1000])', {})).toBe(500500);
    expect(await evaluate('$.a + $.b', { a: 1, b: 2 })).toBe(3);
  });
});
