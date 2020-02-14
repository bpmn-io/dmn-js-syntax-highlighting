import { Component } from 'inferno';


export default class TextareaEditorComponent extends Component {
  constructor(props, context) {
    super(props, context);

    this._modeling = context.injector.get('modeling');

    this._viewer = context.injector.get('viewer');

    this.editLiteralExpressionText = this.editLiteralExpressionText.bind(this);

    this.editor = context.injector.get('codeEditor').getInstance();
    this.editorRef = createRef();
  }

  componentDidMount() {
    const { editor } = this;

    editor.attachTo(this.editorRef.current);

    const { text } = this.getLiteralExpression();

    editor.setValue(text);

    editor.doc.clearHistory();

    editor.refresh();

    editor.on('change', this.editLiteralExpressionText);
  }

  componentWillUnmount() {
    this.editor.off('change', this.editLiteralExpressionText);

    this.editor.detach();
  }

  getLiteralExpression() {
    return this._viewer.getDecision().literalExpression;
  }

  editLiteralExpressionText() {
    this._modeling.editLiteralExpressionText(this.editor.doc.getValue());
  }

  render() {
    return (
      <div
        className="textarea editor"
        ref={ this.editorRef }
      />
    );
  }
}



// helper /////
function createRef() {
  function ref(node) {
    ref.current = node;
  }

  ref.current = null;

  return ref;
}
