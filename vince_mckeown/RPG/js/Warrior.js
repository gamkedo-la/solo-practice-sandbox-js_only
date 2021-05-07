// tuning constants
const PLAYER_MOVE_SPEED = 4.0;

function warriorClass() {
  // variables to keep track of position
  this.x;
  this.y;
  this.tilePath = [];
  this.pathfindingNow = false;
  this.moving = false;

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

  this.init = function(whichGraphic,whichName) {
    this.myBitmap = whichGraphic;
    this.myName = whichName;
    this.reset();
  }
  
  this.reset = function() {
    this.keysHeld = 0;
    if(this.homeX == undefined) {
      for(var i=0; i<roomGrid.length; i++) {
        if( roomGrid[i] == TILE_PLAYER) {
          var tileRow = Math.floor(i/ROOM_COLS);
          var tileCol = i%ROOM_COLS;
          this.homeX = tileCol * TILE_W + 0.5*TILE_W;
          this.homeY = tileRow * TILE_H + 0.5*TILE_H;
          roomGrid[i] = TILE_GROUND;
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
	
	var playerCol = Math.floor(this.x/TILE_W);
	var playerRow = Math.floor(this.y/TILE_H);
	
	var playersCurrentTileIndex = roomTileToIndex(playerCol, playerRow);
	
	if(this.tilePath.length > 0){
		var targetIndex = this.tilePath[0];
		//console.log(targetIndex);
		var targetC = targetIndex % ROOM_COLS;
		var targetR = Math.floor(targetIndex / ROOM_COLS);
		var targetX = targetC * TILE_W + (TILE_W * 0.5);
		var targetY = targetR * TILE_H + (TILE_H * 0.5);
		var deltaX = Math.abs(targetX - this.x);
		var deltaY = Math.abs(targetY - this.y);
		
		this.keyHeld_East = this.keyHeld_West = this.keyHeld_North = this.keyHeld_South = false;
		//console.log("DeltaX:" + deltaX + " DeltaY:" + deltaY + " Speed:" + PLAYER_MOVE_SPEED);
		
		if(deltaX <= PLAYER_MOVE_SPEED){
			this.x = targetX;
			if(deltaY <= PLAYER_MOVE_SPEED){
				this.y = targetY;
				this.tilePath.shift();
			} else if(targetY < this.y){
				this.keyHeld_North = true;
			} else {
				this.keyHeld_South = true;
			}
		} else if(deltaY <= PLAYER_MOVE_SPEED){
			this.y = targetY;
			if(deltaX <= PLAYER_MOVE_SPEED){
				this.x = targetX;
				this.tilePath.shift();
			} else if(targetX < this.x){
				this.keyHeld_West = true;
			} else {
				this.keyHeld_East = true;
			}
		} else { // move towards center of closest tile
			targetX = playerCol * TILE_W + (TILE_W * 0.5);
			targetY = playerRow * TILE_H + (TILE_H * 0.5);
			if(targetY < this.y - PLAYER_MOVE_SPEED){
				this.keyHeld_North = true;
			} else if (targetY > this.y + PLAYER_MOVE_SPEED) {
				this.keyHeld_South = true;
			} else if(targetX < this.x){
				this.keyHeld_West = true;
			} else {
				this.keyHeld_East = true;
			}
		}
	} 
	
	if(this.move_North || this.move_East || this.move_South || this.move_West){
		this.moving = true;
	} else {
		this.moving = false;
	}
	
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
        
    var walkIntoTileIndex = getTileIndexAtPixelCoord(nextX,nextY);
    var walkIntoTileType = TILE_WALL_7;
    
    if( walkIntoTileIndex != undefined) {
      walkIntoTileType = roomGrid[walkIntoTileIndex];
    }
	
	
    
    switch( walkIntoTileType ) {
      case TILE_GROUND:
        this.x = nextX;
        this.y = nextY;
        break;
      case TILE_GOAL:
        this.reset();
        break;
      case TILE_DOOR:
	  case TILE_DOOR_YELLOW_FRONT:
        console.log("Door");
		if(this.keysHeld > 0) {
          this.keysHeld--; // one less key
          document.getElementById("debugText").innerHTML = "Keys: "+this.keysHeld;
          roomGrid[walkIntoTileIndex] = TILE_GROUND; // remove door
		  SetupPathfindingGridData(p1);
        }
        break;
      case TILE_KEY:
        this.keysHeld++; // gain key
        document.getElementById("debugText").innerHTML = "Keys: "+this.keysHeld;
        roomGrid[walkIntoTileIndex] = TILE_GROUND; // remove key
		SetupPathfindingGridData(p1);
        break;
	  case TILE_WALL_1:
	  case TILE_WALL_2:
	  case TILE_WALL_3:
	  case TILE_WALL_4:
	  case TILE_WALL_5:
	  case TILE_WALL_6:
	  case TILE_WALL_7:	
      case TILE_WALL_8:
	  case TILE_WALL_9:
	  case TILE_WALL_10:
	  case TILE_WALL_11:
	  case TILE_WALL_12:
	  case TILE_WALL_13:
      default:
        // any other tile type number was found... do nothing, for now
        break;
    }
  }
  
  this.draw = function() {
    drawBitmapCenteredAtLocationWithRotation( this.myBitmap, this.x, this.y, 0.0 );
  }

} // end of class