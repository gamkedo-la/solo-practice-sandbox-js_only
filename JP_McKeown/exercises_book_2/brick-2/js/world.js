'use strict';
// brick constants and variables
const BRICK_W = 80;
const BRICK_H = 20;
const BRICK_GAP = 2;
const BRICK_COLS = 10;
const BRICK_ROWS = 14;
var brickGrid = new Array(BRICK_COLS * BRICK_ROWS);
var bricksLeft; // will get set in resetBricks()

// paddle constants and variables
const PADDLE_WIDTH = 100;
const PADDLE_THICKNESS = 10;
const PADDLE_Y = 540;
var paddleX = 400;

function resetBricks() {
  bricksLeft = 0;
  for(var eachRow = 0; eachRow < BRICK_ROWS; eachRow++) {
    for (var eachCol = 0; eachCol < BRICK_COLS; eachCol++) {
      var brickIndex = brickTileToIndex(eachCol, eachRow);
      if(eachRow >= 3) { // only place bricks at or below margin line
        brickGrid[brickIndex] = 1;
        bricksLeft++;
      } else { // placing 0's for margin along the top
        brickGrid[brickIndex] = 0;
      } // end no brick in this row    
    } // end eachCol
  } // end eachRow
} // end resetBricks

function drawBricks() {
  for(var eachCol=0; eachCol<BRICK_COLS; eachCol++) { // in each column...
    for(var eachRow=0; eachRow<BRICK_ROWS; eachRow++) { // in each row within that col
      
      if( isBrickAtTileCoord(eachCol, eachRow) ) {
          // compute the corner in pixel coordinates of the corresponding brick
          // multiply the brick's tile coordinate by BRICK_W or BRICK_H for pixel distance
          var brickLeftEdgeX = eachCol * BRICK_W;
          var brickTopEdgeY = eachRow * BRICK_H;
          // draw a blue rectangle at that position, leaving a small margin for BRICK_GAP
          colorRect(brickLeftEdgeX, brickTopEdgeY,
                  BRICK_W - BRICK_GAP, BRICK_H - BRICK_GAP, 'blue' );
      } // end of isBrickAtTileCoord()
    } // end of for eachRow
  } // end of for eachCol
} 

function brickTileToIndex(tileCol, tileRow) {
  return (tileCol + BRICK_COLS*tileRow);
}
  
function isBrickAtTileCoord(brickTileCol, brickTileRow) {
  var brickIndex = brickTileToIndex(brickTileCol, brickTileRow);
  return (brickGrid[brickIndex] == 1);
}
  
function breakAndBounceOffBrickAtPixelCoord(pixelX,pixelY) {
  var tileCol = pixelX / BRICK_W;
  var tileRow = pixelY / BRICK_H;

  // we'll use Math.floor to round down to the nearest whole number
  tileCol = Math.floor( tileCol );
  tileRow = Math.floor( tileRow );

  // first check whether the ball is within any part of the brick wall
  if(tileCol < 0 || tileCol >= BRICK_COLS ||
      tileRow < 0 || tileRow >= BRICK_ROWS) {
      return false; // bail out of function to avoid illegal array position usage
  }
  var brickIndex = brickTileToIndex(tileCol, tileRow);

  if(brickGrid[brickIndex] == 1) {
      // now we know we overlap a brick let's
      // backtrack to see whether we changed rows or cols on way in
      var prevBallX = ballX-ballSpeedX;
      var prevBallY = ballY-ballSpeedY;
      var prevTileCol = Math.floor(prevBallX / BRICK_W);
      var prevTileRow = Math.floor(prevBallY / BRICK_H);

      var bothTestsFailed = true;

      if(prevTileCol != tileCol) { // must have come in horizontally
      var adjacentBrickIndex = brickTileToIndex(prevTileCol, tileRow);
      // make sure the side we want to reflect off isn't blocked!
        if(brickGrid[adjacentBrickIndex] != 1) {
            ballSpeedX *= -1;
            bothTestsFailed = false;
        }
      }

      if(prevTileRow != tileRow) { // must have come in vertically
          var adjacentBrickIndex = brickTileToIndex(tileCol, prevTileRow);
          // make sure the side we want to reflect off isn't blocked!
          if(brickGrid[adjacentBrickIndex] != 1) {
              ballSpeedY *= -1;
              bothTestsFailed = false;
          }
      }

      // we hit an "armpit" on the inside corner, this blocks going into it
      if(bothTestsFailed) {
          ballSpeedX *= -1;
          ballSpeedY *= -1;
      }

      brickGrid[brickIndex] = 0;
      bricksLeft--;

      score += 100;
      writeUI();
  }
}