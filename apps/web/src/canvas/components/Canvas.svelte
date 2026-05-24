<script lang="ts">
  import { graph, selectedNode, type NodeDef, type EdgeDef, addEdge } from '../stores/graph';

  export let agentId: string;

  let nodes: NodeDef[] = [];
  let edges: EdgeDef[] = [];
  let draggingNode: NodeDef | null = null;
  let dragOffset = { x: 0, y: 0 };
  let svgEl: SVGSVGElement;
  let viewBox = { x: 0, y: 0, w: 1000, h: 600 };

  // Pan state
  let isPanning = false;
  let panStart = { mx: 0, my: 0, vbx: 0, vby: 0 };

  // Edge drag state
  let draggingEdge: { fromNodeId: string; x: number; y: number } | null = null;
  let dragPos = { x: 0, y: 0 };
  let pendingEdge: { from: string; to: string } | null = null;
  let pendingEdgeScreenPos = { x: 0, y: 0 };
  let pendingCondition = '';
  let showConditionInput = false;

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

  function toSvgCoords(clientX: number, clientY: number) {
    const pt = svgEl.createSVGPoint();
    pt.x = clientX;
    pt.y = clientY;
    const t = pt.matrixTransform(svgEl.getScreenCTM()!.inverse());
    return { x: t.x, y: t.y };
  }

  function nonpassiveWheel(node: SVGSVGElement, handler: (e: WheelEvent) => void) {
    node.addEventListener('wheel', handler, { passive: false });
    return { destroy() { node.removeEventListener('wheel', handler); } };
  }

  function onWheel(e: WheelEvent) {
    e.preventDefault();
    const factor = e.deltaY > 0 ? 1.1 : 0.9;
    const rect = svgEl.getBoundingClientRect();
    const mx = (e.clientX - rect.left) / rect.width * viewBox.w + viewBox.x;
    const my = (e.clientY - rect.top) / rect.height * viewBox.h + viewBox.y;
    viewBox = {
      x: mx - (mx - viewBox.x) * factor,
      y: my - (my - viewBox.y) * factor,
      w: viewBox.w * factor,
      h: viewBox.h * factor,
    };
  }

  function onSvgMousedown(e: MouseEvent) {
    const target = e.target as Element;
    if (target.closest('g') || target.tagName === 'circle') return;
    isPanning = true;
    panStart = { mx: e.clientX, my: e.clientY, vbx: viewBox.x, vby: viewBox.y };
  }

  function onNodeMousedown(e: MouseEvent, node: NodeDef) {
    const pos = toSvgCoords(e.clientX, e.clientY);
    const nodePos = node.position ?? { x: 100, y: 100 };
    draggingNode = node;
    dragOffset = { x: pos.x - nodePos.x, y: pos.y - nodePos.y };
  }

  function startEdgeDrag(e: MouseEvent, nodeId: string) {
    const pos = toSvgCoords(e.clientX, e.clientY);
    draggingEdge = { fromNodeId: nodeId, x: pos.x, y: pos.y };
    dragPos = pos;
  }

  function endEdgeDrag(toNodeId: string) {
    if (draggingEdge && draggingEdge.fromNodeId !== toNodeId) {
      const rect = svgEl.getBoundingClientRect();
      pendingEdgeScreenPos = {
        x: (dragPos.x - viewBox.x) / viewBox.w * rect.width,
        y: (dragPos.y - viewBox.y) / viewBox.h * rect.height,
      };
      pendingEdge = { from: draggingEdge.fromNodeId, to: toNodeId };
    }
    draggingEdge = null;
  }

  function onMousemove(e: MouseEvent) {
    if (isPanning) {
      const sx = viewBox.w / svgEl.clientWidth;
      const sy = viewBox.h / svgEl.clientHeight;
      viewBox = {
        ...viewBox,
        x: panStart.vbx - (e.clientX - panStart.mx) * sx,
        y: panStart.vby - (e.clientY - panStart.my) * sy,
      };
    }
    if (draggingNode) {
      const pos = toSvgCoords(e.clientX, e.clientY);
      const nodeId = draggingNode.id;
      graph.update((g) => ({
        ...g,
        nodes: {
          ...g.nodes,
          [nodeId]: {
            ...g.nodes[nodeId],
            position: { x: pos.x - dragOffset.x, y: pos.y - dragOffset.y },
          },
        },
      }));
    }
    if (draggingEdge) {
      dragPos = toSvgCoords(e.clientX, e.clientY);
    }
  }

  function onMouseup() {
    isPanning = false;
    draggingNode = null;
    draggingEdge = null;
  }

  function confirmEdge(type: EdgeDef['type'], condition?: string) {
    if (!pendingEdge) return;
    const newEdge: EdgeDef = {
      id: `e-${Date.now()}`,
      from: pendingEdge.from,
      to: pendingEdge.to,
      type,
      ...(condition ? { condition } : {}),
    };
    addEdge(newEdge);
    pendingEdge = null;
    showConditionInput = false;
    pendingCondition = '';
  }
