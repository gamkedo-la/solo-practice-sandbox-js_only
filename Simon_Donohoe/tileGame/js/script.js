// ball starting position variables
let ballX = 75;
let ballY = 75;

// ball speed variables
let ballSpeedX = 5;
let ballSpeedY = 7;

// brick constants and variables
const BRICK_W = 100;
const BRICK_H = 20;
const BRICK_GAP = 2;
const BRICK_COLS = 10;
const BRICK_ROWS = 14;


let brickGrid = new Array(BRICK_COLS * BRICK_ROWS);

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
}

function brickReset(){
  for(let i = 0; i < BRICK_COLS * BRICK_ROWS; i++){
    
    // a type of coin flip
    // if(Math.random() < 0.5){
    //   brickGrid[i] = true;
    // }else{
    //   brickGrid[i] = false;
    // } // end of else (rand stack)
    brickGrid[i] = true;
  } // end of for each brick
  // brickGrid[i] = true;
} // end of brickReset function

window.onload = function () {
  canvas = document.getElementById("gameCanvas");
  canvasContext = canvas.getContext("2d");

  let framesPerSecond = 30;
  setInterval(updateAll, 1000 / framesPerSecond);

  canvas.addEventListener("mousemove", updateMousePos);

  brickReset();
}

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
  if (ballX < 0) { //left
    ballSpeedX *= -1;
  }
  if (ballY < 0) { //right
    ballSpeedY *= -1;
  }
  if (ballX > canvas.width) { // top
    ballSpeedX *= -1;
  }
  if (ballY > canvas.height) { // bottom
    ballReset();
    // ballSpeedY *= -1;
  }

  let ballBrickCol = Math.floor(ballX / BRICK_W); //Math.floor removes the decimal places from the cursor. Rounds down.
  let ballBrickRow = Math.floor(ballY / BRICK_H);
  let brickIndexUnderBall = rowColToArrayIndex(ballBrickCol, ballBrickRow);

  if(ballBrickCol >= 0 && ballBrickCol < BRICK_COLS && ballBrickRow >= 0 && ballBrickRow < BRICK_ROWS){

    if(brickGrid[brickIndexUnderBall]){
    brickGrid[brickIndexUnderBall] = false;
    ballSpeedY *= -1;
    }
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
  canvasContext.fillRect(topLeftX, topLeftY, boxWidth, boxHeight, fillColor);
}

function colorCircle(centerX, centerY, radius, fillColor) {
  canvasContext.fillStyle = fillColor;
  canvasContext.beginPath();
  canvasContext.arc(centerX, centerY, radius, 0, Math.PI * 2, true);
  canvasContext.fill();
}

function colorText(showWords, textX, textY, fillColor){
  canvasContext.fillStyle = fillColor;
  canvasContext.fillText(showWords, textX, textY);
}