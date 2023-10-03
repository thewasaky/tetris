// 1 - constantes de tablero y obtenemos el canvas y el contexto
const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");
const puntuacion = document.querySelector("span");
const start = document.querySelector("section");
const audio = new Audio("tetris.mp3");
const BLOCK_SIZE = 20;
const BOARD_WIDTH = 14;
const BOARD_HEIGHT = 30;

canvas.width = BLOCK_SIZE * BOARD_WIDTH;
canvas.height = BLOCK_SIZE * BOARD_HEIGHT;

context.scale(BLOCK_SIZE, BLOCK_SIZE);
//9 - random pieces
const pieces = [
    [
        [1, 1],
        [1, 1],
    ],
    [
        [1, 1, 1,1]
    ],
    [
        [0,1,0],
        [1,1,1],
    ],
    [
        [1,1,0],
        [0,1,1],
    ],
    [
        [1,0],
        [1,0],
        [1,1],
    ],
    [
        [0,1,1],
        [1,1,0],
    ],
    [
        [1,1,1],
        [0,1,0],
    ],
    [
        [0,1],
        [0,1],
        [1,1],
    ],
];

const colors = [
    "red",
    "green",
    "blue",
    "yellow",
    "purple",
    "orange",
    "pink",
    "cyan",
]
// 4 - pieza
const piece = {
    position: { x: 0, y: 0 },
    shape: pieces[Math.floor(Math.random() * pieces.length)],
    color: colors[Math.floor(Math.random() * colors.length)],
};



// 3 - tablero
const board = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];

function drawBoard() {
    return Arra
}

let dropCounter = 0;
let lastTime = 0;
let score=0;
// 2 - loop de juego
function update(time = 0) {
  const deltaTime = time - lastTime;
  lastTime = time;

  dropCounter += deltaTime;
  if (dropCounter > 500) {
    piece.position.y++;
    if(checkCollision()){
        piece.position.y--;
        solidify();
        removeRows();
        piece.position.x = 0;
        piece.position.y = 0;

    }
    dropCounter = 0;

  }
  draw();
  requestAnimationFrame(update);
}

function draw() {
  context.fillStyle = "#000";
  context.fillRect(0, 0, canvas.width, canvas.height);
  board.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value == 1) {
        context.fillStyle = "yellow";
        context.fillRect(x, y, 1, 1);
      }
    });
  });
  piece.shape.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value == 1) {
        context.fillStyle = piece.color;
        context.fillRect(x + piece.position.x, y + piece.position.y, 1, 1);
      }
    });
  });
}

//5 - movimiento
window.addEventListener("keydown", (event) => {
  if (event.key == "ArrowLeft") {
    piece.position.x--;
    if (checkCollision()) piece.position.x++;
  }
  if (event.key == "ArrowRight") {
    piece.position.x++;
    if (checkCollision()) piece.position.x--;
  }
  if (event.key == "ArrowDown") {
    piece.position.y++;
    if (checkCollision()) {
      piece.position.y--;
      solidify();
      removeRows();

      //set random piece
      piece.shape = pieces[Math.floor(Math.random() * pieces.length)];


      piece.position.x = Math.floor(Math.random() * (BOARD_WIDTH - piece.shape[0].length));
      piece.position.y = 0;
      piece.color = colors[Math.floor(Math.random() * colors.length)];
      if(checkCollision()){
            window.alert("Game Over");
            score = 0;
            board.forEach(row => row.fill(0));
      }
    }
  }
  if (event.key == "ArrowUp") {
    rotatePiece();
  }
});

// 6 - check collision
function checkCollision() {
  return piece.shape.find((row, y) => {
    return row.find((value, x) => {
      return (
        value !== 0 && board[y + piece.position.y]?.[x + piece.position.x] !== 0
      );
    });
  });
}

// 7 - solidify piece
function solidify() {
  piece.shape.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value !== 0) {
        board[y + piece.position.y][x + piece.position.x] = value;
      }
    });
  });
}

function rotatePiece(){
    //rotate piece clockwise
    const rotatedPiece = [];
    for(let i = 0; i < piece.shape[0].length; i++){
        const row  = piece.shape.map((val) => val[i]).reverse();
        rotatedPiece.push(row);
    }
    const previousShape = piece.shape;
    piece.shape = rotatedPiece;
    if(checkCollision()){
        piece.shape = previousShape;
    }
}

//8 - delete row if full
function removeRows() {
  const rowsToRemove = [];
  board.forEach((row, y) => {
    if (row.every((value) => value !== 0)) {
      rowsToRemove.push(y);
    }
  });
  rowsToRemove.forEach((rowIndex) => {
    board.splice(rowIndex, 1);
    const newRow = Array(BOARD_WIDTH).fill(0);
    board.unshift(newRow);
  });
  if(rowsToRemove.length > 0)
    puntuacion.textContent = (score+=10);
}


start.addEventListener("click", () => {
  update();
  start.style.display = "none";
    audio.play();
    audio.loop = true;
    audio.volume = 0.2;
});

