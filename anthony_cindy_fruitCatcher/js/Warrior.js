const WALK_SPEED = 4;
const REVERSE_POWER = 0.2;
const TURN_RATE = 0.05;
const MIN_SPEED_TO_TURN = 0.5;

function playerClass() { //create a class to easily create new players
    this.x = 75;
    this.y = 75;
    this.speed = 0;
    this.myPlayerPic; //which picture to use
    this.name = "Untitled Player"; //default name
    this.fruitsHeld = 0;

    this.keyHeld_North = false;
    this.keyHeld_South = false;
    this.keyHeld_West = false;
    this.keyHeld_East = false;

    this.controlKeyUp;
    this.controlKeyRight;
    this.controlKeyDown;
    this.controlKeyLeft;

    this.setupInput = function(upKey, rightKey, downKey, leftKey) {
        this.controlKeyUp = upKey;
        this.controlKeyRight = rightKey;
        this.controlKeyDown = downKey;
        this.controlKeyLeft = leftKey;
    }

    this.reset = function(whichImage, playerName) {
        this.name = playerName;
        this.myPlayerPic = whichImage;
        this.speed = 0;
        this.fruitsHeld = 0;
        for(var eachRow = 0; eachRow < WORLD_ROWS; eachRow++){
            for(var eachCol = 0; eachCol < WORLD_COLS; eachCol++){
                var arrayIndex = rowColtoArrayIndex(eachCol, eachRow);
                if(worldGrid[arrayIndex] == WORLD_PLAYERSTART) {
                    worldGrid[arrayIndex] = WORLD_ROAD;
                    this.x = eachCol * WORLD_W + WORLD_W/2;
                    this.y = eachRow * WORLD_H + WORLD_H/2;    
                    return;
                } // end of PlayerStart if - is this world here
            } //end of col for       
        } // end of row for
        console.log("NO PLAYER START FOUND!");
    } // end of playerReset func

    this.move = function(){
        // if(this.keyHeld_North) {
        //     this.y -= WALK_SPEED;
        //     // console.log("PRESSING NORTH");
        // }
        // if(this.keyHeld_South) {
        //     this.y += WALK_SPEED;
        // }
        if(this.keyHeld_West) {
            this.x -= WALK_SPEED;
        }
        if(this.keyHeld_East) {
            this.x += WALK_SPEED;
        }

        playerWorldHandling(this);
    }

    this.draw = function() {
        drawBitmapCenteredWithRotation(this.myPlayerPic, this.x, this.y, 0);
    }
}