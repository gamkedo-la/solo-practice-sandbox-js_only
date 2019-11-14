const KEY_UP_ARROW = 38;
const KEY_SPACE = 32;

let canvas, canvasContext;
const CANVAS_HEIGHT = 600;
const CANVAS_WIDTH = 800;

let player = new Player();
let obstacles = [];
const floor = CANVAS_HEIGHT - player.height;
let frameCount = 0;

function handleInput(e) {
  e.preventDefault();

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
  afterSomeTimeAddObs();
  moveEverything();
  drawEverything();
}

function moveEverything() {
  applyGravityToPlayer();

  // Move obstacles
  for (let i = 0; i < obstacles.length; i++) {
    obstacles[i].move();
  }
}

function drawEverything() {
  // Clear screen
  drawRect(0, 0, canvas.width, canvas.height, 'black');

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

function drawRect(x, y, w, h, color) {
  canvasContext.fillStyle = color;
  canvasContext.fillRect(x, y, w, h);
}

function randomRange(myMin, myMax) {
  return Math.floor(Math.random() * (myMax - myMin)) + myMin;
}
