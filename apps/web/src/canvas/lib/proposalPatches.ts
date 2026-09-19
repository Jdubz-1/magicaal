import { findFreeSlot } from '../layout/collision';
import type { GraphDef, NodeDef, EdgeDef, ToolEdgeDef } from '../stores/graph';

/**
 * Applying a Caal proposal to the graph.
 *
 * This lived inline in App.svelte and silently ignored any patch it couldn't
 * match, so a proposal with no applicable patches still reported success and
 * armed the "Undo Caal change" button for a graph that never changed. Every
 * application is counted here and every no-op is returned with a reason, so
 * the caller can decide whether anything happened at all.
 *
 * The staged patches also don't arrive in the graph's own shape: the
 * caal.graph.* tools stage the arguments the model gave them
 * (packages/integrations/caal/src/tools/graph.ts), so an edge has no id or
 * type, a tool edge is { tool, agent } rather than { from, to }, and a node
 * has no position. Storing those verbatim produced edges the engine treats as
 * unconditional whatever their condition says, tool edges nothing renders or
 * compiles, and nodes stacked on the canvas's (100, 100) fallback — all while
 * counting as applied. They are normalized into NodeDef/EdgeDef/ToolEdgeDef
 * here instead.
 */

export interface ProposalPatch {
  op: string;
  target?: string;
  data?: Record<string, unknown>;
}

/** The graph shape this operates on; loose keys survive a round trip. */
export type PatchableGraph = GraphDef & Record<string, unknown>;

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

/** Where a proposal's first new node goes when the canvas is otherwise busy. */
const NEW_NODE_ANCHOR = { x: 160, y: 160 };

function str(value: unknown): string | undefined {
  return typeof value === 'string' && value.trim().length > 0 ? value.trim() : undefined;
}

function uniqueId(prefix: string, taken: Set<string>): string {
  let n = 1;
  let id = `${prefix}_${n}`;
  while (taken.has(id)) {
    n++;
    id = `${prefix}_${n}`;
  }
  taken.add(id);
  return id;
}

function edgeKey(from: string, to: string): string {
  return `${from}->${to}`;
}

/** Node fields that live at the top level; everything else is config. */
const ROOT_NODE_FIELDS = new Set(['label', 'position', 'type']);

/**
 * caal.graph.updateNode stages its argument as "partial config to merge onto
 * the node", so the model's natural staging is `{ systemPrompt: "…" }`.
 * Spreading that at the node root wrote `node.systemPrompt`, which nothing in
 * the canvas, compiler or engine reads — the change counted as applied and
 * did nothing. Known root fields stay at the root; the rest is config.
 */
function mergeNodeChanges(existing: NodeDef, changes: Record<string, unknown>): NodeDef {
  const node = { ...existing } as NodeDef & Record<string, unknown>;
  const config = { ...(existing.config ?? {}) };

  for (const [key, value] of Object.entries(changes)) {
    if (key === 'config' && typeof value === 'object' && value !== null) {
      Object.assign(config, value as Record<string, unknown>);
    } else if (ROOT_NODE_FIELDS.has(key)) {
      node[key] = value;
    } else {
      config[key] = value;
    }
  }

  node.config = config;
  return node;
}

