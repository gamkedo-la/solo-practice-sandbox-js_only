const gameCanvas = document.getElementById('gameCanvas');
const context2d = gameCanvas.getContext('2d');

const SQUARE_SIZE = 20;
const SQUARES_PER_ROW = 32;
const NUMBER_OF_ROWS = 24;
const TOTAL_SQUARES = SQUARES_PER_ROW * NUMBER_OF_ROWS;
let snakePos = 0;
let snakeX = 0;
let snakeY = 0;
let snakeDirection = 'right';
let isGameOver = false;
let bodySegments = [];

let foodPosition = Math.floor(Math.random() * TOTAL_SQUARES);
let score = 0;

function moveSnake() {
  for (let i = bodySegments.length - 1; i >= 0; i--) {
    if (i === 0) {
      bodySegments[i] = snakePos;
    } else {
      bodySegments[i] = bodySegments[i - 1];
    }
  }

  if (snakeDirection === 'right') {
    if (snakePos % SQUARES_PER_ROW < SQUARES_PER_ROW - 1) {
      snakePos++;
    } else {
      snakePos = snakePos - SQUARES_PER_ROW + 1;
    }
  } else if (snakeDirection === 'left') {
    if (snakePos % SQUARES_PER_ROW > 0) {
      snakePos--;
    } else {
      snakePos = snakePos + SQUARES_PER_ROW - 1;
    }
  } else if (snakeDirection === 'down') {
    if (Math.floor(snakePos / SQUARES_PER_ROW) < NUMBER_OF_ROWS - 1) {
      snakePos = snakePos + SQUARES_PER_ROW;
    } else {
      snakePos = snakePos % SQUARES_PER_ROW;
    }
  } else if (snakeDirection === 'up') {
    if (Math.floor(snakePos / SQUARES_PER_ROW) > 0) {
      snakePos = snakePos - SQUARES_PER_ROW;
    } else {
      snakePos = snakePos + SQUARES_PER_ROW * (NUMBER_OF_ROWS - 1);
    }
  }
}

function gameLoop() {
  if (!isGameOver) {
    moveSnake();

    for (pos of bodySegments) {
      if (pos === snakePos) {
        isGameOver = true;
      }
    }
  
    if (snakePos === foodPosition) {
      score += 100;
      bodySegments.push(NaN);
      foodPosition = Math.floor(Math.random() * TOTAL_SQUARES);
    }
  }

  context2d.fillStyle = 'black';
  context2d.fillRect(0, 0, 640, 480);

  for (pos of bodySegments) {
    if (pos !== NaN) {
      const snakeX = (pos % SQUARES_PER_ROW) * SQUARE_SIZE;
      const snakeY = Math.floor(pos / SQUARES_PER_ROW) * SQUARE_SIZE;
      context2d.fillStyle = 'white';
      context2d.fillRect(snakeX, snakeY, SQUARE_SIZE, SQUARE_SIZE);
    }
  }

  const snakeX = (snakePos % SQUARES_PER_ROW) * SQUARE_SIZE;
  const snakeY = Math.floor(snakePos / SQUARES_PER_ROW) * SQUARE_SIZE;
  context2d.fillStyle = 'red';
  context2d.fillRect(snakeX, snakeY, SQUARE_SIZE, SQUARE_SIZE);

  const foodX = (foodPosition % SQUARES_PER_ROW) * SQUARE_SIZE;
  const foodY = Math.floor(foodPosition / SQUARES_PER_ROW) * SQUARE_SIZE;
  context2d.fillStyle = 'yellow';
  context2d.fillRect(foodX, foodY, SQUARE_SIZE, SQUARE_SIZE);

  context2d.fillStyle = 'gray';
  context2d.font = '20px Arial';
  context2d.fillText('Score: ' + score, 10, 30);
  if (isGameOver) {
    context2d.fillText('Game Over', 520, 30);
  }
}

setInterval(() => {
  gameLoop();
}, 1000/30);

document.addEventListener('keydown', (event) => {
  const keyCode = event.code;
  if (event.code === 'ArrowRight' && snakeDirection !== 'left') {
    snakeDirection = 'right';
  }
  if (event.code === 'ArrowLeft' && snakeDirection !== 'right') {
    snakeDirection = 'left';
  }
  if (event.code === 'ArrowDown' && snakeDirection !== 'up') {
    snakeDirection = 'down'
  }
  if (event.code === 'ArrowUp' && snakeDirection !== 'down') {
    snakeDirection = 'up';
  }
});
