import { storage } from '@core/utils';

function toHTML(key) {
  const model = storage(key);
  const id = key.split(':')[1];

  return `
    <li class="dashboard__record">
      <a href="#excel/${id}">${model.title}</a>
      <strong>
        ${new Date(model.openedDate).toLocaleDateString()}
        ${new Date(model.openedDate).toLocaleTimeString()}
      </strong>
    </li>
  `;
}

function getAllKeys() {
  const keys = [];
  for (let i = 0; i < localStorage.length; i += 1) {
    const key = localStorage.key(i);
    if (key.includes('excel')) {
      keys.push(key);
    }
  }

  return keys;
}

// eslint-disable-next-line import/prefer-default-export
export function createRecordsTable() {
  const keys = getAllKeys();

  if (!keys.length) {
    return `
      <p>List is Empty</p>
    `;
  }

  return `
  <div class="dashboard__list-header">
    <span>Название</span>
    <span>Дата открытия</span>
  </div>

  <ul class="dashboard__list">
    ${keys.map(toHTML).join('')}
  </ul>
  `;
}
