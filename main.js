//create an array called gameBoard, this array has a fixed length of 9 0,1,2,3,4,5,6,7,8 the array is stored in a module, the module creates renders the gameBoard into the divs in the html. each div will be associated to a gameBoard array array number, it will have an exposed function that is called to update the array, we'll call this function "play" when called gameBoard.play() another function in the gameBoard will be "clear" gameBoard.clear() this will be used when a game is started. The last function will be to retrieve the content of any specific array in the gameBoard array this will be called from the game module so that it can check if a array is populated and also used for checking if there is a winner.

// gameboard renders the gameboard
const gameBoard = (function() {
 const moves = ['','','','X','X','X','','','']

const render = () => {
  const board = document.getElementById("board");
  let htmlString ='';
  for (let i = 0; i < 9; i++) {
    htmlString += `<div class="cell" id="cell${i}">${moves[i]}</div>`;
}
board.innerHTML = htmlString
}

const clearBoard = () => {
  for(let i=0;i<moves.length;i++)
{
    moves[i] = '';
}
}

const checkCell = () => {
  if (moves[cell] === '') return false
}

const checkWinner = () => {
  if (moves[0] !== '' && moves[0] === moves[1] && moves[1] === moves[2]) return moves [0]
  else if (moves[3] !== '' && moves[3] === moves[4] && moves[4] === moves[5]) return moves [3]
  else if (moves[6] !== '' && moves[6] === moves[7] && moves[7] === moves[8]) return moves [6]
  else if (moves[0] !== '' && moves[0] === moves[3] && moves[3] === moves[6]) return moves [0]
  else if (moves[1] !== '' && moves[1] === moves[4] && moves[4] === moves[7]) return moves [1]
  else if (moves[2] !== '' && moves[2] === moves[5] && moves[5] === moves[8]) return moves [2]
  else if (moves[0] !== '' && moves[0] === moves[4] && moves[4] === moves[7]) return moves [0]
  else if (moves[2] !== '' && moves[2] === moves[4] && moves[4] === moves[6]) return moves [2]
  else if (moves.includes('')) return 'playOn'
}

const updateCell = (cell,character) => {
  if (moves[cell] === '') {
    moves[cell] = character;
    render();
  }
}

  return {
    render,
    clearBoard,
    checkCell,
    checkWinner,
    updateCell,
  }

})()

gameBoard.render();




const playGame = (function() {
  let playerCharacter = "X"
  const cellGroup = document.getElementById("board");

  const checkWinner = () => {

  }

  const cellPressed = e => {
    theId = e.target.id;
    lastChar = theId.charAt(theId.length - 1);
    gameBoard.updateCell(lastChar,playerCharacter)
    
}  
cellGroup.addEventListener('click',cellPressed)
  

})()








//game module will have the following function.
// make Move
// checkboard
// checkwinner
// when a player clicks on a div, get the div ID, check the associated gameboard array to make sure it is free to populate the gameboard, if it is not, do nothing, if it is, update the gameboard array calling gameBoard.play(), then check to see if there is a winner by iterating though winning combinations 
// need a function to control who's turn it is... is this done in game or player 
//game module is to be wrapped in a loop that tracks the score until one player has won 3 games, once done, game over


//player factory function
//a player has a name, a character (x or o) and a score
// it has the following functions
// update score
