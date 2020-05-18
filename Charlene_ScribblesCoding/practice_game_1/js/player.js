const moveSpeed = 3.0;

function player() {
  // player's staring point
  this.x = 80;
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

  this.init = function(whichGraphic) {
    this.myBitmap = whichGraphic;
    this.reset();
  }

  this.move = function() {  
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
  
  this.draw = function() {
    drawBitmapCenteredAtLocationWithRotation(this.myBitmap, this.x, this.y, 0.0);
  }
}