// car variables/constants
const GROUNDSPEED_DECAY_MULT = 0.94;
const DRIVE_POWER = 0.5;
const REVERSE_POWER = 0.2;
const TURN_RATE = 0.03;
const MIN_TURN_SPEED = 0.5;

function carClass() {
  // variables to keep track of car position
  this.carX = 75;
  this.carY = 75;

  // keyboard hold state variables, to use keps more like button
  this.keyHeld_Gas = false;
  this.keyHeld_Reverse = false;
  this.keyHeld_TurnLeft = false;
  this.keyHeld_TurnRight = false;

  // key controls used for this car
  this.setupControls = function(forwardKey, backKey, leftKey, rightKey) {
    this.controlKeyForGas = forwardKey;
    this.controlKeyForReverse = backKey;
    this.controlKeyForTurnLeft = leftKey;
    this.controlKeyForTurnRight = rightKey;
  }

  this.carInit = function(whichGraphic, whichName) {
    this.myBitmap = whichGraphic;
    this.myName = whichName;
    this.carReset();
  }

  this.carReset = function() {
    this.carSpeed = 0;
    this.carAng = -0.5 * Math.PI; // angle of car rotation

    if(this.homeX == undefined) {
      for(let i = 0; i < trackGrid.length; i++) {
        if(trackGrid[i] == TRACK_PLAYER) {
          let tileRow = Math.floor(i / TRACK_COLS);
          let tileCol = i % TRACK_COLS;
          
          this.homeX = tileCol * TRACK_W + 0.5*TRACK_W;
          this.homeY = tileRow * TRACK_H + 0.5*TRACK_H;
          trackGrid[i] = TRACK_ROAD;
          break; //found it so no need to keep searching
        }
      }
    }
    this.carX = this.homeX;
    this.carY = this.homeY;
  }

  this.moveCar = function() {
    // only allow the car to turn while it's rolling
    if(Math.abs(this.carSpeed) > MIN_TURN_SPEED) {
      if(this.keyHeld_TurnLeft) {
        this.carAng -= TURN_RATE * Math.PI; // same as: carAng -= 0.03* Math.PI;
      }

      if(this.keyHeld_TurnRight) {
        this.carAng += TURN_RATE * Math.PI; 
      }
    }

    if(this.keyHeld_Gas){
      this.carSpeed += DRIVE_POWER;
    }

    if(this.keyHeld_Reverse){
      this.carSpeed -= REVERSE_POWER;
    }
    
    let nextX = this.carX + Math.cos(this.carAng) * this.carSpeed;
    let nextY = this.carY + Math.sin(this.carAng) * this.carSpeed; 

    let drivingIntoTileType = getTrackAtPixelCoord(nextX, nextY);

    if(drivingIntoTileType == TRACK_ROAD){
      this.carX = nextX;
      this.carY = nextY;
    } else if(drivingIntoTileType == TRACK_GOAL) {
      document.getElementById("debugText").innerHTML = this.myName + " won the race.";
      p1.carReset();
      p2.carReset();
    } else {
      this.carSpeed = 0.0;
    }

    this.carSpeed *= GROUNDSPEED_DECAY_MULT;
  }

  this.drawCar = function() {
      drawBitmapCenteredAtLocationWithRotation(this.myBitmap, this.carX, this.carY, this.carAng);
  }
}