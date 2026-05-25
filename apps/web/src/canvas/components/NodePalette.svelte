<script lang="ts">
  import { onMount } from 'svelte';
  import { graph } from '../stores/graph';
  import { nodeTypes } from '../stores/nodeTypes';

  onMount(async () => {
    try {
      const res = await fetch('/api/nodes');
      if (res.ok) nodeTypes.set(await res.json());
    } catch {
      nodeTypes.set([
        { type: 'core:start', meta: { name: 'Start', description: 'Entry point', category: 'control-flow' } },
        { type: 'core:end', meta: { name: 'End', description: 'Output result', category: 'control-flow' } },
        { type: 'core:stop', meta: { name: 'Stop', description: 'Terminate run', category: 'control-flow' } },
        { type: 'core:condition', meta: { name: 'Condition', description: 'Branch on boolean', category: 'control-flow' } },
        { type: 'core:router', meta: { name: 'Router', description: 'Route by value', category: 'control-flow' } },
      ]);
    }
  });

  function addNode(type: string, name: string) {
    const id = `${type.replace(':', '_')}_${Date.now()}`;
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
  {#each $nodeTypes as nt}
    <button class="palette-item" on:click={() => addNode(nt.type, nt.meta.name)}>
      <span class="node-name">{nt.meta.name}</span>
      <span class="node-type">{nt.type}</span>
    </button>
  {/each}
</div>

<style>
  .palette { padding: 0.5rem; }
  .palette-header { font-size: 0.625rem; text-transform: uppercase; letter-spacing: 0.08em; color: #475569; padding: 0.5rem 0.25rem; }
  .palette-item {
    display: flex; flex-direction: column; align-items: flex-start;
    width: 100%; background: transparent; border: 1px solid #2d3148;
    border-radius: 6px; padding: 0.5rem 0.75rem; margin-bottom: 0.25rem;
    cursor: pointer; color: inherit; text-align: left;
  }
  .palette-item:hover { background: #2d3148; }
  .node-name { font-size: 0.8125rem; color: #e2e8f0; }
  .node-type { font-size: 0.625rem; color: #64748b; font-family: monospace; margin-top: 0.1rem; }
</style>
