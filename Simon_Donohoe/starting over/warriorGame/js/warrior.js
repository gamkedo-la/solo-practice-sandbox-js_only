// warrior variables/constants
const PLAYER_MOVE_SPEED = 3.0;

function warriorClass() {
  // variables to keep track of warrior position
  this.x = 75;
  this.y = 75;

  // keyboard hold state variables, to use keps more like button
  this.keyHeld_North = false;
  this.keyHeld_East = false;
  this.keyHeld_South = false;
  this.keyHeld_West = false;

  // key controls used for this warrior
  this.setupControls = function(northKey, eastKey, southKey, westKey) {
    this.controlKeyForNorth = northKey;
    this.controlKeyForEast = eastKey;
    this.controlKeyForSouth = southKey;
    this.controlKeyForWest = westKey;
  }

  this.init = function(whichGraphic, whichName) {
    this.myBitmap = whichGraphic;
    this.myName = whichName;
    this.reset();
  }

  this.reset = function() {
    this.speed = 0;
    this.ang = -0.5 * Math.PI; // angle of warrior rotation

    if(this.homeX == undefined) {
      for(let i = 0; i < trackGrid.length; i++) {
        if(trackGrid[i] == TRACK_PLAYER) {
          let tileRow = Math.floor(i / TRACK_COLS);
          let tileCol = i % TRACK_COLS;
          this.homeX = tileCol * TRACK_W + 0.5*TRACK_W;
          this.homeY = tileRow * TRACK_H + 0.5*TRACK_H;
          trackGrid[i] = TRACK_ROAD;
          break; //found it so no need to keep searching
        }
      }
    }
    this.x = this.homeX;
    this.y = this.homeY;
  }

  this.move = function() {
    let nextX = this.x;
    let nextY = this.y;

    if(this.keyHeld_North) {
      nextY -= PLAYER_MOVE_SPEED;
    }
    if(this.keyHeld_East) {
      nextX += PLAYER_MOVE_SPEED;
    }
    if(this.keyHeld_South) {
      nextY += PLAYER_MOVE_SPEED;
    }
    if(this.keyHeld_West) {
      nextX -= PLAYER_MOVE_SPEED;
    }
    
    let walkIntoTileType = getTrackAtPixelCoord(nextX, nextY);

    if(walkIntoTileType == TRACK_ROAD){
      this.x = nextX;
      this.y = nextY;
    } else if(walkIntoTileType == TRACK_GOAL) {
      document.getElementById("debugText").innerHTML = this.myName + " won.";
      this.reset();
    } 
  }

  this.draw = function() {
      drawBitmapCenteredAtLocationWithRotation(this.myBitmap, this.x, this.y, 0.0);
  }
}