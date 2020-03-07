import App from './App.svelte';

import xml from './diagram.dmn';

const app = new App({
  target: document.body,
  props: {
    xml
  }
});

export default app;
