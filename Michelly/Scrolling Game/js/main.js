const KEY_UP_ARROW = 38;
const KEY_SPACE = 32;

let canvas, canvasContext;
const CANVAS_HEIGHT = 600;
const CANVAS_WIDTH = 800;

let player = new Player();
let obstacles = [];
let frameCount = 0;
let gameOver = false;
let score = 0;
let addPoint = false;

let highestScore = JSON.parse(localStorage.getItem('highestScore')) || 0;

const floor = CANVAS_HEIGHT - player.height;

function handleInput(e) {
  e.preventDefault();

  if (gameOver && e.keyCode === KEY_SPACE) {
    gameOver = false;
    resetGame();
    return;
  }

  if (e.keyCode === KEY_UP_ARROW || e.keyCode === KEY_SPACE) {
    player.move();
  }
}

window.onload = function() {
  canvas = document.querySelector('canvas');
  canvasContext = canvas.getContext('2d');
  canvas.width = CANVAS_WIDTH;
  canvas.height = CANVAS_HEIGHT;

  setInterval(update, 1000 / 30);

  document.addEventListener('keydown', handleInput);
};

function update() {
  if (gameOver) {
    gameOverScreen();
    return;
  }

  afterSomeTimeAddObs();
  moveEverything();
  drawEverything();
}

function moveEverything() {
  applyGravityToPlayer();

  if (obstacles.length >= 1) {
    collisionCheck();
  }

  // Move obstacles
  for (let i = 0; i < obstacles.length; i++) {
    obstacles[i].move();
  }
}

function drawEverything() {
  // Clear screen
  drawRect(0, 0, canvas.width, canvas.height, 'black');

  // Draw score
  colorText(`Score: ${score}`, 10, 15, 'white');

  // Draw obstacles
  for (let i = obstacles.length - 1; i >= 0; i--) {
    obstacles[i].draw();
    if (obstacles[i].obstacleOffscreen()) {
      obstacles.splice(i, 1);
    }
  }

  // Draw player
  player.draw();
}

function gameOverScreen() {
  // Clear screen
  drawRect(0, 0, canvas.width, canvas.height, 'black');

  // Draw text
  colorText('GAME OVER', canvas.width / 2 - 50, canvas.height / 2, 'white');
  colorText('Press SPACE to restart game', canvas.width / 2 - 80, canvas.height / 2 + 20, 'white');

  // Get the highest score from local storage
  highestScore = JSON.parse(localStorage.getItem('highestScore'));

  colorText(`Score: ${score}`, canvas.width / 2 - 35, canvas.height / 2 + 60, 'white');
  colorText(
    `Highest Score: ${highestScore}`,
    canvas.width / 2 - 55,
    canvas.height / 2 + 80,
    'white'
  );
}

function resetGame() {
  // Remove the obstacles from the game
  obstacles = [];

  // Reset score
  score = 0;
}

function checkHighestScore() {
  if (highestScore < score) {
    localStorage.setItem('highestScore', JSON.stringify(score));
  }
}

function drawRect(x, y, w, h, color) {
  canvasContext.fillStyle = color;
  canvasContext.fillRect(x, y, w, h);
}

function colorText(showWords, textX, textY, fillColor) {
  canvasContext.fillStyle = fillColor;
  canvasContext.fillText(showWords, textX, textY);
}

function randomRange(myMin, myMax) {
  return Math.floor(Math.random() * (myMax - myMin)) + myMin;
}
