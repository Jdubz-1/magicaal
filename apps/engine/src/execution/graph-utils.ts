import type { EdgeDefinition } from '@magicaal/core';
import { evaluate } from '@magicaal/nodes';

export async function resolveEdges(
  edges: EdgeDefinition[],
  fromId: string,
  data: Record<string, unknown>,
): Promise<string[]> {
  const fromEdges = edges.filter((e) => e.from === fromId);

  // An edge with no type is unconditional — the same default the compiler emits
  // (packages/compiler/src/graph.ts). Without this, such an edge matches none of
  // the three filters below and is silently dropped, so the run ends after the
  // entry node and still reports success. Publish-time validation cannot reach
  // graphs already stored in the DB; this can.
  const unconditional = fromEdges.filter((e) => (e.type ?? 'unconditional') === 'unconditional');
  if (unconditional.length > 0) {
    return unconditional.map((e) => e.to);
  }

  const conditional = fromEdges.filter((e) => e.type === 'conditional');
  const matched: string[] = [];
  for (const edge of conditional) {
    if (edge.condition) {
      try {
        const result = await evaluate(edge.condition, data);
        if (result === true || result === 1) {
          matched.push(edge.to);
        }
      } catch {
        // condition evaluation failure means edge is not taken
      }
    }
  }
  if (matched.length > 0) return matched;

  const fallback = fromEdges.filter((e) => e.type === 'fallback');
  return fallback.map((e) => e.to);
}
