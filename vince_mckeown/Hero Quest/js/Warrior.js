function warriorClass() {
  this.x;
  this.y;
  this.maxMoves = 6;
  this.movesAvailable = this.maxMoves;
  this.startIdx;
  this.rightIdx;
  this.leftIdx;
  this.topIdx;
  this.bottomIdx;
  this.walkable = false;

  // keyboard hold state variables, to use keys more like buttons
  this.keyHeld_North = false;
  this.keyHeld_East = false;
  this.keyHeld_South = false;
  this.keyHeld_West = false;
  this.waitForKeyRelease = false;

  // key controls used for this
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
      if (this.homeX == undefined) {
          for (var i = 0; i < roomGrid.length; i++) {
              if (roomGrid[i] == TILE_PLAYER) {
                  let tileRow = Math.floor(i / ROOM_COLS);
                  let tileCol = i % ROOM_COLS;
                  this.homeX = tileCol * TILE_W + 0.5 * TILE_W;
                  this.homeY = tileRow * TILE_H + 0.5 * TILE_H;
                  roomGrid[i] = TILE_GROUND;
                  break; // found it, so no need to keep searching 
              } // end of if
          } // end of for
      } // end of if position not saved yet

      this.x = this.homeX;
      this.y = this.homeY;

  } // end of reset

  this.move = function() {
      if (this.movesAvailable <= 0) {
          return;
      }
      var nextX = this.x;
      var nextY = this.y;

      this.checkPathFinding();
      if (this.waitForKeyRelease) {
          return;
      }
      if (this.keyHeld_North) {
          nextY -= TILE_H;
          this.movesAvailable--;
          this.waitForKeyRelease = true;
      }
      if (this.keyHeld_East) {
          nextX += TILE_W;
          this.movesAvailable--;
          this.waitForKeyRelease = true;
      }
      if (this.keyHeld_South) {
          nextY += TILE_H;
          this.movesAvailable--;
          this.waitForKeyRelease = true;
      }
      if (this.keyHeld_West) {
          nextX -= TILE_W;
          this.movesAvailable--;
          this.waitForKeyRelease = true;
      }
      // console.log(this.movesAvailable)

      var walkIntoTileIndex = getTileIndexAtPixelCoord(nextX, nextY);
      var walkIntoTileType = TILE_WALL;

      if (walkIntoTileIndex != undefined) {
          walkIntoTileType = roomGrid[walkIntoTileIndex];
      }

      switch (walkIntoTileType) {
          case TILE_GROUND:
              this.x = nextX;
              this.y = nextY;
              this.walkable = true;
              break;
          case TILE_GOAL:
              document.getElementById("debugText").innerHTML = this.myName + " won";
              this.reset();
              break;
          case TILE_DOOR:
              if (this.keysHeld > 0) {
                  this.keysHeld--; // one less key
                  document.getElementById("debugText").innerHTML = "Keys: " + this.keysHeld;
                  this.walkable = true;
                  roomGrid[walkIntoTileIndex] = TILE_GROUND; // remove door
              }
              break;
          case TILE_KEY:
              this.keysHeld++; // gain key
              document.getElementById("debugText").innerHTML = "Keys: " + this.keysHeld;
              roomGrid[walkIntoTileIndex] = TILE_GROUND; // remove key
              this.walkable = true;
              this.x = nextX;
              this.y = nextY;
              break;
          case TILE_WALL:
          default:
              this.walkable = false;
              // any other tile type number was found... do nothing, for now
              break;
      }
  }

  this.checkPathFinding = function() {
      var startX = this.x;
      var startY = this.y;

      var xLeftOfCurrentIdx = startX + TILE_W;
      var xRightOfCurrentIdx = startX - TILE_W;
      var yAboveCurrentIdx = startY - TILE_H;
      var yBelowCurrentIdx = startY + TILE_H;

      if (xLeftOfCurrentIdx < 0) {
          leftIdx = 0;
      }
      if (xRightOfCurrentIdx > canvas.width) {
          rightIdx = ROOM_COLS;
      }
      if (yAboveCurrentIdx < 0) {
          yAboveCurrentIdx = 0;
      }
      if (yBelowCurrentIdx > canvas.height) {
          yBelowCurrentIdx = ROOM_ROWS;
      }

      this.startIdx = getTileIndexAtPixelCoord(startX, startY);
      this.rightIdx = getTileIndexAtPixelCoord(xLeftOfCurrentIdx, startY);
      this.leftIdx = getTileIndexAtPixelCoord(xRightOfCurrentIdx, startY);
      this.topIdx = getTileIndexAtPixelCoord(startX, yAboveCurrentIdx);
      this.bottomIdx = getTileIndexAtPixelCoord(startX, yBelowCurrentIdx);

  }

  this.draw = function() {
      drawBitmapCenteredAtLocationWithRotation(this.myBitmap, this.x, this.y, 0.0);
      //CHANGE THIS TO A LIST
      //right
      let currentTileCol = whatIsMyColumn(this.startIdx);
      let currentTileRow = Math.floor(this.startIdx / ROOM_COLS);
      let currentTileColPix = currentTileCol * TILE_W;
      let currentTileRowPix = currentTileRow * TILE_H;
      document.getElementById("debugText").innerHTML = "Current Tile Col: " + currentTileCol + " Current Tile Row: "+ currentTileRow;
      let movesAvailableDisplay = this.movesAvailable;
   
      for(i=0; i<movesAvailableDisplay; i++){

         let nextTileColRight = currentTileCol + i;
         let nextTileColRightPix = nextTileColRight * TILE_W;
         let nextTileColLeft = currentTileCol - i;
         let nextTileColLeftPix = nextTileColLeft * TILE_W;
         let nextRowAbove = currentTileRow-i;
         let nextRowAbovePix = nextRowAbove*TILE_H;
         let nextRowBelow = currentTileRow + i;
         let nextRowBelowPix = nextRowBelow*TILE_H
         document.getElementById("debugText").innerHTML = "Next Tile Right: " + nextTileColRight + " Next Col Left: "+ nextTileColLeft;

         if(i>0){
          //right

           //up
           tileType = getTileIndexAtPixelCoord(currentTileColPix, nextRowAbovePix);
           tileTypeHere = roomGrid[tileType];
           tileName = nameOfTileType(tileTypeHere);
          // if(tileName != "Wall"){
            colorRect(nextTileColRightPix, nextRowAbovePix, TILE_W, TILE_H, "green");
            drawText("Up " + i, nextTileColRightPix+TILE_W/2 - 20, nextRowAbovePix+TILE_H/2, "orange");
            drawText(tileName, nextTileColRightPix+TILE_W/2 - 20, nextRowAbovePix+TILE_H/2+20, "orange");
            drawText(currentTileCol + ":" + currentTileRow, currentTileColPix, nextRowAbovePix, "black");
          // }
           for(ii=0; ii < movesAvailableDisplay-1; ii++){
            let nextRowTileColRight = currentTileCol + ii;
            let nextRowTileColRightPix = nextRowTileColRight * TILE_W
            console.log("i: " + i + " ii: " + ii);
            tileIndex = getTileIndexAtPixelCoord(nextRowTileColRightPix, nextRowAbovePix);
            tileTypeHere = roomGrid[tileIndex];
            tileName = nameOfTileType(tileTypeHere);
          //  if(tileName != "Wall"){
                colorRect(nextRowTileColRightPix, nextRowAbovePix, TILE_W, TILE_H, "pink");
                drawText("Up R " + ii, nextRowTileColRightPix+TILE_W/2 - 20, nextRowAbovePix+TILE_H/2, "white");
                drawText(tileName, nextRowTileColRightPix+TILE_W/2 - 20, nextRowAbovePix+TILE_H/2+20, "white");
                drawText(tileIndex, nextRowTileColRightPix+TILE_W/2 - 20, nextRowAbovePix+TILE_H/2-20, "white");
           // }
           }
           movesAvailableDisplay--

           /* //down 
           tileType = getTileIndexAtPixelCoord(currentTileColPix, nextRowBelowPix);
           tileTypeHere = roomGrid[tileType];
           tileName = nameOfTileType(tileTypeHere);
           if(tileName != "Wall"){
            colorRect(currentTileColPix, nextRowBelowPix, TILE_W, TILE_H, "purple");
            drawText("Down " + i, currentTileColPix+TILE_W/2 - 20, nextRowBelowPix+TILE_H/2, "orange");
            drawText(tileName, currentTileColPix+TILE_W/2 - 20, nextRowBelowPix+TILE_H/2+20, "orange");
           } */ 
        }
      } 
  }

} // end of class