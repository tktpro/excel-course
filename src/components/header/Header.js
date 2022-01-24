import $ from '@core/dom';
import ExcelComponent from '@core/ExcelComponent';
import * as actions from '@/redux/actions';
import { defaultTitle } from '@/constants';
import { debounce } from '@core/utils';
import ActiveRoute from '@core/routes/ActiveRoute';

class Header extends ExcelComponent {
  static className = 'excel__header';

  constructor($root, options) {
    super($root, {
      name: 'Header',
      listeners: ['input', 'click'],
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
        <div class="button" data-button="remove">
          <span class="material-icons">
            delete_forever
          </span>
        </div>
        <div class="button" data-button="exit">
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

  onClick(event) {
    const $target = $(event.target).closest('[data-button]');

    if ($target.$el) {
      if ($target.data?.button === 'remove') {
        // eslint-disable-next-line no-restricted-globals
        const desicion = confirm('Remove table?');

        if (desicion) {
          localStorage.removeItem(`excel:${ActiveRoute.param}`);
          ActiveRoute.navigate('');
        }
      } else if ($target.data?.button === 'exit') {
        ActiveRoute.navigate('');
      }
    }
  }
}

export default Header;
