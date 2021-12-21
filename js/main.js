/*----- constants -----*/
const winningPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
]

function checkIsWinner() {
    winningPatterns.forEach(function(pattern){
        let x = 0
        let o = 0
        pattern.forEach(function (square){
            const value = board[square]
            if (value === 'X') x += 1
            if (value === 'O') o += 1
            if (x === 3) winner = 'X'
            else if (o === 3) winner = 'O'
            else if (turn > 8) winner = 'T' 
        })
    })
}

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
    board = Array(9).fill(null); 
    turn = 1;
    winner = null;
     render();
}
function getSymbol() {
    return turn % 2 === 0 ? 'O' : 'X'
}
function handleMove(evt) {
    
    const square = boardEls.indexOf(evt.target);
    console.log(square)
    const symbol = getSymbol()
    board[square]=symbol
    render()
    turn += 1 
}

function render() {
    checkIsWinner() 
    btnEl.style.visibility = winner ? 'visible' : 'hidden';
    renderBoard();
    renderMessage();
}

function renderMessage () {
    if (winner === 'T') {
        msgEl.innerHTML = 'Tie Game!'; 
    } else if (winner) {
        msgEl.innerHTML = `<span style="color: orangeRed">${winner} Wins!</span>`;
    } else {
        msgEl.innerHTML = `${getSymbol()}'s Turn`;
   }
}

function renderBoard() {
    board.forEach(function(value, index) {
      //colArr.forEach(function(playerVal, rowIdx) {
        const divId = `square${index}`;  // e.g. "square7"
        const divEl = document.getElementById(divId);
        console.log(divId)
        divEl.innerText = value
        
        

    });
}