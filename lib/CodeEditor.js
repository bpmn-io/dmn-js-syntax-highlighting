import CodeMirror from 'codemirror';


/**
 * Code mirror instance with an editor API.
 */
export default function CodeEditor() {

  let el;

  const instance = CodeMirror(function(_el) {
    el = _el;
  }, {
    lineWrapping: true,
    tabSize: 2
  });

  instance.attachTo = function(parentNode) {
    parentNode.appendChild(el);

    this.refresh();
  };

  instance.detach = function() {
    if (el.parentNode) {
      el.parentNode.removeChild(el);
    }

    instance.doc.clearHistory();
  };


  // API
  this.getInstance = function() {
    return instance;
  };
}