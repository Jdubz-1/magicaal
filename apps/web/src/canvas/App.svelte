<script lang="ts">
  import { onMount } from 'svelte';
  import Canvas from './components/Canvas.svelte';
  import NodePalette from './components/NodePalette.svelte';
  import NodeConfigPanel from './components/NodeConfigPanel.svelte';
  import AgentConfigPanel from './components/AgentConfigPanel.svelte';
  import TestRunPanel from './components/TestRunPanel.svelte';
  import { graph, selectedNode, agent, agentConfig } from './stores/graph';
  import { recordCaalChange } from './stores/caalUndo';
  import LintPanel from './components/LintPanel.svelte';
  import ToolPanel from './components/ToolPanel.svelte';
  import CaalPanel from './components/CaalPanel.svelte';
  import CodeSourceBanner from './components/CodeSourceBanner.svelte';
  import SessionContextPanel from './components/SessionContextPanel.svelte';
  import PromptVersionPanel from './components/PromptVersionPanel.svelte';
  import TestCasesPanel from './components/TestCasesPanel.svelte';

  export let agentId: string;

  let readonly = false;
  let authoringHandle = '';
  let lastSyncAt: string | null = null;
  let activeSessionId: string | null = null;

  onMount(async () => {
    if (!agentId) return;
    try {
      const [agentRes, versionsRes, configRes] = await Promise.all([
        fetch(`/api/agents/${agentId}`),
        fetch(`/api/agents/${agentId}/versions`),
        fetch(`/api/agents/${agentId}/config`),
      ]);

      let agentData: { status: string; draftGraphJson?: string | null; authoringMode?: string; handle?: string; updatedAt?: string } | null = null;
      if (agentRes.ok) {
        agentData = await agentRes.json() as typeof agentData;
        agent.set(agentData as Parameters<typeof agent.set>[0]);
        readonly = agentData?.authoringMode === 'code-defined';
        authoringHandle = agentData?.handle ?? '';
        if (readonly) lastSyncAt = agentData?.updatedAt ?? null;
      }

      if (agentData?.draftGraphJson) {
        // draftGraphJson represents pending edits saved via "Save Draft" and
        // can legitimately be set on an already-published (status: 'active')
        // agent too — saveDraft() never touches status. It must always take
        // priority over the last-published snapshot below, or every edit
        // made after the first publish silently vanishes on reload.
        graph.set(JSON.parse(agentData.draftGraphJson));
      } else if (versionsRes.ok) {
        const versions = await versionsRes.json() as Array<{ graphJson: string }>;
        if (versions.length > 0) {
          const latest = versions[versions.length - 1];
          graph.set(JSON.parse(latest.graphJson ?? '{}'));
        }
      }

      if (configRes.ok) {
        const configData = await configRes.json() as {
          triggerConfig?: {
            type?: string;
            expression?: string;
            webhookUrl?: string;
          };
        };
        const tc = configData.triggerConfig ?? {};
        agentConfig.set({
          triggerType: (tc.type ?? 'rest') as 'rest' | 'cron' | 'webhook',
          description: '',
          cronExpression: tc.expression ?? '',
          webhookUrl: tc.webhookUrl ?? '',
        });
      }
    } catch {
      // agent not yet saved
    }

    // Listen for canvas events dispatched by CaalPanel
    window.addEventListener('caal:canvas-highlight', handleCanvasHighlight);
    window.addEventListener('caal:canvas-focus', handleCanvasFocus);
    window.addEventListener('caal:apply-proposal', handleApplyProposal);
  });

  function handleCanvasHighlight(e: Event) {
    const detail = (e as CustomEvent<{ nodeIds: string[]; color: string; durationMs: number }>).detail;
    window.dispatchEvent(new CustomEvent('canvas:highlight', { detail }));
  }

  function handleCanvasFocus(e: Event) {
    const detail = (e as CustomEvent<{ nodeId: string; zoom: number }>).detail;
    window.dispatchEvent(new CustomEvent('canvas:focus', { detail }));
  }

  function handleApplyProposal(e: Event) {
    const proposal = (e as CustomEvent<{
      description: string;
      patches: Array<{ op: string; target?: string; data?: Record<string, unknown> }>;
    }>).detail;

    // Snapshot before mutating so the change can be undone as a single
    // labelled entry (ISS-071) — recordCaalChange runs applyFn under its own
    // self-mutating guard so this graph.update() doesn't immediately
    // invalidate the snapshot it belongs to.
    recordCaalChange(structuredClone($graph), proposal.description, () => {
      graph.update((g) => {
        const updated = structuredClone(g) as {
          nodes: Record<string, unknown>;
          edges: unknown[];
          toolEdges: unknown[];
        };
        for (const patch of proposal.patches) {
          if (patch.op === 'add_node' && patch.data) {
            const nodeData = patch.data as { id: string; type: string; config?: Record<string, unknown> };
            updated.nodes[nodeData.id] = nodeData;
          } else if (patch.op === 'update_node' && patch.target && patch.data) {
            const existing = updated.nodes[patch.target] as Record<string, unknown> | undefined;
            if (existing) {
              updated.nodes[patch.target] = { ...existing, ...patch.data };
            }
          } else if (patch.op === 'delete_node' && patch.target) {
            delete updated.nodes[patch.target];
          } else if (patch.op === 'add_edge' && patch.data) {
            updated.edges = [...(updated.edges ?? []), patch.data];
          } else if (patch.op === 'delete_edge' && patch.data) {
            const { from, to } = patch.data as { from?: string; to?: string };
            updated.edges = (updated.edges ?? []).filter((e) => {
              const edge = e as { from: string; to: string };
              return !(edge.from === from && edge.to === to);
            });
          } else if (patch.op === 'add_tool_edge' && patch.data) {
            updated.toolEdges = [...(updated.toolEdges ?? []), patch.data];
          }
        }
        return updated;
      });
    });
  }
</script>

<div class="studio">
  <aside class="palette" class:readonly>
    <NodePalette {readonly} />
  </aside>
  <main class="canvas-area">
    {#if readonly}
      <CodeSourceBanner handle={authoringHandle} {lastSyncAt} />
    {/if}
    <Canvas {agentId} {readonly} />
  </main>
  <aside class="panel">
    {#if $selectedNode}
      <NodeConfigPanel node={$selectedNode} {readonly} />
    {:else}
      <AgentConfigPanel {agentId} {readonly} />
    {/if}
    <LintPanel />
    <ToolPanel />
    <TestRunPanel {agentId} on:sessionId={(e) => (activeSessionId = e.detail)} />
    <SessionContextPanel {agentId} sessionId={activeSessionId} />
    <PromptVersionPanel {agentId} />
    <TestCasesPanel {agentId} />
    <CaalPanel {agentId} {readonly} />
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
