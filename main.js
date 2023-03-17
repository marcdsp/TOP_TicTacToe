//create an array called gameBoard, this array has a fixed length of 9 0,1,2,3,4,5,6,7,8 the array is stored in a module, the module creates renders the gameBoard into the divs in the html. each div will be associated to a gameBoard array array number, it will have an exposed function that is called to update the array, we'll call this function "play" when called gameBoard.play() another function in the gameBoard will be "clear" gameBoard.clear() this will be used when a game is started. The last function will be to retrieve the content of any specific array in the gameBoard array this will be called from the game module so that it can check if a array is populated and also used for checking if there is a winner.

// gameboard renders the gameboard
const gameBoard = (function() {
 const moves = ['','','','','','','','','']

const render = () => {
  const board = document.getElementById("board");
  const playerXScore = document.getElementById("player1Score");
  const tiesScore = document.getElementById("tiedScore");
  const playerOScore = document.getElementById("player2Score");
  let htmlString ='';
  for (let i = 0; i < 9; i++) {
    htmlString += `<div class="cell" id="cell${i}">${moves[i]}</div>`;
}
board.innerHTML = htmlString;
playerXScore.innerHTML = playerX.score;
tiesScore.innerHTML = ties.score;
playerOScore.innerHTML = playerO.score;
}

const clearBoard = () => {
  for(let i=0;i<moves.length;i++)
{
    moves[i] = '';
}
}

const checkCell = (index) => {
  if (moves[index] === '') return 'playOn';
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
  else return false
}

const checkTie = () => {
  if (moves.includes('')) return true
}

const updateCell = (cell,character) => {
    moves[cell] = character;
    render();
  
}

const updateScoreboard = (character) => {
  const score =[
    {
      "player": this.player
    }
  ]

}

  return {
    render,
    clearBoard,
    checkCell,
    checkWinner,
    checkTie,
    updateCell,
  }

})()



const player = (name, symbol, score) => {
  return { name, symbol, score};
};

const playerX = player('shingi', 'X', 0);
const playerO = player('Marclar', 'O', 0);
const ties = player('', '', 0);

gameBoard.render();

const playGame = (function() {
  let playerTurn = 'X'

  const makeMove = (e) => {
    const theId = e.target.id;
    const selectedCell = theId.charAt(theId.length - 1)
    if (gameBoard.checkCell(selectedCell) === 'playOn') {
    gameBoard.updateCell(selectedCell,playerTurn)
      if (gameBoard.checkWinner() === false) {
        if (gameBoard.checkTie() === true) {
          if (playerTurn === 'X') {
            playerTurn = playerO.symbol;
          }
          else playerTurn = playerX.symbol;
      }
    }
    else if (gameBoard.checkWinner() === playerX.symbol) {
      playerX.score = playerX.score + 1
    }

    }
}   



return {
     makeMove,
   }

  })()

const test = () => {console.log('test')};
document.getElementById("board").addEventListener("click",playGame.makeMove);








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
