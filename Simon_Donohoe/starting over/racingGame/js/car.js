// car variables/constants
const GROUNDSPEED_DECAY_MULT = 0.94;
const DRIVE_POWER = 0.5;
const REVERSE_POWER = -0.2;
const TURN_RATE = 0.03;
const MIN_TURN_SPEED = 0.5;
let carX = 75, carY = 75;
let carSpeed = 0;
let carAng = -0.5 * Math.PI; // angle of car rotation
let carPic = document.createElement("img"); // make the car an image
let carPicLoaded = false;

function moveCar(){
  if(keyHeld_Gas){
    carSpeed += DRIVE_POWER;
  }
  if(keyHeld_Reverse){
    carSpeed += REVERSE_POWER;
  }

  if(Math.abs(carSpeed) >= MIN_TURN_SPEED) {
    if(keyHeld_TurnLeft){
    carAng += -TURN_RATE * Math.PI; // same as: carAng -= 0.03* Math.PI;
    }
    if(keyHeld_TurnRight){
      carAng += TURN_RATE * Math.PI; 
    }
  }

  let nextX = carX + Math.cos(carAng) * carSpeed;
  let nextY = carY + Math.sin(carAng) * carSpeed; 

  if(checkForTrackAtPixelCoord(nextX, nextY)){
    carX = nextX;
    carY = nextY;
  } else {
    carSpeed = -0.5 * carSpeed;
  }

  carSpeed = carSpeed * GROUNDSPEED_DECAY_MULT;
}

function drawCar() {
  // carAng += 0.2;
  if(carPicLoaded) {
    drawBitmapCenteredAtLocationWithRotation(carPic, carX, carY, carAng);
  }
}

function carReset(){
  for(let i = 0; i < trackGrid.length; i++){
    if(trackGrid[i] == TRACK_PLAYER) {
      let tileRow = Math.floor(i/TRACK_COLS);
      let tileCol = i%TRACK_COLS;
      carX = tileCol * TRACK_W + 0.5*TRACK_W;
      carY = tileRow * TRACK_H + 0.5*TRACK_H;
      trackGrid[i] = TRACK_ROAD;
      document.getElementById("debugText").innerHTML = "Car starting at tile: ("+tileCol+", "+tileRow+") " + "Pixel coordinate: ("+carX+", "+carY+")";
      break; //found it so no need to keep searching
    }
  }
}

function carInit() {
  // load car image
  carPic.onload = function(){
    carPicLoaded = true; // don't try to display until it's loaded
  }
  carPic.src = "./img/player1.png";

  carReset();
}