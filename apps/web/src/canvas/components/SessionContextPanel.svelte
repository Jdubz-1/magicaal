<script lang="ts">
  import { onMount } from 'svelte';

  export let agentId: string;
  export let sessionId: string | null = null;

  interface ContextEntry {
    key: string;
    value: unknown;
    accumulationType: string;
    count?: number;
  }

  let expanded = false;
  let loading = false;
  let contextEntries: ContextEntry[] = [];
  let error: string | null = null;

  async function loadContext() {
    if (!agentId || !sessionId) return;
    loading = true;
    error = null;
    try {
      const res = await fetch(`/api/v1/agents/${agentId}/sessions/${encodeURIComponent(sessionId)}`);
      if (!res.ok) throw new Error(`${res.status}`);
      const data = await res.json() as {
        contextEntries: Record<string, { value: unknown; accumulationType: string }>;
      };
      contextEntries = Object.entries(data.contextEntries ?? {}).map(([key, entry]) => ({
        key,
        value: entry.value,
        accumulationType: entry.accumulationType,
        count: Array.isArray(entry.value) ? (entry.value as unknown[]).length : undefined,
      }));
    } catch (err) {
      error = (err as Error).message;
    } finally {
      loading = false;
    }
  }

  $: if (sessionId && expanded) void loadContext();

  function estimateTokens(value: unknown): number {
    return Math.ceil(JSON.stringify(value).length / 4);
  }

  function formatValue(value: unknown): string {
    const str = JSON.stringify(value, null, 2);
    return str.length > 200 ? str.slice(0, 200) + '…' : str;
  }
</script>

{#if sessionId}
  <div class="session-panel">
    <button class="panel-header" on:click={() => { expanded = !expanded; }}>
      <span>Session Context</span>
      <span class="toggle">{expanded ? '▼' : '▶'}</span>
    </button>
    {#if expanded}
      <div class="panel-body">
        <div class="session-id-row">
          <span class="label">Session</span>
          <code class="sid">{sessionId}</code>
          <button class="refresh-btn" on:click={loadContext} disabled={loading}>↻</button>
        </div>
        {#if loading}
          <div class="loading">Loading…</div>
        {:else if error}
          <div class="error">{error}</div>
        {:else if contextEntries.length === 0}
          <div class="empty">No context entries yet.</div>
        {:else}
          <div class="entries">
            {#each contextEntries as entry}
              <div class="entry">
                <div class="entry-header">
                  <code class="entry-key">{entry.key}</code>
                  <span class="acc-type">{entry.accumulationType}</span>
                  {#if entry.count !== undefined}
                    <span class="count">{entry.count} items</span>
                  {/if}
                  <span class="tokens">~{estimateTokens(entry.value)}t</span>
                </div>
                <pre class="entry-value">{formatValue(entry.value)}</pre>
              </div>
            {/each}
          </div>
        {/if}
      </div>
    {/if}
  </div>
{/if}

<style>
  .session-panel {
    border-top: 1px solid #2d3148;
    font-size: 12px;
  }
  .panel-header {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 12px;
    background: none;
    border: none;
    color: #94a3b8;
    cursor: pointer;
    font-size: 11px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
  .panel-header:hover { color: #e2e8f0; }
  .toggle { font-size: 10px; }
  .panel-body { padding: 0 12px 10px; }
  .session-id-row {
    display: flex;
    align-items: center;
    gap: 6px;
    margin-bottom: 8px;
  }
  .label { color: #64748b; font-size: 10px; }
  .sid {
    color: #93c5fd;
    font-size: 10px;
    background: #0f1117;
    padding: 2px 5px;
    border-radius: 3px;
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .refresh-btn {
    background: none;
    border: none;
    color: #64748b;
    cursor: pointer;
    font-size: 13px;
  }
  .refresh-btn:hover { color: #e2e8f0; }
  .loading, .empty { color: #64748b; font-size: 11px; text-align: center; padding: 8px; }
  .error { color: #f87171; font-size: 11px; }
  .entries { display: flex; flex-direction: column; gap: 6px; }
  .entry {
    background: #0f1117;
    border: 1px solid #1e2235;
    border-radius: 5px;
    overflow: hidden;
  }
  .entry-header {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 4px 8px;
    background: #12141f;
    border-bottom: 1px solid #1e2235;
  }
  .entry-key { color: #93c5fd; font-size: 11px; }
  .acc-type {
    font-size: 9px;
    color: #64748b;
    background: #1e2235;
    padding: 1px 4px;
    border-radius: 3px;
  }
  .count { font-size: 10px; color: #a78bfa; margin-left: auto; }
  .tokens { font-size: 9px; color: #64748b; }
  .entry-value {
    color: #94a3b8;
    font-size: 10px;
    padding: 6px 8px;
    margin: 0;
    white-space: pre-wrap;
    word-break: break-all;
    max-height: 80px;
    overflow-y: auto;
    font-family: monospace;
  }
</style>
