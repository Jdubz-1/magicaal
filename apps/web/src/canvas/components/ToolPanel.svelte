<script lang="ts">
  import { graph, selectedNode } from '../stores/graph';

  const TOOL_SOURCE_TYPES = new Set(['core:tool', 'core:mcp-client']);
  const AGENT_NODE_TYPES = new Set(['core:tool-call', 'core:react']);

  // Determine what to show based on selected node
  $: activeNodeId = $selectedNode?.id ?? null;
  $: activeNodeType = $selectedNode?.type ?? null;

  // Tools connected TO the selected agent node
  $: connectedTools = activeNodeId && AGENT_NODE_TYPES.has(activeNodeType ?? '')
    ? ($graph.toolEdges ?? [])
        .filter((te) => te.to === activeNodeId)
        .map((te) => ({ edge: te, node: $graph.nodes[te.from] }))
        .filter((t) => t.node !== undefined)
    : [];

  // When a tool node is selected, show its config
  $: selectedToolConfig = activeNodeId && TOOL_SOURCE_TYPES.has(activeNodeType ?? '')
    ? $selectedNode?.config
    : null;

  // Agents this tool is connected to
  $: toolTargets = activeNodeId && TOOL_SOURCE_TYPES.has(activeNodeType ?? '')
    ? ($graph.toolEdges ?? [])
        .filter((te) => te.from === activeNodeId)
        .map((te) => $graph.nodes[te.to])
        .filter(Boolean)
    : [];
</script>

<div class="tool-panel">
  <div class="panel-header">TOOLS</div>

  {#if AGENT_NODE_TYPES.has(activeNodeType ?? '')}
    {#if connectedTools.length === 0}
      <p class="empty-state">No tools connected.<br/>Connect <code>core:tool</code> or <code>core:mcp-client</code> nodes via tool edges.</p>
    {:else}
      <ul class="tool-list">
        {#each connectedTools as { node }}
          <li class="tool-item">
            <span class="tool-name">{String(node.config?.name ?? node.type)}</span>
            <span class="tool-source">{node.type === 'core:mcp-client' ? 'MCP' : 'Graph'}</span>
            {#if node.config?.description}
              <span class="tool-desc">{String(node.config.description)}</span>
            {/if}
          </li>
        {/each}
      </ul>
    {/if}

  {:else if TOOL_SOURCE_TYPES.has(activeNodeType ?? '') && selectedToolConfig}
    <div class="tool-detail">
      {#if selectedToolConfig.name}
        <div class="detail-row"><span class="detail-label">Name</span><code>{String(selectedToolConfig.name)}</code></div>
      {/if}
      {#if selectedToolConfig.description}
        <div class="detail-row"><span class="detail-label">Description</span><span>{String(selectedToolConfig.description)}</span></div>
      {/if}
      {#if toolTargets.length > 0}
        <div class="detail-row">
          <span class="detail-label">Connected to</span>
          <span>{toolTargets.map((n) => n?.label ?? n?.id).join(', ')}</span>
        </div>
      {/if}
    </div>

  {:else}
    <p class="empty-state">Select an agent node (<code>core:tool-call</code>, <code>core:react</code>) or a tool node to inspect its tools.</p>
  {/if}
</div>

<style>
  .tool-panel { padding: 0.75rem 1rem; border-bottom: 1px solid #2d3148; }
  .panel-header { font-size: 0.6875rem; font-weight: 600; letter-spacing: 0.08em; color: #475569; text-transform: uppercase; margin-bottom: 0.5rem; }
  .empty-state { font-size: 0.75rem; color: #64748b; line-height: 1.5; margin: 0; }
  .empty-state code { font-size: 0.7rem; color: #f59e0b; background: #1e1600; padding: 0 3px; border-radius: 3px; }
  .tool-list { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 0.375rem; }
  .tool-item { display: flex; flex-direction: column; gap: 2px; padding: 0.375rem 0.5rem; background: #1a1c2e; border-radius: 4px; border-left: 2px solid #f59e0b; }
  .tool-name { font-size: 0.8125rem; font-weight: 600; color: #e2e8f0; font-family: monospace; }
  .tool-source { font-size: 0.65rem; color: #f59e0b; text-transform: uppercase; letter-spacing: 0.06em; }
  .tool-desc { font-size: 0.7rem; color: #94a3b8; line-height: 1.4; }
  .tool-detail { display: flex; flex-direction: column; gap: 0.375rem; }
  .detail-row { display: flex; flex-direction: column; gap: 2px; }
  .detail-label { font-size: 0.65rem; color: #475569; text-transform: uppercase; letter-spacing: 0.06em; }
  .detail-row code { font-size: 0.8rem; color: #f59e0b; font-family: monospace; }
  .detail-row span:last-child { font-size: 0.75rem; color: #94a3b8; }
</style>
