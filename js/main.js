/*----- constants -----*/
const COLORS = {
    '0': ' ', 
    '1': 'X',
    '-1': 'O'
};




/*----- app's state (variables) -----*/
let board; //grid of divs 
let turn; // 1 or -1
let winner; // end of game: null -> game in progress; 1/-1 a player has won; Tie 'T'


/*----- cached element references -----*/
const btnEl = document.querySelector('button');
const msgEl = document.querySelector('h2');
const boardEls = [...document.querySelectorAll('#board > div')];




/*----- event listeners  -----*/
btnEl.addEventListener('click', init);

const gridItems = document.querySelector('#board')
    .addEventListener('click', handleMove); 



/*----- functions -----*/
init();

function init() {
    board = [
        [0, 0, 0,], //row 0
        [0, 0, 0], //row 1
        [0, 0, 0], //row 2
    ]; 
    turn = 1;
    winner = null;
     render();
}
function handleMove(evt) {
    
    const colIdx = boardEls.indexOf(evt.target);
    if (colIdx === -1 || winner) return; 
       const colArr = board[colIdx];
       const rowIdx = colArr.indexOf(0);
       colArr[rowIdx] = turn;
       turn *= -1;

   
    render();
}

function render() {
    btnEl.style.visibility = winner ? 'visible' : 'hidden';
    renderBoard();
    renderMessage();
}


function renderMessage () {
   if (winner === 'T') {
    msgEl.innerHTML = 'Tie Game!'; 
   } else if (winner) {
    msgEl.innerHTML = `<span style="color: orangeRed">${COLORS[winner].toUpperCase()} Wins!</span>`;
} else {
    msgEl.innerHTML = `${COLORS[turn].toUpperCase()}'s Turn`;
   }
}


function renderBoard() {
    board.forEach(function(colArr, colIdx) {
      colArr.forEach(function(playerVal, rowIdx) {
        const divId = `c${rowIdx}r${colIdx}`;  // e.g. "c6r5"
        const divEl = document.getElementById(divId);
        divEl.innerText = COLORS[playerVal];
        
      });
    });
}

function getWinner(colIdx, rowIdx) {
     const winner = checkVertWin(colIdx, rowIdx) || checkHorzWin(colIdx, rowIdx);

     return winner;
}
function checkVertWin(colIdx, rowIdx) {
  const player = board[colIdx][rowIdx];
  let count = 1;
    rowIdx--;
  while(rowIdx >= board.length && board[colIdx][rowIdx] === player) {
    count++;
    rowIdx--;
  }
  
}
function checkHorzWin(colIdx, rowIdx) {
    const player = board[colIdx][rowIdx];
  let count = 1;
    let col = colIdx -1;
  while(col >= 0 && board[col][rowIdx] === player) {
    count++;
    col--;
}
col = colIdx + 1
    while (col < board.length && board[col][rowIdx] === player) {
      count++;
      col++;
    }
    
return count === 3 ? player : null;
}