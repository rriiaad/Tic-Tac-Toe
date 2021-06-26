class Game {
  constructor() {
    this.win = false;
    this.turn = "X";
    this.board = new Array(9).fill(null);
  }

  nextTurn() {
    if (this.win === true) {
      return;
    }
    if (this.turn == "X") {
      this.turn = "O";
    } else {
      this.turn = "X";
    }
  }

  makeMove(i) {
    if (this.win === true) {
      return;
    }
    if (this.board[i]) {
      return;
    }
    this.board[i] = this.turn;
    this.findWinningCombinations();
  }
  findWinningCombinations() {
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [6, 4, 2],
    ];
    for (const combinations of winningCombinations) {
      const [a, b, c] = combinations;
      if (
        this.board[a] == "X" &&
        this.board[c] == "X" &&
        this.board[b] == "X"
      ) {
        this.win = true;

        document
          .querySelector(`.board-tile[data-index='${a}']`)
          .classList.add("win");
        document
          .querySelector(`.board-tile[data-index='${b}']`)
          .classList.add("win");
        document
          .querySelector(`.board-tile[data-index='${c}']`)
          .classList.add("win");
      }
      if (
        this.board[a] == "O" &&
        this.board[c] == "O" &&
        this.board[b] == "O"
      ) {
        this.win = true;
        document
          .querySelector(`.board-tile[data-index='${a}']`)
          .classList.add("win");
        document
          .querySelector(`.board-tile[data-index='${b}']`)
          .classList.add("win");
        document
          .querySelector(`.board-tile[data-index='${c}']`)
          .classList.add("win");
      }
    }
  }
}

class GameView {
  constructor() {}

  update(game) {
    for (let i = 0; i < game.board.length; i++) {
      const tile = document.querySelector(`.board-tile[data-index='${i}']`);
      tile.textContent = game.board[i];
    }
  }
  display(game) {
    if (game.turn === "X") {
      document.querySelector(".player-X").classList.add("turnX");
      document.querySelector(".player-O").classList.remove("turnO");
    }
    if (game.turn === "O") {
      document.querySelector(".player-O").classList.add("turnO");
      document.querySelector(".player-X").classList.remove("turnX");
    }
  }
  color(game, i) {
    console.log(game.board[i]);
    if (game.board[i] == "X") {
      document
        .querySelector(`.board-tile[data-index='${i}']`)
        .classList.add("X");
    }
    if (game.board[i] == "O") {
      document
        .querySelector(`.board-tile[data-index='${i}']`)
        .classList.add("O");
    }
  }
}

let game = new Game();
let gameView = new GameView();

gameView.update(game);

let tiles = Array.from(document.querySelectorAll(".board-tile"));

tiles.forEach((tile) => {
  tile.addEventListener("click", () => {
    onTileClick(tiles.indexOf(tile));
  });
});

function onTileClick(i) {
  game.makeMove(i);
  gameView.update(game);
  game.nextTurn();
  gameView.display(game);
  gameView.color(game, i);
}

document.querySelector(".restart").addEventListener("click", () => {
  let nextGame = game.turn;
  game = new Game();
  gameView = new GameView();
  gameView.update(game);
  tiles.forEach((tile) => {
    tile.classList.remove("win");
    tile.classList.remove("O");
    tile.classList.remove("X");
  });
  if (nextGame === "O") {
    game.turn = "X";
  }
  if (nextGame === "X") {
    game.turn = "O";
  }
  gameView.display(game);
});
