const CODES = {
  A: 65,
  Z: 90,
};

function toCell(rowIndex) {
  return (_, colIndex) => `
    <div
      class="cell"
      contenteditable
      spellcheck="false"
      data-col="${colIndex}"
      data-type="cell"
      data-id="${rowIndex}:${colIndex}">
    </div>`;
}

function toColumn(col, index) {
  return `
    <div class="column" data-type="resizable" data-col="${index}">
      ${col}
      <div class="col-resize" data-resize="col"></div>
    </div>
  `;
}

function createRow(content, index = '') {
  return `
    <div class="row" data-type="resizable">
      <div class="row-info">
        ${index}
        ${index && '<div class="row-resize" data-resize="row"></div>'}
      </div>
      <div class="row-data">${content}</div>
    </div>
  `;
}

function toChar(_, index) {
  return String.fromCharCode(CODES.A + index);
}

export default function createTable(rowsCount = 15) {
  const colsCount = CODES.Z - CODES.A + 1;
  const rows = [];
  const cols = new Array(colsCount).fill('').map(toChar).map(toColumn)
    .join('');

  rows.push(createRow(cols));

  for (let i = 0; i < rowsCount; i += 1) {
    const cells = new Array(colsCount).fill('').map(toCell(i)).join('');
    rows.push(createRow(cells, i + 1));
  }

  return rows.join('');
}
