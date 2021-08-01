    // track constants and variables
    const TILE_W = 40;
    const TILE_H = 40;
    const TILE_GAP = 0;
    const TILE_COLS = 20;
    const TILE_ROWS = 15;
    const TILES = TILE_COLS * TILE_ROWS;
  
    var trackGrid = new Array(TILE_COLS * TILE_ROWS);
  
    var trackGrid = //// now with 3's (GOAL), 4's (TREE), 5's (FLAG)
    [ 4, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4,
      4, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1,
      1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
      1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1,
      1, 0, 0, 0, 1, 1, 1, 4, 4, 4, 4, 1, 1, 1, 1, 1, 1, 0, 0, 1,
      1, 0, 0, 1, 1, 0, 0, 1, 4, 4, 1, 1, 0, 0, 0, 1, 1, 0, 0, 1,
      1, 0, 0, 1, 0, 0, 0, 0, 1, 4, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1,
      1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1,
      1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 5, 0, 0, 1, 0, 0, 1,
      1, 2, 2, 1, 0, 0, 5, 0, 0, 0, 5, 0, 0, 1, 0, 0, 1, 0, 0, 1,
      1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 5, 0, 0, 1,
      1, 1, 5, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1,
      0, 3, 0, 0, 0, 0, 1, 4, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1,
      0, 3, 0, 0, 0, 0, 1, 4, 4, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1,
      1, 1, 5, 1, 1, 1, 1, 4, 4, 4, 4, 4, 4, 1, 1, 1, 1, 1, 1, 1];
    const TILE_ROAD = 0;
    const TILE_WALL = 1;
    const TILE_PLAYER = 2;
    const TILE_GOAL = 3;
    const TILE_TREE = 4;
    const TILE_FLAG = 5;
  
  function drawTiles() {
    // to follow index sequence of grid array, complete each row
    let tileIndex = 0;
    let tileTopEdgeY = 0;
    let tileTypeHere;

    for(let row=0; row < TILE_ROWS; row++) { 
      let tileLeftEdgeX = 0;

      for(let col=0; col < TILE_COLS; col++) { // each column in that row

        tileTypeHere = trackGrid[tileIndex];
        canvasContext.drawImage(tilePics[tileTypeHere], tileLeftEdgeX, tileTopEdgeY);
        
        tileLeftEdgeX += TILE_W;
        tileIndex++;
      } // end of column

      tileTopEdgeY += TILE_H;
    } // end of row
  } // end of drawTiles()

  function tileColRowToIndex(tileCol, tileRow) {
    return (tileCol + TILE_COLS*tileRow);
  }

  function isWallAtTileCoord(trackTileCol, trackTileRow) {
    var trackIndex = tileColRowToIndex(trackTileCol, trackTileRow);
    return (trackGrid[trackIndex] == TILE_WALL);
  }
  
  // function checkForRoadAtPixelCoord(pixelX,pixelY) {
  //   var tileCol = pixelX / TILE_W;
  //   var tileRow = pixelY / TILE_H;
    
  //   // we'll use Math.floor to round down to the nearest whole number
  //   tileCol = Math.floor( tileCol );
  //   tileRow = Math.floor( tileRow );

  //   // first check whether the car is within any part of the track wall
  //   if(tileCol < 0 || tileCol >= TILE_COLS ||
  //      tileRow < 0 || tileRow >= TILE_ROWS) {
  //      return false; // bail out of function to avoid illegal array position usage
  //   }
    
  //   var trackIndex = tileColRowToIndex(tileCol, tileRow);

  //   return(trackGrid[trackIndex] == TILE_ROAD);
  // }
  function getTileTypeAtPixelCoord(pixelX, pixelY) {
    var tileCol = pixelX / TILE_W;
    var tileRow = pixelY / TILE_H;
    
    tileCol = Math.floor( tileCol );
    tileRow = Math.floor( tileRow );

    // first check whether car is within any part of drawn world
    if(tileCol < 0 || tileCol >= TILE_COLS ||
       tileRow < 0 || tileRow >= TILE_ROWS) {
       return TILE_WALL; // avoid invalid array access, treat outside world as wall
    }
    
    var trackIndex = tileColRowToIndex(tileCol, tileRow);

    return(trackGrid[trackIndex]);
  }