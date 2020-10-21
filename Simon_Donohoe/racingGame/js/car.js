
const GROUNDSPEED_DECAY_MULT= 0.94;
const DRIVE_POWER = 0.5;
const REVERSE_POWER = 0.2;
const TURN_RATE = 0.06;
const MIN_SPEED_TO_TURN = 0.05;


function carClass(){
  // car starting position variables
  this.x = 75;
  this.y = 75;
  this.ang = 0;
  // car speed variable
  this.speed = 0;
  this.myCarPic; // which picture to use
  this.name = "Untitled Car";

  this.keyHeld_Accel = false;
  this.keyHeld_Reverse = false;
  this.keyHeld_TurnLeft = false;
  this.keyHeld_TurnRight = false;

  this.controlKeyUp;
  this.controlKeyRight;
  this.controlKeyDown;
  this.controlKeyLeft;

  this.setupInput = function(upKey, rightKey, downKey, leftKey){
    this.controlKeyUp = upKey;
    this.controlKeyRight = rightKey;
    this.controlKeyDown = downKey;
    this.controlKeyLeft = leftKey;
  }

  this.reset = function(whichImage, carName) {
    this.name = carName;
    this.myCarPic = whichImage;
    this.speed = 0;

    for(let eachRow = 0; eachRow < TRACK_ROWS; eachRow++){
      for(let eachCol = 0; eachCol < TRACK_COLS; eachCol++){
        let arrayIndex = rowColToArrayIndex(eachCol, eachRow);
        if(trackGrid[arrayIndex] == TRACK_PLAYERSTART){
          trackGrid[arrayIndex] = TRACK_ROAD;
          this.ang = -Math.PI/2;
          this.x = eachCol * TRACK_W + TRACK_W/2;
          this.y = eachRow * TRACK_H + TRACK_H/2;
          return;  
        } // end of player start if
      } // end of for col
    } //end of for row
  } // end of carReset()

  this.move = function(){
    this.speed *= GROUNDSPEED_DECAY_MULT;

    if(this.keyHeld_Accel){
      this.speed += DRIVE_POWER;
    }
    if(this.keyHeld_Reverse){
      this.speed -= REVERSE_POWER;
    }
    if(Math.abs(this.speed) > MIN_SPEED_TO_TURN){
      if(this.keyHeld_TurnLeft){
        this.ang -= TURN_RATE;
      }
      if(this.keyHeld_TurnRight){
        this.ang += TURN_RATE;
      }
    }
    // updates the car position
    this.x += Math.cos(this.ang) * this.speed;
    this.y += Math.sin(this.ang) * this.speed;

    
  carTrackHandling(this);
  }

  this.draw = function(){
    drawBitmapCenteredWithRotation(this.myCarPic, this.x, this.y, this.ang);
  } //end of carDraw funct
} // end of carClass()