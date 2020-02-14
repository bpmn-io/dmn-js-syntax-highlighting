import TextArea from './TextArea';
import CodeEditor from './code-editor';

export default {
  __init__: [ 'textarea' ],
  __depends__: [ CodeEditor ],
  textarea: [ 'type', TextArea ]
};