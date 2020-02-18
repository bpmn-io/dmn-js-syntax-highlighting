import { Component } from 'inferno';


export default class TextareaEditorComponent extends Component {
  constructor(props, context) {
    super(props, context);

    this._modeling = context.injector.get('modeling');

    this._viewer = context.injector.get('viewer');

    this.editLiteralExpressionText = this.editLiteralExpressionText.bind(this);

    this._editor = context.injector.get('codeEditor');
    this.editorRef = createRef();
  }

  componentDidMount() {
    const { text } = this.getLiteralExpression();

    const editor = this.editor = this._editor.getInstance(text);

    editor.attachTo(this.editorRef.current);
  }

  componentWillUnmount() {
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
