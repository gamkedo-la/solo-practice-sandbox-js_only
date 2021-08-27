// warrior variables/constants
const ENEMY_MOVE_SPEED = 3.0;

function enemyClass() {
  // variables to keep track of warrior position
  this.x = 500;
  this.y = 500;

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
    // this.reset();
  }

  this.reset = function() {
    this.keysHeld = 0;
    if(this.homeX == undefined) {
      for(let i = 0; i < roomGrid.length; i++) {
        if(roomGrid[i] == TILE_ENEMY) {
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
      nextY -= ENEMY_MOVE_SPEED;
    }
    if(this.keyHeld_East) {
      nextX += ENEMY_MOVE_SPEED;
    }
    if(this.keyHeld_South) {
      nextY += ENEMY_MOVE_SPEED;
    }
    if(this.keyHeld_West) {
      nextX -= ENEMY_MOVE_SPEED;
    }
    
    let walkIntoTileIndex = getTileIndexAtPixelCoord(nextX, nextY);
    let walkIntoTileType = TILE_WALL;

    if(walkIntoTileType != undefined){
      walkIntoTileType = roomGrid[walkIntoTileIndex];
    } 

    switch(walkIntoTileType){
      case TILE_GROUND:
        this.x = nextX;
        this.y = nextY;
        break;
      case TILE_GOAL:
        document.getElementById("debugText").innerHTML = this.myName + " won";
        this.reset();
        break;
      case TILE_DOOR:
        if(this.keysHeld > 0){
          this.keysHeld--; // one less key
          document.getElementById("debugText").innerHTML = "Keys: " + this.keysHeld;
          roomGrid[walkIntoTileIndex] = TILE_GROUND; // remove door
        }
        break;
      case TILE_KEY:
        this.keysHeld++; // gain key
      document.getElementById("debugText").innerHTML = "Keys: " + this.keysHeld;
      roomGrid[walkIntoTileIndex] = TILE_GROUND; // remove key
      break;
      case TILE_WALL:
        default:
          // any other tile type number was found... do nothing, for now
          break;
    }
  }

  this.draw = function() {
      drawBitmapCenteredAtLocationWithRotation(this.myBitmap, this.x, this.y, 0.0);
  }
}