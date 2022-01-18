import $ from '@core/dom';
import Emitter from '@core/Emitter';

class Excel {
  constructor(selector, options) {
    this.$el = $(selector);
    this.components = options.components || [];
    this.emitter = new Emitter();
  }

  getRoot() {
    const $root = $.create('div', 'excel');
    const componentOptions = { emitter: this.emitter };

    this.components = this.components.map((Component) => {
      const $el = $.create('div', Component.className);
      const component = new Component($el, componentOptions);

      // debug
      // if (component.name) {
      //   window[`c${component.name}`] = component;
      // }

      $el.html(component.toHTML());
      $root.append($el);
      return component;
    });
    return $root;
  }

  render() {
    // console.log('====', this.$el);
    // this.$el.insertAdjacentHTML('afterbegin', '<h1>yo</h1>');
    this.$el.append(this.getRoot());
    this.components.forEach((component) => component.init());
  }

  destroy() {
    this.components.forEach((component) => component.destroy());
  }
}

export default Excel;
