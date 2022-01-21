import { defaultStyles } from '@/constants';
import { toInlineStyles } from '@core/utils';
import parse from '@core/parse';

const CODES = {
  A: 65,
  Z: 90,
};

const DEFAULT_WIDTH = 120;
const DEFAULT_HEIGHT = 24;

function toChar(_, index) {
  return String.fromCharCode(CODES.A + index);
}

function getWidth(state, index) {
  return `${state[index] || DEFAULT_WIDTH}px`;
}

function getHeight(state, index) {
  return `${state[index] || DEFAULT_HEIGHT}px`;
}

function withWidthFrom(state) {
  return (col, index) => ({
    col,
    index,
    width: getWidth(state, index),
  });
}

function toCell(state, rowIndex) {
  return (_, colIndex) => {
    const id = `${rowIndex}:${colIndex}`;
    const data = state.dataState[id];
    const styles = toInlineStyles({
      ...defaultStyles,
      ...state.stylesState[id],
    });
    return `
      <div
        class="cell"
        contenteditable
        spellcheck="false"
        data-col="${colIndex}"
        data-type="cell"
        data-id="${id}"
        data-value="${data || ''}"
        style="${styles}; width: ${getWidth(state.colState, colIndex)}">
        ${parse(data) || ''}
      </div>
    `;
  };
}

function toColumn({ col, index, width }) {
  return `
    <div class="column" data-type="resizable" data-col="${index}" style="width: ${width}">
      ${col}
      <div class="col-resize" data-resize="col"></div>
    </div>
  `;
}

function createRow(content, index, state) {
  const resize = index
    ? '<div class="row-resize" data-resize="row"></div>'
    : '';
  const height = getHeight(state, index);
  return `
    <div class="row" data-type="resizable" data-row="${index}" style="height: ${height}">
      <div class="row-info">
        ${index ?? ''}
        ${resize}
      </div>
      <div class="row-data">${content}</div>
    </div>
  `;
}

export default function createTable(rowsCount = 15, state = {}) {
  const colsCount = CODES.Z - CODES.A + 1;
  const rows = [];
  const cols = new Array(colsCount)
    .fill('')
    .map(toChar)
    .map(withWidthFrom(state.colState))
    .map(toColumn)
    .join('');

  rows.push(createRow(cols, null, state));

  for (let i = 0; i < rowsCount; i += 1) {
    const cells = new Array(colsCount).fill('').map(toCell(state, i)).join('');
    rows.push(createRow(cells, i + 1, state.rowState));
  }

  return rows.join('');
}
