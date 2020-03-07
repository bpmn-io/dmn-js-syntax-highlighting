<script>
  import { onDestroy, onMount } from 'svelte';
  import DmnModeler from 'dmn-js/lib/Modeler';

  export let xml;

  let modeler;

  onMount(() => {
    modeler = new DmnModeler({ container: '#container' });

    modeler.importXML(xml);
  });

  onDestroy(() => modeler.destroy());
</script>

<div id="container"></div>
