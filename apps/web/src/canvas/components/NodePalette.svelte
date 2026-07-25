<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { graph } from '../stores/graph';
  import { nodeTypes, type NodeTypeDef } from '../stores/nodeTypes';
  import { connections, ensureConnectionsLoaded } from '../stores/connections';

  // Newly installed packages must appear without a page reload — poll the
  // node list and update the store when the type set changes.
  const REFRESH_INTERVAL_MS = 30_000;
  let refreshTimer: ReturnType<typeof setInterval> | null = null;
  let knownTypes = '';
  let marketplaceEnabled = false;

  const CATEGORY_LABELS: Record<string, string> = {
    'control-flow': 'Control Flow',
    'ai-llm': 'AI / LLM',
    data: 'Data',
    integration: 'Integrations',
    code: 'Code',
    composition: 'Composition',
    observability: 'Observability',
    guardrails: 'Guardrails',
    tool: 'Tools',
    session: 'Session',
  };

  $: grouped = groupByCategory($nodeTypes);

  function groupByCategory(types: NodeTypeDef[]): Array<{ category: string; label: string; items: NodeTypeDef[] }> {
    const byCat = new Map<string, NodeTypeDef[]>();
    for (const nt of types) {
      const cat = nt.meta.category ?? 'other';
      if (!byCat.has(cat)) byCat.set(cat, []);
      byCat.get(cat)!.push(nt);
    }
    return Array.from(byCat.entries()).map(([category, items]) => ({
      category,
      label: CATEGORY_LABELS[category] ?? category,
      items,
    }));
  }

  async function loadNodes() {
    try {
      const res = await fetch('/api/nodes');
      if (!res.ok) return;
      const fetched = (await res.json()) as NodeTypeDef[];
      const signature = fetched.map((n) => n.type).sort().join(',');
      if (signature !== knownTypes) {
        knownTypes = signature;
        nodeTypes.set(fetched);
      }
    } catch {
      if ($nodeTypes.length === 0) {
        nodeTypes.set([
          { type: 'core:start', meta: { name: 'Start', description: 'Entry point', category: 'control-flow' } },
          { type: 'core:end', meta: { name: 'End', description: 'Output result', category: 'control-flow' } },
          { type: 'core:stop', meta: { name: 'Stop', description: 'Terminate run', category: 'control-flow' } },
          { type: 'core:condition', meta: { name: 'Condition', description: 'Branch on boolean', category: 'control-flow' } },
          { type: 'core:router', meta: { name: 'Router', description: 'Route by value', category: 'control-flow' } },
        ]);
      }
    }
  }

  /** The service a node type's connection field requires, or undefined if it takes none. */
  function requiredService(nt: NodeTypeDef): string | undefined {
    const props = nt.schema?.config?.properties;
    if (!props) return undefined;
    for (const prop of Object.values(props)) {
      if (prop.format === 'connection') return prop.service;
    }
    return undefined;
  }

  function isNotConnected(nt: NodeTypeDef, connServices: Set<string>): boolean {
    const service = requiredService(nt);
    if (!service) return false;
    return !connServices.has(service);
  }

  $: connectedServices = new Set($connections.map((c) => c.service));

  onMount(async () => {
    await loadNodes();
    void ensureConnectionsLoaded();
    refreshTimer = setInterval(loadNodes, REFRESH_INTERVAL_MS);

    try {
      const res = await fetch('/api/system/config');
      if (res.ok) {
        const cfg = (await res.json()) as { marketplaceEnabled?: boolean };
        marketplaceEnabled = cfg.marketplaceEnabled === true;
      }
    } catch {
      // marketplace links simply stay hidden
    }
  });

  onDestroy(() => {
    if (refreshTimer) clearInterval(refreshTimer);
  });

  function addNode(type: string, name: string) {
    const id = `${type.replace(/:/g, '_')}_${Date.now()}`;
    graph.update((g) => ({
      ...g,
      nodes: {
        ...g.nodes,
        [id]: { id, type, label: name, config: {}, position: { x: 200, y: 200 } },
      },
    }));
  }
</script>

<div class="palette">
  <div class="palette-header">Nodes</div>
  {#each grouped as group}
    <div class="category-header">{group.label}</div>
    {#each group.items as nt}
      <button class="palette-item" on:click={() => addNode(nt.type, nt.meta.name)}>
        <span class="node-name">
          {nt.meta.name}
          {#if isNotConnected(nt, connectedServices)}
            <span class="not-connected-badge" title="No {requiredService(nt)} connection configured">not connected</span>
          {/if}
        </span>
        <span class="node-type">{nt.type}</span>
      </button>
    {/each}
    {#if marketplaceEnabled}
      <a class="marketplace-link" href="/admin/marketplace?category={group.category}">
        Browse Marketplace →
      </a>
    {/if}
  {/each}
</div>

<style>
  .palette { padding: 0.5rem; }
  .palette-header { font-size: 0.625rem; text-transform: uppercase; letter-spacing: 0.08em; color: #475569; padding: 0.5rem 0.25rem; }
  .category-header { font-size: 0.625rem; text-transform: uppercase; letter-spacing: 0.06em; color: #64748b; padding: 0.625rem 0.25rem 0.25rem; }
  .palette-item {
    display: flex; flex-direction: column; align-items: flex-start;
    width: 100%; background: transparent; border: 1px solid #2d3148;
    border-radius: 6px; padding: 0.5rem 0.75rem; margin-bottom: 0.25rem;
    cursor: pointer; color: inherit; text-align: left;
  }
  .palette-item:hover { background: #2d3148; }
  .node-name { font-size: 0.8125rem; color: #e2e8f0; display: flex; align-items: center; gap: 0.375rem; }
  .not-connected-badge {
    font-size: 0.5625rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.04em;
    color: #fcd34d; background: #78350f; border-radius: 3px; padding: 0.05rem 0.3rem;
  }
  .node-type { font-size: 0.625rem; color: #64748b; font-family: monospace; margin-top: 0.1rem; }
  .marketplace-link { display: block; font-size: 0.6875rem; color: #7c6af7; padding: 0.125rem 0.25rem 0.375rem; text-decoration: none; }
  .marketplace-link:hover { text-decoration: underline; }
</style>
