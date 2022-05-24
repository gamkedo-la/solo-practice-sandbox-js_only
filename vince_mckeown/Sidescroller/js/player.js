const RUN_SPEED = 4.0;
const JUMP_POWER = 12.0;

var jumperX = 75, jumperY = 75;
var jumperSpeedX = 0, jumperSpeedY = 0;
var jumperOnGround = false;
var JUMPER_RADIUS = 10;

function jumperReset() {
    // center jumper on screen
    jumperX = canvas.width/2;
    jumperY = canvas.height/2;
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

     if(jumperSpeedY < 0 && isBrickAtPixelCoord(jumperX,jumperY-JUMPER_RADIUS)) {
       jumperY = (Math.floor( jumperY / TILE_H )) * TILE_H + JUMPER_RADIUS;
       jumperSpeedY = 0.0;
     }
     
     if(jumperSpeedY > 0 && isBrickAtPixelCoord(jumperX,jumperY+JUMPER_RADIUS)) {
       jumperY = (1+Math.floor( jumperY / TILE_H )) * TILE_H - JUMPER_RADIUS;
       jumperOnGround = true;
       jumperSpeedY = 0;
     } else if(isBrickAtPixelCoord(jumperX,jumperY+JUMPER_RADIUS + 2)) {
       jumperOnGround = false;
     }
    
     if(jumperSpeedX < 0 && isBrickAtPixelCoord(jumperX-JUMPER_RADIUS,jumperY)) {
       jumperX = (Math.floor( jumperX / TILE_W )) * TILE_W + JUMPER_RADIUS;
     }

     if(jumperSpeedX > 0 && isBrickAtPixelCoord(jumperX+JUMPER_RADIUS,jumperY)) {
       jumperX = (1+Math.floor( jumperX / TILE_W )) * TILE_W - JUMPER_RADIUS;
     }
     
     jumperX += jumperSpeedX; // move the jumper based on its current horizontal speed 
     jumperY += jumperSpeedY; // same as above, but for vertical
   }

function drawPlayer(){
  canvasContext.drawImage(playerPic,0,0, 32, 32, jumperX, jumperY-16, 32, 32);
}