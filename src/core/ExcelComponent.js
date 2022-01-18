import DOMListener from './DOMListener';

class ExcelComponent extends DOMListener {
  constructor($root, options = {}) {
    super($root, options.listeners);
    this.name = options.name || '';
    this.emitter = options.emitter;
    this.unsubscribers = [];
    this.prepare();
  }

  // Config component before init
  prepare() {}

  // Return component template
  toHTML() {
    return '';
  }

  // Notify listeners about event
  $emit(event, ...args) {
    this.emitter.emit(event, ...args);
  }

  // Subsribes on event
  $on(event, fn) {
    const unsub = this.emitter.subscribe(event, fn);
    this.unsubscribers.push(unsub);
  }

  // Init component
  // Add DOM listeneres
  init() {
    this.initDOMListeners();
  }

  // Delete component
  // Remove DOM listeners
  destroy() {
    this.removeDOMListeners();
    this.unsubscribers.forEach((unsub) => unsub());
  }
}

export default ExcelComponent;
