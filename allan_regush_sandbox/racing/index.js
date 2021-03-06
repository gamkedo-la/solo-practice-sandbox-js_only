const canvas = document.getElementById('gameCanvas');
const canvasWidth  = canvas.width;
const canvasHeight = canvas.height;
const ctx = canvas.getContext('2d');

const BRICK_WIDTH = 100;
const BRICK_HEIGHT = 100;
const BRICK_COLS = 8;
const BRICK_ROWS = 6;
const BRICK_GAP = 2;
document.addEventListener('keydown', handleKey);

const gameState = {
  p1 : {
    x: 0,
    y: 0
  }
}

function handleKey(e) {
  switch(e.key) {
    case 'w': {
      gameState.p1.y -= 3;
    } break;
    case 's': {
      gameState.p1.y += 3;
    } break;
    case 'a': {
      gameState.p1.x -= 3;
    } break;
    case 'd': {
      gameState.p1.x += 3;
    } break;
  }
}

window.onload = function() {
  requestAnimationFrame(main);
}

function main() {
  render();
  requestAnimationFrame(main);
}

function render() {
  blackoutCanvas();
  ctx.fillStyle = 'blue';
  ctx.fillRect(gameState.p1.x, gameState.p1.y, 10, 10);
  drawGrid();
}

function drawGrid() {
  for(let col = 0; col < BRICK_COLS; ++col) {
    for(let row = 0; row < BRICK_ROWS; ++row) {
      const brickLeftEdgeX = col * BRICK_WIDTH;
      const brickTopEdgeY = row *  BRICK_HEIGHT;
      drawRectangle(brickLeftEdgeX, brickTopEdgeY,
        BRICK_WIDTH - BRICK_GAP, BRICK_HEIGHT - BRICK_GAP, 'blue');
    }
  }
}

function blackoutCanvas() {
  ctx.fillStyle = 'black';
  ctx.fillRect(0,0, canvas.width, canvas.height);
}

function drawRectangle(x, y, width, height, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, width, height);
}

