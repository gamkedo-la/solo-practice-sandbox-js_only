const RUN_SPEED = 4.0;
const JUMP_POWER = 12.0;
const GROUND_FRICTION = 0.8;
const AIR_RESISTANCE = 0.95;
const GRAVITY = 0.6;

var jumperX = 75, jumperY = 75;
var jumperSpeedX = 0, jumperSpeedY = 0;
var jumperOnGround = false;
var jumperRadius = 10;

function jumperMove() {
   if(jumperOnGround) {
      jumperSpeedX *= GROUND_FRICTION;
    } else {
      jumperSpeedX *= AIR_RESISTANCE;
      jumperSpeedY += GRAVITY;
      if(jumperSpeedY > jumperRadius) { // cheap test to ensure can't fall through floor
        jumperSpeedY = jumperRadius;
      }
    }
  
    if(holdLeft) {
      jumperSpeedX = -RUN_SPEED;
    }
    if(holdRight) {
      jumperSpeedX = RUN_SPEED;
    }

    if(jumperSpeedY < 0 && isBrickAtPixelCoord(jumperX,jumperY-jumperRadius) == 1) {
      jumperY = (Math.floor( jumperY / BRICK_H )) * BRICK_H + jumperRadius;
      jumperSpeedY = 0.0;
    }
    
    if(jumperSpeedY > 0 && isBrickAtPixelCoord(jumperX,jumperY+jumperRadius) == 1) {
      jumperY = (1+Math.floor( jumperY / BRICK_H )) * BRICK_H - jumperRadius;
      jumperOnGround = true;
      jumperSpeedY = 0;
    } else if(isBrickAtPixelCoord(jumperX,jumperY+jumperRadius+2) == 0) {
      jumperOnGround = false;
    }
    
    if(jumperSpeedX < 0 && isBrickAtPixelCoord(jumperX-jumperRadius,jumperY) == 1) {
      jumperX = (Math.floor( jumperX / BRICK_W )) * BRICK_W + jumperRadius;
    }
    if(jumperSpeedX > 0 && isBrickAtPixelCoord(jumperX+jumperRadius,jumperY) == 1) {
      jumperX = (1+Math.floor( jumperX / BRICK_W )) * BRICK_W - jumperRadius;
    }
    
    jumperX += jumperSpeedX; // move the jumper based on its current horizontal speed 
    jumperY += jumperSpeedY; // same as above, but for vertical
  }
  
  function jumperReset() {
    // center jumper on screen
    jumperX = canvas.width/2;
    jumperY = canvas.height/2;
  }