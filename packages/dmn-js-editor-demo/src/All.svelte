<script>
  import { onDestroy, onMount } from 'svelte';
  import DmnModeler from 'dmn-js/lib/Modeler';

  import {
    CodeEditor,
    DecisionTableSyntaxHighlighting,
    LiteralExpressionSyntaxHighlighting
  } from 'dmn-js-syntax-highlighting';

  export let xml;

  let modeler;

  onMount(() => {
    modeler = new DmnModeler({
      decisionTable: {
        additionalModules: [
          CodeEditor,
          DecisionTableSyntaxHighlighting
        ]
      },
      literalExpression: {
        additionalModules: [
          CodeEditor,
          LiteralExpressionSyntaxHighlighting
        ]
      },
      container: '#container'
    });

    modeler.importXML(xml);
  });

  onDestroy(() => modeler.destroy());
</script>

<div id="container"></div>
