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

    const editor = this.editor = this._editor.getEditor();

    editor.setContent(text);

    editor.attachTo(this.editorRef.current);

    editor.onChange(this.editLiteralExpressionText);
  }

  componentWillUnmount() {
    this.editor.offChange(this.editLiteralExpressionText);

    this.editor.detach();
  }

  getLiteralExpression() {
    return this._viewer.getDecision().literalExpression;
  }

  editLiteralExpressionText(value) {
    this._modeling.editLiteralExpressionText(value);
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
