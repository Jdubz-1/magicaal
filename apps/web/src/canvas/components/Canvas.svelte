<script lang="ts">
  import { graph, selectedNode, type NodeDef, type EdgeDef } from '../stores/graph';

  export let agentId: string;

  let nodes: NodeDef[] = [];
  let edges: EdgeDef[] = [];
  let draggingNode: NodeDef | null = null;
  let dragOffset = { x: 0, y: 0 };
  let svgEl: SVGSVGElement;
  let viewBox = { x: 0, y: 0, w: 1000, h: 600 };

  $: {
    nodes = Object.values($graph.nodes);
    edges = $graph.edges;
  }

  function selectNode(node: NodeDef) {
    selectedNode.set(node);
  }

  function getNodePos(id: string) {
    const n = $graph.nodes[id];
    return n?.position ?? { x: 100, y: 100 };
  }
</script>

<div class="canvas-wrap">
  <svg bind:this={svgEl} viewBox="{viewBox.x} {viewBox.y} {viewBox.w} {viewBox.h}" style="width:100%;height:100%">
    <defs>
      <marker id="arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
        <path d="M0,0 L0,6 L8,3 z" fill="#7c6af7"/>
      </marker>
    </defs>

    <!-- Edges -->
    {#each edges as edge}
      {@const from = getNodePos(edge.from)}
      {@const to = getNodePos(edge.to)}
      <line
        x1={from.x + 80} y1={from.y + 20}
        x2={to.x} y2={to.y + 20}
        stroke={edge.type === 'fallback' ? '#94a3b8' : '#7c6af7'}
        stroke-width="2"
        stroke-dasharray={edge.type === 'fallback' ? '4' : '0'}
        marker-end="url(#arrow)"
      />
    {/each}

    <!-- Nodes -->
    {#each nodes as node}
      {@const pos = node.position ?? { x: 100, y: 100 }}
      <g
        transform="translate({pos.x},{pos.y})"
        style="cursor:pointer"
        role="button"
        tabindex="0"
        on:click={() => selectNode(node)}
        on:keydown={(e) => e.key === 'Enter' && selectNode(node)}
      >
        <rect
          width="160" height="40" rx="6"
          fill={$selectedNode?.id === node.id ? '#312e7a' : '#1e2035'}
          stroke={$selectedNode?.id === node.id ? '#7c6af7' : '#2d3148'}
          stroke-width="1.5"
        />
        <text x="12" y="14" fill="#94a3b8" font-size="9" font-family="monospace">{node.type}</text>
        <text x="12" y="29" fill="#e2e8f0" font-size="12" font-family="system-ui">{node.label ?? node.id}</text>
      </g>
    {/each}
  </svg>

  {#if nodes.length === 0}
    <div class="empty-hint">
      Drag nodes from the palette to build your agent graph
    </div>
  {/if}
</div>

<style>
  .canvas-wrap {
    width: 100%;
    height: 100%;
    background: #0f1117;
    background-image: radial-gradient(circle, #2d3148 1px, transparent 1px);
    background-size: 24px 24px;
    position: relative;
    overflow: hidden;
  }
  .empty-hint {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #475569;
    font-size: 0.875rem;
    pointer-events: none;
  }
</style>
