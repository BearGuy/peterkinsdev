const PLAYER_1 = "PLAYER_1";
const PLAYER_2 = "PLAYER_2";

var player_turn = PLAYER_1;

const game_board = [
  ['', '', ''],
  ['', '', ''],
  ['', '', ''],
]

const game_board_elem = document.getElementById('game-board');

var cells = document.getElementsByClassName('game-board-cell');

// boolean
function hasWonGame(game_board, player) {
  var char = '';

  if (player === PLAYER_1) {
    char = 'X'
  } else {
    char = 'O'
  }

  for (let i = 0; i < 3; i++) {
    if (
      game_board[i][0] == char &&
      game_board[i][1] == char &&
      game_board[i][2] == char
    ) return true;

    if (
      game_board[0][i] == char &&
      game_board[1][i] == char &&
      game_board[2][i] == char
    ) return true;

    if (
      game_board[0][0] == char &&
      game_board[1][1] == char &&
      game_board[2][2] == char
    ) return true;

    if (
      game_board[2][0] == char &&
      game_board[1][1] == char &&
      game_board[0][2] == char
    ) return true;
  }

  return false;
}

for (var i = 0; i < cells.length; i++) {
  cells[i].addEventListener("click", function () {
    if (this.innerHTML !== '') return;

    var [row, column] = this.id.split('-');

    if (player_turn == PLAYER_1) {
      let p = document.createElement("p");
      p.innerHTML = "X";
      this.appendChild(p);

      game_board[row][column] = 'X';

      if (hasWonGame(game_board, player_turn)) {
        setTimeout(function() {
          alert(`${player_turn} has won the game!`);
        }, 100)
      }

      player_turn = PLAYER_2;
    } else {
      this.innerHTML = `<p>O</p>`;
      game_board[row][column] = 'O';

      if (hasWonGame(game_board, player_turn)) {
        setTimeout(function() {
          alert(`${player_turn} has won the game!`);
        }, 100)
      }

      player_turn = PLAYER_1;
    }
  })
}