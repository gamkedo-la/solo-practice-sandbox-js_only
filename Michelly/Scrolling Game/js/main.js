const KEY_UP_ARROW = 38;
const KEY_SPACE = 32;

let canvas, canvasContext;
const CANVAS_HEIGHT = 600;
const CANVAS_WIDTH = 800;
const distFromLeftEdge = 100;

let player = new Player();
let obstacle = new Obstacle();

const floor = CANVAS_HEIGHT - player.height;

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
  moveEverything();
  drawEverything();
}

function moveEverything() {
  applyGravity();
  obstacleOffscreen();
}

function applyGravity() {
  const gravity = 1.5;

  if (player.y < floor) {
    player.y += gravity;
  }
}

function drawEverything() {
  // Clear screen
  drawRect(0, 0, canvas.width, canvas.height, 'black');

  // Save current canvas state
  canvasContext.save();

  // Translate canvas origin
  canvasContext.translate(-player.x + distFromLeftEdge, 0);

  // Draw obstacles
  obstacle.draw();

  // Draw player
  player.draw();

  // Restore canvas to previously saved state
  canvasContext.restore();

  // console.log(player.x, obstacle.x, player.x + distFromLeftEdge);
}

function drawRect(x, y, w, h, color) {
  canvasContext.fillStyle = color;
  canvasContext.fillRect(x, y, w, h);
}
