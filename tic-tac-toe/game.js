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

var modal = document.getElementById('winner-modal');

var close_button = document.querySelector(".close-button");

var game_completed = false;


function toggleModal() {
  modal.classList.toggle("show-modal");
}

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

    if (player_turn == PLAYER_1 && game_completed == false) {
      var x = document.createElement("IMG");
      x.setAttribute("src", "x.jpg");
      x.setAttribute("width", "190");
      x.setAttribute("height", "190");
      this.appendChild(x);

      game_board[row][column] = 'X';

      if (hasWonGame(game_board, player_turn)) {
        game_completed = true;
        setTimeout(function() {
          toggleModal();
          $('.container').fireworks();
          document.getElementById("winner-text").innerHTML = 'Player 1 has won!';
        }, 100)
      }

      player_turn = PLAYER_2;
    } else {
      if(game_completed == false) {
        var x = document.createElement("IMG");
        x.setAttribute("src", "o.jpg");
        x.setAttribute("width", "190");
        x.setAttribute("height", "190");
        this.appendChild(x);
        game_board[row][column] = 'O';

        if (hasWonGame(game_board, player_turn)) {
          game_completed = true;
          setTimeout(function() {
            toggleModal();
            $('.container').fireworks();
            document.getElementById("winner-text").innerHTML = 'Player 2 has won!';
          }, 100)
        }

        player_turn = PLAYER_1;
      }
    }
  })
}

function windowOnClick(event) {
  if (event.target == modal) {
    toggleModal();
  }
}

close_button.addEventListener("click", toggleModal);
window.addEventListener("click", windowOnClick);

