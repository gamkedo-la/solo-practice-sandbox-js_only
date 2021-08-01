//
const GROUNDSPEED_DECAY_MULT = 0.94;
const DRIVE_POWER = 0.5;
const REVERSE_POWER = 0.2;
const TURN_RATE = 0.03;
const MIN_TURN_SPEED = 0.2;

function carClass() {

  // keyboard hold state variables, to use keys more like buttons
  this.keyHeld_Forward = false; ////
  this.keyHeld_Reverse = false; ////
  this.keyHeld_TurnLeft = false;
  this.keyHeld_TurnRight = false;

  // key controls used for this car 
  this.setupControls = function(forwardKey, backKey, leftKey, rightKey) {
    this.controlKeyForward = forwardKey; ////
    this.controlKeyReverse = backKey; ////
    this.controlKeyTurnLeft = leftKey; ////
    this.controlKeyTurnRight = rightKey; ////
  }

  this.carInit = function(whichImage, whichName) {
    this.bitmap = whichImage;
    this.name = whichName
    this.carReset();
  }

  this.carReset = function() {
    this.carSpeed = 0;
    this.carAng = -0.5 * Math.PI;
    // position car on screen
    for(let i = 0; i < TILES; i++) {
      if(trackGrid[i] == TILE_PLAYER) {
        let tileCol = i % TILE_COLS;
        let tileRow = Math.floor(i/TILE_COLS);
        this.carX = tileCol * TILE_W + 0.5 * TILE_W;
        this.carY = tileRow * TILE_H + 0.5 * TILE_H;
        trackGrid[i] = TILE_ROAD;
  
        document.getElementById('debugText').innerHTML =
          'Car starts at tile: ' + tileCol + ',' + tileRow +
          ' Pixel coordinate: ' + this.carX + ',' + this.carY;
        break;  
      }
    }
  }

  this.carMove = function() {
    this.carSpeed *= GROUNDSPEED_DECAY_MULT;

    if(Math.abs(this.carSpeed) >= MIN_TURN_SPEED) {
      if(this.keyHeld_TurnLeft) {
        this.carAng -= TURN_RATE * Math.PI;
      }
      if(this.keyHeld_TurnRight) {
        this.carAng += TURN_RATE * Math.PI;
      }
    }

    if(this.keyHeld_Forward) {
      this.carSpeed += DRIVE_POWER;
    }
    if(this.keyHeld_Reverse) {
      this.carSpeed -= REVERSE_POWER;
    }

    if(this.carY > canvas.height) { // if car has moved beyond the bottom edge
      carReset();
    }
  
    var nextX = this.carX + Math.cos(this.carAng) * this.carSpeed; // move car
    var nextY = this.carY + Math.sin(this.carAng) * this.carSpeed; // move car

    var drivingIntoTileType = getTileTypeAtPixelCoord(nextX, nextY);

    if(drivingIntoTileType == TILE_ROAD) {
      this.carX = nextX;
      this.carY = nextY;
    } else if(drivingIntoTileType == TILE_GOAL) {
      document.getElementById('debugText').innerHTML = this.name + ' won the race.';
    } else {
      this.carSpeed *= -0.5;
    }
  }

  this.carDraw = function() {
    if(true) {
      drawBitmapCenteredAtlocationWithRotation(this.bitmap, this.carX, this.carY, this.carAng);
    }
  }
}  // ends Class


      // if(carX < 0) { // if car has moved beyond the left edge
    //   carSpeedX *= -1; // reverse car's horizontal direction
    // }
    
    // if(carX > canvas.width) { // if car has moved beyond the right edge
    //   carSpeedX *= -1; // reverse car's horizontal direction
    // }

        // if(carY < 0) { // if car has moved beyond the top edge
    //   carSpeedY *= -1; // reverse car's vertical direction
    // }
    