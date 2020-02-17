import DecisionRulesEditor from './DecisionRulesEditor.js';
import Rules from 'dmn-js-decision-table/lib/features/decision-rules';
import CodeEditor from './code-editor';

export default {
  __depends__: [ CodeEditor, Rules ],
  __init__: [ 'decisionRulesEditor' ],
  decisionRulesEditor: [ 'type', DecisionRulesEditor ]
};