import type { ExecutionContext } from '@magicaal/sdk-node';

/**
 * Resolve a node config string through JSONata when it references run
 * context (contains `$`), falling back to the literal value. Shared by all
 * integration packages so config fields behave identically across services
 * (same convention as core:http-request's URL field).
 */
export async function resolveField(ctx: ExecutionContext, value: string): Promise<string> {
  if (value.includes('$')) {
    try {
      const resolved = await ctx.evaluate(value);
      if (resolved !== undefined && resolved !== null) return String(resolved);
    } catch {
      // fall through to the literal value
    }
  }
  return value;
}
