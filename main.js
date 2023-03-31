const gameBoard = (function () {
  const moves = ['', '', '', '', '', '', '', '', ''];
  let isGameOver = '';
  let winningDetails = [];
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

  const emptyIndexes = moves.reduce((acc, curr, index) => {
    if (curr === '') {
      acc.push(index);
    }
    return acc;
  }, []);

  const findRandomEmptyIndex = (moves) => {
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

  const checkWinner = (board) => {
    if (board[0] !== '' && board[0] === board[1] && board[1] === board[2])
      return '012';
    else if (board[3] !== '' && board[3] === board[4] && board[4] === board[5])
      return '345';
    else if (board[6] !== '' && board[6] === board[7] && board[7] === board[8])
      return '678';
    else if (board[0] !== '' && board[0] === board[3] && board[3] === board[6])
      return '036';
    else if (board[1] !== '' && board[1] === board[4] && board[4] === board[7])
      return '147';
    else if (board[2] !== '' && board[2] === board[5] && board[5] === board[8])
      return '258';
    else if (board[0] !== '' && board[0] === board[4] && board[4] === board[8])
      return '048';
    else if (board[2] !== '' && board[2] === board[4] && board[4] === board[6])
      winningDetails = [2, 4, 6, board[6]];
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
    getAllEmptyIndex: () => emptyIndexes(),
    getIsGameOver: () => isGameOver,
    getMoves: () => moves,
    getWinner: () => winningDetails,
    setIsGameOver: (value) => {
      isGameOver = value;
    },
  };
})();

const player = (aiMode, symbol, score, turn) => {
  return { aiMode, symbol, score, turn };
};

const playerX = player('', 'X', 0, true);
const playerO = player('', 'O', 0, false);
const ties = player('', '', 0);

gameBoard.render();

const playGame = (function () {
  const continueBtn = document.getElementById('continueButton');
  const restartBtn = document.getElementById('restartButton');
  const gameMsg = document.getElementById('gameMessage');
  const player1active = document.getElementById('activeX');
  const player2active = document.getElementById('activeO');
  let selectedCell = '';

  const setMove = (e) => {
    const theId = e.target.id;
    selectedCell = theId.charAt(theId.length - 1);
  };

  const makeMove = () => {
    if (gameBoard.checkCell(selectedCell) === 'playOn') {
      if (playerX.turn === true) {
        gameBoard.updateCell(selectedCell, playerX.symbol);
      } else gameBoard.updateCell(selectedCell, playerO.symbol);

      if (gameBoard.checkWinner(gameBoard.getMoves()) === false) {
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

  const updatePlayerAI = (aiSelected) => {
    playerO.aiMode = aiSelected;
  };

  const clearScore = () => {
    ties.score = 0;
    playerX.score = 0;
    playerO.score = 0;
  };

  continueBtn.addEventListener('click', gameBoard.clearBoard);
  restartBtn.addEventListener('click', () => {
    clearScore();
    gameBoard.clearBoard();
  });

  return {
    setMove,
    makeMove,
    updatePlayerAI,
  };
})();

const test = () => {
  console.log('test');
};

//minimax algo for letting AI choose the best move, this is called from the play game module and returns a cell number
const minimax = (newBoard, player) => {
  let availSpots = gameBoard.getAllEmptyIndex();

  if (checkWin(newBoard) !== false && gameBoard.getWinner[4] === 'X') {
    return { score: -10 };
  } else if (checkWin(newBoard) !== false && gameBoard.getWinner[4] === 'O') {
    return { score: 10 };
  } else if (availSpots.length === 0) {
    return { score: 0 };
  }
  var moves = [];
  for (var i = 0; i < availSpots.length; i++) {
    var move = {};
    move.index = newBoard[availSpots[i]];
    newBoard[availSpots[i]] = player;

    if (player == aiPlayer) {
      var result = minimax(newBoard, huPlayer);
      move.score = result.score;
    } else {
      var result = minimax(newBoard, aiPlayer);
      move.score = result.score;
    }

    newBoard[availSpots[i]] = move.index;

    moves.push(move);
  }

  var bestMove;
  if (player === aiPlayer) {
    var bestScore = -10000;
    for (var i = 0; i < moves.length; i++) {
      if (moves[i].score > bestScore) {
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  } else {
    var bestScore = 10000;
    for (var i = 0; i < moves.length; i++) {
      if (moves[i].score < bestScore) {
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  }

  return moves[bestMove];
};

//used for ai setting buttons
const specialGlowButtons = document.querySelectorAll('.special-glow-button');

specialGlowButtons.forEach((button) => {
  button.addEventListener('click', () => {
    specialGlowButtons.forEach((btn) => {
      btn.classList.remove('active');
    });
    button.classList.add('active');
  });
});

//listeners for triggering functions
document.getElementById('board').addEventListener('click', playGame.setMove);
document.getElementById('board').addEventListener('click', playGame.makeMove);
document
  .getElementById('easyAI')
  .addEventListener('click', () => playGame.updatePlayerAI('easy'));
document
  .getElementById('Human')
  .addEventListener('click', () => playGame.updatePlayerAI('human'));
document
  .getElementById('hardAI')
  .addEventListener('click', () => playGame.updatePlayerAI('hard'));
