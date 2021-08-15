// Tim Chase
// Aug 15, 2020
// Racing game - Car stuff
var carPic = document.createElement('img');
var carPicLoaded = false;

var carX = 75;
var carY = 73;
var carAng = 0;
var carSpeed = 0;

const GROUNDSPEED_DECAY_MULT = 0.94;
const DRIVE_POWER = 0.5;
const REVERSE_POWER = 0.2;
const TURN_RATE = 0.03;

// car functions 
function carReset() {
    for(var eachRow=0;eachRow<TRACK_ROWS;eachRow++) {
        for(var eachCol=0;eachCol<TRACK_COLS;eachCol++) {
            var arrayIndex = rowColToArrayIndex(eachCol, eachRow);
            if(trackGrid[arrayIndex] == TRACK_PLAYERSTART) {
                trackGrid[arrayIndex] = TRACK_ROAD;  // found the start location, make it a road tile
                carAng = -Math.PI/2;
                carX = eachCol * TRACK_W;
                carY = eachRow * TRACK_H;
            }
        } // end cols
    } // end rows
} // end carReset

function carMove() {
    carSpeed *= GROUNDSPEED_DECAY_MULT;

    if(keyHeld_Gas){
        carSpeed += DRIVE_POWER;
    }
    if(keyHeld_Reverse){
        carSpeed -= REVERSE_POWER;
    }
    if(keyHeld_TurnLeft){
        carAng -= TURN_RATE;
    }
    if(keyHeld_TurnRight){
        carAng += TURN_RATE;
    }
    carX += Math.cos(carAng) * carSpeed;
    carY += Math.sin(carAng) * carSpeed;
}

function carDraw() {
    if(carPicLoaded) {
        drawBitmapCenteredWithRotation(carPic, carX, carY, carAng);
    }    
}

function carImageLoad() {
    carPic.onload = function() {
        carPicLoaded = true;
    }
    carPic.src = "player1car.png";
}