import { get, writable } from 'svelte/store';
import { graph, type GraphDef } from './graph';
import { runAutoLayout } from '../layout/autoLayout';

/** Whether an "Undo Auto Placement" affordance should be shown. */
export const canUndoAutoPlacement = writable(false);

let snapshot: GraphDef | null = null;
let selfMutating = false;
let sawFirstValue = false;

/**
 * Any graph write we didn't cause ourselves invalidates the pending undo
 * snapshot. Svelte stores notify subscribers synchronously inside
 * set()/update(), so `selfMutating` reliably distinguishes our own writes
 * from every other one (NodePalette, manual drag, Caal proposal-apply,
 * App.svelte's onMount agent load, etc.) without threading an invalidation
 * call through each of those call sites.
 */
graph.subscribe(() => {
  if (!sawFirstValue) {
    sawFirstValue = true; // skip the store's initial value on subscribe
    return;
  }
  if (selfMutating) return;
  if (snapshot) {
    snapshot = null;
    canUndoAutoPlacement.set(false);
  }
});

export function applyAutoPlacement(): void {
  snapshot = structuredClone(get(graph));
  selfMutating = true;
  graph.update((g) => runAutoLayout(g));
  selfMutating = false;
  canUndoAutoPlacement.set(true);
}

export function undoAutoPlacement(): void {
  if (!snapshot) return;
  const restore = snapshot;
  selfMutating = true;
  graph.set(restore);
  selfMutating = false;
  snapshot = null;
  canUndoAutoPlacement.set(false);
}
