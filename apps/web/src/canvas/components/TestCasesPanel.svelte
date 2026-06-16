<script lang="ts">
  import { onMount } from 'svelte';

  export let agentId: string;

  interface Assertion {
    type: 'exact_match' | 'schema' | 'evaluate_score';
    key: string;
    expected?: unknown;
    schema?: Record<string, unknown>;
    threshold?: number;
  }

  interface TestCase {
    id: string;
    name: string;
    inputJson: string;
    assertions: Assertion[];
    lastResult?: TestCaseResult | null;
    createdAt: string;
  }

  interface TestCaseResult {
    passed: boolean;
    assertions: { type: string; key: string; passed: boolean; reason?: string }[];
    runId?: string;
    evaluatedAt: string;
  }

  interface SuiteResult {
    total: number;
    passed: number;
    failed: number;
    results: { id: string; name: string; passed: boolean; assertions: { passed: boolean; reason?: string }[] }[];
  }

  let expanded = false;
  let loading = false;
  let running = false;
  let testCases: TestCase[] = [];
  let suiteResult: SuiteResult | null = null;
  let showNewModal = false;
  let error: string | null = null;

  let newCase = {
    name: '',
    inputJson: '{\n  \n}',
    assertionType: 'exact_match' as Assertion['type'],
    assertionKey: '',
    assertionExpected: '',
    assertionThreshold: 0.8,
  };

  async function loadTestCases() {
    if (!agentId) return;
    loading = true;
    error = null;
    try {
      const res = await fetch(`/api/v1/agents/${agentId}/test-cases`);
      if (!res.ok) throw new Error(`${res.status}`);
      const data = await res.json() as { testCases: TestCase[] };
      testCases = data.testCases ?? [];
    } catch (err) {
      error = (err as Error).message;
    } finally {
      loading = false;
    }
  }

  async function runSuite() {
    running = true;
    suiteResult = null;
    error = null;
    try {
      const res = await fetch(`/api/v1/agents/${agentId}/test-cases/run`, { method: 'POST' });
      if (!res.ok) throw new Error(`${res.status}`);
      suiteResult = await res.json() as SuiteResult;
      await loadTestCases();
    } catch (err) {
      error = (err as Error).message;
    } finally {
      running = false;
    }
  }

  async function createTestCase() {
    try {
      const assertion: Assertion = { type: newCase.assertionType, key: newCase.assertionKey };
      if (newCase.assertionType === 'exact_match') {
        try { assertion.expected = JSON.parse(newCase.assertionExpected); } catch { assertion.expected = newCase.assertionExpected; }
      } else if (newCase.assertionType === 'evaluate_score') {
        assertion.threshold = newCase.assertionThreshold;
      }

      const res = await fetch(`/api/v1/agents/${agentId}/test-cases`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: newCase.name,
          inputJson: newCase.inputJson,
          assertionsJson: JSON.stringify([assertion]),
        }),
      });
      if (!res.ok) throw new Error(`${res.status}`);
      showNewModal = false;
      newCase = { name: '', inputJson: '{\n  \n}', assertionType: 'exact_match', assertionKey: '', assertionExpected: '', assertionThreshold: 0.8 };
      await loadTestCases();
    } catch (err) {
      error = (err as Error).message;
    }
  }

  async function deleteTestCase(id: string) {
    try {
      await fetch(`/api/v1/agents/${agentId}/test-cases/${id}`, { method: 'DELETE' });
      await loadTestCases();
    } catch { /* non-fatal */ }
  }

  $: if (expanded && testCases.length === 0 && !loading) void loadTestCases();

  function passRate(result: SuiteResult): string {
    return `${result.passed}/${result.total}`;
  }
</script>

