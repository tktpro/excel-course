import $ from '@core/dom';
import { defaultStyles } from '@/constants';
import ExcelStateComponent from '@core/ExcelStateComponent';
import createToolbar from '@/components/toolbar/toolbar.template';

class Toolbar extends ExcelStateComponent {
  static className = 'excel__toolbar';

  constructor($root, options) {
    super($root, {
      name: 'Toolbar',
      listeners: ['click'],
      subscribe: ['currentStyles'],
      ...options,
    });
  }

  prepare() {
    this.initState(defaultStyles);
  }

  get template() {
    return createToolbar(this.state);
  }

  toHTML() {
    return this.template;
  }

  storeChanged(changes) {
    this.setState(changes.currentStyles);
  }

  onClick(event) {
    const $target = $(event.target).closest('[data-type="button"]');

    if ($target.$el) {
      const value = JSON.parse($target.data.value);
      this.$emit('toolbar:applyStyle', value);
    }
  }
}

export default Toolbar;
