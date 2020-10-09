// ball starting position variables
let ballX = 75;
let ballY = 75;

// ball speed variables
let ballSpeedX = 5;
let ballSpeedY = 7;

// paddle size constants
const PADDLE_WIDTH = 100;
const PADDLE_THICKNESS = 10;

const PADDLE_DIST_FROM_BOTTOM = 60;

// paddle position on X-axis
let paddleX = 400;

// canvas variables
let canvas, canvasContext;

function updateMousePos(evt) {
  let rect = canvas.getBoundingClientRect();
  let root = document.documentElement;

  let mouseX = evt.clientX - rect.left - root.scrollLeft;
  //let mouseY = evt.clientY - rect.top - root.scrollTop;

  paddleX = mouseX - PADDLE_WIDTH / 2; //paddle position in relation to the cursor. Cursor should be in the middle of the paddle.
}

window.onload = function () {
  canvas = document.getElementById("gameCanvas");
  canvasContext = canvas.getContext("2d");

  let framesPerSecond = 30;

  setInterval(updateAll, 1000 / framesPerSecond);

  canvas.addEventListener("mousemove", updateMousePos);
};

function updateAll() {
  moveAll();
  drawAll();
}
function ballReset() {
  ballX = canvas.width / 2;
  ballY = canvas.height / 2;
}

function moveAll() {
  // updates the ball position
  ballX += ballSpeedX;
  ballY += ballSpeedY;

  // changes the direction when it reaches the boundary
  if (ballX < 0) {
    //left
    ballSpeedX *= -1;
  }
  if (ballY < 0) {
    //right
    ballSpeedY *= -1;
  }
  if (ballX > canvas.width) {
    // top
    ballSpeedX *= -1;
  }
  if (ballY > canvas.height) {
    // bottom
    ballReset();
    // ballSpeedY *= -1;
  }

  let paddleTopEdgeY = canvas.height - PADDLE_DIST_FROM_BOTTOM;
  let paddleBottomEdgeY = paddleTopEdgeY + PADDLE_THICKNESS;
  let paddleLeftEdgeX = paddleX;
  let paddleRightEdgeX = paddleLeftEdgeX + PADDLE_WIDTH;

  if (
    ballY > paddleTopEdgeY && // below the top of paddle
    ballY < paddleBottomEdgeY && // above bottom of paddle
    ballX > paddleLeftEdgeX && // right of the left side of paddle
    ballX < paddleRightEdgeX // left of the right side of paddle
  ) {
    ballSpeedY *= -1;

    let centerOfPaddleX = ballX + PADDLE_WIDTH/2;
    let ballDistFromPaddleCenterX = ballX - centerOfPaddleX;
    ballSpeedX = ballDistFromPaddleCenterX * 0.35;
  }
}

function drawAll() {
  // drawing the canvas
  colorRect(0, 0, canvas.width, canvas.height, "black"); //clear screen

  colorCircle(ballX, ballY, 10, "white"); // drawing the ball

  colorRect(
    paddleX,
    canvas.height - PADDLE_DIST_FROM_BOTTOM,
    PADDLE_WIDTH,
    PADDLE_THICKNESS
  ); // drawing the paddle
}

function colorRect(topLeftX, topLeftY, boxWidth, boxHeight, fillColor) {
  canvasContext.fillStyle = fillColor;
  canvasContext.fillRect(topLeftX, topLeftY, boxWidth, boxHeight, fillColor);
}

function colorCircle(centerX, centerY, radius, fillColor) {
  canvasContext.fillStyle = fillColor;
  canvasContext.beginPath();
  canvasContext.arc(centerX, centerY, radius, 0, Math.PI * 2, true);
  canvasContext.fill();
}
