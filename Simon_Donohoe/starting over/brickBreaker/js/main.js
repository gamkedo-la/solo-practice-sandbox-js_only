// ball variables
let ballX = 75, ballY = 75;
let ballSpeedX = 2;
let ballSpeedY = 2;

// canvas variables
let canvas, canvasContext;

window.onload = function(){
  // game canvas
  canvas = document.getElementById('gameCanvas');
  canvasContext = canvas.getContext('2d');

  let framesPerSecond = 60;
  setInterval(function(){ 
    moveEverything();
    drawEverything();
  }, 1000/framesPerSecond);
}

function moveEverything(){
  if(ballX > canvas.width || ballX < 0){ // if the ball has moved past the left or right edge
    ballSpeedX *= -1; // reverse the balls direction
  }
  if(ballY > canvas.height || ballY < 0){ // if the ball moves past the top or bottom
    ballSpeedY *= -1; // reverse the balls direction
  }
  // move the ball to the right
  ballX += ballSpeedX;
  ballY += ballSpeedY;
}

function drawEverything(){
  // fill game canvas with black
  canvasContext.fillStyle = "black";
  canvasContext.fillRect(0,0, canvas.width, canvas.height);

  // draw a circle(game ball)
  canvasContext.fillStyle = "white";
  canvasContext.beginPath();
  canvasContext.arc(ballX, ballY, 10, 0, Math.PI*2, true);
  canvasContext.fill();
}

// page 53