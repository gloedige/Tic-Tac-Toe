// let fields = [
//     null,
//     null,
//     null,
//     null,
//     null,
//     null,
//     null,
//     null,
//     null
// ]

let fields = [null, null, 'circle', 'circle', null, 'cross', null, null, null];
let currentPlayer = 'circle';

function init(){
    render();
}

function getCircleSVG() {
  return `<svg width="70" height="70" viewBox="0 0 70 70"><circle class=\"animated-circle\" cx="35" cy="35" r="30" stroke="#00B0EF" stroke-width="8" fill="none"/></svg>`;
}

function getCrossSVG() {
  return `<svg width="70" height="70" viewBox="0 0 70 70">
    <line class=\"animated-cross\" x1=\"15\" y1=\"15\" x2=\"55\" y2=\"55\" stroke="#e3ef00ff" stroke-width=\"8\" stroke-linecap=\"round\"/>
    <line class=\"animated-cross animated-cross-delay\" x1=\"55\" y1=\"15\" x2=\"15\" y2=\"55\" stroke="#e3ef00ff" stroke-width=\"8\" stroke-linecap=\"round\"/>
  </svg>`;
}

function renderCell(row, col) {
  const index = row * 3 + col;
  const cell = document.querySelector(`td[data-row="${row}"][data-col="${col}"]`);
  if (!cell) return;
  if (fields[index] === 'circle') {
    cell.innerHTML = getCircleSVG();
  } else if (fields[index] === 'cross') {
    cell.innerHTML = getCrossSVG();
  }
  cell.onclick = null; 
}

function render() {
  let tableHtml = '<table class="tic-tac-toe">';
  for (let row = 0; row < 3; row++) {
    tableHtml += '<tr>';
    for (let col = 0; col < 3; col++) {
      const index = row * 3 + col;
      let cellContent = '';
      if (fields[index] === 'circle') {
        cellContent = getCircleSVG();
      } else if (fields[index] === 'cross') {
        cellContent = getCrossSVG();
      }
      tableHtml += `<td data-row="${row}" data-col="${col}" onclick="cellClicked(${row},${col})">${cellContent}</td>`;
    }
    tableHtml += '</tr>';
  }
  tableHtml += '</table>';
  document.getElementById('content').innerHTML = tableHtml;
}

// i need a onclick function to add circle or cross element to the cell in the tic tac toe grid
// the fields array should be updated accordingly but I rendering should only for the clicked cell be updated
function cellClicked(row, col) {
  const index = row * 3 + col;
  const cell = document.querySelector(`td[data-row="${row}"][data-col="${col}"]`);
  if (fields[index] || !cell || !cell.onclick) return;
  fields[index] = currentPlayer;
  renderCell(row, col);
  currentPlayer = currentPlayer === 'circle' ? 'cross' : 'circle';
}