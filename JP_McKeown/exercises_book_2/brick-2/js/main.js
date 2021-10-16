'use strict';
const STATE_MENU = 0;
const STATE_PLAY = 1;
const STATE_PAUSE = 2;
const STATE_OPTIONS = 3;
const STATE_CREDITS = 4;
let gameState = STATE_MENU;

const LIVES_INIT = 2;
var livesRemaining = LIVES_INIT;
var score = 0;
var finalScore = 0;
let ballReady = true;

// save the canvas for dimensions, and its 2d context for drawing to it
var canvas, ctx;

function calculateMousePos(evt) {
  var rect = canvas.getBoundingClientRect(), root = document.documentElement;

  // account for the margins, canvas position on page, scroll amount, etc.
  var mouseX = evt.clientX - rect.left - root.scrollLeft;
  var mouseY = evt.clientY - rect.top - root.scrollTop;
  return {
      x: mouseX,
      y: mouseY
  };
}

function resetGame() {
    livesRemaining = LIVES_INIT;
    score = 0;
    writeUI();
    drawUI();
    resetBricks();
}

window.onload = function() {
  canvas = document.getElementById('gameCanvas');
  ctx = canvas.getContext('2d');
  loadImages();  
}

function gameLoop() {
    // these next few lines set up our game logic and render to happen 30 times per second
    var framesPerSecond = 30;
    setInterval(function() {
      moveEverything();
      drawEverything();
      }, 1000/framesPerSecond);
  
      initInput();     
      resetBall();
      resetBricks();
}

function writeUI() {
  document.querySelector('#tempUI').innerHTML = 'Lives: ' + livesRemaining + ' Score: ' + score;
}

const UI_Y = 20;
const UI_X = 40;

function drawUI() {
  for(var i=0; i < livesRemaining; i++) {
    drawBitmapCenteredAtLocationWithRotation(lifePic, UI_X + i*40, UI_Y, 0);
  }
  if(finalScore > 0) {
    drawText('Score ' + finalScore, 500, UI_Y+12, 28, 'white')
  } else {
    drawText('Score ' + score, 500, UI_Y+12, 28, 'white')
  }
}

function moveEverything() {
  if (gameState == STATE_PLAY) {
    moveBall();
  }
}

function drawEverything() {
  // clear the game view by filling it with black
  colorRect(0, 0, canvas.width, canvas.height, 'black');

  switch (gameState) {
    case STATE_MENU:
      drawMenu();
      break;
    case STATE_PLAY:
      drawPlay();
      break;
  }
}

function drawPlay() {
  // draw a white rectangle to use as the left player's paddle
  colorRect(paddleX, PADDLE_Y, PADDLE_WIDTH, PADDLE_THICKNESS, 'white');

  drawBricks();
  drawUI();

  // draw the ball
  colorCircle(ballX, ballY, BALL_RADIUS, 'white');
}

const MENU_X = 100;
const MENU_Y = 120;
const TITLE_SIZE = 36;
const MENU_SIZE = 20;

function drawMenu() {
  drawUI();
  drawText('Brickbreaker', MENU_X, MENU_Y, TITLE_SIZE, 'white');
  drawText('Press any key to start.', MENU_X, MENU_Y+140, MENU_SIZE, 'white');
  drawText('Click to launch ball.', MENU_X, MENU_Y+200, MENU_SIZE, 'white');
  drawText('Move mouse to move paddle.', MENU_X, MENU_Y+260, MENU_SIZE, 'white');
  // drawText('Credits', MENU_X, MENU_Y+260, MENU_SIZE, 'white');
  // drawText('Path', MENU_X, MENU_Y+320, MENU_SIZE, 'white');
}

function drawText(str, x, y, size, colour) {
  ctx.font = size + 'px Arial';
  ctx.fillStyle = colour;
  ctx.fillText(str, x, y);
}