import { isPollutingKey, parseRequiredClaims } from '../../src/lib/safe-keys';

/**
 * The invocation-policy form takes JWT required claims as `name=value` lines in
 * a textarea and builds an object keyed by the names. Those names come from an
 * operator, and a line reading `__proto__=x` assigned onto an object would be a
 * prototype assignment rather than an own property — the claim silently
 * vanishes and every later lookup on that object inherits it instead.
 *
 * The parser builds the object from filtered pairs, so there is no dynamic
 * property write left to get wrong. These tests cover the parse, not the guard
 * in isolation, because the parse is what the route actually calls.
 */

describe('isPollutingKey', () => {
  it.each(['__proto__', 'constructor', 'prototype'])('rejects %s', (key) => {
    expect(isPollutingKey(key)).toBe(true);
  });

  it.each(['sub', 'tenant_id', 'proto', 'Constructor'])('allows %s', (key) => {
    expect(isPollutingKey(key)).toBe(false);
  });
});

describe('parseRequiredClaims', () => {
  it('parses one name=value per line', () => {
    expect(parseRequiredClaims('sub=alice\ntenant_id=acme')).toEqual({
      sub: 'alice',
      tenant_id: 'acme',
    });
  });

  it('trims names and values and skips blank lines', () => {
    expect(parseRequiredClaims('\n  sub  =  alice  \n\n')).toEqual({ sub: 'alice' });
  });

  /** A claim value can be a URL, so only the first separator splits. */
  it('keeps = inside a value', () => {
    expect(parseRequiredClaims('iss=https://idp/?a=1&b=2')).toEqual({
      iss: 'https://idp/?a=1&b=2',
    });
  });

  it('ignores a line with no name', () => {
    expect(parseRequiredClaims('=orphan\n  =also orphan\nsub=alice')).toEqual({ sub: 'alice' });
  });

  it('gives an empty object for empty or absent input', () => {
    expect(parseRequiredClaims('')).toEqual({});
    expect(parseRequiredClaims(undefined)).toEqual({});
  });

  it.each(['__proto__', 'constructor', 'prototype'])('drops a %s claim', (name) => {
    const claims = parseRequiredClaims(`${name}=admin\nsub=alice`);

    expect(claims).toEqual({ sub: 'alice' });
    expect(Object.getPrototypeOf(claims)).toBe(Object.prototype);
    expect(({} as Record<string, unknown>).admin).toBeUndefined();
  });

  /**
   * Why the loop that used to build this object was replaced rather than just
   * guarded: `claims[name] = value` is a dynamic property write, and an
   * unguarded one does not produce the entry it looks like it produces.
   * `Object.fromEntries` over filtered pairs has no such write to guard.
   */
  it('demonstrates the failure it avoids', () => {
    const unguarded: Record<string, string> = {};
    unguarded['__proto__'] = 'admin';

    expect(Object.keys(unguarded)).toHaveLength(0);
    expect(Object.keys(parseRequiredClaims('__proto__=admin'))).toHaveLength(0);
  });
});
