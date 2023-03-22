const gameBoard = (function() {
 const moves = ['','','','','','','','','']
 let isGameOver = '';
 const continueBtn = document.getElementById("continueButton");
 const gameMsg = document.getElementById("gameMessage");  
 const player1active = document.getElementById("activeX");
 const player2active = document.getElementById("activeO");

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
isGameOver = '';
continueBtn.disabled = true;
player1active.innerHTML = '▷'
player2active.innerHTML = ''
gameMsg.innerHTML = 'PLAYER X\s TURN'
render();
}

const checkCell = (index) => {
  if (isGameOver === true) {
    return true
  }
  else if (moves[index] === '') return 'playOn';
}

const checkWinner = () => {
  if (moves[0] !== '' && moves[0] === moves[1] && moves[1] === moves[2]) return '012'
  else if (moves[3] !== '' && moves[3] === moves[4] && moves[4] === moves[5]) return '345'
  else if (moves[6] !== '' && moves[6] === moves[7] && moves[7] === moves[8]) return '678'
  else if (moves[0] !== '' && moves[0] === moves[3] && moves[3] === moves[6]) return '036'
  else if (moves[1] !== '' && moves[1] === moves[4] && moves[4] === moves[7]) return '147'
  else if (moves[2] !== '' && moves[2] === moves[5] && moves[5] === moves[8]) return '258'
  else if (moves[0] !== '' && moves[0] === moves[4] && moves[4] === moves[8]) return '048'
  else if (moves[2] !== '' && moves[2] === moves[4] && moves[4] === moves[6]) return '246'
  else return false
}

const checkTie = () => {
  if (moves.includes('')) return true
}

const updateCell = (cell,character) => {
    moves[cell] = character;
    render();
  
}

  return {
    render,
    clearBoard,
    checkCell,
    checkWinner,
    checkTie,
    updateCell,
    getIsGameOver: () => isGameOver,
    setIsGameOver: (value) => { isGameOver = value; },
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
  const continueBtn = document.getElementById("continueButton");
  const restartBtn = document.getElementById("restartButton");
  const gameMsg = document.getElementById("gameMessage");  
  const player1active = document.getElementById("activeX");
  const player2active = document.getElementById("activeO");



  

  const makeMove = (e) => {
    const theId = e.target.id;
    const selectedCell = theId.charAt(theId.length - 1)
    if (gameBoard.checkCell(selectedCell) === 'playOn') {
    gameBoard.updateCell(selectedCell,playerTurn)
      if (gameBoard.checkWinner() === false) {
        if (gameBoard.checkTie() === true) {
          if (playerTurn === 'X') {
            playerTurn = playerO.symbol;
            player2active.innerHTML = '▷'
            player1active.innerHTML = ''
            gameMsg.innerHTML = 'PLAYER O\s TURN'
          }
          else {playerTurn = playerX.symbol;
          player1active.innerHTML = '▷'
          player2active.innerHTML = ''
          gameMsg.innerHTML = 'PLAYER X\s TURN'
          }
      }
      else {
        ties.score = ties.score + 1;
        playerTurn = 'X';
        gameBoard.setIsGameOver(true);
        player2active.innerHTML = ''
        player1active.innerHTML = ''
        gameMsg.innerHTML = "IT'S A TIE!"
        continueBtn.disabled = false;
        gameBoard.render();
      }
    }
    else if (playerTurn === 'X') {
      playerX.score = playerX.score + 1;
      playerTurn = 'X';
      gameBoard.setIsGameOver(true);
      player1active.innerHTML = ''
      gameMsg.innerHTML = "PLAYER X WINS!!!"
      continueBtn.disabled = false;
      gameBoard.render();
    }
    else {
      playerO.score = playerO.score + 1;
      playerTurn = 'X';
      gameBoard.setIsGameOver(true);
      player2active.innerHTML = ''
      gameMsg.innerHTML = "PLAYER O WINS!!!"
      continueBtn.disabled = false;
      gameBoard.render();
    }

    }
    
}   

const clearScore = () => {
  ties.score = 0;
  playerX.score = 0;
  playerO.score = 0;
}

continueBtn.addEventListener("click", gameBoard.clearBoard)
restartBtn.addEventListener("click", () => {    
  clearScore();    
  gameBoard.clearBoard();
})


return {
     makeMove,
   }

  })()

const test = () => {console.log('test')};
document.getElementById("board").addEventListener("click",playGame.makeMove);

