// car starting position variables
let carX = 75;
let carY = 75;
let carAng = 0;

// car speed variables
let carSpeed = 0;

const GROUNDSPEED_DECAY_MULT= 0.94;
const DRIVE_POWER = 0.5;
const REVERSE_POWER = 0.2;
const TURN_RATE = 0.06;
const MIN_SPEED_TO_TURN = 0.05;

function carReset() {
  for(let eachRow = 0; eachRow < TRACK_ROWS; eachRow++){
    for(let eachCol = 0; eachCol < TRACK_COLS; eachCol++){

      let arrayIndex = rowColToArrayIndex(eachCol, eachRow);

      if(trackGrid[arrayIndex] == TRACK_PLAYERSTART){
        trackGrid[arrayIndex] = TRACK_ROAD;
        carAng = -Math.PI/2;
        carX = eachCol * TRACK_W + TRACK_W/2;
        carY = eachRow * TRACK_H + TRACK_H/2;
      }
    }
  }
}

function carMove(){
  carSpeed *= GROUNDSPEED_DECAY_MULT;

  if(keyHeld_Accel){
    carSpeed += DRIVE_POWER;
  }
  if(keyHeld_Reverse){
    carSpeed -= REVERSE_POWER;
  }
  if(Math.abs(carSpeed) > MIN_SPEED_TO_TURN){
    if(keyHeld_TurnLeft){
      carAng -= TURN_RATE;
    }
    if(keyHeld_TurnRight){
      carAng += TURN_RATE;
    }
  }

  
  // updates the car position
  carX += Math.cos(carAng) * carSpeed;
  carY += Math.sin(carAng) * carSpeed;
}

function carDraw(){
    drawBitmapCenteredWithRotation(carPic, carX, carY, carAng);
} //end of carDraw funct