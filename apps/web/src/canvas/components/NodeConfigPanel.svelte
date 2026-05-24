<script lang="ts">
  import { graph, selectedNode, type NodeDef } from '../stores/graph';

  export let node: NodeDef;

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

  {#if node.type === 'core:start'}
    <div class="form-group">
      <label>Input Schema (JSON Schema)</label>
      <textarea rows="4"
        value={JSON.stringify(node.config.inputSchema ?? {}, null, 2)}
        on:blur={(e) => { try { updateConfig('inputSchema', JSON.parse((e.target as HTMLTextAreaElement).value)); } catch { /* invalid JSON */ } }}
      ></textarea>
    </div>
  {/if}

  {#if node.type === 'core:end'}
    <div class="form-group">
      <label>Output Keys (comma-separated, leave blank for all)</label>
      <input type="text"
        value={String(node.config.outputKeys ?? '')}
        on:input={(e) => updateConfig('outputKeys', (e.target as HTMLInputElement).value)} />
    </div>
  {/if}

  {#if node.type === 'core:condition'}
    <div class="form-group">
      <label>Expression (JSONata → boolean)</label>
      <input type="text" value={String(node.config.expression ?? '')} on:input={(e) => updateConfig('expression', (e.target as HTMLInputElement).value)} placeholder="e.g. score > 0.5" />
    </div>
  {/if}

  {#if node.type === 'core:router'}
    <div class="form-group">
      <label>Expression (JSONata → string)</label>
      <input type="text" value={String(node.config.expression ?? '')} on:input={(e) => updateConfig('expression', (e.target as HTMLInputElement).value)} placeholder="e.g. $category" />
    </div>
    <div class="form-group">
      <label>Cases (comma-separated)</label>
      <input type="text" value={String(node.config.cases ?? '')} on:input={(e) => updateConfig('cases', (e.target as HTMLInputElement).value)} placeholder="e.g. low, medium, high" />
    </div>
  {/if}

  <button class="btn-danger" on:click={removeNode}>Remove node</button>
</div>

<style>
  .panel-section { padding: 1rem; border-bottom: 1px solid #2d3148; }
  .panel-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; font-size: 0.8125rem; font-weight: 600; }
  .close-btn { background: none; border: none; color: #94a3b8; cursor: pointer; font-size: 0.875rem; }
  .form-group { margin-bottom: 0.75rem; }
  label { display: block; font-size: 0.6875rem; color: #94a3b8; margin-bottom: 0.25rem; }
  input, textarea { background: #0f1117; border: 1px solid #2d3148; border-radius: 4px; color: #e2e8f0; padding: 0.375rem 0.625rem; font-size: 0.8125rem; width: 100%; }
  textarea { font-family: monospace; font-size: 0.75rem; resize: vertical; }
  .btn-danger { background: transparent; border: 1px solid #7f2121; color: #fca5a5; border-radius: 4px; padding: 0.375rem 0.75rem; font-size: 0.8125rem; cursor: pointer; width: 100%; }
  .btn-danger:hover { background: #3b1f1f; }
</style>
