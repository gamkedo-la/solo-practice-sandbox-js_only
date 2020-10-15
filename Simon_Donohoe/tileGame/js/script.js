// ball starting position variables
let ballX = 75;
let ballY = 75;

// ball speed variables
let ballSpeedX = 5;
let ballSpeedY = 7;

// brick constants and variables
const BRICK_W = 80;
const BRICK_H = 20;
const BRICK_GAP = 2;
const BRICK_COLS = 10;
const BRICK_ROWS = 14;

let brickGrid = new Array(BRICK_COLS * BRICK_ROWS);
let bricksLeft = 0;

// paddle size constants
const PADDLE_WIDTH = 100;
const PADDLE_THICKNESS = 10;

const PADDLE_DIST_FROM_BOTTOM = 60;

// paddle position on X-axis
let paddleX = 400;

// canvas variables
let canvas, canvasContext;

let mouseX = 0;
let mouseY = 0;

function updateMousePos(evt) {
  let rect = canvas.getBoundingClientRect();
  let root = document.documentElement;

  mouseX = evt.clientX - rect.left - root.scrollLeft;
  mouseY = evt.clientY - rect.top - root.scrollTop;

  paddleX = mouseX - PADDLE_WIDTH / 2; //paddle position in relation to the cursor. Cursor should be in the middle of the paddle.

  //cheat / hack to test ball in any position
    // ballX = mouseX;
    // ballY = mouseY;
    // ballSpeedX = 3;
    // ballSpeedY = -4;
}

function brickReset(){
  bricksLeft = 0;
  let i;
  for(i = 0; i < 3*BRICK_COLS; i++){
    brickGrid[i] = false;
  }

  for(;i < BRICK_COLS * BRICK_ROWS; i++){
    
    // a type of coin flip
    // if(Math.random() < 0.5){
    //   brickGrid[i] = true;
    // }else{
    //   brickGrid[i] = false;
    // } // end of else (rand stack)    
    
    brickGrid[i] = true;
    bricksLeft++;
  } // end of for each brick
} // end of brickReset function

window.onload = function () {
  canvas = document.getElementById("gameCanvas");
  canvasContext = canvas.getContext("2d");

  let framesPerSecond = 30;
  setInterval(updateAll, 1000 / framesPerSecond);

  canvas.addEventListener("mousemove", updateMousePos);

  brickReset();
  ballReset();
}

function updateAll() {
  moveAll();
  drawAll();
}

function ballReset() {
  ballX = canvas.width / 2;
  ballY = canvas.height / 2;
}

function ballMove(){
  // updates the ball position
  ballX += ballSpeedX;
  ballY += ballSpeedY;

  // changes the direction when it reaches the boundary
  
  if (ballY < 0 && ballSpeedY < 0.0) { //top
    ballSpeedY *= -1;
  }
  if (ballX > canvas.width && ballSpeedX > 0.0) { // right
    ballSpeedX *= -1;
  }
  if (ballY > canvas.height) { // bottom
    ballReset();
    brickReset();
    // ballSpeedY *= -1;
  }
  if (ballX < 0 && ballSpeedX < 0.0) { //left
    ballSpeedX *= -1;
  }
}

function isBrickAtColRow(col, row){
  if(col >= 0 && col < BRICK_COLS && row >= 0 && row < BRICK_ROWS){  
    let brickIndexUnderCoord = rowColToArrayIndex(col, row);
    return brickGrid[brickIndexUnderCoord];
  }else{
    return false;
  }
}

