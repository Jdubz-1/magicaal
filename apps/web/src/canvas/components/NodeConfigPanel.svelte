<script lang="ts">
  import { graph, selectedNode, type NodeDef } from '../stores/graph';
  import { nodeTypes } from '../stores/nodeTypes';
  import ExpressionEditor from './ExpressionEditor.svelte';
  import ConnectionSelect from './ConnectionSelect.svelte';

  export let node: NodeDef;

  $: nodeTypeDef = $nodeTypes.find((nt) => nt.type === node.type);
  $: schemaProps = nodeTypeDef?.schema?.config?.properties ?? {};

  // Canvas Value Picker: nodes that have outbound edges leading to this node (upstream)
  $: upstreamNodes = Object.values($graph.nodes).filter((n) =>
    $graph.edges.some((e) => e.to === node.id && e.from === n.id),
  );

  let pickerFieldKey: string | null = null;
  let exprFieldKey: string | null = null;  // field currently in expression editor mode
  let evalResult: Record<string, unknown> = {};  // fieldKey → eval result

  // Reset editor state when the selected node changes (ISS-023)
  $: if (node?.id) {
    exprFieldKey = null;
    evalResult = {};
    pickerFieldKey = null;
  }

  // Get actual output key names from a node's type schema (ISS-024)
  function getUpstreamOutputKeys(upstream: NodeDef): string[] {
    const typeDef = $nodeTypes.find((nt) => nt.type === upstream.type);
    const props = (typeDef?.schema?.output as { properties?: Record<string, unknown> } | undefined)?.properties;
    if (props && Object.keys(props).length > 0) return Object.keys(props);
    return ['output']; // fallback for nodes without declared output schema
  }

  async function evaluateExpression(fieldKey: string, expression: string) {
    try {
      const resp = await fetch('/studio/evaluate-expression', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ expression }),
      });
      const data = await resp.json() as { result?: unknown; error?: string };
      evalResult = { ...evalResult, [fieldKey]: data.error ? `Error: ${data.error}` : JSON.stringify(data.result) };
    } catch {
      evalResult = { ...evalResult, [fieldKey]: 'Request failed' };
    }
  }

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

  function insertUpstreamRef(fieldKey: string, nodeId: string, outputKey: string) {
    updateConfig(fieldKey, `$.${outputKey}`);
    pickerFieldKey = null;
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
      {#if prop.format === 'connection'}
        <ConnectionSelect
          value={String(configValue(key) ?? '')}
          service={prop.service}
          onChange={(id) => updateConfig(key, id)}
        />
      {:else if prop.type === 'object'}
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
        {#if exprFieldKey === key}
          <!-- Expression Editor mode -->
          <ExpressionEditor
            value={String(configValue(key) ?? '')}
            fieldName={key}
            contextKeys={upstreamNodes.flatMap(getUpstreamOutputKeys)}
            on:change={(e) => updateConfig(key, e.detail)}
            on:evaluate={(e) => evaluateExpression(key, e.detail)}
          />
          {#if evalResult[key]}
            <div class="eval-result">{String(evalResult[key])}</div>
          {/if}
          <button class="mode-toggle-btn" on:click={() => { exprFieldKey = null; evalResult = { ...evalResult, [key]: undefined }; }}>
            ← Value Picker mode
          </button>
        {:else}
          <!-- Value Picker mode -->
          <div class="field-with-picker">
            <input type="text"
              value={String(configValue(key) ?? '')}
              on:input={(e) => updateConfig(key, (e.target as HTMLInputElement).value)}
            />
            {#if upstreamNodes.length > 0}
              <button class="picker-btn" title="Reference upstream node output"
                on:click={() => { pickerFieldKey = pickerFieldKey === key ? null : key; }}>
                ↗
              </button>
            {/if}
            <button class="expr-toggle-btn" title="Switch to JSONata expression editor"
              on:click={() => { exprFieldKey = key; pickerFieldKey = null; }}>
              ƒ
            </button>
          </div>
          {#if pickerFieldKey === key && upstreamNodes.length > 0}
            <div class="picker-dropdown">
              <div class="picker-label">Insert reference to:</div>
              {#each upstreamNodes as upstream}
                {#each getUpstreamOutputKeys(upstream) as outputKey}
                  <button class="picker-option"
                    on:click={() => insertUpstreamRef(key, upstream.id, outputKey)}>
                    <span class="picker-node">{upstream.label ?? upstream.id}</span>
                    <span class="picker-ref">$.{outputKey}</span>
                  </button>
                {/each}
              {/each}
            </div>
          {/if}
        {/if}
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
  .field-with-picker { display: flex; gap: 0.25rem; }
  .field-with-picker input { flex: 1; }
  .picker-btn { background: #1e3a5f; border: 1px solid #1e40af; color: #93c5fd; border-radius: 4px; padding: 0 0.5rem; font-size: 0.75rem; cursor: pointer; flex-shrink: 0; }
  .picker-btn:hover { background: #1e40af; }
  .picker-dropdown { background: #1a1d27; border: 1px solid #2d3148; border-radius: 4px; margin-top: 0.25rem; overflow: hidden; }
  .picker-label { font-size: 0.625rem; color: #475569; padding: 0.375rem 0.625rem 0.125rem; text-transform: uppercase; letter-spacing: 0.05em; }
  .picker-option { display: flex; justify-content: space-between; align-items: center; width: 100%; background: none; border: none; border-top: 1px solid #2d3148; color: #e2e8f0; padding: 0.375rem 0.625rem; font-size: 0.75rem; cursor: pointer; text-align: left; }
  .picker-option:first-of-type { border-top: none; }
  .picker-option:hover { background: #2d3148; }
  .picker-node { color: #e2e8f0; }
  .picker-ref { color: #7c6af7; font-family: monospace; font-size: 0.6875rem; }
  .expr-toggle-btn { background: #1e1600; border: 1px solid #b45309; color: #f59e0b; border-radius: 4px; padding: 0 0.5rem; font-size: 0.8rem; cursor: pointer; flex-shrink: 0; font-family: monospace; }
  .expr-toggle-btn:hover { background: #2d1f00; }
  .mode-toggle-btn { background: none; border: none; color: #64748b; font-size: 0.65rem; cursor: pointer; padding: 2px 0; text-decoration: underline; }
  .mode-toggle-btn:hover { color: #94a3b8; }
  .eval-result { font-size: 0.7rem; color: #4ade80; font-family: monospace; background: #0d1117; border: 1px solid #1f2937; border-radius: 3px; padding: 4px 6px; margin-top: 2px; word-break: break-all; }
</style>
