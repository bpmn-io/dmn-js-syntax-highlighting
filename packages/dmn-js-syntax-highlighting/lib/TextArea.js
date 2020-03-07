import TextAreaComponent from './TextAreaComponent';

export default class Textarea {
  constructor(components) {
    components.onGetComponent('viewer', () => TextAreaComponent);
  }
}

Textarea.$inject = [ 'components' ];