const cells = document.querySelectorAll('.cell');
const statusText  = document.querySelector('.status')
const restartBtn = document.querySelector('.restartBtn');

let currentPlayer = "X";
let isOver = false;
let result = "";
const winningCondition = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], 
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], 
    [0, 4, 8], 
    [2, 4, 6]
];

const options = ['', '', '', '', '', '', '', '', ''];

startGame();

function startGame() {
    cells.forEach(cell => cell.addEventListener('click', drawCell));
    restartBtn.addEventListener('click', restartGame);
    statusText.innerText = `${currentPlayer}'s turn`;
}

function drawCell() {
    // Return if game is over or the cell has been filled
    const cellIndex = this.dataset.cell;
    if (isOver || options[cellIndex] !== "") return;
    this.innerText = currentPlayer;
    // Update cell --> options[]
    options[cellIndex] =  currentPlayer;
    // Check for winner (currentCondition means isOver or not)
    let currentCondition = checkWinner();
    if (currentCondition) return;
    changePlayer();
}

function changePlayer() {
    currentPlayer = (currentPlayer === 'X') ? 'O' : 'X';
    statusText.innerText = currentPlayer + "'s turn";
}

function checkWinner() {
    for (let i=0; i<winningCondition.length; i++) {
        let condition = winningCondition[i];
        // consider isOver === true;
        isOver = true;
        for (let j=0; j<condition.length; j++) {
            if (options[condition[j]] === '' || options[condition[j]] !== currentPlayer) isOver = false;
        }
        if (isOver) {
            console.log(currentPlayer + " WINS!");
            statusText.innerText = currentPlayer + " WINS!";
            return isOver;
        } else checkDraw();
    }
    return isOver;
}

function checkDraw() {
    // check whether options is full
    let isFull = true;
    for (let i=0; i<options.length; i++) {
        if(options[i] === "") isFull = false;
    }
    if (isFull) {
        statusText.innerText = "It's a tie!";
        isOver = true;
        return isOver;
    } else {
        return isOver;
    }
}

function restartGame() {
    isOver = false;
    cells.forEach(cell => cell.innerText = "");
    options.forEach((option, index) => options[index] = "");
    startGame();
}