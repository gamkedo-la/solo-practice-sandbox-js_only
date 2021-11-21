function GridElement() {
  this.tilC;
  this.tilR; // so each tile knows its own col and row position in overall grid
  this.tilIdx;

  this.hVal; ///// heuristic weight (some kind of distance) for A*
                  
  this.elementType;
  this.distance;
  this.cameFrom; // GridElement reference to which tile we left to reach this one
  
  this.setup = function(myC, myR, myIdx, myElement, whichPathFinder) {
    this.reset();
    this.tilC=myC;
    this.tilR=myR;
    this.tilIdx=myIdx;
    this.elementType = myElement;
	var elementTypeConsideration = this.elementType;
	this.elementType = this.isNotPassible(elementTypeConsideration);
	var pathFinderX = whichPathFinder.x;
	var pathFinderY = whichPathFinder.y;
	var playersLocation = getTileIndexAtPixelCoord(pathFinderX,pathFinderY);
	if(this.tilIdx == playersLocation){
		this.elementType = SOURCE;
		this.setDistIfLess(0,null);
	}
  }

  this.reset = function() {
    if (this.elementType==VISITED || this.elementType==PATH) {
      this.elementType=NOTHING;
    }
    this.distance = INFINITY_START_DISTANCE;
    this.cameFrom = null;
  }
  
  this.display = function() {
    var pieceName = "";
    var tileBGColor = '#FF000080';

    switch (this.elementType) {
        case NOTHING:
            tileBGColor = '#aaaaaa80'
            pieceName += "N" + (this.hVal).toFixed(1); ///// showing hVal
            break;
        case SOURCE:
            pieceName += "S";
            tileBGColor = '#55ff5580';
            break;
        case DEST:
            pieceName += "D";
            tileBGColor = '#aaaaff80';
            break;
        case WALL:
            pieceName += "W";
            tileBGColor = '#55555580';
            break;
        case VISITED: ///// updated to include hVal
            pieceName += ""+this.distance + " " + this.hVal.toFixed(1);
            tileBGColor = '#bbbbbb80';
            break;
        case PATH: ///// updated to include hVal
            pieceName += "" + this.distance + " " + this.hVal.toFixed(1);
            tileBGColor = '#00000080';
            break;
    }

    var tileLeftEdgeX = this.tilC * TILE_W;
    var tileTopEdgeY = this.tilR * TILE_H;

    colorRect(tileLeftEdgeX, tileTopEdgeY, TILE_W, TILE_H, tileBGColor);
    canvasContext.fillStyle = 'white';
    canvasContext.fillText(pieceName, tileLeftEdgeX + TILE_W / 2, tileTopEdgeY + TILE_H / 2);

    if (tileOverIdx == this.tilIdx) { // mouseover?
        outlineRect(tileLeftEdgeX, tileTopEdgeY, TILE_W, TILE_H, 'green');
    }
  }
  
  this.setGoal = function () {
     this.elementType = DEST;
  }
  
  this.isNotPassible = function(elementType){
	updatedElementType = elementType;
	if(	updatedElementType == TILE_DOOR ||
		updatedElementType == TILE_WALL_1 ||
		updatedElementType == TILE_WALL_2 ||
		updatedElementType == TILE_WALL_3 ||
		updatedElementType == TILE_WALL_4 ||
		updatedElementType == TILE_WALL_5 ||
		updatedElementType == TILE_WALL_6 ||
		updatedElementType == TILE_WALL_7 ||
		updatedElementType == TILE_WALL_8 ||
		updatedElementType == TILE_WALL_9 ||
		updatedElementType == TILE_WALL_10 ||
		updatedElementType == TILE_WALL_11 ||
		updatedElementType == TILE_WALL_12 ||
		updatedElementType == TILE_WALL_13 ||
		updatedElementType == TILE_WALL_14 ||
		updatedElementType == TILE_DOOR_YELLOW_FRONT_BOTTOM ||
    updatedElementType == TILE_DOOR_YELLOW_FRONT_TOP 
		){
			return WALL;		
    } else if (updatedElementType == TILE_PLAYER){
		return SOURCE;
	} else if (
		updatedElementType == TILE_KEY ||
    updatedElementType == TILE_DOOR_YELLOW_FRONT_TOP_OPEN ||
    updatedElementType == TILE_DOOR_YELLOW_FRONT_BOTTOM_OPEN ||
    updatedElementType == TILE_PRISON_GATE_TOP_OPEN ||
    updatedElementType == TILE_PRISON_GATE_BOTTOM_OPEN ||
		updatedElementType == TILE_GROUND 
		){
		return NOTHING;
	} else {
		return elementType;
	}
  }
  
  this.setTile = function(toType) {
    this.elementType=toType;
  }

  function GetGridAtCR(atC,atR) {
    return grid[atC + atR * ROOM_COLS];
  }
  
  this.myUnvisitedNeighbors = function() {
    var myNeighbors = [];
    var consideredNeighbor;
    
    if(this.tilC > 0) {
      consideredNeighbor = GetGridAtCR(this.tilC-1,this.tilR);
      if(arrayContains(unvisitedList,consideredNeighbor)) {
        myNeighbors.push( consideredNeighbor );
      }
    }
    if(this.tilC < TILE_W-1) {
      consideredNeighbor = GetGridAtCR(this.tilC+1,this.tilR);
      if(arrayContains(unvisitedList,consideredNeighbor)) {
        myNeighbors.push( consideredNeighbor );
      }
    }
    if(this.tilR > 0) {
      consideredNeighbor = GetGridAtCR(this.tilC,this.tilR-1);
      if(arrayContains(unvisitedList,consideredNeighbor)) {
        myNeighbors.push( consideredNeighbor );
      }
    }
    if(this.tilR < TILE_H-1) {
      consideredNeighbor = GetGridAtCR(this.tilC,this.tilR+1);
      if(arrayContains(unvisitedList,consideredNeighbor)) {
        myNeighbors.push( consideredNeighbor );
      }
    }
    
    return myNeighbors;
  }

  this.isTileType = function(matchType) {
    return (this.elementType == matchType);
  }
  
  // function to update distance, do so only if less than previously found best distance
  this.setDistIfLess = function(newDistToConsider, comingFrom) {
    //console.log("comparing " + newDistToConsider + " vs " + this.distance);
    if(newDistToConsider < this.distance) {
      this.distance = newDistToConsider;
      this.cameFrom = comingFrom;
    }
  }
}//end class declaration