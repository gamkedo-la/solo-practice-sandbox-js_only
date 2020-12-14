let canvas, canvasContext;


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
    
    // sliderReset();
  jumperReset();
}


// function drawBricks() {
//   for(let eachCol=0; eachCol<BRICK_COLS; eachCol++) { // in each column...
//     for(let eachRow=0; eachRow<BRICK_ROWS; eachRow++) { // in each row within that col
    
//       if( isBrickAtTileCoord(eachCol, eachRow) ) {
//         let brickLeftEdgeX = eachCol * BRICK_W;
//         let brickTopEdgeY = eachRow * BRICK_H;
//         colorRect(brickLeftEdgeX, brickTopEdgeY,
//                  BRICK_W - BRICK_GAP, BRICK_H - BRICK_GAP, 'blue' );
//       } // end of isBrickAtTileCoord()
//     } // end of for eachRow
//   } // end of for eachCol
// } // end of drawBricks()

function drawEverything() {
  colorRect(0, 0, canvas.width, canvas.height, 'black');

  // drawBricks();
  canvasContext.save();

  canvasContext.translate(-camPanX,-camPanY);

  
  drawOnlyBricksOnScreen();

  colorCircle(jumperX, jumperY, 10, 'white');

  canvasContext.restore();

  canvasContext.fillStyle = 'white';
  canvasContext.fillText("Arrow keys to run, spacebar to jump",8,14);

  // colorCircle(jumperX, jumperY, JUMPER_RADIUS, 'white');
}