import $ from '@core/dom';
import Emitter from '@core/Emitter';
import StoreSubscriber from '@core/StoreSubscriber';
import * as actions from '@/redux/actions';
import { preventDefault } from '@core/utils';

class Excel {
  constructor(options) {
    this.components = options.components || [];
    this.emitter = new Emitter();
    this.store = options.store;
    this.subscriber = new StoreSubscriber(this.store);
  }

  getRoot() {
    const $root = $.create('div', 'excel');
    const componentOptions = { emitter: this.emitter, store: this.store };

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

  init() {
    // this.$el.insertAdjacentHTML('afterbegin', '<h1>yo</h1>');
    if (process.env.NODE_ENV === 'production') {
      document.addEventListener('contextmenu', preventDefault);
    }
    this.store.dispatch(actions.updateDate());
    this.subscriber.subscribeComponents(this.components);
    this.components.forEach((component) => component.init());
  }

  destroy() {
    this.subscriber.unsubscribeFromStore();
    this.components.forEach((component) => component.destroy());
    document.removeEventListener('contextmenu', preventDefault);
  }
}

export default Excel;
