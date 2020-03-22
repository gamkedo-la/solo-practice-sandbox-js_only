const moveSpeed = 3.0;

function player() {
    // player's staring point
    this.x = 50;
    this.y = 500;

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

    this.move = function() {
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
    
    this.draw = function() {
      colorRect(this.x, this.y, 20, 30, 'white');
    }
}