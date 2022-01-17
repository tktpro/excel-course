import { capitalize } from '@core/utils';

function getMethodName(eventName) {
  return `on${capitalize(eventName)}`;
}

class DOMListener {
  constructor($root, listeners = []) {
    if (!$root) {
      throw new Error('No $root provided fro DOMListener');
    }

    this.$root = $root;
    this.listeners = listeners;
  }

  initDOMListeners() {
    this.listeners.forEach((listener) => {
      const method = getMethodName(listener);
      if (!this[method]) {
        throw new Error(
          `Method ${method} is not implemented in ${this.name} Component`,
        );
      }
      this[method] = this[method].bind(this);
      this.$root.on(listener, this[method]);
    });
  }

  removeDOMListeners() {
    this.listeners.forEach((listener) => {
      const method = getMethodName(listener);
      this.$root.off(listener, this[method]);
    });
  }
}

export default DOMListener;
