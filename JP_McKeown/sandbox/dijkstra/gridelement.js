function GridElement() {
   this.tileC;
   this.tileR; // so each tile knows its own col and row position in overall grid
   this.tileIdx;

   this.elementType;
   this.distance;
   this.cameFrom; // GridElement reference to which tile we left to reach this one

   this.setup = function(myC, myR, myIdx, myElement) {
      this.reset();
      this.tileC = myC;
      this.tileR = myR;
      this.tileIdx = myIdx;
      this.elementType = myElement;
      if (this.elementType == SOURCE) {
         this.setDistIfLess(0, null);
      }
   };

   this.reset = function() {
      if (this.elementType == VISITED || this.elementType == PATH) {
         this.elementType = NOTHING;
      }
      this.distance = INFINITY_START_DISTANCE;
      this.cameFrom = null;
   };

   this.display = function() {
      var tileText = "";
      var tileBGColor = '#FF0000';

      switch (this.elementType) {
         case NOTHING:
            tileBGColor = '#aaaaaa';
            break;
         
         case SOURCE:
            tileText += "S";
            tileBGColor = '#55aa55';
            break;
         
         case DEST:
            tileText += "D";
            tileBGColor = '#bb5555';
            break;
         
         case WALL:
            tileText += "W";
            tileBGColor = '#555555';
            break;
         
         case VISITED:
            tileText += "" + this.distance + "";
            tileBGColor = '#bbbbbb';
            break;
         
         case PATH:
            tileText += "" + this.distance + "";
            tileBGColor = '#000000';
            break;
      }

      var tileLeftEdgeX = this.tileC * TILE_W;
      var tileTopEdgeY = this.tileR * TILE_H;

      colorRect(tileLeftEdgeX, tileTopEdgeY,
         TILE_W - TILE_GAP, TILE_H - TILE_GAP, tileBGColor);
      canvasContext.fillStyle = 'white';
      canvasContext.fillText(tileText,
         tileLeftEdgeX + TILE_W / 2, tileTopEdgeY + TILE_H / 2 + 3);

      if (tileOverIdx == this.tileIdx) { // mouseover?
         outlineRect(tileLeftEdgeX, tileTopEdgeY,
            TILE_W - TILE_GAP, TILE_H - TILE_GAP, 'green');
      }
   };

   this.wallToggle = function() {
      if (this.elementType == SOURCE || this.elementType == DEST) {
         return; // do nothing, no support yet for placing source or dest in-game, use grid init
      } else if (this.elementType == WALL) {
         this.elementType = NOTHING;
      } else {
         this.elementType = WALL;
      }
   };

   this.setTile = function(toType) {
      this.elementType = toType;
   };

   function GetGridAtCR(atC, atR) {
      return grid[atC + atR * TILE_COLS];
   }

   this.myUnvisitedNeighbors = function() {
      var myNeighbors = [];
      var consideredNeighbor;

      if (this.tileC > 0) {
         consideredNeighbor = GetGridAtCR(this.tileC - 1, this.tileR);
         if (arrayContains(unvisitedList, consideredNeighbor)) {
            myNeighbors.push(consideredNeighbor);
         }
      }

      if (this.tileC < TILE_W - 1) {
         consideredNeighbor = GetGridAtCR(this.tileC + 1, this.tileR);
         if (arrayContains(unvisitedList, consideredNeighbor)) {
            myNeighbors.push(consideredNeighbor);
         }
      }
      
      if (this.tileR > 0) {
         consideredNeighbor = GetGridAtCR(this.tileC, this.tileR - 1);
         if (arrayContains(unvisitedList, consideredNeighbor)) {
            myNeighbors.push(consideredNeighbor);
         }
      }
      
      if (this.tileR < TILE_H - 1) {
         consideredNeighbor = GetGridAtCR(this.tileC, this.tileR + 1);
         if (arrayContains(unvisitedList, consideredNeighbor)) {
            myNeighbors.push(consideredNeighbor);
         }
      }

      return myNeighbors;
   };

   this.isTileType = function(matchType) {
      return (this.elementType == matchType);
   };

   // function to update distance, do so only if less than previously found best distance
   this.setDistIfLess = function(newDistToConsider, comingFrom) {
      // console.log("comparing " + newDistToConsider + " vs " + this.distance);
      if (newDistToConsider < this.distance) {
         this.distance = newDistToConsider;
         this.cameFrom = comingFrom;
      }
   };

}//end class declaration
