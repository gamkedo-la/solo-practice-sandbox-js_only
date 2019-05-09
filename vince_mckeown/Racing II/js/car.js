const DRIVE_POWER = 0.5;
const REVERSE_POWER = 0.2;
const TURN_RATE = 0.03;
const MIN_TURN_SPEED = 0.5;
const GROUNDSPEED_DECAY_MULT = 0.94;

function carClass() {
    this.x = 60;
    this.y = 60;

    this.keyHeld_Gas = false;
    this.keyHeld_Reverse = false;
    this.keyHeld_TurnLeft = false;
    this.keyHeld_TurnRight = false;
    this.turnable = true;

    this.carPic = document.createElement("img");

    this.setupControls = function(forwardKey, backKey, leftKey, rightKey) {
        this.controlKeyForGas = forwardKey;
        this.controlKeyForReverse = backKey;
        this.controlKeyForTurnLeft = leftKey;
        this.controlKeyForTurnRight = rightKey;
    }

    this.carReset = function() {
        this.speed = 0;
        this.ang = -0.5 * Math.PI;

        if (this.homeX == undefined) {
            for (var i = 0; i < trackGrid.length; i++) {
                if (trackGrid[i] == TRACK_PLAYER) {
                    var tileRow = Math.floor(i / TRACK_COLS);
                    var tileCol = i % TRACK_COLS;
                    this.homeX = tileCol * TRACK_W + 0.5 * TRACK_W;
                    this.homeY = tileRow * TRACK_H + 0.5 * TRACK_H;
                    trackGrid[i] = TRACK_ROAD;
                    break;
                }
            }
        }
        this.x = this.homeX;
        this.y = this.homeY;
    }

    this.carInit = function(whichGraphic, whichName) {
        this.myBitmap = whichGraphic;
        this.myName = whichName;
        this.carReset();
    }

    this.movement = function() {

        this.speed *= GROUNDSPEED_DECAY_MULT;

        if (this.keyHeld_Gas) {
            this.speed += DRIVE_POWER;
        }
        if (this.keyHeld_Reverse) {
            this.speed -= REVERSE_POWER;
        }
        if (Math.abs(this.speed) >= MIN_TURN_SPEED) {
            if (this.keyHeld_TurnLeft && this.turnable) {
                this.ang -= TURN_RATE * Math.PI;
            }
            if (this.keyHeld_TurnRight && this.turnable) {
                this.ang += TURN_RATE * Math.PI;
            }
        }



        // Motion X and Y of the car
        var nextX = this.x + Math.cos(this.ang) * this.speed;
        var nextY = this.y + Math.sin(this.ang) * this.speed;

        var drivingIntoTileType = getTrackAtPixelCoord(nextX, nextY);

        switch (drivingIntoTileType) {

            case TRACK_ROAD:
                this.x = nextX;
                this.y = nextY;
                this.speed *= 1;
                this.turnable = true;
                break;
            case TRACK_OIL_SLICK:
                this.x = nextX;
                this.y = nextY;
                this.speed *= 1;
                this.turnable = false;
                break;
            case TRACK_GRASS:
                this.x = nextX;
                this.y = nextY;
                this.speed *= 0.5;
                this.turnable = true;
                break;

            case TRACK_FINISH:
                document.getElementById("debugText").innerHTML = this.myName + " is the WINNER!";
                playerOne.carReset();
                playerTwo.carReset();
                break;
            default:
                this.speed = -0.5 * this.speed;
        }

    }

    this.drawCar = function() {
        drawBitmapCenteredAtLocationWithRotation(this.myBitmap, this.x, this.y, this.ang);
    }
}