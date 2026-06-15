<script lang="ts">
  import { runState } from '../stores/run';
  import type { StepResult } from '../stores/run';

  export let agentId: string;

  let inputPayload = '{}';
  let running = false;
  let es: EventSource | null = null;

  const TRAJECTORY_NODE_TYPES = new Set(['core:react', 'core:planner']);

  interface TrajectoryRow {
    id: string;
    runId: string;
    stepId: string;
    iteration: number;
    thought: string | null;
    action: string | null;
    observation: string | null;
  }

  let trajectories: TrajectoryRow[] = [];
  let expandedTrajectory: string | null = null;  // nodeId

  async function fetchTrajectory(runId: string) {
    try {
      const resp = await fetch(`/api/telemetry/trajectory/${runId}`);
      if (!resp.ok) return;
      const data = await resp.json() as { trajectories: TrajectoryRow[] };
      trajectories = data.trajectories ?? [];
    } catch { /* non-critical */ }
  }

  function stopStream() {
    if (es) {
      es.close();
      es = null;
    }
    running = false;
  }

  async function runAgent() {
    stopStream();
    running = true;
    runState.set({ runId: null, status: 'running', output: null, error: null, steps: [] });

    let parsedInput: Record<string, unknown>;
    try {
      parsedInput = JSON.parse(inputPayload) as Record<string, unknown>;
    } catch {
      runState.set({ runId: null, status: 'failed', output: null, error: 'Invalid JSON input', steps: [] });
      running = false;
      return;
    }

    let runId: string;
    try {
      const res = await fetch(`/api/agents/${agentId}/runs`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ input: parsedInput, mode: 'async' }),
      });
      if (!res.ok) {
        const err = await res.json() as { error?: { message?: string } };
        throw new Error(err?.error?.message ?? `HTTP ${res.status}`);
      }
      const data = await res.json() as { runId: string };
      runId = data.runId;
    } catch (err) {
      runState.set({ runId: null, status: 'failed', output: null, error: String(err), steps: [] });
      running = false;
      return;
    }

    runState.update((s) => ({ ...s, runId }));

    // Subscribe to SSE stream for live updates
    es = new EventSource(`/api/agents/${agentId}/runs/${runId}/stream`);

    es.addEventListener('node.started', (e) => {
      const data = JSON.parse(e.data) as { nodeId: string; nodeType: string };
      runState.update((s) => ({
        ...s,
        steps: [
          ...s.steps.filter((st) => st.nodeId !== data.nodeId),
          {
            id: data.nodeId,
            nodeId: data.nodeId,
            nodeType: data.nodeType,
            status: 'running',
            startedAt: new Date().toISOString(),
            completedAt: undefined,
            input: null,
            output: null,
            error: null,
          } satisfies StepResult,
        ],
      }));
    });

    es.addEventListener('node.completed', (e) => {
      const data = JSON.parse(e.data) as { nodeId: string; outputs: unknown };
      runState.update((s) => ({
        ...s,
        steps: s.steps.map((st) =>
          st.nodeId === data.nodeId
            ? { ...st, status: 'complete', completedAt: new Date().toISOString(), output: data.outputs }
            : st,
        ),
      }));
    });

    es.addEventListener('node.failed', (e) => {
      const data = JSON.parse(e.data) as { nodeId: string; error: { message: string } };
      runState.update((s) => ({
        ...s,
        steps: s.steps.map((st) =>
          st.nodeId === data.nodeId
            ? { ...st, status: 'failed', completedAt: new Date().toISOString(), error: data.error }
            : st,
        ),
      }));
    });

    es.addEventListener('run.completed', (e) => {
      const data = JSON.parse(e.data) as { output: Record<string, unknown> };
      runState.update((s) => ({ ...s, status: 'completed', output: data.output }));
      stopStream();
      // Fetch trajectory data after run completes
      void fetchTrajectory(runId);
    });

    es.addEventListener('run.failed', (e) => {
      const data = JSON.parse(e.data) as { error: { message: string } };
      runState.update((s) => ({ ...s, status: 'failed', error: data.error.message }));
      stopStream();
    });

    es.addEventListener('run.suspended', () => {
      runState.update((s) => ({ ...s, status: 'failed', error: 'Run suspended — awaiting human review' }));
      stopStream();
    });

    es.onerror = () => {
      // SSE connection dropped without a terminal event — mark as failed
      if (running) {
        runState.update((s) => ({
          ...s,
          status: s.status === 'running' ? 'failed' : s.status,
          error: s.error ?? 'Stream connection lost',
        }));
        stopStream();
      }
    };
  }
</script>

<div class="panel-section">
  <div class="panel-header">Test Run</div>
  <div class="form-group">
    <label>Input (JSON)</label>
    <textarea rows="4" bind:value={inputPayload}></textarea>
  </div>
  <div class="run-controls">
    <button class="btn-run" disabled={running} on:click={runAgent}>
      {running ? 'Running…' : '▶ Run'}
    </button>
    {#if running}
      <button class="btn-stop" on:click={stopStream}>■ Stop</button>
    {/if}
  </div>

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
          {#if TRAJECTORY_NODE_TYPES.has(step.nodeType) && $runState.status !== 'running'}
            {@const stepTrajectories = trajectories.filter((t) => t.stepId === step.id)}
            {#if stepTrajectories.length > 0}
              <button class="traj-toggle"
                on:click={() => expandedTrajectory = expandedTrajectory === step.nodeId ? null : step.nodeId}>
                ▶ Trajectory ({stepTrajectories.length} steps)
              </button>
            {/if}
          {/if}
        </div>
        {#if expandedTrajectory === step.nodeId}
          {@const stepTrajectories = trajectories.filter((t) => t.stepId === step.id)}
          <div class="trajectory-block">
            {#each stepTrajectories as t}
              <div class="traj-step">
                <span class="traj-iter">Iter {t.iteration}</span>
                {#if t.thought}<div class="traj-thought"><span class="traj-label">Thought</span> {t.thought}</div>{/if}
                {#if t.action}<div class="traj-action"><span class="traj-label">Action</span> {t.action}</div>{/if}
                {#if t.observation}<div class="traj-obs"><span class="traj-label">Obs</span> {t.observation}</div>{/if}
              </div>
            {/each}
          </div>
        {/if}
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
  .run-controls { display: flex; gap: 0.5rem; }
  .btn-run { background: #14532d; color: #86efac; border: 1px solid #166534; border-radius: 6px; padding: 0.5rem 1rem; font-size: 0.8125rem; cursor: pointer; flex: 1; }
  .btn-stop { background: #3b1f1f; color: #fca5a5; border: 1px solid #7f2121; border-radius: 6px; padding: 0.5rem 0.75rem; font-size: 0.8125rem; cursor: pointer; }
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
  .traj-toggle { background: none; border: none; color: #f59e0b; font-size: 0.65rem; cursor: pointer; padding: 0; margin-left: auto; }
  .trajectory-block { background: #0d1117; border: 1px solid #1f2937; border-radius: 4px; margin-bottom: 0.25rem; padding: 0.5rem; }
  .traj-step { border-bottom: 1px solid #1f2937; padding: 0.25rem 0; }
  .traj-step:last-child { border-bottom: none; }
  .traj-iter { font-size: 0.6rem; color: #f59e0b; font-weight: 700; text-transform: uppercase; display: block; margin-bottom: 2px; }
  .traj-thought, .traj-action, .traj-obs { font-size: 0.7rem; color: #94a3b8; margin: 1px 0; }
  .traj-label { color: #475569; font-size: 0.6rem; text-transform: uppercase; margin-right: 4px; }
</style>
