<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  interface CaalPatch {
    op: string;
    target?: string;
    data?: Record<string, unknown>;
  }

  export interface CaalProposal {
    id: string;
    description: string;
    rationale: string;
    complexity: 'targeted' | 'structural' | 'replacement';
    patches: CaalPatch[];
    createdAt: string;
  }

  export let proposal: CaalProposal;

  const dispatch = createEventDispatcher<{ apply: CaalProposal; reject: void }>();

  let accepted: Record<number, boolean> = {};

  $: {
    // Default all patches to accepted
    accepted = Object.fromEntries(proposal.patches.map((_, i) => [i, true]));
  }

  function acceptAll() {
    accepted = Object.fromEntries(proposal.patches.map((_, i) => [i, true]));
  }

  function rejectAll() {
    accepted = Object.fromEntries(proposal.patches.map((_, i) => [i, false]));
  }

  function apply() {
    const filteredPatches = proposal.patches.filter((_, i) => accepted[i]);
    dispatch('apply', { ...proposal, patches: filteredPatches });
  }

  function reject() {
    dispatch('reject');
  }

  const complexityColor: Record<string, string> = {
    targeted: '#22c55e',
    structural: '#f59e0b',
    replacement: '#ef4444',
  };

  function opLabel(op: string): string {
    const labels: Record<string, string> = {
      add_node: '+ Add node',
      update_node: '~ Update node',
      delete_node: '− Delete node',
      add_edge: '+ Add edge',
      delete_edge: '− Delete edge',
      add_tool_edge: '+ Add tool edge',
    };
    return labels[op] ?? op;
  }
</script>

<div class="proposal-card">
  <div class="proposal-header">
    <span class="complexity-badge" style="color: {complexityColor[proposal.complexity]}">
      {proposal.complexity}
    </span>
    <span class="proposal-desc">{proposal.description}</span>
  </div>
  {#if proposal.rationale}
    <div class="rationale">{proposal.rationale}</div>
  {/if}
  <div class="patches-list">
    {#each proposal.patches as patch, i}
      <label class="patch-row">
        <input type="checkbox" bind:checked={accepted[i]} />
        <span class="op-label">{opLabel(patch.op)}</span>
        {#if patch.target}
          <code class="target">{patch.target}</code>
        {/if}
        {#if patch.data && Object.keys(patch.data).length > 0}
          <span class="data-preview">{JSON.stringify(patch.data).slice(0, 60)}&hellip;</span>
        {/if}
      </label>
    {/each}
  </div>
  <div class="proposal-actions">
    <button class="btn-text" on:click={acceptAll}>Accept All</button>
    <button class="btn-text" on:click={rejectAll}>Reject All</button>
    <span class="spacer"></span>
    <button class="btn-secondary" on:click={reject}>Dismiss</button>
    <button class="btn-primary" on:click={apply}>Apply</button>
  </div>
</div>

<style>
  .proposal-card {
    background: #1a1d27;
    border: 1px solid #f59e0b;
    border-radius: 8px;
    margin: 6px 8px;
    padding: 10px;
    font-size: 12px;
  }
  .proposal-header {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 6px;
  }
  .complexity-badge {
    font-size: 10px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
  .proposal-desc {
    color: #e2e8f0;
    font-weight: 500;
  }
  .rationale {
    color: #94a3b8;
    font-size: 11px;
    margin-bottom: 8px;
  }
  .patches-list {
    display: flex;
    flex-direction: column;
    gap: 4px;
    margin-bottom: 8px;
    max-height: 120px;
    overflow-y: auto;
  }
  .patch-row {
    display: flex;
    align-items: center;
    gap: 6px;
    cursor: pointer;
    padding: 3px 4px;
    border-radius: 4px;
  }
  .patch-row:hover { background: #1e2235; }
  .op-label {
    color: #cbd5e1;
    font-family: monospace;
    font-size: 11px;
    min-width: 90px;
  }
  .target {
    background: #0f1117;
    color: #93c5fd;
    padding: 1px 4px;
    border-radius: 3px;
    font-size: 10px;
  }
  .data-preview {
    color: #64748b;
    font-size: 10px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: 120px;
  }
  .proposal-actions {
    display: flex;
    align-items: center;
    gap: 6px;
  }
  .spacer { flex: 1; }
  .btn-text {
    background: none;
    border: none;
    color: #64748b;
    font-size: 11px;
    cursor: pointer;
    padding: 2px 4px;
  }
  .btn-text:hover { color: #e2e8f0; }
  .btn-secondary {
    background: #1e2235;
    border: 1px solid #2d3148;
    color: #94a3b8;
    border-radius: 5px;
    padding: 4px 10px;
    font-size: 11px;
    cursor: pointer;
  }
  .btn-secondary:hover { border-color: #ef4444; color: #fca5a5; }
  .btn-primary {
    background: #f59e0b;
    border: none;
    color: #000;
    border-radius: 5px;
    padding: 4px 12px;
    font-size: 11px;
    font-weight: 600;
    cursor: pointer;
  }
  .btn-primary:hover { background: #fbbf24; }
</style>
