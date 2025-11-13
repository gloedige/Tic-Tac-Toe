let fields = [
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null
]

// let fields = [null, null, 'circle', 'circle', null, 'cross', null, null, null];
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
function isGameFinished() {
  // Gewinner?
  if (checkWinner()) return true;
  // Alle Felder belegt?
  return fields.every(f => f !== null);
}

function updateGameStatus(currentPlayer) {
  const status = document.getElementById('game-status');
  let playerName
  if (currentPlayer == 'circle'){
    playerName = 'Kreis';
  }
  else if (currentPlayer == 'cross'){
    playerName = 'Kreuz';
  }
  if (!status) return;
  if (checkWinner()) {
    status.textContent = `Spiel beendet: ${playerName} hat gewonnen!`;
  } else if (fields.every(f => f !== null)) {
    status.textContent = 'Spiel beendet: Unentschieden!';
  } else {
    status.textContent = '';
  }
}

function cellClicked(row, col) {
  if (isGameFinished()) return;
  const index = row * 3 + col;
  const cell = document.querySelector(`td[data-row="${row}"][data-col="${col}"]`);
  if (fields[index] || !cell || !cell.onclick) return;
  fields[index] = currentPlayer;
  renderCell(row, col);
  const result = checkWinner();
  if (result) {
    drawWinningLine(result.pattern);
    updateGameStatus(currentPlayer);
    return;
  }
  if (fields.every(f => f !== null)) {
    updateGameStatus();
    return;
  }
  currentPlayer = currentPlayer === 'circle' ? 'cross' : 'circle';
  updateGameStatus();
}

function checkWinner() {
  const winPatterns = [
    [0,1,2], [3,4,5], [6,7,8], // rows
    [0,3,6], [1,4,7], [2,5,8], // columns
    [0,4,8], [2,4,6]           // diagonals
  ];
  for (const pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (fields[a] && fields[a] === fields[b] && fields[a] === fields[c]) {
      return { winner: fields[a], pattern };
    }
  }
  return null;
}

function drawWinningLine(pattern) {
  // Get cell positions
  const getCellCenter = (index) => {
    const row = Math.floor(index / 3);
    const col = index % 3;
    const cell = document.querySelector(`td[data-row="${row}"][data-col="${col}"]`);
    const rect = cell.getBoundingClientRect();
    const tableRect = cell.parentElement.parentElement.parentElement.getBoundingClientRect();
    return {
      x: rect.left + rect.width / 2 - tableRect.left,
      y: rect.top + rect.height / 2 - tableRect.top
    };
  };
  const start = getCellCenter(pattern[0]);
  const end = getCellCenter(pattern[2]);
  // Create SVG overlay
  let svg = document.getElementById('win-line');
  if (svg) svg.remove();
  svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('id', 'win-line');
  svg.style.position = 'absolute';
  svg.style.left = document.querySelector('.tic-tac-toe').getBoundingClientRect().left + 'px';
  svg.style.top = document.querySelector('.tic-tac-toe').getBoundingClientRect().top + 'px';
  svg.style.pointerEvents = 'none';
  svg.style.width = document.querySelector('.tic-tac-toe').offsetWidth + 'px';
  svg.style.height = document.querySelector('.tic-tac-toe').offsetHeight + 'px';
  svg.style.zIndex = 10;
  const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
  line.setAttribute('x1', start.x);
  line.setAttribute('y1', start.y);
  line.setAttribute('x2', end.x);
  line.setAttribute('y2', end.y);
  line.setAttribute('stroke', '#fff');
  line.setAttribute('stroke-width', '8');
  line.setAttribute('stroke-linecap', 'round');
  svg.appendChild(line);
  document.getElementById('content').appendChild(svg);
}

function resetGame() {
  fields = [null, null, null, null, null, null, null, null, null];
  currentPlayer = 'circle';
  const svg = document.getElementById('win-line');
  if (svg) svg.remove();
  render();
  updateGameStatus();
}