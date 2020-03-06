# dmn-js-syntax-highlighting

[![Build Status](https://travis-ci.com/bpmn-io/dmn-js-syntax-highlighting.svg?branch=master)](https://travis-ci.com/bpmn-io/dmn-js-syntax-highlighting)

Adds FEEL syntax highlighting for literal expression and decision table.

## Usage

Use as an additional module in your `DmnModeler`:

```javascript
import {
  CodeEditor,
  DecisionTableSyntaxHighlighting,
  LiteralExpressionSyntaxHighlighting
} from 'dmn-js-syntax-highlighting';

import DmnModeler from 'dmn-js/lib/Modeler';

var modeler = new DmnModeler({
  common: {
    additionalModules: [
      CodeEditor
    ]
  },
  decisionTable: {
    additionalModules: [
      DecisionTableSyntaxHighlighting
    ]
  },
  literalExpression: {
    additionalModules: [
      LiteralExpressionSyntaxHighlighting
    ]
  }
});
```

## Development Setup

```sh
npm install
npm run dev
```

## License

MIT
