import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { isPollutingKey } from '../../src/lib/safe-keys';

const ADMIN_SRC = readFileSync(join(__dirname, '../../src/routes/admin.ts'), 'utf8');

/**
 * The invocation-policy form takes JWT required claims as `name=value` lines in
 * a textarea and builds an object keyed by the names. A line reading
 * `__proto__=x` is a prototype assignment rather than an own property, so the
 * claims object silently loses the entry and gains an inherited one. CodeQL
 * flags this as `js/remote-property-injection`.
 */

describe('isPollutingKey', () => {
  it.each(['__proto__', 'constructor', 'prototype'])('rejects %s', (key) => {
    expect(isPollutingKey(key)).toBe(true);
  });

  it.each(['sub', 'tenant_id', 'proto', 'Constructor'])('allows %s', (key) => {
    expect(isPollutingKey(key)).toBe(false);
  });
});

describe('required-claims parsing', () => {
  it('guards the claim name before assigning it', () => {
    const handler = ADMIN_SRC.slice(
      ADMIN_SRC.indexOf("adminRouter.post('/invocation-auth/:agentId/policy'"),
    ).slice(0, 2000);

    expect(handler).toContain('isPollutingKey');
    expect(handler).not.toContain('requiredClaims[k.trim()] =');
  });

  /**
   * What the guard prevents, stated as behaviour rather than as a claim about
   * the source: the unguarded assignment does not produce the entry it looks
   * like it produces.
   */
  it('demonstrates why: an unguarded __proto__ assignment yields no own property', () => {
    const unguarded: Record<string, string> = {};
    unguarded['__proto__'] = 'admin';
    expect(Object.keys(unguarded)).toHaveLength(0);

    const guarded: Record<string, string> = {};
    for (const name of ['__proto__', 'sub']) {
      if (!isPollutingKey(name)) guarded[name] = 'admin';
    }
    expect(Object.keys(guarded)).toEqual(['sub']);
  });
});