</script>

<div
  class="canvas-wrap"
  on:mousemove={onMousemove}
  on:mouseup={onMouseup}
  on:mouseleave={onMouseup}
  role="presentation"
>
  <svg
    bind:this={svgEl}
    viewBox="{viewBox.x} {viewBox.y} {viewBox.w} {viewBox.h}"
    style="width:100%;height:100%"
    use:nonpassiveWheel={onWheel}
    on:mousedown={onSvgMousedown}
  >
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
        x1={from.x + 160} y1={from.y + 20}
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
        on:mousedown|stopPropagation={(e) => onNodeMousedown(e, node)}
      >
        <rect
          width="160" height="40" rx="6"
          fill={$selectedNode?.id === node.id ? '#312e7a' : '#1e2035'}
          stroke={$selectedNode?.id === node.id ? '#7c6af7' : '#2d3148'}
          stroke-width="1.5"
        />
        <text x="12" y="14" fill="#94a3b8" font-size="9" font-family="monospace">{node.type}</text>
        <text x="12" y="29" fill="#e2e8f0" font-size="12" font-family="system-ui">{node.label ?? node.id}</text>
        <!-- Output port (right side) -->
        <circle cx="160" cy="20" r="5" class="port port-out"
          on:mousedown|stopPropagation={(e) => startEdgeDrag(e, node.id)} />
        <!-- Input port (left side) -->
        <circle cx="0" cy="20" r="5" class="port port-in"
          on:mouseup|stopPropagation={() => endEdgeDrag(node.id)} />
      </g>
    {/each}

    <!-- Rubber-band line while dragging edge -->
    {#if draggingEdge}
      <line
        x1={draggingEdge.x} y1={draggingEdge.y}
        x2={dragPos.x} y2={dragPos.y}
        stroke="#7c6af7" stroke-width="1.5" stroke-dasharray="6,3"
        pointer-events="none"
      />
    {/if}
  </svg>

  <!-- Edge type picker popup -->
  {#if pendingEdge}
    <div class="edge-picker" style="left:{pendingEdgeScreenPos.x}px;top:{pendingEdgeScreenPos.y}px">
      <button class="picker-btn" on:click={() => confirmEdge('unconditional')}>Unconditional</button>
      <button class="picker-btn" on:click={() => confirmEdge('fallback')}>Fallback</button>
      <button class="picker-btn" on:click={() => { showConditionInput = !showConditionInput; }}>Conditional</button>
      {#if showConditionInput}
        <input class="picker-input" type="text" bind:value={pendingCondition} placeholder="JSONata expression" />
        <button class="picker-btn picker-add" on:click={() => confirmEdge('conditional', pendingCondition)}>Add</button>
      {/if}
      <button class="picker-btn picker-cancel" on:click={() => { pendingEdge = null; showConditionInput = false; }}>Cancel</button>
    </div>
  {/if}

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
  :global(.port) {
    fill: #7c6af7;
    opacity: 0.4;
    transition: opacity 0.1s;
    cursor: crosshair;
  }
  :global(g:hover .port) {
    opacity: 1;
  }
  .edge-picker {
    position: absolute;
    background: #1a1d27;
    border: 1px solid #2d3148;
    border-radius: 6px;
    padding: 0.5rem;
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    z-index: 10;
    min-width: 148px;
    transform: translate(-50%, 8px);
  }
  .picker-btn {
    background: #0f1117;
    color: #e2e8f0;
    border: 1px solid #2d3148;
    border-radius: 4px;
    padding: 0.3rem 0.6rem;
    font-size: 0.75rem;
    cursor: pointer;
    text-align: left;
  }
  .picker-btn:hover { background: #2d3148; }
  .picker-add { background: #14532d; color: #86efac; border-color: #166534; }
  .picker-add:hover { background: #166534; }
  .picker-cancel { color: #94a3b8; }
  .picker-input {
    background: #0f1117;
    border: 1px solid #2d3148;
    border-radius: 4px;
    color: #e2e8f0;
    padding: 0.25rem 0.5rem;
    font-size: 0.75rem;
    font-family: monospace;
  }
</style>
