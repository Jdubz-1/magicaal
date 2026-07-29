<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  export let readonly = false;
  export let canUndo = false;
  export let canUndoCaal = false;

  const dispatch = createEventDispatcher<{ autoPlacement: void; undo: void; undoCaal: void }>();
</script>

<div class="canvas-toolbar">
  {#if !readonly}
    <button class="toolbar-btn" on:click={() => dispatch('autoPlacement')}>
      Auto Placement
    </button>
  {/if}
  {#if canUndo && !readonly}
    <button class="toolbar-btn toolbar-btn-undo" on:click={() => dispatch('undo')}>
      Undo Auto Placement
    </button>
  {/if}
  {#if canUndoCaal && !readonly}
    <button class="toolbar-btn toolbar-btn-undo" on:click={() => dispatch('undoCaal')}>
      Undo Caal Change
    </button>
  {/if}
</div>

<style>
  .canvas-toolbar {
    position: absolute;
    top: 0.5rem;
    left: 0.5rem;
    z-index: 5;
    display: flex;
    gap: 0.375rem;
  }
  .toolbar-btn {
    background: #1a1d27;
    color: #e2e8f0;
    border: 1px solid #2d3148;
    border-radius: 6px;
    padding: 0.375rem 0.75rem;
    font-size: 0.75rem;
    cursor: pointer;
  }
  .toolbar-btn:hover:not(:disabled) { background: #2d3148; }
  .toolbar-btn:disabled { opacity: 0.5; cursor: not-allowed; }
  .toolbar-btn-undo { color: #fcd34d; border-color: #78350f; }
  .toolbar-btn-undo:hover { background: #1e1600; }
</style>
