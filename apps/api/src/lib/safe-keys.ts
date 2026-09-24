/**
 * Refusing property names that write to the prototype chain instead of the object.
 *
 * Session context keys, migration transform keys and JWT claim names all arrive
 * from outside this process — an agent author's graph, a tenant's session data,
 * an operator's form. Assigning `obj[key] = value` where `key` is `__proto__`
 * does not create an own property: it invokes the prototype setter and changes
 * what every later lookup on that object inherits. `constructor` and
 * `prototype` are the same class of mistake one step removed.
 *
 * There is no legitimate session key or JWT claim with these names, so the
 * uniform answer is to drop them rather than to escape or rename them.
 */

const POLLUTING_KEYS: ReadonlySet<string> = new Set(['__proto__', 'constructor', 'prototype']);

/** True when assigning this key would reach the prototype chain. */
export function isPollutingKey(key: string): boolean {
  return POLLUTING_KEYS.has(key);
}

/**
 * `Object.entries`, minus any key that would write to the prototype chain.
 *
 * Use this in place of `Object.entries` wherever the loop body assigns onto an
 * accumulator using the key it yields.
 */
export function safeEntries<T>(source: Record<string, T>): Array<[string, T]> {
  return Object.entries(source).filter(([key]) => !isPollutingKey(key));
}
