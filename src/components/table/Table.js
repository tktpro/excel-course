import ExcelComponent from '@core/ExcelComponent';
import createTable from '@/components/table/table.template';
import resizeHandler from '@/components/table/table.resize';
import { shouldResize } from '@/components/table/table.functions';

class Table extends ExcelComponent {
  static className = 'excel__table';

  constructor($root) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown'],
    });
  }

  toHTML() {
    return createTable(5);
  }

  onClick() {}

  onMousedown(event) {
    // console.log('====', event.target.getAttribute('data-resize'));
    // console.log('====', event.target.dataset.resize);
    // console.log('====', event.target.dataset);

    if (shouldResize(event)) {
      resizeHandler(this.$root, event);
    }
  }
}

export default Table;
