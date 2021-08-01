// track constants and variables
const TILE_W = 50;
const TILE_H = 50;
const TILE_GAP = 0;
const TILE_COLS = 16;
const TILE_ROWS = 12;

const TILE_GROUND = 0;
const TILE_WALL = 1;
const TILE_PLAYER = 2;
const TILE_GOAL = 3;
const TILE_KEY = 4;
const TILE_DOOR = 5;
const TILE_INVALID = 9;

const TILES = TILE_COLS * TILE_ROWS;
var tileGrid = new Array(TILE_COLS * TILE_ROWS);

var tileGrid = 
[ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, ////
  1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 5, 0, 1, 4, 0, 1, ////
  1, 0, 4, 0, 4, 0, 1, 0, 2, 0, 1, 0, 1, 4, 0, 1, ////
  1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 5, 1, 1, 5, 1, ////
  1, 1, 1, 5, 1, 1, 1, 0, 4, 0, 1, 0, 0, 0, 0, 1, ////
  1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 4, 0, 0, 1, ////
  1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, ////
  1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 4, 0, 0, 1, ////
  1, 0, 1, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, ////
  1, 0, 5, 0, 0, 5, 0, 0, 5, 0, 0, 3, 1, 1, 1, 1, ////
  1, 1, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 1, 1, 1, ////
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]; ////
  
function transparentTile(tileType) {
  return(tileType == TILE_DOOR || tileType == TILE_KEY || tileType == TILE_GOAL) 
} 

function drawTiles() {
  // to follow index sequence of grid array, complete each row
  let tileIndex = 0;
  let tileTopEdgeY = 0;
  let tileTypeHere;

  for(let row=0; row < TILE_ROWS; row++) { 
    let tileLeftEdgeX = 0;

    for(let col=0; col < TILE_COLS; col++) { // each column in that row

      tileTypeHere = tileGrid[tileIndex];
      if(transparentTile(tileTypeHere)) {
        ctx.drawImage(tilePics[TILE_GROUND], tileLeftEdgeX, tileTopEdgeY); // display ground under other tiles
      }
      ctx.drawImage(tilePics[tileTypeHere], tileLeftEdgeX, tileTopEdgeY);
      
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
  return (tileGrid[trackIndex] == TILE_WALL);
}

// is this needed?
function getTileTypeAtIndex(index) {
  return(tileGrid[index]);
}

function getTileIndexAtPixelCoord(pixelX, pixelY) {
  var tileCol = pixelX / TILE_W;
  var tileRow = pixelY / TILE_H;
  
  tileCol = Math.floor( tileCol );
  tileRow = Math.floor( tileRow );

  // first check whether car is within any part of drawn world
  if(tileCol < 0 || tileCol >= TILE_COLS ||
      tileRow < 0 || tileRow >= TILE_ROWS) {
      return TILE_INVALID; // avoid invalid array access, treat outside world as wall
  }
  return(tileColRowToIndex(tileCol, tileRow));
}