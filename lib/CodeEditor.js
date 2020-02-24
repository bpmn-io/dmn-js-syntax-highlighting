import { autocomplete, sortAndFilterCompletion } from '@codemirror/next/autocomplete';
import { closeBrackets } from '@codemirror/next/closebrackets';
import { baseKeymap } from '@codemirror/next/commands';
import { defaultHighlighter, styleTags } from '@codemirror/next/highlight';
import { history, redo, undo } from '@codemirror/next/history';
import { keymap } from '@codemirror/next/keymap';
import { EditorState, languageData, StateField } from '@codemirror/next/state';
import { continuedIndent, indentNodeProp, LezerSyntax } from '@codemirror/next/syntax';
import { EditorView } from '@codemirror/next/view';

import { parser } from 'feelin/src/grammar/feel-parser';


/**
 * Code mirror instance with an editor API.
 */
export default function CodeEditor() {

  // API
  this.getEditor = function() {

    const syntax = new FeelSyntax();

    const changeDetector = new ChangeDetector();

    const extensions = [
      syntax.extension,
      defaultHighlighter,
      closeBrackets,
      changeDetector.extension,
      autocomplete(),
      history(),
      keymap({
        'Mod-z': undo,
        'Mod-Shift-z': redo
      }),
      keymap(baseKeymap)
    ];
    const state = EditorState.create({ extensions });

    const editor = new EditorView({ state });

    editor.setContent = function(newContent) {
      const currentContentLength = editor.state.doc.length;

      editor.dispatch(editor.state.t().replace(0, currentContentLength, newContent));
    };

    editor.attachTo = function(parentNode) {
      parentNode.appendChild(editor.dom);
    };

    editor.detach = function() {
      if (editor.dom.parentNode) {
        editor.dom.parentNode.removeChild(editor.dom);
      }
    };

    editor.onChange = function(fn) {
      changeDetector.on(fn);
    };

    editor.offChange = function(fn) {
      changeDetector.off(fn);
    };

    return editor;
  };
}



function ChangeDetector() {
  const listeners = new Set();

  function on(listener) {
    listeners.add(listener);
  }

  function off(listener) {
    listeners.delete(listener);
  }

  function notify(newValue) {
    listeners.forEach(listener => {
      listener(newValue);
    });
  }

  const stateField = new StateField({
    init(state) {
      return state.doc.toString();
    },
    apply(_, currentDoc, newState) {
      const newDoc = newState.doc.toString();

      if (newDoc !== currentDoc) {
        notify(newDoc);
      }

      return newDoc;
    }
  });

  // API
  this.on = on;
  this.off = off;
  this.extension = stateField.extension;
}


function FeelSyntax() {
  const keywords = `for return if then else some or and satisfies instance of
 in between not function external`;

  const autocompleteItems = (keywords + ' true false').split(' ')
    .map(item => ({ label: item, insertText: item }));

  const syntax = new LezerSyntax(parser.withProps(
    indentNodeProp.add(type => {
      if (type.name == 'IfExpression') return continuedIndent({ except: /^({|else\b)/ });
      if (type.name == 'Context') return continuedIndent();
    }),
    languageData.add({
      LineComment: {
        closeBrackets: ['(', '[', '{', "'", '"'],
        completeAt(state, pos) {
          const prefix = /[\w$]*$/.exec(state.doc.slice(Math.max(0, pos - 30), pos))[0];
          if (!prefix) {
            return { start: pos, items: [] };
          }

          return {
            start: pos - prefix.length, items: sortAndFilterCompletion(prefix, autocompleteItems)
          };
        }
      }
    }),
    styleTags({
      '⚠': 'invalid',
      [keywords]: 'keyword',
      '( )': 'paren',
      '[ ]': 'squareBracket',
      'BlockComment LineComment': 'comment',
      Parameters: 'variableName',
      List: 'list',
      Context: 'brace',
      Interval: 'string',
      StringLiteral: 'string',
      Number: 'number',
      'true false': 'atom',
      'QualifiedName Name': 'variableName definition'
    })
  ));

  return syntax;
}
