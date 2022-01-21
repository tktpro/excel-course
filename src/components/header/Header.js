import $ from '@core/dom';
import ExcelComponent from '@core/ExcelComponent';
import * as actions from '@/redux/actions';
import { defaultTitle } from '@/constants';
import { debounce } from '@core/utils';

class Header extends ExcelComponent {
  static className = 'excel__header';

  constructor($root, options) {
    super($root, {
      name: 'Header',
      listeners: ['input'],
      ...options,
    });
  }

  prepare() {
    this.onInput = debounce(this.onInput, 300);
  }

  toHTML() {
    const { title } = this.store.getState();
    return `
    <input type="text" class="input" value="${title || defaultTitle}">
      <div>
        <div class="button">
          <span class="material-icons">
            delete_forever
          </span>
        </div>
        <div class="button">
          <span class="material-icons">
            exit_to_app
          </span>
        </div>
      </div>
    `;
  }

  onInput(event) {
    const $target = $(event.target);
    this.$dispatch(actions.changeTitle($target.text()));
  }
}

export default Header;
