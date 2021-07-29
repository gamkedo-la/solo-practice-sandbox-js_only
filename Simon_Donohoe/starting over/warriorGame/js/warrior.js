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
    if(this.homeX == undefined) {
      for(let i = 0; i < roomGrid.length; i++) {
        if(roomGrid[i] == TILE_PLAYER) {
          let tileRow = Math.floor(i / ROOM_COLS);
          let tileCol = i % ROOM_COLS;
          this.homeX = tileCol * TILE_W + 0.5 * TILE_W;
          this.homeY = tileRow * TILE_H + 0.5 * TILE_H;
          roomGrid[i] = TILE_GROUND;
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
    
    let walkIntoTileType = getTileAtPixelCoord(nextX, nextY);

    if(walkIntoTileType == TILE_GROUND){
      this.x = nextX;
      this.y = nextY;
    } else if(walkIntoTileType == TILE_GOAL) {
      document.getElementById("debugText").innerHTML = this.myName + " won.";
      this.reset();
    } 
  }

  this.draw = function() {
      drawBitmapCenteredAtLocationWithRotation(this.myBitmap, this.x, this.y, 0.0);
  }
}