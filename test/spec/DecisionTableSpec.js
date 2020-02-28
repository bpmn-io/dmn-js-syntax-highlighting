import Editor from 'dmn-js-decision-table/lib/Editor';

import EditingManager from 'dmn-js-shared/lib/base/EditingManager';

import { insertCSS } from 'dmn-js/test/helper';

import TestContainer from 'mocha-test-container-support';

import diagramXML from './decision-table.dmn';

import DecisionTableSyntaxHighlighting from '../../lib/decision-table';


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

  beforeEach(function(done) {
    const testContainer = TestContainer.get(this);

    testContainer.classList.add('test-container');

    dmnJs = window.editor = new DecisionTableEditor({
      container: testContainer,
      decisionTable: {
        additionalModules: [
          DecisionTableSyntaxHighlighting
        ]
      }
    });

    dmnJs.importXML(diagramXML, done);
  });


  it.only('should work', function() {

    // given

    // when

    // then
    expect(dmnJs).to.exist;
  });

});
