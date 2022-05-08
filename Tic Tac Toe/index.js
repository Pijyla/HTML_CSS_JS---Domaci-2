//Variables(constants) needed

const X_CLASS = "x";
const CIRCLE_CLASS = "o";
const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
const cellElements = document.querySelectorAll("[data-cell]");
const whoIsNext = document.getElementById("status");
const board = document.getElementById("game-grid");
const winningMessageElement = document.getElementById("winningMessage");
const restartButton = document.getElementById("reset");
const winningMessageTextElement = document.querySelector(
  "[data-winning-message-text]"
);
let circleTurn;
//starts the game
startGame();
//add event listener to restart button
restartButton.addEventListener("click", startGame);

//start game function
function startGame() {
  circleTurn = false;
  cellElements.forEach((cell) => {
    cell.classList.remove(X_CLASS);
    cell.classList.remove(CIRCLE_CLASS);
    cell.removeEventListener("click", handleClick);
    cell.addEventListener("click", handleClick, { once: true });
  });

  winningMessageTextElement.innerText = "";
  whoIsNext.innerText = "X's turn";
}
//marks the cell depending on whose turn it is
function placeMark(cell, currentClass) {
  cell.classList.add(currentClass);
}
//function for clicking on cells
function handleClick(e) {
  const cell = e.target;
  const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS;
  if (circleTurn) {
    whoIsNext.innerText = "X's turn";
  } else {
    whoIsNext.innerText = "O's turn";
  }
  placeMark(cell, currentClass);

  if (checkWin(currentClass)) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    swapTurns();
  }
}
//function that ends the game
function endGame(draw) {
  if (draw) {
    winningMessageTextElement.innerText = "Draw!";

    setTimeout(function () {
      alert("Draw!");
    }, 500);
  } else {
    winningMessageTextElement.innerText = `${circleTurn ? "O's" : "X's"} Wins!`;

    setTimeout(function () {
      alert(`${circleTurn ? "O's" : "X's"} Wins!`);
    }, 500);
  }

  cellElements.forEach((cell) => {
    cell.removeEventListener("click", handleClick);
  });
  setTimeout(function () {
    startGame();
  }, 500);
}
//checks if its a draw
function isDraw() {
  return [...cellElements].every((cell) => {
    return (
      cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
    );
  });
}

//changes whose turn it is
function swapTurns() {
  circleTurn = !circleTurn;
}
//check for win combo
function checkWin(currentClass) {
  return WINNING_COMBINATIONS.some((combination) => {
    return combination.every((index) => {
      return cellElements[index].classList.contains(currentClass);
    });
  });
}