<div class="test-panel">
  <button class="panel-header" on:click={() => { expanded = !expanded; }}>
    <span>Test Cases</span>
    {#if testCases.length > 0}
      <span class="badge">{testCases.length}</span>
    {/if}
    <span class="toggle">{expanded ? '▼' : '▶'}</span>
  </button>

  {#if expanded}
    <div class="panel-body">
      {#if suiteResult}
        <div class="suite-summary" class:passed={suiteResult.failed === 0} class:failed={suiteResult.failed > 0}>
          Suite: {passRate(suiteResult)} passed
          {#if suiteResult.failed > 0}
            — {suiteResult.failed} failed
          {/if}
        </div>
      {/if}

      {#if loading}
        <div class="loading">Loading…</div>
      {:else if error}
        <div class="error">{error}</div>
      {:else if testCases.length === 0}
        <div class="empty">No test cases yet.</div>
      {:else}
        <div class="cases-list">
          {#each testCases as tc}
            {@const resultEntry = suiteResult?.results?.find(r => r.id === tc.id)}
            <div class="case-row">
              <span class="status-dot"
                class:pass={resultEntry?.passed === true || tc.lastResult?.passed === true}
                class:fail={resultEntry?.passed === false || tc.lastResult?.passed === false}
              ></span>
              <span class="case-name">{tc.name}</span>
              <span class="assertion-count">{(tc.assertions ?? []).length} assertions</span>
              {#if running}
                <span class="running-indicator">⟳</span>
              {/if}
              <button class="delete-btn" on:click={() => deleteTestCase(tc.id)}>✕</button>
            </div>
          {/each}
        </div>
      {/if}

      <div class="panel-actions">
        <button class="new-btn" on:click={() => (showNewModal = true)}>+ New Test</button>
        <button class="run-btn" on:click={runSuite} disabled={running || testCases.length === 0}>
          {running ? 'Running…' : 'Run Suite'}
        </button>
      </div>
    </div>
  {/if}
</div>

{#if showNewModal}
  <div class="modal-overlay" on:click|self={() => (showNewModal = false)}>
    <div class="modal">
      <h3>New Test Case</h3>
      <label>
        Name
        <input bind:value={newCase.name} placeholder="Test case name" />
      </label>
      <label>
        Input JSON
        <textarea bind:value={newCase.inputJson} rows={5} class="mono"></textarea>
      </label>
      <div class="assertion-builder">
        <div class="assertion-header">Assertion</div>
        <div class="assertion-row">
          <select bind:value={newCase.assertionType}>
            <option value="exact_match">Exact Match</option>
            <option value="schema">Schema</option>
            <option value="evaluate_score">Score Threshold</option>
          </select>
          <input bind:value={newCase.assertionKey} placeholder="Output key, e.g. output.text" />
        </div>
        {#if newCase.assertionType === 'exact_match'}
          <input bind:value={newCase.assertionExpected} placeholder="Expected value (JSON or string)" />
        {:else if newCase.assertionType === 'evaluate_score'}
          <label class="inline">
            Threshold
            <input type="number" min="0" max="1" step="0.05" bind:value={newCase.assertionThreshold} style="width: 70px;" />
          </label>
        {/if}
      </div>
      <div class="modal-actions">
        <button class="btn-secondary" on:click={() => (showNewModal = false)}>Cancel</button>
        <button class="btn-primary" on:click={createTestCase} disabled={!newCase.name}>Create</button>
      </div>
    </div>
  </div>
{/if}

<style>
  .test-panel { border-top: 1px solid #2d3148; font-size: 12px; }
  .panel-header {
    width: 100%;
    display: flex;
    align-items: center;
    gap: 6px;
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
  .badge {
    background: #1e2235;
    color: #64748b;
    border-radius: 10px;
    padding: 1px 6px;
    font-size: 10px;
  }
  .toggle { font-size: 10px; margin-left: auto; }
  .panel-body { padding: 0 8px 10px; }
  .suite-summary {
    border-radius: 5px;
    padding: 5px 10px;
    font-size: 11px;
    font-weight: 600;
    margin-bottom: 8px;
    text-align: center;
  }
  .suite-summary.passed { background: #052e16; color: #86efac; }
  .suite-summary.failed { background: #450a0a; color: #fca5a5; }
  .loading, .empty { color: #64748b; font-size: 11px; text-align: center; padding: 8px; }
  .error { color: #f87171; font-size: 11px; margin-bottom: 4px; }
  .cases-list { display: flex; flex-direction: column; gap: 2px; margin-bottom: 8px; }
  .case-row {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 5px 6px;
    border-radius: 4px;
    background: #0f1117;
    border: 1px solid #1e2235;
  }
  .status-dot {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: #4b5563;
    flex-shrink: 0;
  }
  .status-dot.pass { background: #22c55e; }
  .status-dot.fail { background: #ef4444; }
  .case-name { color: #e2e8f0; flex: 1; font-size: 11px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .assertion-count { color: #64748b; font-size: 10px; }
  .running-indicator { color: #f59e0b; font-size: 12px; animation: spin 1s linear infinite; }
  @keyframes spin { to { transform: rotate(360deg); } }
  .delete-btn {
    background: none;
    border: none;
    color: #4b5563;
    cursor: pointer;
    font-size: 11px;
    padding: 0 2px;
  }
  .delete-btn:hover { color: #ef4444; }
  .panel-actions { display: flex; gap: 6px; }
  .new-btn {
    flex: 1;
    background: #1e2235;
    border: 1px dashed #2d3148;
    color: #64748b;
    border-radius: 5px;
    padding: 5px;
    cursor: pointer;
    font-size: 11px;
  }
  .new-btn:hover { color: #e2e8f0; border-color: #3b82f6; }
  .run-btn {
    flex: 1;
    background: #1e3a5f;
    border: none;
    color: #93c5fd;
    border-radius: 5px;
    padding: 5px;
    cursor: pointer;
    font-size: 11px;
    font-weight: 600;
  }
  .run-btn:hover:not(:disabled) { background: #1d4ed8; color: #fff; }
  .run-btn:disabled { opacity: 0.4; cursor: not-allowed; }

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
    width: 420px;
    max-width: 95vw;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
  .modal h3 { margin: 0; color: #e2e8f0; font-size: 14px; }
  .modal label { display: flex; flex-direction: column; gap: 4px; color: #94a3b8; font-size: 12px; }
  .modal label.inline { flex-direction: row; align-items: center; gap: 8px; }
  .modal input, .modal textarea, .modal select {
    background: #0f1117;
    border: 1px solid #2d3148;
    color: #e2e8f0;
    border-radius: 5px;
    padding: 6px 8px;
    font-size: 12px;
    font-family: inherit;
    width: 100%;
    box-sizing: border-box;
  }
  .modal textarea.mono { font-family: monospace; }
  .assertion-builder {
    display: flex;
    flex-direction: column;
    gap: 6px;
    background: #0f1117;
    border: 1px solid #1e2235;
    border-radius: 6px;
    padding: 10px;
  }
  .assertion-header { color: #64748b; font-size: 10px; font-weight: 600; text-transform: uppercase; }
  .assertion-row { display: flex; gap: 6px; }
  .assertion-row select { width: auto; flex-shrink: 0; }
  .assertion-row input { flex: 1; }
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
  .btn-primary:disabled { opacity: 0.4; cursor: not-allowed; }
</style>
