import type { SessionSchemaMigration } from '@magicaal/core';
import { deepMerge } from '../../src/controllers/sessions.controller';
import { isPollutingKey, safeEntries } from '../../src/lib/safe-keys';
import { applyMigrationChain } from '../../src/lib/session-migration';

/**
 * Session context keys and migration transform keys both come from outside this
 * process — a tenant's session data and an agent author's graph. Writing them
 * straight onto an accumulator makes `__proto__` a prototype assignment rather
 * than an own property, which changes what every later lookup on that object
 * inherits. CodeQL flags this as `js/remote-property-injection`.
 */

describe('isPollutingKey', () => {
  it.each(['__proto__', 'constructor', 'prototype'])('rejects %s', (key) => {
    expect(isPollutingKey(key)).toBe(true);
  });

  it.each(['userId', 'proto', '__proto', 'constructorName', 'prototypes', ''])(
    'allows %s',
    (key) => {
      expect(isPollutingKey(key)).toBe(false);
    },
  );

  it('drops only the polluting entries, preserving order of the rest', () => {
    const source = { a: 1, __proto__: 2, b: 3, constructor: 4, prototype: 5, c: 6 };
    expect(safeEntries(source as Record<string, number>)).toEqual([
      ['a', 1],
      ['b', 3],
      ['c', 6],
    ]);
  });
});

describe('deepMerge', () => {
  /**
   * The literal `{ __proto__: … }` syntax sets the prototype at parse time, so
   * the payload has to be built with a computed key — which is also the shape
   * `JSON.parse` produces for an incoming request body.
   */
  function polluting(value: unknown): Record<string, unknown> {
    return JSON.parse(`{"__proto__":${JSON.stringify(value)},"kept":"yes"}`);
  }

  it('does not let a __proto__ key reach the prototype chain', () => {
    const out = deepMerge({ existing: 1 }, polluting({ polluted: true }));

    expect(out).toEqual({ existing: 1, kept: 'yes' });
    expect(Object.prototype.hasOwnProperty.call(out, '__proto__')).toBe(false);
    expect(({} as Record<string, unknown>).polluted).toBeUndefined();
    expect(Object.getPrototypeOf(out)).toBe(Object.prototype);
  });

  it.each(['constructor', 'prototype'])('drops a %s key', (key) => {
    const out = deepMerge({}, JSON.parse(`{"${key}":{"evil":true},"kept":1}`));
    expect(out).toEqual({ kept: 1 });
  });

  it('still merges ordinary nested objects', () => {
    expect(deepMerge({ a: { x: 1, y: 2 } }, { a: { y: 3 }, b: 4 })).toEqual({
      a: { x: 1, y: 3 },
      b: 4,
    });
  });
});

describe('applyMigrationChain', () => {
  function migration(transform: Record<string, string>): SessionSchemaMigration {
    return { fromVersion: 1, toVersion: 2, transform } as SessionSchemaMigration;
  }

  it('does not evaluate a transform keyed on a polluting name', async () => {
    const out = await applyMigrationChain(
      { name: 'ada' },
      [migration(JSON.parse('{"__proto__":"name","greeting":"\'hi \' & name"}'))],
    );

    expect(out).toEqual({ name: 'ada', greeting: 'hi ada' });
    expect(Object.getPrototypeOf(out)).toBe(Object.prototype);
  });

  it('carries ordinary transforms through the chain', async () => {
    const out = await applyMigrationChain({ count: 2 }, [
      migration({ doubled: 'count * 2' }),
      { fromVersion: 2, toVersion: 3, transform: { tripled: 'doubled * 3' } } as SessionSchemaMigration,
    ]);

    expect(out).toEqual({ count: 2, doubled: 4, tripled: 12 });
  });
});
