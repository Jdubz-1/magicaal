<script lang="ts">
  import { onMount } from 'svelte';

  export let agentId: string;

  interface PromptVersion {
    id: string;
    versionNumber: number;
    content: string;
    isActive: boolean;
    createdAt: string;
  }

  interface Prompt {
    name: string;
    activeVersion: PromptVersion | null;
    versions: PromptVersion[];
  }

  let expanded = false;
  let loading = false;
  let prompts: Prompt[] = [];
  let expandedPrompts: Set<string> = new Set();
  let newVersionName = '';
  let newVersionContent = '';
  let showNewModal = false;
  let diffMode: { name: string; v1: PromptVersion; v2: PromptVersion } | null = null;
  let error: string | null = null;

  async function loadPrompts() {
    loading = true;
    error = null;
    try {
      const res = await fetch('/api/v1/prompts');
      if (!res.ok) throw new Error(`${res.status}`);
      const data = await res.json() as { prompts: Prompt[] };
      prompts = data.prompts ?? [];
    } catch (err) {
      error = (err as Error).message;
    } finally {
      loading = false;
    }
  }

  async function promoteVersion(name: string, versionId: string) {
    try {
      const res = await fetch(`/api/v1/prompts/${encodeURIComponent(name)}/versions/${versionId}/promote`, {
        method: 'POST',
      });
      if (!res.ok) throw new Error(`${res.status}`);
      await loadPrompts();
    } catch (err) {
      error = (err as Error).message;
    }
  }

  async function createVersion() {
    if (!newVersionName || !newVersionContent) return;
    try {
      const res = await fetch('/api/v1/prompts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newVersionName, content: newVersionContent }),
      });
      if (!res.ok) throw new Error(`${res.status}`);
      showNewModal = false;
      newVersionName = '';
      newVersionContent = '';
      await loadPrompts();
    } catch (err) {
      error = (err as Error).message;
    }
  }

  $: if (expanded && prompts.length === 0) void loadPrompts();

  function togglePrompt(name: string) {
    if (expandedPrompts.has(name)) {
      expandedPrompts.delete(name);
    } else {
      expandedPrompts.add(name);
    }
    expandedPrompts = new Set(expandedPrompts);
  }

  function showDiff(name: string, v1: PromptVersion, v2: PromptVersion) {
    diffMode = { name, v1, v2 };
  }
</script>

