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

let fields = [null, 'circle', 'circle', 'circle', null, 'cross', 'cross', 'cross', null];

function init(){
    render();
}

function getCircleSVG() {
  return `<svg width="70" height="70" viewBox="0 0 70 70"><circle class=\"animated-circle\" cx="35" cy="35" r="30" stroke="#00B0EF" stroke-width="8" fill="none"/></svg>`;
}

function getCrossSVG() {
  return `<svg width="70" height="70" viewBox="0 0 70 70">
    <line class=\"animated-cross\" x1=\"15\" y1=\"15\" x2=\"55\" y2=\"55\" stroke=\"#00B0EF\" stroke-width=\"8\" stroke-linecap=\"round\"/>
    <line class=\"animated-cross animated-cross-delay\" x1=\"55\" y1=\"15\" x2=\"15\" y2=\"55\" stroke=\"#00B0EF\" stroke-width=\"8\" stroke-linecap=\"round\"/>
  </svg>`;
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
      tableHtml += `<td data-row="${row}" data-col="${col}">${cellContent}</td>`;
    }
    tableHtml += '</tr>';
  }
  tableHtml += '</table>';
  document.getElementById('content').innerHTML = tableHtml;
}