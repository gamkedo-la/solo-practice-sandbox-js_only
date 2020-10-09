let ballX = 75;
let ballY = 75;

let ballSpeedX = 5;
let ballSpeedY = 7;

let canvas, canvasContext;

window.onload = function () {
  canvas = document.getElementById("gameCanvas");
  canvasContext = canvas.getContext("2d");

  let framesPerSecond = 30;

  setInterval(updateAll, 1000 / framesPerSecond);
};

function updateAll() {
  moveAll();
  drawAll();

  function moveAll() {
    // updates the ball position
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    // changes the direction when it reaches the boundary
    if (ballX < 0) {
      ballSpeedX *= -1;
    }
    if (ballY < 0) {
      ballSpeedY *= -1;
    }
    if (ballX > canvas.width) {
      ballSpeedX *= -1;
    }
    if (ballY > canvas.height) {
      ballSpeedY *= -1;
    }
  }

  function drawAll() {
    // drawing the canvas
    colorRect(0, 0, canvas.width, canvas.height, "black");

    // drawing the ball
    colorCircle(ballX, ballY, 10, "white");
  }

  function colorRect(topLeftX, topLeftY, boxWidth, boxHeight, fillColor) {
    canvasContext.fillStyle = fillColor;
    canvasContext.fillRect(topLeftX, topLeftY, boxWidth, boxHeight, fillColor);
  }

  function colorCircle(centerX, centerY, radius, fillColor){
    canvasContext.fillStyle = fillColor;
    canvasContext.beginPath();
    canvasContext.arc(centerX, centerY, radius, 0, Math.PI * 2, true);
    canvasContext.fill();
  }
}
