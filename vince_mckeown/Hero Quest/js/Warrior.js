function warriorClass() {
  this.x;
  this.y;
  this.movesAvailable = 6;
  this.startIdx;
  this.rightIdx;
  this.leftIdx;
  this.topIdx;
  this.bottomIdx;

  // keyboard hold state variables, to use keys more like buttons
  this.keyHeld_North = false;
  this.keyHeld_East = false;
  this.keyHeld_South = false;
  this.keyHeld_West = false;
  this.waitForKeyRelease = false;

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

	if(this.movesAvailable <= 0){
		return;
	}
	
	this.checkPathFinding();
    if(this.waitForKeyRelease){
      return;
    }
    if(this.keyHeld_North) {
      nextY -= TILE_H;
	    this.movesAvailable--;
      this.waitForKeyRelease = true;
    }
    if(this.keyHeld_East) {
      nextX += TILE_W;
	    this.movesAvailable--;
      this.waitForKeyRelease = true;
    }
    if(this.keyHeld_South) {
      nextY += TILE_H;
	    this.movesAvailable--;
      this.waitForKeyRelease = true;
    }
    if(this.keyHeld_West) {
      nextX -= TILE_W;
	    this.movesAvailable--;
      this.waitForKeyRelease = true;
    }
    console.log(this.movesAvailable)
        
    var walkIntoTileIndex = getTileIndexAtPixelCoord(nextX,nextY);
    var walkIntoTileType = TILE_WALL;
    
    if( walkIntoTileIndex != undefined) {
      walkIntoTileType = roomGrid[walkIntoTileIndex];
    }
    
    switch( walkIntoTileType ) {
      case TILE_GROUND:
        this.x = nextX;
        this.y = nextY;
        break;
      case TILE_GOAL:
        document.getElementById("debugText").innerHTML = this.myName + " won";
        this.reset();
        break;
      case TILE_DOOR:
        if(this.keysHeld > 0) {
          this.keysHeld--; // one less key
          document.getElementById("debugText").innerHTML = "Keys: "+this.keysHeld;

          roomGrid[walkIntoTileIndex] = TILE_GROUND; // remove door
        }
        break;
      case TILE_KEY:
        this.keysHeld++; // gain key
        document.getElementById("debugText").innerHTML = "Keys: "+this.keysHeld;

        roomGrid[walkIntoTileIndex] = TILE_GROUND; // remove key
        break;
      case TILE_WALL:
      default:
        // any other tile type number was found... do nothing, for now
        break;
    }
  }
  
  this.checkPathFinding = function(){
	  var startX = this.x;
	  var startY = this.y;

	  var xLeftOfCurrentIdx = startX + TILE_W;
	  var xRightOfCurrentIdx = startX - TILE_W;
	  var yAboveCurrentIdx = startY - TILE_H;
	  var yBelowCurrentIdx = startY + TILE_H;
	  
	  if(xLeftOfCurrentIdx < 0){
		leftIdx = 0;
	  }
	  if(xRightOfCurrentIdx > canvas.width){
		rightIdx = ROOM_COLS;
	  }
	  if(yAboveCurrentIdx < 0){
		yAboveCurrentIdx = 0;
	  }
	  if(yBelowCurrentIdx > canvas.height){
		yBelowCurrentIdx = ROOM_ROWS;
	  }
	  
	  this.startIdx = getTileIndexAtPixelCoord(startX,startY);
	  this.rightIdx = getTileIndexAtPixelCoord(xLeftOfCurrentIdx,startY);
	  this.leftIdx = getTileIndexAtPixelCoord(xRightOfCurrentIdx,startY);
	  this.topIdx = getTileIndexAtPixelCoord(startX,yAboveCurrentIdx);
	  this.bottomIdx = getTileIndexAtPixelCoord(startX,yBelowCurrentIdx);
	  
	  console.log("C: " + this.startIdx + " R: " + this.rightIdx + " L: " + this.leftIdx + " T: " + this.topIdx + " B: " + this.bottomIdx);		  
  }
  
  this.draw = function() {
    drawBitmapCenteredAtLocationWithRotation( this.myBitmap, this.x, this.y, 0.0 );
    let tileCol = this.startIdx / ROOM_COLS;
    console.log(tileCol)  // Need to calculate an X and Y position for the tile to be drawn using the Tile Index
    //colorRect(this.startIdx, topLeftY, TILE_W, TILE_H, "blue")

  }

} // end of class