const KEY_UP_ARROW = 38;
const KEY_SPACE = 32;

let canvas, canvasContext;
const CANVAS_HEIGHT = 600;
const CANVAS_WIDTH = 800;
const floor = CANVAS_HEIGHT - 35;

let player = new Player();
let obstacles = [];
let frameCount = 0;
let gameOver = false;
let score = 0;
let addPoint = false;
let jumpSound = new SoundOverlapsClass('audio/Jump');
let gameOverSound = new SoundOverlapsClass('audio/GameOver');
let highestScore = JSON.parse(localStorage.getItem('highestScore')) || 0;

let bgImage = new Image();
bgImage.src = 'img/bg.png';
let imageWidth = CANVAS_WIDTH;
const scrollSpeed = 5;

const obsSprite = new Image();
obsSprite.src = 'img/spr_boulder_0.png';
const SPRITE_SIZE = 16;
const spriteSheet = {
  // walk right
  frameSet: [2, 3],
  image: new Image()
};

function handleInput(e) {
  e.preventDefault();

  if (gameOver && e.keyCode === KEY_SPACE) {
    gameOver = false;
    resetGame();
    return;
  }

  if (e.keyCode === KEY_UP_ARROW || e.keyCode === KEY_SPACE) {
    player.jumping = true;
    player.move();
  }
}

window.onload = function() {
  canvas = document.querySelector('canvas');
  canvasContext = canvas.getContext('2d');
  canvas.width = CANVAS_WIDTH;
  canvas.height = CANVAS_HEIGHT;

  // spriteSheet.image.addEventListener('load', function(e) {
  // When the images finishes loading start the game loop
  setInterval(update, 1000 / 30);
  // });

  spriteSheet.image.src = 'img/animation.png';
  player.animation.changeAnimSet(spriteSheet.frameSet, 10);

  document.addEventListener('keydown', handleInput);
};

function update() {
  if (gameOver) {
    gameOverScreen();
    return;
  }

  afterSomeTimeAddObs();
  moveEverything();
  player.animation.update();
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
  canvasContext.drawImage(bgImage, imageWidth, 0, bgImage.width, bgImage.height + 250);
  canvasContext.drawImage(
    bgImage,
    imageWidth - canvas.width,
    0,
    bgImage.width,
    bgImage.height + 250
  );

  imageWidth -= scrollSpeed;

  if (imageWidth <= 0) {
    imageWidth = canvas.width;
  }

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
  // Draw text
  colorText('GAME OVER', canvas.width / 2 - 50, canvas.height / 2, 'black');
  colorText('Press SPACE to restart game', canvas.width / 2 - 105, canvas.height / 2 + 20, 'black');

  // Get the highest score from local storage
  checkAndSetHighestScore();

  colorText(`Score: ${score}`, canvas.width / 2 - 30, canvas.height / 2 + 60, 'black');
  colorText(
    `Highest Score: ${highestScore}`,
    canvas.width / 2 - 63,
    canvas.height / 2 + 80,
    'black'
  );
}

function resetGame() {
  // Remove the obstacles from the game
  obstacles = [];

  // Reset score
  score = 0;
}

function checkAndSetHighestScore() {
  // If highestScore doesn't exist on localStorage or if highestScore is less than the current score, update on localStorage
  if (highestScore < score || JSON.parse(localStorage.getItem('highestScore')) == null) {
    localStorage.setItem('highestScore', JSON.stringify(score));
  }

  highestScore = JSON.parse(localStorage.getItem('highestScore'));
}

function drawRect(x, y, w, h, color) {
  canvasContext.fillStyle = color;
  canvasContext.fillRect(x, y, w, h);
}

function colorText(showWords, textX, textY, fillColor) {
  canvasContext.font = '16px Georgia';
  canvasContext.fillStyle = fillColor;
  canvasContext.fillText(showWords, textX, textY);
}

function randomRange(myMin, myMax) {
  return Math.floor(Math.random() * (myMax - myMin)) + myMin;
}
