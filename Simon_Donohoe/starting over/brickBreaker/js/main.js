// ball variables
let ballX = 75, ballY = 75;
let ballSpeedX = 2;
let ballSpeedY = 2;

// paddle variables
let playerPaddleX = 400;
const PADDLE_WIDTH = 100;
const PADDLE_HEIGHT = 10;

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

  canvas.addEventListener('mousemove', function(evt){
    let mousePos = calculateMousePos(evt);
    playerPaddleX = mousePos.x - (PADDLE_WIDTH/2); // for center of paddle
  });
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

function colorRect(topLeftX, topLeftY, boxWidth, boxHeight, fillColor){
  canvasContext.fillStyle = fillColor;
  canvasContext.fillRect(topLeftX, topLeftY, boxWidth, boxHeight);
}

function colorCircle(centerX, centerY, radius, fillColor){
  canvasContext.fillStyle = fillColor;
  canvasContext.beginPath();
  canvasContext.arc(centerX, centerY, radius, 0, Math.PI*2, true);
  canvasContext.fill();
}

function drawEverything(){
  // fill game canvas with black
  colorRect(0, 0, canvas.width, canvas.height, "black");

  // draw a circle(game ball)
  colorCircle(ballX, ballY, 10, "white");

  // draw a player paddle1
  colorRect(350, playerPaddleX, PADDLE_WIDTH, PADDLE_HEIGHT, "white");
}

function calculateMousePos(evt) {
  let rect = canvas.getBoundingClientRect(), root = document.documentElement;

  // account for the margins, canvas position on page, scroll amount, etc.
  let mouseX = evt.clientX - rect.left - root.scrollLeft;
  let mouseY = evt.clientY - rect.top - root.scrollTop;
  return{
    x: mouseX,
    y: mouseY
  };
}

// page 53