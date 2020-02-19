import { EditorView } from '@codemirror/next/view';
import { baseKeymap } from '@codemirror/next/commands';
import { keymap } from '@codemirror/next/keymap';
import { history, redo, undo } from '@codemirror/next/history';
import { LezerSyntax } from '@codemirror/next/syntax';
import {
  EditorState
} from '@codemirror/next/state';
import { defaultHighlighter, styleTags } from '@codemirror/next/highlight';
import { closeBrackets } from '@codemirror/next/closebrackets';

import { parser } from 'feelin/src/grammar/feel-parser';


/**
 * Code mirror instance with an editor API.
 */
export default function CodeEditor() {

  function getSyntax() {
    const syntax = new LezerSyntax(parser.withProps(
      styleTags({
        'for if some or and instanceOf path in return': 'keyword',
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

    return syntax.extension;
  }

  // API
  this.getInstance = function(initialText) {

    const syntax = getSyntax();

    const extensions = [
      syntax,
      defaultHighlighter,
      closeBrackets,
      history(),
      keymap({
        'Mod-z': undo,
        'Mod-Shift-z': redo
      }),
      keymap(baseKeymap)
    ];
    const state = EditorState.create({ doc: initialText, extensions });

    const editor = new EditorView({ state });

    editor.attachTo = function(parentNode) {
      parentNode.appendChild(editor.dom);
    };

    editor.detach = function() {
      if (editor.dom.parentNode) {
        editor.dom.parentNode.removeChild(editor.dom);
      }
    };

    return editor;
  };
}

