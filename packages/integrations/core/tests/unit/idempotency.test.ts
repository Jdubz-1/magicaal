import {
  deriveIdempotencyKey,
  newIdempotencyKey,
  stableStringify,
} from '../../src/idempotency';

describe('stableStringify', () => {
  it('produces identical output for logically equal objects with different key order', () => {
    expect(stableStringify({ a: 1, b: { d: 2, c: 3 } })).toBe(
      stableStringify({ b: { c: 3, d: 2 }, a: 1 }),
    );
  });

  it('preserves array order', () => {
    expect(stableStringify([2, 1])).not.toBe(stableStringify([1, 2]));
  });
});

describe('deriveIdempotencyKey', () => {
  it('is deterministic for the same run/node/payload', () => {
    const a = deriveIdempotencyKey({ runId: 'r1', nodeId: 'n1', payload: { x: 1, y: 2 } });
    const b = deriveIdempotencyKey({ runId: 'r1', nodeId: 'n1', payload: { y: 2, x: 1 } });
    expect(a).toBe(b);
    expect(a).toMatch(/^[0-9a-f]{64}$/);
  });

  it('differs across runs, nodes, and payloads', () => {
    const base = deriveIdempotencyKey({ runId: 'r1', nodeId: 'n1', payload: { x: 1 } });
    expect(deriveIdempotencyKey({ runId: 'r2', nodeId: 'n1', payload: { x: 1 } })).not.toBe(base);
    expect(deriveIdempotencyKey({ runId: 'r1', nodeId: 'n2', payload: { x: 1 } })).not.toBe(base);
    expect(deriveIdempotencyKey({ runId: 'r1', nodeId: 'n1', payload: { x: 2 } })).not.toBe(base);
  });
});

describe('newIdempotencyKey', () => {
  it('returns unique UUIDs', () => {
    expect(newIdempotencyKey()).not.toBe(newIdempotencyKey());
  });
});
