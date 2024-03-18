const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGamebtn = document.querySelector(".btn");
// Decide the current Turn
let currentPlayer;
let gameGrid;

// All possible combinations for winning
const winningPostions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// Start The Game
function initGame() {
  currentPlayer = "X";
  gameGrid = ["", "", "", "", "", "", "", "", ""];
  //ui pr empty nhi karna padega boxes ko
  boxes.forEach(( box, index ) => {
    box.innerText = "";
    boxes[index].style.pointerEvents = "all";
    //green color ko bhi remove karna he
    //initalise box with css protperies again
    box.classList =`box box${index+1}`;
  })
  newGamebtn.classList.remove("active");
  gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

// // Switch player turn on click
function swapTurn() {
  if (currentPlayer === "X") {
    currentPlayer = "O";
  } else {
    currentPlayer = "X";
  }
  gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

// // Event listener
function handleClick(index) {
  // Make sure only, Empty cells are filled
  if (gameGrid[index] === "") {
    boxes[index].style.pointerEvents = "none";
    boxes[index].innerText = currentPlayer;
    gameGrid[index] = currentPlayer;
    swapTurn();
    checkGameOver();
  }
}

// // Check if game is over
function checkGameOver() {
  let answer = "";
  winningPostions.forEach((position) => {
    if (
      (gameGrid[position[0]] !== "" ||
        gameGrid[position[1]] !== "" ||
        gameGrid[position[2]] !== "") &&
      gameGrid[position[0]] === gameGrid[position[1]] &&
      gameGrid[position[1]] === gameGrid[position[2]]
    ) {
      //disable pointer events
      boxes.forEach((box) => {
        box.style.pointerEvents = "none";
      });
      //check if winner is x
      if (gameGrid[position[0]] === "X") answer = "X";
      else answer = "Y";
      boxes[position[0]].classList.add("win");
      boxes[position[1]].classList.add("win");
      boxes[position[2]].classList.add("win");
    }
  });
  //  We Have A Winner 
  if (answer !== "") {
    gameInfo.innerText = `Winner Player - ${answer}`;
    newGamebtn.classList.add("active");
    return;
  }
  let boardFilled = true;
  gameGrid.forEach((box) => {
    if (box === "") boardFilled = false;
  });

  // Board is filled, but game is tie
  let fillCount = 0;
  gameGrid.forEach((box)=>{
    if(box!=="")
  {
    fillCount++;
  }

  //board is filled,game is TIE
  if(fillCount === 9)
  {
    gameInfo.innerText = "Game Tied !";
    newGamebtn.classList.add("active");
  }
  })

  // if (boardFilled) {
  //   gameInfo.innerText = "Game Tied !";
  //   newGamebtn.classList.add("active");
  //   return;
  // }
}

// // adding event listeners
boxes.forEach((box, index) => {
  box.addEventListener("click", () => {
    handleClick(index);
  });
});

initGame();

newGamebtn.addEventListener("click", initGame);
