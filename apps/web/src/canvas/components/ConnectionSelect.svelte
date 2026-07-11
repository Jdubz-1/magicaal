<script lang="ts">
  import { onMount } from 'svelte';

  export let value: string = '';
  export let service: string | undefined = undefined;
  export let onChange: (connectionId: string) => void;

  interface Connection {
    id: string;
    service: string;
    displayName: string;
    status: string;
  }

  let connections: Connection[] = [];
  let loadError = false;

  onMount(async () => {
    try {
      const resp = await fetch('/api/integrations/connections');
      if (!resp.ok) throw new Error(String(resp.status));
      const all = (await resp.json()) as Connection[];
      connections = service ? all.filter((c) => c.service === service) : all;
    } catch {
      loadError = true;
    }
  });
</script>

{#if loadError}
  <input
    type="text"
    value={value}
    placeholder="connection ID"
    on:input={(e) => onChange((e.target as HTMLInputElement).value)}
  />
{:else}
  <select value={value} on:change={(e) => onChange((e.target as HTMLSelectElement).value)}>
    <option value="">— select a connection —</option>
    {#each connections as conn}
      <option value={conn.id}>
        {conn.displayName} ({conn.service}{conn.status !== 'active' ? ` — ${conn.status}` : ''})
      </option>
    {/each}
  </select>
  {#if connections.length === 0}
    <div class="hint">
      No {service ?? 'integration'} connections. Create one in Admin → Integration Connections.
    </div>
  {/if}
{/if}

<style>
  select {
    background: #0f1117;
    border: 1px solid #2d3148;
    border-radius: 4px;
    color: #e2e8f0;
    padding: 0.375rem 0.625rem;
    font-size: 0.8125rem;
    width: 100%;
    box-sizing: border-box;
  }
  input {
    background: #0f1117;
    border: 1px solid #2d3148;
    border-radius: 4px;
    color: #e2e8f0;
    padding: 0.375rem 0.625rem;
    font-size: 0.8125rem;
    width: 100%;
    box-sizing: border-box;
  }
  .hint {
    font-size: 0.6875rem;
    color: #64748b;
    margin-top: 0.25rem;
  }
</style>
