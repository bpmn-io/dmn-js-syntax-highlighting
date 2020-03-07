<script>
  import { onDestroy, onMount } from 'svelte';

  import Vanilla from './Vanilla.svelte';
  import All from './All.svelte';
  import SyntaxHighlighting from './SyntaxHighlighting.svelte';

  export let editor = 'vanilla';
  export let xml;

  function handleKeydown(event) {
    switch (event.key) {
      case 'F1':
        editor = 'vanilla';
        break;
      case 'F2':
        editor = 'syntaxHighlighting';
        break;
      case 'F3':
        editor = 'all';
        break;
    }
  }

  onMount(() => {
    document.addEventListener('keydown', handleKeydown);
  });

  onDestroy(() => {
    document.removeEventListener('keydown', handleKeydown);
  });
</script>

<style>
  :global(#container), main {
    height: 100%;
    width: 100%;
  }

  :global(.content-editable>div) {
    height: 100%;
    outline: none !important;
  }

  :global(.textarea>div) {
    height: 100%;
    overflow: auto;
    outline: none !important;
  }
</style>

<main>
  {#if editor === 'vanilla'}
    <Vanilla xml={xml} />
  {:else if editor === 'syntaxHighlighting'}
    <SyntaxHighlighting xml={xml} />
  {:else if editor === 'all'}
    <All xml={xml} />
  {/if}
</main>
