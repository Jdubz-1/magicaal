<script lang="ts">
  export let handle: string;
  export let lastSyncAt: string | null = null;
</script>

<div class="code-banner">
  <span class="icon">⟨/⟩</span>
  <div class="text">
    <span class="label">Code-defined agent</span>
    <span class="handle">{handle}</span>
  </div>
  {#if lastSyncAt}
    <span class="sync-time">Synced {new Date(lastSyncAt).toLocaleTimeString()}</span>
  {/if}
  <a class="sync-link" href="/admin/system/sync">Sync log</a>
</div>

<style>
  .code-banner {
    display: flex;
    align-items: center;
    gap: 8px;
    background: #451a03;
    border: 1px solid #f59e0b;
    border-radius: 6px;
    padding: 7px 12px;
    margin: 8px;
    font-size: 11px;
    color: #fde68a;
  }
  .icon {
    font-size: 14px;
    font-weight: 700;
    color: #f59e0b;
    font-family: monospace;
  }
  .text {
    display: flex;
    flex-direction: column;
    gap: 1px;
    flex: 1;
  }
  .label { color: #f59e0b; font-weight: 600; }
  .handle { color: #fde68a; font-family: monospace; font-size: 10px; }
  .sync-time { color: #a16207; font-size: 10px; }
  .sync-link {
    color: #f59e0b;
    text-decoration: underline;
    font-size: 10px;
    margin-left: auto;
  }
</style>
