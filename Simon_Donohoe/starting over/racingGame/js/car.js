// car variables/constants
const GROUNDSPEED_DECAY_MULT = 0.94;
const DRIVE_POWER = 0.5;
const REVERSE_POWER = -0.2;
const TURN_RATE = 0.03;
const MIN_TURN_SPEED = 0.5;

function carClass() {
  this.carX = 75;
  this.carY = 75;
  this.carSpeed = 0;
  this.carAng = -0.5 * Math.PI; // angle of car rotation

  this.carInit = function() {
    this.carReset();
  }

  this.carReset = function() {
    for(let i = 0; i < trackGrid.length; i++){
      if(trackGrid[i] == TRACK_PLAYER) {
        let tileRow = Math.floor(i/TRACK_COLS);
        let tileCol = i%TRACK_COLS;
        
        this.carX = tileCol * TRACK_W + 0.5*TRACK_W;
        this.carY = tileRow * TRACK_H + 0.5*TRACK_H;
        trackGrid[i] = TRACK_ROAD;
        
        break; //found it so no need to keep searching
      }
    }
  }

  this.moveCar = function(){
    if(Math.abs(this.carSpeed) > MIN_TURN_SPEED) {
      if(keyHeld_TurnLeft){
      carAng -= TURN_RATE * Math.PI; // same as: carAng -= 0.03* Math.PI;
      }
      if(keyHeld_TurnRight){
        this.carAng += TURN_RATE * Math.PI; 
      }
    }

    if(keyHeld_Gas){
      this.carSpeed += DRIVE_POWER;
    }
    if(keyHeld_Reverse){
      this.carSpeed += REVERSE_POWER;
    }
    
    let nextX = this.carX + Math.cos(this.carAng) * this.carSpeed;
    let nextY = this.carY + Math.sin(this.carAng) * this.carSpeed; 

    if(checkForTrackAtPixelCoord(nextX, nextY)){
      this.carX = nextX;
      this.carY = nextY;
    } else {
      this.carSpeed = -0.5 * carSpeed;
    }

    this.carSpeed *= GROUNDSPEED_DECAY_MULT;
  }

  this.drawCar = function() {
      drawBitmapCenteredAtLocationWithRotation(carPic, this.carX, this.carY, this.carAng);
  }
}