const GROUNDSPEED_DECAY_MULT = 0.94;
const DRIVE_POWER = 0.5;
const REVERSE_POWER = 0.2; 
const TURN_RATE = 0.06;
const MIN_SPEED_TO_TURN = 0.5;

function carClass(){

    this.x = 75;
    this.y = 75;
    this.speed = 0;
    this.ang = 0;
    this.myCarPic; //which picture to use.
    this.name = "Untitled Car";

    this.keyHeld_Gas = false;
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

    this.draw = function(){
        drawBitmapCenteredWithRotation(this.myCarPic, this.x, this.y, this.ang);
    }

    this.reset = function(whichImage, carName){

        this.myCarPic = whichImage;
        this.name = carName;
        this.speed = 0;

        for(var row = 0; row < TRACK_ROWS; row++){
            for(var col = 0; col<TRACK_COLS; col++){

                var arrayIndex = TRACK_COLS * row + col;

                if(trackGrid[arrayIndex] == TRACK_PLAYERSTART){
                    trackGrid[arrayIndex] = TRACK_ROAD;
                    this.ang = -Math.PI/2;
                    this.x = col * TRACK_W + TRACK_W/2;
                    this.y = row * TRACK_H + TRACK_H/2;
                    return;
                } //end of player start if
            }
        }
        console.log("No player start found");
    }

    this.move = function(){
        
        this.speed *= GROUNDSPEED_DECAY_MULT;

        if(this.keyHeld_Gas){
            this.speed += DRIVE_POWER;
        }

        if(this.keyHeld_Reverse){
            this.speed -= REVERSE_POWER;
        }
        if(Math.abs(this.speed)>MIN_SPEED_TO_TURN){
            if(this.keyHeld_TurnLeft){
                this.ang -= TURN_RATE;
            }

            if(this.keyHeld_TurnRight){
                this.ang += TURN_RATE;
            }
        }

        this.x += Math.cos(this.ang) * this.speed;
        this.y += Math.sin(this.ang) * this.speed;

        carTrackHandling(this);

        //carAng += 0.02;

    }

}