import Editor from 'dmn-js-literal-expression/lib/Editor';

import EditingManager from 'dmn-js-shared/lib/base/EditingManager';

import { insertCSS } from 'dmn-js/test/helper';

import TestContainer from 'mocha-test-container-support';

import diagramXML from './literal-expression.dmn';

import LiteralExpressionSyntaxHighlighting from '../../lib/literal-expression';


class LiteralExpressionEditor extends EditingManager {
  _getViewProviders() {

    return [
      {
        id: 'literalExpression',
        constructor: Editor,
        opens(element) {
          return element.$type === 'dmn:Decision' && element.literalExpression;
        }
      }
    ];
  }
}


describe('literal expression', function() {

  let dmnJs, literalExpression, testContainer, viewer;

  before(() => {
    insertCSS('dmn-font.css',
      require('dmn-font/dist/css/dmn-embedded.css')
    );

    insertCSS('dmn-js-shared.css',
      require('dmn-js-shared/assets/css/dmn-js-shared.css')
    );

    insertCSS('dmn-js-literal-expression-js.css',
      require('dmn-js-literal-expression/assets/css/dmn-js-literal-expression.css')
    );

    insertCSS('dmn-js-testing.css',
      '.test-container .dmn-js-parent { height: 500px; }'
    );

    insertCSS('style.css', '.codemirror { height: 100%; overflow: auto; }');
  });

  beforeEach(function(done) {
    testContainer = TestContainer.get(this);

    testContainer.classList.add('test-container');

    dmnJs = new LiteralExpressionEditor({
      container: testContainer,
      literalExpression: {
        additionalModules: [
          LiteralExpressionSyntaxHighlighting
        ]
      }
    });

    dmnJs.importXML(diagramXML, () => {
      viewer = dmnJs.getActiveViewer();
      literalExpression = viewer.getDecision().literalExpression;
      done();
    });
  });


  it('should save changes in business object', function() {

    // given
    const editor = viewer.get('codeEditor').getEditor();

    // when
    editor.setContent('text');

    // then
    expect(literalExpression.text).to.eql('text');
  });


  it('should allow to erase business object content', function() {

    // given
    const editor = viewer.get('codeEditor').getEditor();

    // when
    editor.setContent('');

    // then
    expect(literalExpression.text).to.eql('');
  });

});
