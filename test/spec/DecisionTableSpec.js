import Editor from 'dmn-js-decision-table/lib/Editor';

import EditingManager from 'dmn-js-shared/lib/base/EditingManager';

import { insertCSS } from 'dmn-js/test/helper';

import TestContainer from 'mocha-test-container-support';

import diagramXML from './decision-table.dmn';

import {
  CodeEditor,
  DecisionTableSyntaxHighlighting,
  MonacoEditor
} from '../../lib';


class DecisionTableEditor extends EditingManager {
  _getViewProviders() {

    return [
      {
        id: 'decisionTable',
        constructor: Editor,
        opens(element) {
          return element.$type === 'dmn:Decision' && element.decisionTable;
        }
      }
    ];
  }
}


describe('decision table', function() {

  let dmnJs;

  function bootstrap(...additionalModules) {
    return function(done) {
      const testContainer = TestContainer.get(this);

      testContainer.classList.add('test-container');

      dmnJs = new DecisionTableEditor({
        container: testContainer,
        decisionTable: {
          additionalModules: [
            ...additionalModules,
            DecisionTableSyntaxHighlighting
          ]
        }
      });

      dmnJs.importXML(diagramXML, done);
    };
  }


  before(() => {
    insertCSS('dmn-font.css',
      require('dmn-font/dist/css/dmn-embedded.css')
    );

    insertCSS('dmn-js-shared.css',
      require('dmn-js-shared/assets/css/dmn-js-shared.css')
    );

    insertCSS('dmn-js-decision-table-js.css',
      require('dmn-js-decision-table/assets/css/dmn-js-decision-table.css')
    );

    insertCSS('dmn-js-decision-table-controls.css',
      require('dmn-js-decision-table/assets/css/dmn-js-decision-table-controls.css')
    );

    insertCSS('dmn-js-testing.css',
      '.test-container .dmn-js-parent { height: 500px; }'
    );

    insertCSS('style.css',
      '.content-editable > div { height: 100%; outline: none !important; }'
    );
  });


  describe('codemirror', function() {

    beforeEach(bootstrap(CodeEditor));


    it('should work', function() {

      // given

      // when

      // then
      expect(dmnJs).to.exist;
    });
  });


  describe('monaco', function() {

    beforeEach(bootstrap(MonacoEditor));


    it('should work', function() {

      // given

      // when

      // then
      expect(dmnJs).to.exist;
    });
  });
});
