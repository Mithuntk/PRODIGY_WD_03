let currentPlayer = "X";
let board = ["", "", "", "", "", "", "", "", ""];
let gameOver = false;
let aiPlayer = "O";
let humanPlayer = "X";
let gameMode = "";

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function selectMode(mode) {
  gameMode = mode;
  document.getElementById("game-mode").style.display = "none";
}

function handleClick(index) {
  if (!gameOver && board[index] === "") {
    board[index] = currentPlayer;
    renderBoard();
    checkWinner();
    if (!gameOver) {
      togglePlayer();
      if (gameMode === "ai" && currentPlayer === aiPlayer) {
        setTimeout(makeAiMove, 500);
      }
    }
  }
}

function togglePlayer() {
  currentPlayer = currentPlayer === humanPlayer ? aiPlayer : humanPlayer;
}

function checkWinner() {
  for (let combo of winningCombinations) {
    const [a, b, c] = combo;
    if (board[a] && board[a] === board[b] && board[b] === board[c]) {
      gameOver = true;
      displayMessage(`${currentPlayer} wins!`);
      return;
    }
  }
  if (board.every((cell) => cell !== "")) {
    gameOver = true;
    displayMessage("It's a draw!");
  }
}

function makeAiMove() {
  const emptyCells = board.reduce((acc, cell, index) => {
    if (cell === "") acc.push(index);
    return acc;
  }, []);

  const randomIndex = Math.floor(Math.random() * emptyCells.length);
  const aiMoveIndex = emptyCells[randomIndex];

  board[aiMoveIndex] = aiPlayer;
  renderBoard();
  checkWinner();
  if (!gameOver) {
    togglePlayer();
  }
}

function displayMessage(message) {
  document.getElementById("status").textContent = message;
}

function renderBoard() {
  board.forEach((value, index) => {
    document.getElementsByClassName("cell")[index].textContent = value;
  });
}

function resetGame() {
  currentPlayer = "X";
  board = ["", "", "", "", "", "", "", "", ""];
  gameOver = false;
  displayMessage("");
  renderBoard();
  document.getElementById("game-mode").style.display = "block";
}
