<script lang="ts">
  import { onMount } from 'svelte';
  import Canvas from './components/Canvas.svelte';
  import NodePalette from './components/NodePalette.svelte';
  import NodeConfigPanel from './components/NodeConfigPanel.svelte';
  import AgentConfigPanel from './components/AgentConfigPanel.svelte';
  import TestRunPanel from './components/TestRunPanel.svelte';
  import { graph, selectedNode, agent } from './stores/graph';

  export let agentId: string;

  onMount(async () => {
    if (!agentId) return;
    try {
      const [agentRes, versionsRes] = await Promise.all([
        fetch(`/api/agents/${agentId}`),
        fetch(`/api/agents/${agentId}/versions`),
      ]);
      if (agentRes.ok) {
        const data = await agentRes.json();
        agent.set(data);
      }
      if (versionsRes.ok) {
        const versions = await versionsRes.json();
        if (versions.length > 0) {
          const latest = versions[versions.length - 1];
          graph.set(JSON.parse(latest.graphJson ?? '{}'));
        }
      }
    } catch {
      // agent not yet saved
    }
  });
</script>

<div class="studio">
  <aside class="palette">
    <NodePalette />
  </aside>
  <main class="canvas-area">
    <Canvas {agentId} />
  </main>
  <aside class="panel">
    {#if $selectedNode}
      <NodeConfigPanel node={$selectedNode} />
    {:else}
      <AgentConfigPanel {agentId} />
    {/if}
    <TestRunPanel {agentId} />
  </aside>
</div>

<style>
  .studio {
    display: flex;
    height: 100%;
    overflow: hidden;
  }
  .palette {
    width: 200px;
    background: #1a1d27;
    border-right: 1px solid #2d3148;
    overflow-y: auto;
  }
  .canvas-area {
    flex: 1;
    min-width: 0;
    position: relative;
  }
  .panel {
    width: 280px;
    background: #1a1d27;
    border-left: 1px solid #2d3148;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 0;
  }
</style>
