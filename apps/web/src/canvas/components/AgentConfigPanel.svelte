<script lang="ts">
  import { agent, graph } from '../stores/graph';

  export let agentId: string;

  let publishing = false;
  let publishMsg = '';

  async function publish() {
    publishing = true;
    publishMsg = '';
    try {
      const graphJson = JSON.stringify($graph);
      const res = await fetch(`/api/agents/${agentId}/publish`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ graphJson }),
      });
      if (!res.ok) throw new Error('Publish failed');
      publishMsg = '✓ Published';
    } catch (err) {
      publishMsg = '✗ ' + (err instanceof Error ? err.message : 'Error');
    } finally {
      publishing = false;
    }
  }
</script>

<div class="panel-section">
  <div class="panel-header">Agent</div>
  {#if $agent}
    <div class="agent-name">{$agent.name}</div>
    <div class="agent-status status-{$agent.status}">{$agent.status}</div>
  {/if}
  <button class="btn-publish" disabled={publishing} on:click={publish}>
    {publishing ? 'Publishing…' : 'Publish'}
  </button>
  {#if publishMsg}
    <div class="publish-msg">{publishMsg}</div>
  {/if}
</div>

<style>
  .panel-section { padding: 1rem; border-bottom: 1px solid #2d3148; }
  .panel-header { font-size: 0.6875rem; text-transform: uppercase; letter-spacing: 0.08em; color: #475569; margin-bottom: 0.75rem; }
  .agent-name { font-size: 0.9375rem; font-weight: 600; color: #e2e8f0; margin-bottom: 0.25rem; }
  .agent-status { font-size: 0.75rem; color: #94a3b8; margin-bottom: 1rem; }
  .status-active { color: #86efac; }
  .status-draft { color: #fbbf24; }
  .btn-publish { background: #7c6af7; color: #fff; border: none; border-radius: 6px; padding: 0.5rem 1rem; font-size: 0.8125rem; cursor: pointer; width: 100%; }
  .btn-publish:hover:not(:disabled) { background: #6b57f0; }
  .btn-publish:disabled { opacity: 0.5; cursor: not-allowed; }
  .publish-msg { font-size: 0.75rem; color: #94a3b8; margin-top: 0.5rem; }
</style>