export function applyProposalPatches(
  graph: PatchableGraph,
  patches: ProposalPatch[] | undefined,
): PatchApplication {
  const updated = structuredClone(graph);
  updated.nodes = updated.nodes ?? {};
  updated.edges = updated.edges ?? [];
  updated.toolEdges = updated.toolEdges ?? [];

  const edgeIds = new Set(updated.edges.map((e) => e.id).filter(Boolean));
  const toolEdgeIds = new Set(updated.toolEdges.map((e) => e.id).filter(Boolean));

  // Edges removed as a side effect of deleting their node.
  const cascaded = new Set<string>();
  const skipped: SkippedPatch[] = [];
  let applied = 0;

  for (const patch of patches ?? []) {
    const skip = (reason: string): void => {
      skipped.push({ op: patch.op, target: patch.target, reason });
    };

    switch (patch.op) {
      case 'add_node': {
        const data = patch.data ?? {};
        const id = str(data.id);
        const type = str(data.type);
        if (!id || !type) {
          skip('add_node needs data with an id and a type');
          break;
        }
        if (updated.nodes[id] !== undefined) {
          skip(`a node "${id}" already exists`);
          break;
        }
        const node: NodeDef = {
          id,
          type,
          config: (data.config as Record<string, unknown>) ?? {},
          // Without a position every applied node lands on the canvas's
          // (100, 100) fallback, stacked on each other and on whatever is
          // already there.
          position: findFreeSlot(updated, (data.position as { x: number; y: number }) ?? NEW_NODE_ANCHOR),
        };
        const label = str(data.label);
        if (label) node.label = label;
        updated.nodes[id] = node;
        applied++;
        break;
      }
      case 'update_node': {
        if (!patch.target || !patch.data) {
          skip('update_node needs a target node and data');
          break;
        }
        const existing = updated.nodes[patch.target];
        if (!existing) {
          skip(`node "${patch.target}" is not in the graph`);
          break;
        }
        // The id is the store's key; letting a patch change it would orphan
        // every edge pointing at it.
        const changes = { ...patch.data };
        delete changes.id;
        if (Object.keys(changes).length === 0) {
          skip('update_node carried no changes');
          break;
        }
        updated.nodes[patch.target] = { ...mergeNodeChanges(existing, changes), id: patch.target };
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
        const gone = patch.target;
        delete updated.nodes[gone];
        // Studio's own delete cascades (NodeConfigPanel's removeNode); leaving
        // the edges behind renders a line to a node that isn't there and stops
        // the graph compiling. Tool edges go too, for the same reason.
        for (const edge of updated.edges) {
          if (edge.from === gone || edge.to === gone) cascaded.add(edgeKey(edge.from, edge.to));
        }
        updated.edges = updated.edges.filter((e) => e.from !== gone && e.to !== gone);
        updated.toolEdges = updated.toolEdges.filter((e) => e.from !== gone && e.to !== gone);
        applied++;
        break;
      }
      case 'add_edge': {
        const data = patch.data ?? {};
        const from = str(data.from);
        const to = str(data.to);
        if (!from || !to) {
          skip('add_edge needs data with from and to');
          break;
        }
        const missing = [from, to].filter((id) => updated.nodes[id] === undefined);
        if (missing.length > 0) {
          skip(`edge endpoint${missing.length > 1 ? 's' : ''} ${missing.join(', ')} not in the graph`);
          break;
        }
        const condition = str(data.condition);
        const edge: EdgeDef = {
          id: str(data.id) ?? uniqueId('e_caal', edgeIds),
          from,
          to,
          // The engine reads `type` to decide whether to evaluate `condition`
          // (graph-utils.ts) — an edge stored without one always fires.
          type: (str(data.type) as EdgeDef['type']) ?? (condition ? 'conditional' : 'unconditional'),
        };
        if (condition) edge.condition = condition;
        updated.edges = [...updated.edges, edge];
        applied++;
        break;
      }
      case 'delete_edge': {
        const { from, to } = (patch.data ?? {}) as { from?: string; to?: string };
        if (!from || !to) {
          skip('delete_edge needs data with from and to');
          break;
        }
        const remaining = updated.edges.filter((e) => !(e.from === from && e.to === to));
        if (remaining.length === updated.edges.length) {
          // Deleting a node takes its edges with it, so a proposal that stages
          // both has already achieved what this patch asks for.
          if (cascaded.has(edgeKey(from, to))) {
            applied++;
            break;
          }
          skip(`no edge from "${from}" to "${to}"`);
          break;
        }
        updated.edges = remaining;
        applied++;
        break;
      }
      case 'add_tool_edge': {
        const data = patch.data ?? {};
        // caal.graph.addToolEdge stages { tool, agent }; the graph stores
        // { id, from, to } and every consumer reads from/to.
        const from = str(data.from) ?? str(data.tool);
        const to = str(data.to) ?? str(data.agent);
        if (!from || !to) {
          skip('add_tool_edge needs a tool node and an agent node');
          break;
        }
        if (updated.nodes[to] === undefined) {
          skip(`agent node "${to}" is not in the graph`);
          break;
        }
        const toolEdge: ToolEdgeDef = {
          id: str(data.id) ?? uniqueId('te_caal', toolEdgeIds),
          from,
          to,
        };
        updated.toolEdges = [...updated.toolEdges, toolEdge];
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
