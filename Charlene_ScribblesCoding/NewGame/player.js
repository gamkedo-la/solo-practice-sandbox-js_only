const PLAYER_MOVE_SPEED = 3.0;

function playerClass() {
    // variables to keep track of player position
    this.x = 75;
    this.y = 75;

    // keyboard hold state variables, to use keys more like buttons
    this.keyHeld_North = false;
    this.keyHeld_East = false;
    this.keyHeld_South = false;
    this.keyHeld_West = false;

    // key controls used for this player 
    this.setupControls = function (northKey, eastKey, southKey, westKey) {
        this.controlKeyForNorth = northKey;
        this.controlKeyForEast = eastKey;
        this.controlKeyForSouth = southKey;
        this.controlKeyForWest = westKey;
    }

    this.init = function () {
        this.reset();
    }

    this.reset = function () {
        this.keysHeld = 0;

        this.x = 75;
        this.y = 75;
    }

    this.move = function () {
        var nextX = this.x;
        var nextY = this.y;

        if (this.keyHeld_North) {
            nextY -= PLAYER_MOVE_SPEED;
        }

        if (this.keyHeld_East) {
            nextX += PLAYER_MOVE_SPEED;
        }

        if (this.keyHeld_South) {
            nextY += PLAYER_MOVE_SPEED;
        }

        if (this.keyHeld_West) {
            nextX -= PLAYER_MOVE_SPEED;
        }
    }

    this.draw = function () {
        colorCircle(this.x, this.y, 20, 0, "Black");
    }

}