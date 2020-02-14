# dmn-js-syntax-highlighting

[![Build Status](https://travis-ci.com/bpmn-io/dmn-js-syntax-highlighting.svg?branch=master)](https://travis-ci.com/bpmn-io/dmn-js-syntax-highlighting)

Adds FEEL syntax highlighting for literal expression and decision table.

## Usage

Use as an additional module in your `DmnModeler`:

```javascript
import {
  DecisionTableSyntaxHighlighting,
  LiteralExpressionSyntaxHighlighting
} from 'dmn-js-syntax-highlighting';

import DmnModeler from 'bpmn-js/lib/Modeler';

var modeler = new DmnModeler({
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