<div class="prompt-panel">
  <button class="panel-header" on:click={() => { expanded = !expanded; }}>
    <span>Prompt Versions</span>
    <span class="toggle">{expanded ? '▼' : '▶'}</span>
  </button>

  {#if expanded}
    <div class="panel-body">
      {#if loading}
        <div class="loading">Loading…</div>
      {:else if error}
        <div class="error">{error}</div>
      {:else if prompts.length === 0}
        <div class="empty">No prompts defined.</div>
      {:else}
        <div class="prompts-list">
          {#each prompts as prompt}
            <div class="prompt-item">
              <button class="prompt-name" on:click={() => togglePrompt(prompt.name)}>
                <span class="active-dot" class:active={prompt.activeVersion !== null}></span>
                <span>{prompt.name}</span>
                <span class="version-count">v{prompt.activeVersion?.versionNumber ?? '—'}</span>
                <span class="chevron">{expandedPrompts.has(prompt.name) ? '▼' : '▶'}</span>
              </button>
              {#if expandedPrompts.has(prompt.name)}
                <div class="versions-list">
                  {#each (prompt.versions ?? []) as version}
                    <div class="version-row" class:active={version.isActive}>
                      <span class="vnum">v{version.versionNumber}</span>
                      {#if version.isActive}
                        <span class="active-label">active</span>
                      {:else}
                        <button
                          class="promote-btn"
                          on:click={() => promoteVersion(prompt.name, version.id)}
                        >Promote</button>
                      {/if}
                      {#if prompt.activeVersion && !version.isActive}
                        <button
                          class="diff-btn"
                          on:click={() => showDiff(prompt.name, prompt.activeVersion!, version)}
                        >Diff</button>
                      {/if}
                      <span class="version-date">{new Date(version.createdAt).toLocaleDateString()}</span>
                    </div>
                    <pre class="version-preview">{version.content.slice(0, 120)}{version.content.length > 120 ? '…' : ''}</pre>
                  {/each}
                </div>
              {/if}
            </div>
          {/each}
        </div>
      {/if}
      <button class="new-btn" on:click={() => (showNewModal = true)}>+ New Version</button>
    </div>
  {/if}
</div>

{#if showNewModal}
  <div class="modal-overlay" on:click|self={() => (showNewModal = false)}>
    <div class="modal">
      <h3>New Prompt Version</h3>
      <label>
        Prompt Name
        <input bind:value={newVersionName} placeholder="e.g. system-prompt" />
      </label>
      <label>
        Content
        <textarea bind:value={newVersionContent} rows={6} placeholder="Prompt content…"></textarea>
      </label>
      <div class="modal-actions">
        <button class="btn-secondary" on:click={() => (showNewModal = false)}>Cancel</button>
        <button class="btn-primary" on:click={createVersion}>Create</button>
      </div>
    </div>
  </div>
{/if}

{#if diffMode}
  <div class="modal-overlay" on:click|self={() => (diffMode = null)}>
    <div class="modal diff-modal">
      <h3>Diff: {diffMode.name}</h3>
      <div class="diff-grid">
        <div class="diff-col">
          <div class="diff-label">Active (v{diffMode.v1.versionNumber})</div>
          <pre>{diffMode.v1.content}</pre>
        </div>
        <div class="diff-col">
          <div class="diff-label">v{diffMode.v2.versionNumber}</div>
          <pre>{diffMode.v2.content}</pre>
        </div>
      </div>
      <div class="modal-actions">
        <button class="btn-secondary" on:click={() => (diffMode = null)}>Close</button>
        <button class="btn-primary" on:click={() => { void promoteVersion(diffMode!.name, diffMode!.v2.id); diffMode = null; }}>Promote v{diffMode.v2.versionNumber}</button>
      </div>
    </div>
  </div>
{/if}

<style>
  .prompt-panel { border-top: 1px solid #2d3148; font-size: 12px; }
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
  .panel-body { padding: 0 8px 10px; }
  .loading, .empty { color: #64748b; font-size: 11px; text-align: center; padding: 8px; }
  .error { color: #f87171; font-size: 11px; padding: 4px; }
  .prompts-list { display: flex; flex-direction: column; gap: 4px; margin-bottom: 8px; }
  .prompt-item { background: #0f1117; border: 1px solid #1e2235; border-radius: 5px; overflow: hidden; }
  .prompt-name {
    width: 100%;
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 6px 10px;
    background: none;
    border: none;
    color: #e2e8f0;
    cursor: pointer;
    font-size: 11px;
    font-weight: 500;
  }
  .prompt-name:hover { background: #12141f; }
  .active-dot {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: #4b5563;
    flex-shrink: 0;
  }
  .active-dot.active { background: #22c55e; }
  .version-count { margin-left: auto; color: #64748b; font-size: 10px; }
  .chevron { font-size: 9px; color: #64748b; }
  .versions-list { border-top: 1px solid #1e2235; }
  .version-row {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 4px 10px;
    border-bottom: 1px solid #1e2235;
  }
  .version-row.active { background: #052e16; }
  .vnum { color: #a78bfa; font-size: 10px; font-weight: 600; min-width: 24px; }
  .active-label { color: #22c55e; font-size: 9px; font-weight: 700; }
  .promote-btn, .diff-btn {
    background: #1e2235;
    border: 1px solid #2d3148;
    color: #94a3b8;
    border-radius: 3px;
    padding: 1px 6px;
    font-size: 10px;
    cursor: pointer;
  }
  .promote-btn:hover { border-color: #22c55e; color: #86efac; }
  .diff-btn:hover { border-color: #3b82f6; color: #93c5fd; }
  .version-date { margin-left: auto; color: #4b5563; font-size: 9px; }
  .version-preview {
    margin: 0;
    padding: 4px 10px 6px;
    font-size: 9px;
    color: #64748b;
    font-family: monospace;
    white-space: pre-wrap;
    word-break: break-all;
  }
  .new-btn {
    width: 100%;
    background: #1e2235;
    border: 1px dashed #2d3148;
    color: #64748b;
    border-radius: 5px;
    padding: 5px;
    cursor: pointer;
    font-size: 11px;
  }
  .new-btn:hover { color: #e2e8f0; border-color: #3b82f6; }

  .modal-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.6);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
  }
  .modal {
    background: #1a1d27;
    border: 1px solid #2d3148;
    border-radius: 10px;
    padding: 20px;
    width: 400px;
    max-width: 95vw;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
  .diff-modal { width: 700px; }
  .modal h3 { margin: 0; color: #e2e8f0; font-size: 14px; }
  .modal label { display: flex; flex-direction: column; gap: 4px; color: #94a3b8; font-size: 12px; }
  .modal input, .modal textarea {
    background: #0f1117;
    border: 1px solid #2d3148;
    color: #e2e8f0;
    border-radius: 5px;
    padding: 6px 8px;
    font-size: 12px;
    font-family: inherit;
  }
  .modal textarea { resize: vertical; }
  .modal-actions { display: flex; justify-content: flex-end; gap: 8px; }
  .btn-secondary {
    background: #1e2235;
    border: 1px solid #2d3148;
    color: #94a3b8;
    border-radius: 5px;
    padding: 5px 14px;
    cursor: pointer;
    font-size: 12px;
  }
  .btn-primary {
    background: #3b82f6;
    border: none;
    color: #fff;
    border-radius: 5px;
    padding: 5px 14px;
    cursor: pointer;
    font-size: 12px;
    font-weight: 600;
  }
  .diff-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
  .diff-col { display: flex; flex-direction: column; gap: 4px; }
  .diff-label { color: #94a3b8; font-size: 11px; font-weight: 600; }
  .diff-col pre {
    background: #0f1117;
    border: 1px solid #1e2235;
    border-radius: 5px;
    padding: 8px;
    font-size: 10px;
    color: #e2e8f0;
    white-space: pre-wrap;
    word-break: break-all;
    max-height: 300px;
    overflow-y: auto;
    margin: 0;
    font-family: monospace;
  }
</style>
