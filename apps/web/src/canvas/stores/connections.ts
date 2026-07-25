import { writable } from 'svelte/store';

export interface Connection {
  id: string;
  service: string;
  displayName: string;
  status: string;
}

/**
 * The tenant's integration connections, fetched once and shared by LintPanel
 * (connection-config validation) and NodePalette (the "not connected"
 * indicator) — both need the same list; ConnectionSelect.svelte fetches its
 * own copy separately since it's scoped to one field's dropdown.
 */
export const connections = writable<Connection[]>([]);

let loaded = false;

export async function ensureConnectionsLoaded(): Promise<void> {
  if (loaded) return;
  loaded = true;
  try {
    const res = await fetch('/api/integrations/connections');
    if (!res.ok) throw new Error(String(res.status));
    connections.set(await res.json() as Connection[]);
  } catch {
    // Leave empty — lint/palette just can't validate connections this session.
    loaded = false;
  }
}
