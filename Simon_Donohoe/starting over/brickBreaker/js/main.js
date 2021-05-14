// canvas variables
let canvas, canvasContext;

// ball variables/constants
let ballX = 400, ballY = 400;
let ballSpeedX = 2, ballSpeedY = 5;
const BALLDIAMETER = 10;

// paddle variables/constants
let playerPaddleX = 400;
const PLAYERPADDLEY = 540;
const PADDLE_WIDTH = 100;
const PADDLE_HEIGHT = 10;

// brick variables/constants
const BRICK_W = 80;
const BRICK_H = 20;
const BRICK_GAP = 2;
const BRICK_COLS = 10;
const BRICK_ROWS = 14;
let brickGrid = new Array(BRICK_COLS * BRICK_ROWS);

function calculateMousePos(evt) {
  let rect = canvas.getBoundingClientRect(), root = document.documentElement;

  // account for the margins, canvas position on page, scroll amount, etc.
  let mouseX = evt.clientX - rect.left - root.scrollLeft;
  let mouseY = evt.clientY - rect.top - root.scrollTop;

  // console.log(mouseX, mouseY);
  return{
    x: mouseX,
    y: mouseY
  };
}

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

  resetBricks();
}

function moveEverything(){
  if(ballX > canvas.width || ballX < 0){ // if the ball hits the left or right edge
    ballSpeedX *= -1; // reverse the balls direction
  }

  if(ballY < 0){ // if the ball hits the top
    ballSpeedY *= -1; // reverse the balls direction
  }

  if(ballY > canvas.height){ // if the ball passes the bottom of the canvas
    ballX = 400, ballY = 400; // reset the ball
  }

  if(ballSpeedY > 0) {
    if(ballY >= PLAYERPADDLEY && ballY <= PLAYERPADDLEY + PADDLE_HEIGHT){
      if(ballX + (BALLDIAMETER/2)>= playerPaddleX && ballX + (BALLDIAMETER/2)<= playerPaddleX + PADDLE_WIDTH){
        
        console.log(ballX)
        console.log(ballX + (BALLDIAMETER/2))

        ballSpeedY *= -1;

        let paddleEdgeHit = ballX - (playerPaddleX + PADDLE_WIDTH / 2);
        ballSpeedX = paddleEdgeHit * 0.35;
      }
    }
  }

  removeBrickAtPixelCoord(ballX, ballY);
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

function drawBricks(){
  for(let eachCol = 0; eachCol < BRICK_COLS; eachCol++){
    for(let eachRow = 0; eachRow < BRICK_ROWS; eachRow++){
      if(isBrickAtTileCoord(eachCol, eachRow)){
        let brickLeftEdgeX = eachCol * BRICK_W;
        let brickTopEdgeY = eachRow * BRICK_H;

        colorRect(brickLeftEdgeX, brickTopEdgeY, BRICK_W - BRICK_GAP, BRICK_H - BRICK_GAP, 'blue');
      }
    }
  }
}

function drawEverything(){
  // fill game canvas with black
  colorRect(0, 0, canvas.width, canvas.height, "black");

  // draw a circle(game ball)
  colorCircle(ballX, ballY, BALLDIAMETER, "white");

  // draw a player paddle1
  colorRect(playerPaddleX, PLAYERPADDLEY, PADDLE_WIDTH, PADDLE_HEIGHT, "white");

  // draw brick field
  drawBricks();
}

function resetBricks() {
  for (var i = 0; i < BRICK_COLS * BRICK_ROWS; i++) {
    brickGrid[i] = 1;
  }
}

function brickTileToIndex(brickColumn, brickRow){
  return (brickColumn + BRICK_COLS * brickRow);
}

function isBrickAtTileCoord(brickTileCol, brickTileRow){
  let brickIndex = brickTileToIndex(brickTileCol, brickTileRow);
  return(brickGrid[brickIndex] == 1);
}

function removeBrickAtPixelCoord(pixelX, pixelY) {
  // two variables to find out which brick was hit
  let brickColumn = pixelX / BRICK_W; 
  let brickRow = pixelY / BRICK_H;

  // using Math.floor to round the number down
  brickColumn = Math.floor(brickColumn); 
  brickRow = Math.floor(brickRow);

  if(brickColumn < 0 || brickColumn >= BRICK_COLS || brickRow < 0 || brickRow >= BRICK_ROWS){
    return;
  }

  let brickIndex = brickTileToIndex(brickColumn, brickRow);

  brickGrid[brickIndex] = 0;
}

// page 110