const gameBoard = (function () {
  const moves = ['', '', '', '', '', '', '', '', ''];
  let isGameOver = '';
  const continueBtn = document.getElementById('continueButton');
  const gameMsg = document.getElementById('gameMessage');
  const player1active = document.getElementById('activeX');
  const player2active = document.getElementById('activeO');

  const render = () => {
    const board = document.getElementById('board');
    const playerXScore = document.getElementById('player1Score');
    const tiesScore = document.getElementById('tiedScore');
    const playerOScore = document.getElementById('player2Score');
    let htmlString = '';
    for (let i = 0; i < 9; i++) {
      htmlString += `<div class="cell" id="cell${i}">${moves[i]}</div>`;
    }
    board.innerHTML = htmlString;
    playerXScore.innerHTML = playerX.score;
    tiesScore.innerHTML = ties.score;
    playerOScore.innerHTML = playerO.score;
  };

  const clearBoard = () => {
    for (let i = 0; i < moves.length; i++) {
      moves[i] = '';
    }
    isGameOver = '';
    continueBtn.disabled = true;
    player1active.innerHTML = '▷';
    player2active.innerHTML = '';
    gameMsg.innerHTML = 'PLAYER Xs TURN';
    render();
  };

  const findRandomEmptyIndex = (moves) => {
    const emptyIndexes = moves.reduce((acc, curr, index) => {
      if (curr === '') {
        acc.push(index);
      }
      return acc;
    }, []);

    if (emptyIndexes.length === 0) {
      return null; // no empty indexes
      console.log('board full');
    }

    const randomIndex = Math.floor(Math.random() * emptyIndexes.length);
    return emptyIndexes[randomIndex];
  };

  const checkCell = (index) => {
    if (isGameOver === true) {
      return true;
    } else if (moves[index] === '') return 'playOn';
  };

  const checkWinner = () => {
    if (moves[0] !== '' && moves[0] === moves[1] && moves[1] === moves[2])
      return '012';
    else if (moves[3] !== '' && moves[3] === moves[4] && moves[4] === moves[5])
      return '345';
    else if (moves[6] !== '' && moves[6] === moves[7] && moves[7] === moves[8])
      return '678';
    else if (moves[0] !== '' && moves[0] === moves[3] && moves[3] === moves[6])
      return '036';
    else if (moves[1] !== '' && moves[1] === moves[4] && moves[4] === moves[7])
      return '147';
    else if (moves[2] !== '' && moves[2] === moves[5] && moves[5] === moves[8])
      return '258';
    else if (moves[0] !== '' && moves[0] === moves[4] && moves[4] === moves[8])
      return '048';
    else if (moves[2] !== '' && moves[2] === moves[4] && moves[4] === moves[6])
      return '246';
    else return false;
  };

  const checkTie = () => {
    if (moves.includes('')) return true;
  };

  const updateCell = (cell, character) => {
    moves[cell] = character;
    render();
  };

  return {
    render,
    clearBoard,
    checkCell,
    checkWinner,
    checkTie,
    updateCell,
    getRandomEmptyIndex: () => findRandomEmptyIndex(moves),
    getIsGameOver: () => isGameOver,
    setIsGameOver: (value) => {
      isGameOver = value;
    },
  };
})();

const player = (aiMode, symbol, score, turn) => {
  return { aiMode, symbol, score, turn };
};

const playerX = player('', 'X', 0, true);
const playerO = player('easy', 'O', 0, false);
const ties = player('', '', 0);

gameBoard.render();

const playGame = (function () {
  const continueBtn = document.getElementById('continueButton');

  const restartBtn = document.getElementById('restartButton');
  const gameMsg = document.getElementById('gameMessage');
  const player1active = document.getElementById('activeX');
  const player2active = document.getElementById('activeO');
  let selectedCell = '';

  const setMove = (e, aiMove) => {
    const theId = e.target.id;
    selectedCell = theId.charAt(theId.length - 1);
  };

  const makeMove = () => {
    if (gameBoard.checkCell(selectedCell) === 'playOn') {
      if (playerX.turn === true) {
        gameBoard.updateCell(selectedCell, playerX.symbol);
      } else gameBoard.updateCell(selectedCell, playerO.symbol);

      if (gameBoard.checkWinner() === false) {
        if (gameBoard.checkTie() === true) {
          if (playerX.turn === true) {
            playerX.turn = false;
            playerO.turn = true;
            player2active.innerHTML = '▷';
            player1active.innerHTML = '';
            gameMsg.innerHTML = 'PLAYER Os TURN';
            if (playerO.aiMode === 'easy') {
              selectedCell = gameBoard.getRandomEmptyIndex();
              makeMove();
            } else {
            }
          } else {
            playerX.turn = true;
            playerO.turn = false;
            player1active.innerHTML = '▷';
            player2active.innerHTML = '';
            gameMsg.innerHTML = 'PLAYER Xs TURN';
            if (playerX.aiMode === 'easy') {
              selectedCell = gameBoard.getRandomEmptyIndex();
              makeMove();
            } else {
            }
          }
        } else {
          ties.score = ties.score + 1;
          playerX.turn = true;
          playerO.turn = false;
          gameBoard.setIsGameOver(true);
          player2active.innerHTML = '';
          player1active.innerHTML = '';
          gameMsg.innerHTML = "IT'S A TIE!";
          continueBtn.disabled = false;
          gameBoard.render();
        }
      } else if (playerX.turn === true) {
        playerX.score = playerX.score + 1;
        gameBoard.setIsGameOver(true);
        player1active.innerHTML = '';
        gameMsg.innerHTML = 'PLAYER X WINS!!!';
        continueBtn.disabled = false;
        gameBoard.render();
      } else {
        playerO.score = playerO.score + 1;
        playerX.turn = true;
        playerO.turn = false;
        gameBoard.setIsGameOver(true);
        player2active.innerHTML = '';
        gameMsg.innerHTML = 'PLAYER O WINS!!!';
        continueBtn.disabled = false;
        gameBoard.render();
      }
    }
  };

  const updateOai = (aiSelected) => {
    playerO.aiMode = aiSelected;
  };

  const clearScore = () => {
    ties.score = 0;
    playerX.score = 0;
    playerO.score = 0;
  };

  const playerXai = () => {};

  continueBtn.addEventListener('click', gameBoard.clearBoard);
  restartBtn.addEventListener('click', () => {
    clearScore();
    gameBoard.clearBoard();
  });

  return {
    setMove,
    makeMove,
  };
})();

const test = () => {
  console.log('test');
};
document.getElementById('board').addEventListener('click', playGame.setMove);
document.getElementById('board').addEventListener('click', playGame.makeMove);
