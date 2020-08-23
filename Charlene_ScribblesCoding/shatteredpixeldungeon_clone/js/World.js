// track constants and variables
const TILE_W = 50;
const TILE_H = 50;
const ROOM_COLS = 16;
const ROOM_ROWS = 12;
var roomGrid =
    [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 
      1, 0, 0, 3, 0, 0, 1, 0, 0, 0, 0, 3, 1, 1, 1, 1, 
      1, 0, 0, 0, 0, 0, 1, 0, 2, 0, 1, 1, 1, 0, 3, 1, 
      1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 1, 
      1, 1, 1, 0, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 1, 1,
      1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1,
      1, 0, 0, 0, 3, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1,
      1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1,
      1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1,
      1, 0, 0, 0, 0, 0, 0, 0, 3, 0, 1, 1, 1, 1, 1, 1,
      1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 1, 1,
      1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
const TILE_GROUND = 0;
const TILE_WALL = 1;
const TILE_PLAYER = 2;
const TILE_GOAL = 3;
const TILE_KEY = 4;
const TILE_DOOR = 5;

function roomTileToIndex(tileCol, tileRow) {
  return (tileCol + ROOM_COLS*tileRow);
}

function getTileIndexAtPixelCoord(pixelX,pixelY) {
  var tileCol = pixelX / TILE_W;
  var tileRow = pixelY / TILE_H;
  
  // we'll use Math.floor to round down to the nearest whole number
  tileCol = Math.floor( tileCol );
  tileRow = Math.floor( tileRow );

  // first check whether the car is within any part of the track wall
  if(tileCol < 0 || tileCol >= ROOM_COLS ||
     tileRow < 0 || tileRow >= ROOM_ROWS) {
     document.getElementById("debugText").innerHTML = "Out of bounds: " + pixelX + ", " + pixelY;
     return undefined;
  }
  
  var tileIndex = roomTileToIndex(tileCol, tileRow);
  return tileIndex;
}

function tileTypeHasTransparency(checkTileType) {
  return (checkTileType == TILE_GOAL || 
          checkTileType == TILE_KEY ||
          checkTileType == TILE_DOOR)
}

function drawRoom() {
  var tileIndex = 0;
  var tileLeftEdgeX = 0;
  var tileTopEdgeY = 0;
  
  for(var eachRow = 0; eachRow < ROOM_ROWS; eachRow++) { 
    tileLeftEdgeX = 0;
    for(var eachCol = 0; eachCol < ROOM_COLS; eachCol++) {

      var tileTypeHere = roomGrid[tileIndex];
      if (tileTypeHasTransparency(tileTypeHere)) {
        canvasContext.drawImage(tilePics[TILE_GROUND], tileLeftEdgeX, tileTopEdgeY);
      }
      canvasContext.drawImage(tilePics[tileTypeHere], tileLeftEdgeX, tileTopEdgeY);
      
      tileIndex++;     
      tileLeftEdgeX += TILE_W; 
    }  
    tileTopEdgeY += TILE_H; 
  }    
} 