// Tile constants and variables
const TILE_W = 50;
const TILE_H = 50;
const TILE_COLS = 16;
const TILE_ROWS = 12;

var roomGrid = [ 
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
  0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
  5, 5, 5, 5, 5, 0, 0, 0, 0, 0, 0, 5, 5, 5, 5, 5,
];
const TILE_GROUND = 0;
const TILE_WALL = 1;
const TILE_PLAYER = 2;
const TILE_GOAL = 5;
const TILE_KEY = 4;
const TILE_DOOR = 3;

function tileTypeHasTransparency(tileType) {
  return(tileType == TILE_GOAL ||
        tileType == TILE_KEY ||
        tileType == TILE_DOOR);
}

function roomTileToIndex(tileCol, tileRow) {
  return (tileCol + TILE_COLS*tileRow);
}

function getTileIndexAtPixelCoord(pixelX,pixelY) { 
  var tileCol = pixelX / TILE_W;
  var tileRow = pixelY / TILE_H;
  
  // we'll use Math.floor to round down to the nearest whole number
  tileCol = Math.floor( tileCol );
  tileRow = Math.floor( tileRow );

  // first check whether the tile coords fall within valid bounds
  if(tileCol < 0 || tileCol >= TILE_COLS ||
              tileRow < 0 || tileRow >= TILE_ROWS) {
    document.getElementById("debugText").innerHTML	= "out	of	bounds:"+pixelX+","+pixelY;
    return undefined;
    //return TILE_WALL; // avoid invalid array access, treat out of bounds as wall
  }
  var tileIndex = roomTileToIndex(tileCol, tileRow);
  return tileIndex;
}

function drawRoom() {
  var tileIndex = 0;
  var tileLeftEdgeX = 0;
  var tileTopEdgeY = 0;
  
  for(var eachRow=0; eachRow<TILE_ROWS; eachRow++) { // deal with one row at a time
    
    tileLeftEdgeX = 0; // resetting horizontal draw position for tiles to left edge
    
    for(var eachCol=0; eachCol<TILE_COLS; eachCol++) { // left to right in each row

      var tileTypeHere = roomGrid[ tileIndex ]; // getting the tile code for this tile

      if(tileTypeHere == undefined) {
        console.log("Lacking grid data - maybe grid too short?");
        return;
      } // could be done externally by comparing sizes

      if(tileTypeHasTransparency(tileTypeHere)) {
        canvasContext.drawImage(tilePics[TILE_GROUND], tileLeftEdgeX, tileTopEdgeY);  
      }
// console.log(tileTypeHere);
      canvasContext.drawImage(tilePics[tileTypeHere], tileLeftEdgeX, tileTopEdgeY);
      
      tileIndex++; // increment which index we're going to next check for in the tile        
      tileLeftEdgeX += TILE_W; // jump horizontal draw position to next tile over by tile width

    } // end of for eachCol
    
    tileTopEdgeY += TILE_H; // jump horizontal draw position down by one full tile height
    
  } // end of for eachRow    
} // end of drawRoom()

function checkGridMatchColRow() {
  if(roomGrid.length == TILE_COLS*TILE_ROWS) {
    console.log("Grid has correct number of tiles matching columns * rows");
  }
  if(roomGrid.length > TILE_COLS*TILE_ROWS) {
    console.log("Grid has more tiles than allowed for by columns * rows");
  }
  if(roomGrid.length < TILE_COLS*TILE_ROWS) {
    console.log("Grid lacks enough tiles to fill required columns * rows");
  }
  console.log(roomGrid.length, TILE_COLS * TILE_ROWS)
}