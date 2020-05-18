const PLAYER_MOVE_SPEED = 3.0;

function Player() {
    // keep track of player's position
    this.x = 50;
    this.y = 500;

    this.keyHeld_North = false;
    this.keyHeld_East = false;
    this.keyHeld_South = false;
    this.keyHeld_West = false;

    this.setupControls = function(northKey, eastKey, southKey, westKey) {
        this.controlKeyForNorth = northKey;
        this.controlKeyForEast = eastKey;
        this.controlKeyForSouth = southKey;
        this.controlKeyForWest = westKey;
    }

    // initialize character
    this.init = function() {
        this.character = colorRect(this.x, this.y, 20, 50, "black");
    }

    this.move = function() {
        // var nextX = this.x;
        // var nextY = this.y;

        if (this.keyHeld_North) {
            this.y -= PLAYER_MOVE_SPEED;
        }

        if (this.keyHeld_East) {
            this.x += PLAYER_MOVE_SPEED;
        }
        
        if (this.keyHeld_South) {
            this.y += PLAYER_MOVE_SPEED;
        }

        if (this.keyHeld_West) {
            this.x -= PLAYER_MOVE_SPEED;
        }
    }
}