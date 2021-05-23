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
let totalBrickCount;

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

    // for testing purposes
    ballX = mousePos.x;
    ballY = mousePos.y;
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
        
        ballSpeedY *= -1;

        if(totalBrickCount == 0){
          resetBricks();
        }
        
        let paddleEdgeHit = ballX - (playerPaddleX + PADDLE_WIDTH / 2);
        ballSpeedX = paddleEdgeHit * 0.35;
      }
    }
  }

  breakAndBounceOffBrickAtPixelCoord(ballX, ballY);

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
  totalBrickCount = BRICK_COLS * BRICK_ROWS;
}

function brickTileToIndex(brickColumn, brickRow){
  return (brickColumn + BRICK_COLS * brickRow);
}

function isBrickAtTileCoord(brickTileCol, brickTileRow){
  let brickIndex = brickTileToIndex(brickTileCol, brickTileRow);
  return(brickGrid[brickIndex] == 1);
}

function breakAndBounceOffBrickAtPixelCoord(pixelX, pixelY) {
  // two variables to find out which brick was hit
  let brickColumn = pixelX / BRICK_W; 
  let brickRow = pixelY / BRICK_H;

  // using Math.floor to round the number down
  brickColumn = Math.floor(brickColumn); 
  brickRow = Math.floor(brickRow);

  if(brickColumn < 0 || brickColumn >= BRICK_COLS || brickRow < 0 || brickRow >= BRICK_ROWS){
    return false;
  }

  let brickIndex = brickTileToIndex(brickColumn, brickRow);

  if(brickGrid[brickIndex] == 1){
    // ok, so we know we overlap a brick now
    // let's backtrack to see whether we changed rows or cols on way in
    let prevBallX = ballX - ballSpeedX;
    let prevBallY = ballY - ballSpeedY;
    let prevBrickColumn = Math.floor(prevBallX / BRICK_W);
    let prevBrickRow = Math.floor(prevBallY / BRICK_H);

    let bothTestsFailed = true;

    if(prevBrickColumn != brickColumn){// must have come in horizontally
      let adjacentBrickIndex = brickTileToIndex(prevBrickColumn, brickRow);
      // make sure the side we want to reflect off isn't blocked!
      if(brickGrid[adjacentBrickIndex] != 1){
        ballSpeedX *= -1;
        bothTestsFailed = false;
      }
    }
    if(prevBrickRow != brickRow){// must have come in vertically
      let adjacentBrickIndex = brickTileToIndex(brickColumn, prevBrickRow);
      // make sure the side we want to reflect off isn't blocked!
      if(brickGrid[adjacentBrickIndex] != 1){
        ballSpeedY *= -1;
        bothTestsFailed = false;
      }
    }
    // we hit an "armpit" on the inside corner, flip both to avoid going into it
    if(bothTestsFailed){
      ballSpeedX *= -1;
      ballSpeedY *= -1;
    }
    brickGrid[brickIndex] = 0; // remove brick that got hit
    totalBrickCount--;
    console.log(totalBrickCount);
  }
}

// page 115