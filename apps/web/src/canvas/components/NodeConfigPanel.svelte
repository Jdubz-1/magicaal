<script lang="ts">
  import { graph, selectedNode, type NodeDef } from '../stores/graph';
  import { nodeTypes } from '../stores/nodeTypes';

  export let node: NodeDef;

  $: nodeTypeDef = $nodeTypes.find((nt) => nt.type === node.type);
  $: schemaProps = nodeTypeDef?.schema?.config?.properties ?? {};

  function updateConfig(key: string, value: unknown) {
    graph.update((g) => ({
      ...g,
      nodes: {
        ...g.nodes,
        [node.id]: { ...node, config: { ...node.config, [key]: value } },
      },
    }));
  }

  function updateLabel(value: string) {
    graph.update((g) => ({
      ...g,
      nodes: { ...g.nodes, [node.id]: { ...node, label: value } },
    }));
  }

  function removeNode() {
    graph.update((g) => {
      const nodes = { ...g.nodes };
      delete nodes[node.id];
      return {
        ...g,
        nodes,
        edges: g.edges.filter((e) => e.from !== node.id && e.to !== node.id),
      };
    });
    selectedNode.set(null);
  }

  function configValue(key: string): unknown {
    return node.config[key] ?? undefined;
  }
</script>

<div class="panel-section">
  <div class="panel-header">
    <span>Node: {node.type}</span>
    <button class="close-btn" on:click={() => selectedNode.set(null)}>✕</button>
  </div>

  <div class="form-group">
    <label>Label</label>
    <input type="text" value={node.label ?? ''} on:input={(e) => updateLabel((e.target as HTMLInputElement).value)} />
  </div>

  {#each Object.entries(schemaProps) as [key, prop]}
    <div class="form-group">
      <label>{prop.description ?? key}</label>
      {#if prop.type === 'object'}
        <textarea rows="4"
          value={JSON.stringify(configValue(key) ?? {}, null, 2)}
          on:blur={(e) => { try { updateConfig(key, JSON.parse((e.target as HTMLTextAreaElement).value)); } catch { /* invalid JSON */ } }}
        ></textarea>
      {:else if prop.type === 'array'}
        <input type="text"
          value={Array.isArray(configValue(key)) ? (configValue(key) as string[]).join(', ') : String(configValue(key) ?? '')}
          on:input={(e) => updateConfig(key, (e.target as HTMLInputElement).value.split(',').map((s) => s.trim()).filter(Boolean))}
          placeholder="comma-separated values"
        />
      {:else if prop.type === 'boolean'}
        <input type="checkbox"
          checked={Boolean(configValue(key))}
          on:change={(e) => updateConfig(key, (e.target as HTMLInputElement).checked)}
          style="width:auto"
        />
      {:else}
        <input type="text"
          value={String(configValue(key) ?? '')}
          on:input={(e) => updateConfig(key, (e.target as HTMLInputElement).value)}
        />
      {/if}
    </div>
  {/each}

  <button class="btn-danger" on:click={removeNode}>Remove node</button>
</div>

<style>
  .panel-section { padding: 1rem; border-bottom: 1px solid #2d3148; }
  .panel-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; font-size: 0.8125rem; font-weight: 600; }
  .close-btn { background: none; border: none; color: #94a3b8; cursor: pointer; font-size: 0.875rem; }
  .form-group { margin-bottom: 0.75rem; }
  label { display: block; font-size: 0.6875rem; color: #94a3b8; margin-bottom: 0.25rem; }
  input, textarea { background: #0f1117; border: 1px solid #2d3148; border-radius: 4px; color: #e2e8f0; padding: 0.375rem 0.625rem; font-size: 0.8125rem; width: 100%; box-sizing: border-box; }
  textarea { font-family: monospace; font-size: 0.75rem; resize: vertical; }
  .btn-danger { background: transparent; border: 1px solid #7f2121; color: #fca5a5; border-radius: 4px; padding: 0.375rem 0.75rem; font-size: 0.8125rem; cursor: pointer; width: 100%; }
  .btn-danger:hover { background: #3b1f1f; }
</style>
