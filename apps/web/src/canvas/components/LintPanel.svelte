<script lang="ts">
  import { graph, selectedNode } from '../stores/graph';
  import { nodeTypes } from '../stores/nodeTypes';
  import type { NodeTypeDef } from '../stores/nodeTypes';

  interface LintIssue {
    severity: 'error' | 'warning';
    message: string;
    nodeId?: string;
  }

  let acknowledged = false;

  function lint(
    g: typeof $graph,
    types: NodeTypeDef[],
  ): LintIssue[] {
    const issues: LintIssue[] = [];
    const nodes = Object.values(g.nodes);
    const edges = g.edges;
    const knownTypes = new Set(types.map((t) => t.type));

    if (nodes.length === 0) {
      issues.push({ severity: 'error', message: 'Graph is empty — add at least a Start and End node' });
      return issues;
    }

    // Check unknown node types
    for (const node of nodes) {
      if (knownTypes.size > 0 && !knownTypes.has(node.type)) {
        issues.push({
          severity: 'error',
          message: `Node "${node.label ?? node.id}" has unknown type "${node.type}"`,
          nodeId: node.id,
        });
      }
    }

    // Find entry node
    const entryId = g.entry ?? Object.keys(g.nodes)[0];
    if (!g.nodes[entryId]) {
      issues.push({ severity: 'error', message: 'No entry node defined' });
    }

    // Find unreachable nodes (not reachable from entry via BFS)
    const reachable = new Set<string>();
    const queue = [entryId];
    while (queue.length > 0) {
      const id = queue.shift()!;
      if (reachable.has(id)) continue;
      reachable.add(id);
      for (const edge of edges) {
        if (edge.from === id && !reachable.has(edge.to)) {
          queue.push(edge.to);
        }
      }
    }

    for (const node of nodes) {
      if (!reachable.has(node.id)) {
        issues.push({
          severity: 'warning',
          message: `Node "${node.label ?? node.id}" is unreachable from the entry node`,
          nodeId: node.id,
        });
      }
    }

    // Check nodes with only conditional outbound edges and no fallback
    for (const node of nodes) {
      const outbound = edges.filter((e) => e.from === node.id);
      if (outbound.length === 0) continue;
      const hasConditional = outbound.some((e) => e.type === 'conditional');
      const hasFallback = outbound.some((e) => e.type === 'fallback' || e.type === 'unconditional');
      if (hasConditional && !hasFallback) {
        issues.push({
          severity: 'warning',
          message: `Node "${node.label ?? node.id}" has conditional edges but no fallback — some inputs may go unhandled`,
          nodeId: node.id,
        });
      }
    }

    // Check nodes with no outbound edges (other than end/stop types)
    const terminalTypes = new Set(['core:end', 'core:stop']);
    for (const node of nodes) {
      if (terminalTypes.has(node.type)) continue;
      const outbound = edges.filter((e) => e.from === node.id);
      if (outbound.length === 0) {
        issues.push({
          severity: 'warning',
          message: `Node "${node.label ?? node.id}" has no outbound edges and is not a terminal node`,
          nodeId: node.id,
        });
      }
    }

    return issues;
  }

  $: issues = lint($graph, $nodeTypes);
  $: errors = issues.filter((i) => i.severity === 'error');
  $: warnings = issues.filter((i) => i.severity === 'warning');
  $: canPublish = errors.length === 0 && (warnings.length === 0 || acknowledged);

  function selectNode(nodeId: string | undefined) {
    if (!nodeId) return;
    const node = $graph.nodes[nodeId];
    if (node) selectedNode.set(node);
  }
</script>

{#if issues.length > 0}
  <div class="lint-panel">
    <div class="lint-header">
      <span class="lint-title">Graph Issues</span>
      {#if errors.length > 0}
        <span class="badge badge-error">{errors.length} error{errors.length !== 1 ? 's' : ''}</span>
      {/if}
      {#if warnings.length > 0}
        <span class="badge badge-warn">{warnings.length} warning{warnings.length !== 1 ? 's' : ''}</span>
      {/if}
    </div>

    <div class="issue-list">
      {#each errors as issue}
        <div class="issue issue-error" role="button" tabindex="0"
          on:click={() => selectNode(issue.nodeId)}
          on:keydown={(e) => e.key === 'Enter' && selectNode(issue.nodeId)}>
          <span class="issue-icon">✗</span>
          <span class="issue-msg">{issue.message}</span>
        </div>
      {/each}
      {#each warnings as issue}
        <div class="issue issue-warning" role="button" tabindex="0"
          on:click={() => selectNode(issue.nodeId)}
          on:keydown={(e) => e.key === 'Enter' && selectNode(issue.nodeId)}>
          <span class="issue-icon">⚠</span>
          <span class="issue-msg">{issue.message}</span>
        </div>
      {/each}
    </div>

    {#if errors.length === 0 && warnings.length > 0}
      <label class="ack-label">
        <input type="checkbox" bind:checked={acknowledged} />
        Acknowledge warnings and allow publish
      </label>
    {/if}
  </div>
{/if}

<style>
  .lint-panel { background: #1a1d27; border-top: 1px solid #2d3148; padding: 0.75rem; }
  .lint-header { display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem; }
  .lint-title { font-size: 0.6875rem; text-transform: uppercase; letter-spacing: 0.08em; color: #475569; }
  .badge { font-size: 0.625rem; font-weight: 700; padding: 0.1rem 0.4rem; border-radius: 3px; }
  .badge-error { background: #7f2121; color: #fca5a5; }
  .badge-warn { background: #78350f; color: #fcd34d; }
  .issue-list { display: flex; flex-direction: column; gap: 0.25rem; }
  .issue { display: flex; gap: 0.5rem; align-items: flex-start; padding: 0.375rem 0.5rem; border-radius: 4px; cursor: pointer; font-size: 0.75rem; }
  .issue:hover { opacity: 0.85; }
  .issue-error { background: #3b1f1f; }
  .issue-warning { background: #2d2214; }
  .issue-icon { flex-shrink: 0; font-size: 0.75rem; }
  .issue-error .issue-icon { color: #fca5a5; }
  .issue-warning .issue-icon { color: #fcd34d; }
  .issue-msg { color: #e2e8f0; line-height: 1.3; }
  .ack-label { display: flex; align-items: center; gap: 0.5rem; font-size: 0.75rem; color: #94a3b8; margin-top: 0.5rem; cursor: pointer; }
  input[type="checkbox"] { accent-color: #7c6af7; }
</style>
