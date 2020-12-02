const GROUND_FRICTION = 0.8;
const AIR_RESISTANCE = 0.95;
const RUN_SPEED = 4.0;
const JUMP_POWER = 12.0;
const GRAVITY = 0.6;

let jumperX = 75, jumperY = 75;
let jumperSpeedX = 0, jumperSpeedY = 0;
let jumperOnGround = false;
let JUMPER_RADIUS = 10;

const KEY_LEFT_ARROW = 37;
const KEY_UP_ARROW = 38;
const KEY_RIGHT_ARROW = 39;
const KEY_SPACE = 32;
let holdLeft = false;
let holdRight = false;

function initInput() {
  document.addEventListener("keydown", keyPressed);
  document.addEventListener("keyup", keyReleased);
}

function setKeyHoldState(thisKey, setTo) {
  if(thisKey == KEY_LEFT_ARROW) {
    holdLeft = setTo;
  }
  if(thisKey == KEY_RIGHT_ARROW) {
    holdRight = setTo;
  }
  if(thisKey == KEY_UP_ARROW || thisKey == KEY_SPACE) {
    if(jumperOnGround) {
      jumperSpeedY = -JUMP_POWER;
    }
  }
}

function keyPressed(evt) {
  setKeyHoldState(evt.keyCode, true);
  evt.preventDefault(); // without this, arrow keys scroll the browser!
}

function keyReleased(evt) {
  setKeyHoldState(evt.keyCode, false);
}

const BRICK_W = 40;
const BRICK_H = 40;
const BRICK_GAP = 1;
const BRICK_COLS = 20;
const BRICK_ROWS = 15;
let brickGrid =
    [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
      1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
      1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
      1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
      1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
      1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
      1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
      1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
      1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
      1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
      1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
      1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
      1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
      1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
      1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];

let canvas, canvasContext;

function brickTileToIndex(tileCol, tileRow) {
  return (tileCol + BRICK_COLS*tileRow);
}

function isBrickAtTileCoord(brickTileCol, brickTileRow) {
  let brickIndex = brickTileToIndex(brickTileCol, brickTileRow);
  return (brickGrid[brickIndex] == 1);
}

function isBrickAtPixelCoord(hitPixelX, hitPixelY) {
  let tileCol = hitPixelX / BRICK_W;
  let tileRow = hitPixelY / BRICK_H;
  
  // using Math.floor to round down to the nearest whole number
  tileCol = Math.floor( tileCol );
  tileRow = Math.floor( tileRow );

  // first check whether the jumper is within any part of the brick wall
  if(tileCol < 0 || tileCol >= BRICK_COLS ||
     tileRow < 0 || tileRow >= BRICK_ROWS) {
     return false;
  }
  
  let brickIndex = brickTileToIndex(tileCol, tileRow);
  return (brickGrid[brickIndex] == 1);
}

function jumperMove() {
 if(jumperOnGround) {
    jumperSpeedX *= GROUND_FRICTION;
  } else {
    jumperSpeedX *= AIR_RESISTANCE;
    jumperSpeedY += GRAVITY;
    if(jumperSpeedY > JUMPER_RADIUS) { // cheap test to ensure can't fall through floor
      jumperSpeedY = JUMPER_RADIUS;
    }
  }

  if(holdLeft) {
    jumperSpeedX = -RUN_SPEED;
  }
  if(holdRight) {
    jumperSpeedX = RUN_SPEED;
  }

  if(jumperSpeedY < 0 && isBrickAtPixelCoord(jumperX,jumperY-JUMPER_RADIUS) == 1) {
    jumperY = (Math.floor( jumperY / BRICK_H )) * BRICK_H + JUMPER_RADIUS;
    jumperSpeedY = 0.0;
  }
  
  if(jumperSpeedY > 0 && isBrickAtPixelCoord(jumperX,jumperY+JUMPER_RADIUS) == 1) {
    jumperY = (1+Math.floor( jumperY / BRICK_H )) * BRICK_H - JUMPER_RADIUS;
    jumperOnGround = true;
    jumperSpeedY = 0;
  } else if(isBrickAtPixelCoord(jumperX,jumperY+JUMPER_RADIUS+2) == 0) {
    jumperOnGround = false;
  }
  
  if(jumperSpeedX < 0 && isBrickAtPixelCoord(jumperX-JUMPER_RADIUS,jumperY) == 1) {
    jumperX = (Math.floor( jumperX / BRICK_W )) * BRICK_W + JUMPER_RADIUS;
  }
  if(jumperSpeedX > 0 && isBrickAtPixelCoord(jumperX+JUMPER_RADIUS,jumperY) == 1) {
    jumperX = (1+Math.floor( jumperX / BRICK_W )) * BRICK_W - JUMPER_RADIUS;
  }
  
  jumperX += jumperSpeedX; // move the jumper based on its current horizontal speed 
  jumperY += jumperSpeedY; // same as above, but for vertical
}

window.onload = function() {
  canvas = document.getElementById('gameCanvas');
  canvasContext = canvas.getContext('2d');
  
  initInput();
  
  // these next few lines set up our game logic and render to happen 30 times per second
  let framesPerSecond = 30;
  setInterval(function() {
      moveEverything();
      drawEverything();
    }, 1000/framesPerSecond);
    
  jumperReset();
}

function jumperReset() {
  // center jumper on screen
  jumperX = canvas.width/9;
  jumperY = canvas.height/2;
}

function moveEverything() {
  jumperMove();
}

function colorRect(topLeftX, topLeftY, boxWidth, boxHeight, fillColor) {
  canvasContext.fillStyle = fillColor;
  canvasContext.fillRect(topLeftX, topLeftY, boxWidth, boxHeight);
}

function colorCircle(centerX, centerY, radius, fillColor) {
  canvasContext.fillStyle = fillColor;
  canvasContext.beginPath();
  canvasContext.arc(centerX, centerY, radius, 0, Math.PI*2, true);
  canvasContext.fill();
}

function drawBricks() {
  for(let eachCol=0; eachCol<BRICK_COLS; eachCol++) { // in each column...
    for(let eachRow=0; eachRow<BRICK_ROWS; eachRow++) { // in each row within that col
    
      if( isBrickAtTileCoord(eachCol, eachRow) ) {
        let brickLeftEdgeX = eachCol * BRICK_W;
        let brickTopEdgeY = eachRow * BRICK_H;
        colorRect(brickLeftEdgeX, brickTopEdgeY,
                 BRICK_W - BRICK_GAP, BRICK_H - BRICK_GAP, 'blue' );
      } // end of isBrickAtTileCoord()
    } // end of for eachRow
  } // end of for eachCol
} // end of drawBricks()

function drawEverything() {
  colorRect(0, 0, canvas.width, canvas.height, 'black');

  drawBricks();
  
  canvasContext.fillStyle = 'white';
  canvasContext.fillText("Arrow keys to run, spacebar to jump",8,14);

  colorCircle(jumperX, jumperY, JUMPER_RADIUS, 'white');
}