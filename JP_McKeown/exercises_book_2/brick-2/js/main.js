'use strict';
const LIVES_INIT = 5;
var livesRemaining = LIVES_INIT;
var score = 0;
var ballReady = true;

// save the canvas for dimensions, and its 2d context for drawing to it
var canvas, canvasContext;

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
    resetBricks();
}

window.onload = function() {
  canvas = document.getElementById('gameCanvas');
  canvasContext = canvas.getContext('2d');

  // these next few lines set up our game logic and render to happen 30 times per second
  var framesPerSecond = 30;
  setInterval(function() {
    moveEverything();
    drawEverything();
    }, 1000/framesPerSecond);
      
  canvas.addEventListener('mousemove', function(evt) {
    var mousePos = calculateMousePos(evt);
    paddleX = mousePos.x - (PADDLE_WIDTH/2); // minus half paddle height to center
    } );

  canvas.addEventListener('mouseup', function(evt) {
    ballReady = false;
  } );
      
  resetBricks();
  resetBall();
}

function writeScore() {
  document.querySelector('#debug').innerHTML = 'Lives: ' + livesRemaining + ' Score: ' + score;
}

function moveEverything() {
  moveBall();
}

function drawEverything() {
  // clear the game view by filling it with black
  colorRect(0, 0, canvas.width, canvas.height, 'black');

  // draw a white rectangle to use as the left player's paddle
  colorRect(paddleX, PADDLE_Y, PADDLE_WIDTH, PADDLE_THICKNESS, 'white');

  drawBricks();

  // draw the ball
  colorCircle(ballX, ballY, 10, 'white');
}