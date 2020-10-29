
const GROUNDSPEED_DECAY_MULT= 0.94;
const DRIVE_POWER = 0.5;
const REVERSE_POWER = 0.2;
//const TURN_RATE = 0.06;
const MIN_SPEED_TO_TURN = 0.05;


function warriorClass(){
  // warrior starting position variables
  this.x = 75;
  this.y = 75;
  this.ang = 0;
  // warrior speed variable
  this.speed = 0;
  this.myWarriorPic; // which picture to use
  this.name = "Untitled Warrior";

  this.keyHeld_Accel = false;
  this.keyHeld_Reverse = false;
  //this.keyHeld_TurnLeft = false;
  //this.keyHeld_TurnRight = false;

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

  this.reset = function(whichImage, warriorName) {
    this.name = warriorName;
    this.myWarriorPic = whichImage;
    this.speed = 0;

    for(let eachRow = 0; eachRow < WORLD_ROWS; eachRow++){
      for(let eachCol = 0; eachCol < WORLD_COLS; eachCol++){
        let arrayIndex = rowColToArrayIndex(eachCol, eachRow);
        if(worldGrid[arrayIndex] == WORLD_PLAYERSTART){
          worldGrid[arrayIndex] = WORLD_FLOOR;
          this.ang = -Math.PI/2;
          this.x = eachCol * WORLD_W + WORLD_W/2;
          this.y = eachRow * WORLD_H + WORLD_H/2;
          return;  
        } // end of player start if
      } // end of for col
    } //end of for row
  } // end of warriorReset()

  this.move = function(){
    this.speed *= GROUNDSPEED_DECAY_MULT;

    if(this.keyHeld_Accel){
      this.speed += DRIVE_POWER;
    }
    if(this.keyHeld_Reverse){
      this.speed -= REVERSE_POWER;
    }
    //if(Math.abs(this.speed) > MIN_SPEED_TO_TURN){
      //if(this.keyHeld_TurnLeft){
        //this.ang -= TURN_RATE;
      //}
      //if(this.keyHeld_TurnRight){
        //this.ang += TURN_RATE;
      //}
    //}
    // updates the warrior position
    this.x += Math.cos(this.ang) * this.speed;
    this.y += Math.sin(this.ang) * this.speed;

    
  warriorWorldHandling(this);
  }

  this.draw = function(){
    drawBitmapCenteredWithRotation(this.myWarriorPic, this.x, this.y, this.ang);
  } //end of warriorDraw funct
} // end of warriorClass()