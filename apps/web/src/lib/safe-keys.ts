/**
 * Refusing property names that write to the prototype chain instead of the object.
 *
 * Assigning `obj[key] = value` where `key` is `__proto__` does not create an
 * own property: it invokes the prototype setter and changes what every later
 * lookup on that object inherits. `constructor` and `prototype` are the same
 * class of mistake one step removed. Operator-supplied JWT claim names reach
 * exactly that kind of assignment in the invocation-policy form, which is why
 * the parser for that field lives here too.
 *
 * Mirrors `apps/api/src/lib/safe-keys.ts`. The two apps share no runtime
 * package, so the rule is stated once in each rather than given a workspace
 * dependency of its own.
 */

const POLLUTING_KEYS: ReadonlySet<string> = new Set(['__proto__', 'constructor', 'prototype']);

/** True when assigning this key would reach the prototype chain. */
export function isPollutingKey(key: string): boolean {
  return POLLUTING_KEYS.has(key);
}

/**
 * Parse the invocation-policy form's required-claims textarea — one
 * `name=value` line per claim — into an object.
 *
 * Built with `Object.fromEntries` over filtered pairs rather than by assigning
 * `claims[name] = value` in a loop. The guard is the same either way, but a
 * computed property write keeps a taint sink in the code that static analysis
 * has to be argued out of: CodeQL reads `isPollutingKey` as an ordinary call,
 * not as a barrier, so the assignment stayed flagged even once it was safe.
 * Having no dynamic write at all is simpler than explaining one.
 *
 * A value may contain `=` — a claim value can be a URL — so only the first
 * separator splits.
 */
export function parseRequiredClaims(raw: string | undefined): Record<string, string> {
  return Object.fromEntries(
    (raw ?? '')
      .split('\n')
      .filter(Boolean)
      .map((line) => {
        const [name, ...rest] = line.split('=');
        return [name?.trim() ?? '', rest.join('=').trim()] as const;
      })
      .filter(([name]) => name !== '' && !isPollutingKey(name)),
  );
}
