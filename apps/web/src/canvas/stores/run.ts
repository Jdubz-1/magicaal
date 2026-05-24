import { writable } from 'svelte/store';

export interface StepResult {
  id: string;
  nodeId: string;
  nodeType: string;
  status: string;
  startedAt: string;
  completedAt?: string;
  input: unknown;
  output: unknown;
  error: unknown;
}

export interface RunState {
  runId: string | null;
  status: 'idle' | 'running' | 'completed' | 'failed';
  output: Record<string, unknown> | null;
  error: string | null;
  steps: StepResult[];
}

export const runState = writable<RunState>({
  runId: null,
  status: 'idle',
  output: null,
  error: null,
  steps: [],
});
