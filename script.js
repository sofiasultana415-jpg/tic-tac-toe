const board = document.getElementById('board');
const status = document.getElementById('status');
const resultMsg = document.getElementById('resultMsg');
const scoreXDisplay = document.getElementById('scoreX');
const scoreODisplay = document.getElementById('scoreO');

let currentPlayer = 'X';
let gameActive = true;
let gameState = ["", "", "", "", "", "", "", "", ""];
let scoreX = 0;
let scoreO = 0;

function createCells() {
  board.innerHTML = '';
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.dataset.index = i;
    cell.addEventListener('click', handleCellClick);
    board.appendChild(cell);
  }
}

function handleCellClick(e) {
  const index = e.target.dataset.index;
  if (!gameActive || gameState[index] !== "") return;

  gameState[index] = currentPlayer;
  e.target.textContent = currentPlayer;

  if (checkWin()) {
    status.textContent = `Player ${currentPlayer} wins!`;
    resultMsg.textContent = `🎉 Player ${currentPlayer} is the winner!`;
    gameActive = false;
    updateScore(currentPlayer);
  } else if (!gameState.includes("")) {
    status.textContent = "It's a draw!";
    resultMsg.textContent = "🤝 It's a draw!";
    gameActive = false;
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    status.textContent = `Player ${currentPlayer}'s turn`;
  }
}

function checkWin() {
  const winPatterns = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ];

  return winPatterns.some(pattern => {
    const [a, b, c] = pattern;
    return gameState[a] &&
           gameState[a] === gameState[b] &&
           gameState[a] === gameState[c];
  });
}

function updateScore(player) {
  if (player === 'X') {
    scoreX++;
    scoreXDisplay.textContent = scoreX;
  } else {
    scoreO++;
    scoreODisplay.textContent = scoreO;
  }
}

function resetGame() {
  gameState = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = 'X';
  gameActive = true;
  status.textContent = "Player X's turn";
  resultMsg.textContent = '';
  createCells();
}

// Initial game setup
createCells();
