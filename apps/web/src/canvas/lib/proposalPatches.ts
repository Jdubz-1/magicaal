/**
 * Applying a Caal proposal to the graph.
 *
 * This lived inline in App.svelte and silently ignored any patch it couldn't
 * match, so a proposal with no applicable patches still reported success and
 * armed the "Undo Caal change" button for a graph that never changed. Every
 * application is counted here and every no-op is returned with a reason, so
 * the caller can decide whether anything happened at all.
 */

export interface ProposalPatch {
  op: string;
  target?: string;
  data?: Record<string, unknown>;
}

export interface PatchableGraph {
  nodes: Record<string, unknown>;
  edges: unknown[];
  toolEdges: unknown[];
  [key: string]: unknown;
}

export interface SkippedPatch {
  op: string;
  target?: string;
  reason: string;
}

export interface PatchApplication {
  graph: PatchableGraph;
  applied: number;
  skipped: SkippedPatch[];
}

function clone<T>(value: T): T {
  return structuredClone(value);
}

export function applyProposalPatches(
  graph: PatchableGraph,
  patches: ProposalPatch[] | undefined,
): PatchApplication {
  const updated = clone(graph);
  updated.nodes = updated.nodes ?? {};
  updated.edges = updated.edges ?? [];
  updated.toolEdges = updated.toolEdges ?? [];

  const skipped: SkippedPatch[] = [];
  let applied = 0;

  for (const patch of patches ?? []) {
    const skip = (reason: string): void => {
      skipped.push({ op: patch.op, target: patch.target, reason });
    };

    switch (patch.op) {
      case 'add_node': {
        const nodeData = patch.data as { id?: string; type?: string } | undefined;
        if (!nodeData?.id || !nodeData.type) {
          skip('add_node needs data with an id and a type');
          break;
        }
        if (updated.nodes[nodeData.id] !== undefined) {
          skip(`a node "${nodeData.id}" already exists`);
          break;
        }
        updated.nodes[nodeData.id] = nodeData;
        applied++;
        break;
      }
      case 'update_node': {
        if (!patch.target || !patch.data) {
          skip('update_node needs a target node and data');
          break;
        }
        const existing = updated.nodes[patch.target] as Record<string, unknown> | undefined;
        if (!existing) {
          skip(`node "${patch.target}" is not in the graph`);
          break;
        }
        updated.nodes[patch.target] = { ...existing, ...patch.data };
        applied++;
        break;
      }
      case 'delete_node': {
        if (!patch.target) {
          skip('delete_node needs a target node');
          break;
        }
        if (updated.nodes[patch.target] === undefined) {
          skip(`node "${patch.target}" is not in the graph`);
          break;
        }
        delete updated.nodes[patch.target];
        applied++;
        break;
      }
      case 'add_edge': {
        if (!patch.data) {
          skip('add_edge needs data');
          break;
        }
        updated.edges = [...updated.edges, patch.data];
        applied++;
        break;
      }
      case 'delete_edge': {
        const { from, to } = (patch.data ?? {}) as { from?: string; to?: string };
        if (!from || !to) {
          skip('delete_edge needs data with from and to');
          break;
        }
        const remaining = updated.edges.filter((e) => {
          const edge = e as { from?: string; to?: string };
          return !(edge.from === from && edge.to === to);
        });
        if (remaining.length === updated.edges.length) {
          skip(`no edge from "${from}" to "${to}"`);
          break;
        }
        updated.edges = remaining;
        applied++;
        break;
      }
      case 'add_tool_edge': {
        if (!patch.data) {
          skip('add_tool_edge needs data');
          break;
        }
        updated.toolEdges = [...updated.toolEdges, patch.data];
        applied++;
        break;
      }
      default:
        skip(`unsupported operation "${patch.op}"`);
    }
  }

  return { graph: updated, applied, skipped };
}

/** One short line naming what didn't apply, for the Caal panel transcript. */
export function describeSkipped(skipped: SkippedPatch[]): string {
  return skipped
    .map((s) => (s.target ? `${s.op} on ${s.target} (${s.reason})` : `${s.op} (${s.reason})`))
    .join('; ');
}
