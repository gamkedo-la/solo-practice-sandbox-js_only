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
      var playersLocation = pixCoordToIndex(pathFinderX,pathFinderY);
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
              tileBGColor = '#bbbb0080';
              break;
          case PATH: ///// updated to include hVal
              pieceName += "" + this.distance + " " + this.hVal.toFixed(1);
              tileBGColor = '#00000080';
              break;
      }
  
      var tileLeftEdgeX = this.tilC * GRID_WIDTH;
      var tileTopEdgeY = this.tilR * GRID_HEIGHT;
  
      colorRect(tileLeftEdgeX, tileTopEdgeY, GRID_WIDTH, GRID_HEIGHT, tileBGColor);
      canvasContext.fillStyle = 'white';
      //canvasContext.fillText(pieceName, tileLeftEdgeX + GRID_WIDTH / 2, tileTopEdgeY + GRID_HEIGHT / 2);
  
      /*if (tileOverIdx == this.tilIdx) { // mouseover?
          outlineRect(tileLeftEdgeX, tileTopEdgeY, GRID_WIDTH, GRID_HEIGHT, 'green');
      }*/
    }
    
    this.setGoal = function () {
       this.elementType = DEST;
    }
    
    this.isNotPassible = function(elementType){
      updatedElementType = elementType;
  
      if(elementType == 0){
        return NOTHING;
      } else {
        return WALL;
      } 
  
      // Trying approach above based on Coll Grid versus World Grid
  
      if(tileTypeWalkable(updatedElementType)){ //if player can walk on it, so can the enemy
        return NOTHING;
      }
      if(	updatedElementType == presetUnwalkableTiles[0] //This can expand for all unwalkable tiles
        ){
          return WALL;		
        } else if (updatedElementType == playerUnits[0]){
        return SOURCE;
      } else {
        return elementType;
      }
    }
    
    this.setTile = function(toType) {
      this.elementType=toType;
    }
  
    function GetGridAtCR(atC,atR) {
      return grid[atC + atR * TILE_COLS];
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
      if(this.tilC < TILE_COLS-1) {
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
      if(this.tilR < TILE_ROWS-1) {
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