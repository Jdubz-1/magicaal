import { writable } from 'svelte/store';

export interface RunState {
  runId: string | null;
  status: 'idle' | 'running' | 'completed' | 'failed';
  output: Record<string, unknown> | null;
  error: string | null;
  steps: Array<{ nodeId: string; nodeType: string; status: string }>;
}

export const runState = writable<RunState>({
  runId: null,
  status: 'idle',
  output: null,
  error: null,
  steps: [],
});
