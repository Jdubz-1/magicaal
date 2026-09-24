/**
 * Refusing property names that write to the prototype chain instead of the object.
 *
 * Assigning `obj[key] = value` where `key` is `__proto__` does not create an
 * own property: it invokes the prototype setter and changes what every later
 * lookup on that object inherits. `constructor` and `prototype` are the same
 * class of mistake one step removed. Operator-supplied JWT claim names reach
 * exactly that kind of assignment in the invocation-policy form.
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