function ballBrickHandling(){
  let ballBrickCol = Math.floor(ballX / BRICK_W); //Math.floor removes the decimal places from the cursor. Rounds down.
  let ballBrickRow = Math.floor(ballY / BRICK_H);
  let brickIndexUnderBall = rowColToArrayIndex(ballBrickCol, ballBrickRow);

  if(ballBrickCol >= 0 && ballBrickCol < BRICK_COLS && ballBrickRow >= 0 && ballBrickRow < BRICK_ROWS){

    if(isBrickAtColRow(ballBrickCol, ballBrickRow)){
      brickGrid[brickIndexUnderBall] = false;
      bricksLeft--;
      // console.log(bricksLeft);

      let prevBallX = ballX - ballSpeedX;
      let prevBallY = ballY - ballSpeedY;
      let prevBrickCol = Math.floor(prevBallX / BRICK_W);
      let prevBrickRow = Math.floor(prevBallY / BRICK_H);
      let bothTestsFailed = true;

      if(prevBrickCol != ballBrickCol){
        if(isBrickAtColRow(prevBrickCol, prevBrickRow) == false){
          ballSpeedX *= -1;
          bothTestsFailed = false;
        }
      }
      if(prevBrickRow != ballBrickRow){
        if(isBrickAtColRow(ballBrickCol, ballBrickRow) == false){
          ballSpeedY *= -1;
          bothTestsFailed = false;
        }
      }
      if(bothTestsFailed){ //armpit case prevents ball from going right through
        ballSpeedX *= -1;
        ballSpeedY *= -1;
      }
    
    } //end of brick found
  } // end of valid col and row
} // end of ballBrickHandling func

function ballPaddleHandling(){
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

    let centerOfPaddleX = paddleX + PADDLE_WIDTH/2;
    let ballDistFromPaddleCenterX = ballX - centerOfPaddleX;

    ballSpeedX = ballDistFromPaddleCenterX * 0.35;

    if(bricksLeft == 0){
      brickReset();
    } // out of bricks
  } // ball center inside paddle
} // end of ballPaddleHandling

function moveAll() {
  ballMove();
  ballBrickHandling();
  ballPaddleHandling();
}

function rowColToArrayIndex(col, row){
return col + BRICK_COLS * row;
}

function drawBricks(){
  // if(brickGrid[0]){
  //   colorRect(0,0, BRICK_W-2,BRICK_H, 'blue');    
  // }
  // if(brickGrid[1]){
  //   colorRect(BRICK_W,0, BRICK_W-2,BRICK_H, 'blue');
  // }
  // if(brickGrid[2]){
  //   colorRect(BRICK_W*2,0, BRICK_W-2,BRICK_H, 'blue');
  // }
  // if(brickGrid[3]){
  //   colorRect(BRICK_W*3,0, BRICK_W-2,BRICK_H, 'blue');
  // }
  for(let eachRow = 0; eachRow < BRICK_ROWS; eachRow++){
    for(let eachCol = 0; eachCol < BRICK_COLS; eachCol++){

      let arrayIndex = rowColToArrayIndex(eachCol, eachRow);

      if(brickGrid[arrayIndex]){
        colorRect(BRICK_W * eachCol, BRICK_H * eachRow, BRICK_W-BRICK_GAP, BRICK_H-BRICK_GAP, 'blue');
      } //end of is this brick here
    } // end of for each brick
  } // end of drawBrick function
}

function drawAll() {
  // drawing the canvas
  colorRect(0, 0, canvas.width, canvas.height, "black"); //clear screen

  colorCircle(ballX, ballY, 10, "white"); // drawing the ball

  colorRect(
    paddleX,
    canvas.height - PADDLE_DIST_FROM_BOTTOM,
    PADDLE_WIDTH,
    PADDLE_THICKNESS, 'white'); // drawing the paddle

    drawBricks();
}

function colorRect(topLeftX, topLeftY, boxWidth, boxHeight, fillColor) {
  canvasContext.fillStyle = fillColor;
  canvasContext.fillRect(topLeftX, topLeftY, boxWidth, boxHeight);
}

function colorCircle(centerX, centerY, radius, fillColor) {
  canvasContext.fillStyle = fillColor;
  canvasContext.beginPath();
  canvasContext.arc(centerX, centerY, 8, 0, Math.PI * 2, true);
  canvasContext.fill();
}

function colorText(showWords, textX, textY, fillColor){
  canvasContext.fillStyle = fillColor;
  canvasContext.fillText(showWords, textX, textY);
}