<script lang="ts">
  import { onMount } from 'svelte';

  /** Current router config on the node (ModelRouterConfig or empty). */
  export let value: unknown = undefined;
  export let onChange: (router: unknown) => void;
  export let disabled = false;

  interface ProviderEntry {
    provider: string;
    displayName: string;
    models: Array<{ id: string; label: string; recommended?: boolean }>;
  }

  interface Connection {
    id: string;
    service: string;
    displayName: string;
    status: string;
  }

  interface RouterTarget {
    connectionId?: string;
    provider?: string;
    model?: string;
  }

  const CUSTOM = '__custom';

  let providers: ProviderEntry[] = [];
  let connections: Connection[] = [];
  let loadError = false;

  // Simple mode can only represent a single priority target with no triggers;
  // anything richer stays in Advanced so existing graphs are never rewritten.
  // Derived from `value` rather than captured once: an Advanced-JSON edit can
  // turn a representable router into one the picker cannot express, and a
  // frozen flag left the "← Model picker" button showing so the next dropdown
  // change silently replaced the pasted config.
  $: router = (value ?? null) as { strategy?: string; targets?: RouterTarget[]; triggers?: unknown[] } | null;
  $: isEmpty = !router || Object.keys(router).length === 0;
  $: isSimple =
    isEmpty ||
    ((router?.strategy ?? 'priority') === 'priority' &&
      (router?.targets?.length ?? 0) === 1 &&
      (router?.triggers?.length ?? 0) === 0);

  let advanced = false;
  // Anything the picker cannot represent forces Advanced and keeps it there.
  $: if (!isSimple) advanced = true;

  const initialTarget = (value as { targets?: RouterTarget[] } | null)?.targets?.[0];
  let connectionId = initialTarget?.connectionId ?? '';
  let modelChoice = initialTarget?.model ?? '';
  let customModel = '';

  $: selectedConnection = connections.find((c) => c.id === connectionId);
  $: selectedProvider = providers.find((p) => p.provider === selectedConnection?.service);

  onMount(async () => {
    try {
      const [provResp, connResp] = await Promise.all([
        fetch('/api/llm/providers'),
        fetch('/api/integrations/connections'),
      ]);
      if (!provResp.ok || !connResp.ok) throw new Error('load failed');
      providers = (await provResp.json()) as ProviderEntry[];
      const ids = new Set(providers.map((p) => p.provider));
      connections = ((await connResp.json()) as Connection[]).filter((c) => ids.has(c.service));

      // A stored model outside the curated list is shown as a custom model
      const prov = providers.find((p) => p.provider === connections.find((c) => c.id === connectionId)?.service);
      if (modelChoice && prov && !prov.models.some((m) => m.id === modelChoice)) {
        customModel = modelChoice;
        modelChoice = CUSTOM;
      }
    } catch {
      loadError = true;
      advanced = true;
    }
  });

  /**
   * The connection is passed in rather than read from `selectedConnection`:
   * that is a `$:` value, recomputed on the update flush, so a caller that has
   * just assigned `connectionId` still sees the previous one — which wrote no
   * router at all on the first pick, and the old connection's id when
   * switching between two.
   */
  function emit(conn: Connection | undefined, model: string) {
    if (!conn || !model) return;
    onChange({
      strategy: 'priority',
      targets: [{ id: 'primary', connectionId: conn.id, provider: conn.service, model }],
      triggers: [],
    });
  }

  /** Emit for a change that leaves the selected connection alone. */
  function emitCurrent() {
    emit(selectedConnection, modelChoice === CUSTOM ? customModel.trim() : modelChoice);
  }

  function selectConnection(id: string) {
    connectionId = id;
    if (!id) {
      onChange(undefined); // fall back to the graph defaultRouter
      return;
    }
    const conn = connections.find((c) => c.id === id);
    const prov = providers.find((p) => p.provider === conn?.service);
    const stillValid = modelChoice === CUSTOM || prov?.models.some((m) => m.id === modelChoice);
    if (!stillValid) {
      modelChoice = (prov?.models.find((m) => m.recommended) ?? prov?.models[0])?.id ?? CUSTOM;
    }
    emit(conn, modelChoice === CUSTOM ? customModel.trim() : modelChoice);
  }
</script>

{#if advanced}
  <textarea
    rows="4"
    value={JSON.stringify(value ?? {}, null, 2)}
    {disabled}
    on:blur={(e) => { try { onChange(JSON.parse(e.currentTarget.value)); } catch { /* invalid JSON */ } }}
  ></textarea>
  {#if !loadError && isSimple}
    <button class="mode-btn" type="button" on:click={() => { advanced = false; }}>← Model picker</button>
  {/if}
{:else}
  <select {disabled} value={connectionId} on:change={(e) => selectConnection(e.currentTarget.value)}>
    <option value="">— graph default model —</option>
    {#each connections as conn}
      <option value={conn.id}>
        {conn.displayName} ({providers.find((p) => p.provider === conn.service)?.displayName ?? conn.service}{conn.status !== 'active' ? ` — ${conn.status}` : ''})
      </option>
    {/each}
  </select>

  {#if selectedProvider}
    <select {disabled} bind:value={modelChoice} on:change={emitCurrent} class="spaced">
      {#each selectedProvider.models as m}
        <option value={m.id}>{m.label}{m.recommended ? ' (recommended)' : ''}</option>
      {/each}
      <option value={CUSTOM}>Custom model…</option>
    </select>
    {#if modelChoice === CUSTOM}
      <input class="spaced" type="text" placeholder="model id" {disabled} bind:value={customModel} on:blur={emitCurrent} />
    {/if}
  {/if}

  {#if connections.length === 0}
    <div class="hint">No model providers connected. Add one in Admin → Integrations.</div>
  {/if}
  <button class="mode-btn" type="button" on:click={() => { advanced = true; }}>Advanced (JSON)</button>
{/if}

<style>
  select, input, textarea {
    background: #0f1117;
    border: 1px solid #2d3148;
    border-radius: 4px;
    color: #e2e8f0;
    padding: 0.375rem 0.625rem;
    font-size: 0.8125rem;
    width: 100%;
    box-sizing: border-box;
  }
  textarea {
    font-family: monospace;
  }
  .spaced {
    margin-top: 0.375rem;
  }
  .hint {
    font-size: 0.6875rem;
    color: #64748b;
    margin-top: 0.25rem;
  }
  .mode-btn {
    background: none;
    border: none;
    color: #818cf8;
    font-size: 0.6875rem;
    padding: 0;
    margin-top: 0.25rem;
    cursor: pointer;
  }
</style>
