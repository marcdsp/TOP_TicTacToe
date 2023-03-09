//create an array called gameBoard, this array has a fixed length of 9 0,1,2,3,4,5,6,7,8 the array is stored in a module, the module creates renders the gameBoard into the divs in the html. each div will be associated to a gameBoard array array number, it will have an exposed function that is called to update the array, we'll call this function "play" when called gameBoard.play() another function in the gameBoard will be "clear" gameBoard.clear() this will be used when a game is started. The last function will be to retrieve the content of any specific array in the gameBoard array this will be called from the game module so that it can check if a array is populated and also used for checking if there is a winner.

// gameboard renders the gameboard
const gameBoard = (function() {
 const moves = ['','','','','','','','','']

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

const updateCell = (cell,character) => {
  if (moves[cell] === '') {
    moves[cell] = character;
    render();
  }
}

  return {
    render,
    clearBoard,
    updateCell,
  }

})()

gameBoard.render();




const playGame = (function() {
  let playerCharacter = "X"


  const makeMove = () => {
    if (gameBoard.updateCell(this.id.splice(-1),playerCharacter) !== false) { 
      if (playerCharacter === "X") {
        playerCharacter = "O"}
        playerCharacter = "X"
      }}
return {
  makeMove: makeMove
}  
  
})()


const cells = document.querySelector('.cell');
cells.addEventListener('click', playGame.makeMove)





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
