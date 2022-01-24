export default class Page {
  constructor(params) {
    this.params = params;
  }

  getRoot() {
    throw new Error('Method "getRoot" shouldbe implemented');
  }

  afterRender() {}

  destroy() {}
}
