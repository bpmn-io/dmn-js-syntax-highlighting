import DecisionRulesEditor from './DecisionRulesEditor.js';
import Rules from 'dmn-js-decision-table/lib/features/decision-rules';

export default {
  __depends__: [ Rules ],
  __init__: [ 'decisionRulesEditor' ],
  decisionRulesEditor: [ 'type', DecisionRulesEditor ]
};