import { writable } from 'svelte/store';
import { graph, type GraphDef } from './graph';

/**
 * Minimal, single-slot undo for the last Caal-applied proposal — modeled
 * directly on autoPlacementUndo.ts's pattern. The roadmap describes a full
 * "Studio undo/redo stack" for Caal changes, but no general undo/redo exists
 * anywhere in Studio (ISS-071); this delivers the documented capability
 * (revert the last Caal change, with acknowledgement) at that same narrow
 * scope rather than building a general-purpose stack.
 */
export const canUndoCaalChange = writable(false);

let snapshot: GraphDef | null = null;
let currentLabel = '';
let selfMutating = false;
let sawFirstValue = false;

/**
 * Any graph write we didn't cause ourselves invalidates the pending undo —
 * including auto-placement's own undo, a manual edit, or a second Caal
 * change landing before the first was undone.
 */
graph.subscribe(() => {
  if (!sawFirstValue) {
    sawFirstValue = true; // skip the store's initial value on subscribe
    return;
  }
  if (selfMutating) return;
  if (snapshot) {
    snapshot = null;
    canUndoCaalChange.set(false);
  }
});

/**
 * Snapshots the graph, then runs `applyFn` (the caller's own patch-apply
 * logic) under the self-mutating guard so that mutation doesn't immediately
 * invalidate the snapshot it belongs to.
 */
export function recordCaalChange(previousGraph: GraphDef, label: string, applyFn: () => void): void {
  snapshot = previousGraph;
  currentLabel = label;
  selfMutating = true;
  applyFn();
  selfMutating = false;
  canUndoCaalChange.set(true);
}

/** Restores the pre-Caal-change graph and returns the change's label for an acknowledgement message, or null if there's nothing to undo. */
export function undoCaalChange(): string | null {
  if (!snapshot) return null;
  const restore = snapshot;
  const label = currentLabel;
  selfMutating = true;
  graph.set(restore);
  selfMutating = false;
  snapshot = null;
  canUndoCaalChange.set(false);
  return label;
}
