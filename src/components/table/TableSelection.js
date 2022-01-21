export default class TableSelection {
  static className = 'selected';

  constructor() {
    this.group = [];
    this.current = null;
  }

  // $el instanceof Dom === true
  select($el) {
    this.clear();
    $el.focus().addClass(TableSelection.className);
    this.group.push($el);
    this.current = $el;
  }

  selectGroup($group = []) {
    this.clear();
    this.group = $group;
    this.group.forEach(($el) => $el.addClass(TableSelection.className));
  }

  get selectedIds() {
    return this.group.map(($el) => $el.dataId());
  }

  clear() {
    this.group.forEach(($el) => $el.removeClass(TableSelection.className));
    this.group = [];
  }

  applyStyle(style) {
    this.group.forEach(($el) => $el.css(style));
  }
}
