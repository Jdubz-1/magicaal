<script lang="ts">
  import { runState } from '../stores/run';
  import type { StepResult } from '../stores/run';

  export let agentId: string;

  let inputPayload = '{}';
  let running = false;

  async function runAgent() {
    running = true;
    runState.set({ runId: null, status: 'running', output: null, error: null, steps: [] });
    try {
      const res = await fetch(`/api/agents/${agentId}/runs`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ input: JSON.parse(inputPayload), mode: 'sync' }),
      });
      const data = await res.json() as {
        id?: string;
        status: string;
        output: unknown;
        error: unknown;
      };

      const runId = data.id ?? null;
      let steps: StepResult[] = [];

      if (runId && (data.status === 'completed' || data.status === 'failed')) {
        try {
          const stepsRes = await fetch(`/api/agents/${agentId}/runs/${runId}/steps`);
          if (stepsRes.ok) steps = await stepsRes.json() as StepResult[];
        } catch {
          // non-fatal: steps are best-effort
        }
      }

      runState.set({
        runId,
        status: data.status as 'completed' | 'failed',
        output: data.output as Record<string, unknown> | null,
        error: data.error ? JSON.stringify(data.error) : null,
        steps,
      });
    } catch (err) {
      runState.set({ runId: null, status: 'failed', output: null, error: String(err), steps: [] });
    } finally {
      running = false;
    }
  }
</script>

<div class="panel-section">
  <div class="panel-header">Test Run</div>
  <div class="form-group">
    <label>Input (JSON)</label>
    <textarea rows="4" bind:value={inputPayload}></textarea>
  </div>
  <button class="btn-run" disabled={running} on:click={runAgent}>
    {running ? 'Running…' : '▶ Run'}
  </button>

  {#if $runState.status !== 'idle'}
    <div class="run-result status-{$runState.status}">
      <div class="result-status">{$runState.status.toUpperCase()}</div>
      {#if $runState.output}
        <pre class="result-json">{JSON.stringify($runState.output, null, 2)}</pre>
      {/if}
      {#if $runState.error}
        <div class="result-error">{$runState.error}</div>
      {/if}
    </div>

    {#if $runState.steps.length > 0}
      <div class="steps-header">Steps ({$runState.steps.length})</div>
      {#each $runState.steps as step}
        <div class="step step-{step.status}">
          <span class="step-type">{step.nodeType}</span>
          <span class="step-badge badge-{step.status}">{step.status}</span>
        </div>
      {/each}
    {/if}
  {/if}
</div>

<style>
  .panel-section { padding: 1rem; }
  .panel-header { font-size: 0.6875rem; text-transform: uppercase; letter-spacing: 0.08em; color: #475569; margin-bottom: 0.75rem; }
  .form-group { margin-bottom: 0.75rem; }
  label { display: block; font-size: 0.6875rem; color: #94a3b8; margin-bottom: 0.25rem; }
  textarea { background: #0f1117; border: 1px solid #2d3148; border-radius: 4px; color: #e2e8f0; padding: 0.375rem 0.625rem; font-size: 0.75rem; width: 100%; font-family: monospace; resize: vertical; }
  .btn-run { background: #14532d; color: #86efac; border: 1px solid #166534; border-radius: 6px; padding: 0.5rem 1rem; font-size: 0.8125rem; cursor: pointer; width: 100%; }
  .btn-run:hover:not(:disabled) { background: #166534; }
  .btn-run:disabled { opacity: 0.5; cursor: not-allowed; }
  .run-result { margin-top: 1rem; border-radius: 6px; padding: 0.75rem; font-size: 0.75rem; }
  .status-completed { background: #14532d; border: 1px solid #166534; }
  .status-failed { background: #3b1f1f; border: 1px solid #7f2121; }
  .status-running { background: #1c2333; border: 1px solid #2d3148; }
  .result-status { font-weight: 600; font-size: 0.6875rem; letter-spacing: 0.05em; margin-bottom: 0.5rem; }
  .result-json { margin: 0; white-space: pre-wrap; word-break: break-all; color: #e2e8f0; font-family: monospace; }
  .result-error { color: #fca5a5; }
  .steps-header { font-size: 0.6875rem; text-transform: uppercase; letter-spacing: 0.08em; color: #475569; margin-top: 1rem; margin-bottom: 0.375rem; }
  .step { display: flex; justify-content: space-between; align-items: center; padding: 0.375rem 0.5rem; border-radius: 4px; margin-bottom: 0.25rem; background: #1a1d27; border: 1px solid #2d3148; }
  .step-type { font-size: 0.6875rem; color: #94a3b8; font-family: monospace; }
  .step-badge { font-size: 0.625rem; font-weight: 600; letter-spacing: 0.05em; padding: 0.1rem 0.375rem; border-radius: 3px; }
  .badge-complete { background: #14532d; color: #86efac; }
  .badge-failed { background: #7f2121; color: #fca5a5; }
  .badge-running { background: #1c2333; color: #93c5fd; }
</style>
