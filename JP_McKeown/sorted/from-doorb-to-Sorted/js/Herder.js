// tuning constants
const TURN_RATE = 0.03;
const PLAYER_MOVE_SPEED = 7.0;
const ATTRACT_RANGE = 70;

function herderClass() {

  // keyboard hold state variables, to use keys more like buttons
  this.keyHeld_North = false; 
  this.keyHeld_East = false; 
  this.keyHeld_South = false; 
  this.keyHeld_West = false; 

  // key controls used for this
  this.setupControls = function(northKey,eastKey,southKey,westKey) { 
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
    this.keysHeld = 0;
    this.speed = 0;
    this.ang = Math.PI *2;

    if(this.homeX == undefined) {
      for(var i=0; i<roomGrid.length; i++) {
        if( roomGrid[i] == TILE_PLAYER) {
          var tileRow = Math.floor(i/TILE_COLS);
          var tileCol = i%TILE_COLS;
          this.homeX = tileCol * TILE_W + 0.5*TILE_W;
          this.homeY = tileRow * TILE_H + 0.5*TILE_H;
          roomGrid[i] = TILE_GROUND;
// console.log('herder tile swapped to ground')
          break; // found it, so no need to keep searching 
        } // end of if
      } // end of for
    } // end of if position not saved yet
    
    this.x = this.homeX;
    this.y = this.homeY;

  } // end of reset
  
  this.move = function() {
    var nextX = this.x;
    var nextY = this.y;

    if(this.keyHeld_West) { 
      nextX -= PLAYER_MOVE_SPEED;
    }
    if(this.keyHeld_East) { 
      nextX += PLAYER_MOVE_SPEED;
    }
    if(this.keyHeld_North) { 
      nextY -= PLAYER_MOVE_SPEED;
    }
    if(this.keyHeld_South) { 
      nextY += PLAYER_MOVE_SPEED;
    }

    var enterTileIndex = getTileIndexAtPixelCoord(nextX,nextY);
    var movingIntoTileType = TILE_WALL;

    if(enterTileIndex != undefined) {
      movingIntoTileType = roomGrid[enterTileIndex];
    }
    
    switch( movingIntoTileType) {
      case TILE_GROUND:
        // allow current move to complete
        this.x = nextX;
        this.y = nextY;
document.getElementById("debugText").innerHTML = this.myName + " is in the field";
        break;
      case TILE_GOAL:
        // piper has to go in pen to get meep to follow
document.getElementById("debugText").innerHTML = this.myName + " entered pen";
        this.x = nextX;
        this.y = nextY;
        break;
      case TILE_DOOR:
        // if key held remove door
        if(this.keysHeld > 0) {
          this.keysHeld--;
document.getElementById("debugText").innerHTML = this.keysHeld + " Keys in hand";
          roomGrid[enterTileIndex] = TILE_GROUND;
        }
        break;
      case TILE_KEY:
        // remove key from screen
        this.keysHeld++;
        document.getElementById("debugText").innerHTML = this.keysHeld + " Keys in hand";
        roomGrid[enterTileIndex] = TILE_GROUND;
        break;
      case TILE_WALL:
      default:
        //
        break;
    }

    var nearest = this.getNearest(meep);
// console.log(nearest.id)
    if(nearest.dist < ATTRACT_RANGE && meep[nearest.id].color == 'blue') {
      meep[nearest.id].state = LED;
      // meep[nearest.id].color = "purple";
      meep[nearest.id].speed = 12;
    }
  }
  
  this.draw = function() {
    drawBitmapCenteredAtLocationWithRotation( this.myBitmap, this.x, this.y, this.ang );
  }

  this.getNearest = function(aList) {
    var nearestDist = 999;
    var nearestFound = null;
    for(var i=0; i < aList.length; i++) {
      var distTo = aList[i].distFrom(this.x, this.y);
// console.log("checking meep", i, distTo)
      if(distTo < nearestDist) {
        nearestDist = distTo;
        nearestFound = i;
      }
    }
// console.log("nearest is meep", nearestFound)
    var obj = {
      id: nearestFound,
      dist: nearestDist,
    }
    return obj;
  }
} // end of class