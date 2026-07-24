<script lang="ts">
  import { createEventDispatcher, onMount, onDestroy } from 'svelte';
  import { EditorState, type Extension } from '@codemirror/state';
  import { EditorView, keymap, placeholder as cmPlaceholder } from '@codemirror/view';
  import { defaultKeymap, history, historyKeymap } from '@codemirror/commands';
  import { javascript } from '@codemirror/lang-javascript';
  import { bracketMatching } from '@codemirror/language';
  import {
    autocompletion,
    completeFromList,
    type CompletionSource,
  } from '@codemirror/autocomplete';

  export let value: string = '';
  export let placeholder: string = 'JSONata expression...';
  export let fieldName: string = '';
  /** Upstream context keys available at this node — surfaced as autocomplete suggestions. */
  export let contextKeys: string[] = [];

  const dispatch = createEventDispatcher<{ change: string; evaluate: string }>();

  // JSONata has no CodeMirror grammar; the JS language mode is close enough
  // for bracket-matching and general token highlighting (strings, numbers,
  // dotted paths, operators) without building a bespoke JSONata parser.
  const JSONATA_BUILTINS = [
    '$sum', '$count', '$max', '$min', '$average', '$map', '$filter', '$reduce',
    '$sort', '$reverse', '$distinct', '$append', '$exists', '$type', '$string',
    '$number', '$boolean', '$length', '$substring', '$split', '$join', '$trim',
    '$uppercase', '$lowercase', '$contains', '$match', '$replace', '$now',
    '$fromMillis', '$toMillis',
  ];

  let editorEl: HTMLDivElement;
  let view: EditorView | undefined;

  function buildAutocomplete(): CompletionSource {
    const options = [
      ...JSONATA_BUILTINS.map((label) => ({ label, type: 'function' as const })),
      ...contextKeys.map((label) => ({ label, type: 'variable' as const })),
    ];
    return completeFromList(options);
  }

  function buildExtensions(): Extension[] {
    return [
      history(),
      keymap.of([...defaultKeymap, ...historyKeymap]),
      bracketMatching(),
      javascript(),
      autocompletion({ override: [buildAutocomplete()] }),
      cmPlaceholder(placeholder),
      EditorView.lineWrapping,
      EditorView.updateListener.of((update) => {
        if (update.docChanged) {
          value = update.state.doc.toString();
          dispatch('change', value);
        }
      }),
      EditorView.theme({
        '&': { fontSize: '0.75rem', backgroundColor: '#0d1117', border: '1px solid #374151', borderRadius: '4px' },
        '&.cm-focused': { outline: 'none', borderColor: '#f59e0b' },
        '.cm-content': { fontFamily: "'JetBrains Mono', 'Fira Code', 'Cascadia Code', monospace", caretColor: '#f59e0b', padding: '6px 8px' },
        '.cm-scroller': { minHeight: '3.5em' },
        '.cm-gutters': { display: 'none' },
      }),
    ];
  }

  onMount(() => {
    view = new EditorView({
      state: EditorState.create({ doc: value, extensions: buildExtensions() }),
      parent: editorEl,
    });
  });

  onDestroy(() => {
    view?.destroy();
  });

  // Sync external value changes (e.g. the "Value Picker" writing into this
  // field) into the editor without disturbing the user's undo history.
  $: if (view && value !== view.state.doc.toString()) {
    view.dispatch({ changes: { from: 0, to: view.state.doc.length, insert: value } });
  }

  function onEvaluate() {
    dispatch('evaluate', value);
  }
</script>

<div class="expr-editor">
  <div class="expr-cm" bind:this={editorEl} data-field={fieldName}></div>
  <div class="expr-actions">
    <span class="expr-hint">JSONata</span>
    <button class="eval-btn" on:click={onEvaluate} title="Evaluate against last run context">▶ Evaluate</button>
  </div>
</div>

<style>
  .expr-editor { display: flex; flex-direction: column; gap: 4px; }
  .expr-cm :global(.cm-editor) { width: 100%; box-sizing: border-box; }
  .expr-actions { display: flex; justify-content: space-between; align-items: center; }
  .expr-hint { font-size: 0.6rem; color: #f59e0b; text-transform: uppercase; letter-spacing: 0.08em; }
  .eval-btn {
    font-size: 0.65rem; color: #94a3b8; background: #1e2035;
    border: 1px solid #374151; border-radius: 3px; padding: 2px 6px;
    cursor: pointer;
  }
  .eval-btn:hover { color: #e2e8f0; border-color: #f59e0b; }
</style>
