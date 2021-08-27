//world/room constants and variables
const ROOM_ROWS = 12;
const ROOM_COLS = 16;

let roomGrid =
[ 
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
  1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
  1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
  1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
  1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
  1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
  1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 1,
  1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
  1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
  1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
  1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1
];

const TILE_W = 50;
const TILE_H = 50;

const TILE_GROUND = 0;
const TILE_WALL = 1;
const TILE_PLAYER = 2;
const TILE_GOAL = 3;
const TILE_TREE = 4;
const TILE_DOOR = 5;
const TILE_KEY = 6; 
const TILE_ENEMY = 7;

function tileTypeHasTransparency(checkTileType) {
  return (checkTileType == TILE_GOAL || checkTileType == TILE_KEY || checkTileType == TILE_DOOR || checkTileType == TILE_TREE);
}
  
function roomTileToIndex(tileColumn, tileRow){
  return (tileColumn + ROOM_COLS * tileRow);
}

function getTileIndexAtPixelCoord(pixelX, pixelY) {
  // two variables to find out which tile was hit
  let tileColumn = pixelX / TILE_W; 
  let tileRow = pixelY / TILE_H;

  // using Math.floor to round the number down
  tileColumn = Math.floor(tileColumn); 
  tileRow = Math.floor(tileRow);

  // first check whether the car is within any part of the tile wall
  if(tileColumn < 0 || tileColumn >= ROOM_COLS || tileRow < 0 || tileRow >= ROOM_ROWS) {
    document.getElementById("debugText").innerHTML = "out of bounds: " + pixelX + ", " + pixelY;
    return undefined;
  } 

  let tileIndex = roomTileToIndex(tileColumn, tileRow);
  return tileIndex;
}

function drawRoom(){
  let tileIndex = 0;
  let tileLeftEdgeX = 0;
  let tileTopEdgeY = 0;

    for(let eachRow = 0; eachRow < ROOM_ROWS; eachRow++){
      tileLeftEdgeX = 0;
      
      for(let eachCol = 0; eachCol < ROOM_COLS; eachCol++) {
        let tileTypeHere = roomGrid[tileIndex]; //getting the tile code for this tile
        
        if(tileTypeHasTransparency(tileTypeHere)){
          canvasContext.drawImage(tilePics[TILE_GROUND], tileLeftEdgeX, tileTopEdgeY);
        }

        canvasContext.drawImage(tilePics[tileTypeHere], tileLeftEdgeX,	tileTopEdgeY);

        tileIndex++; // increment which index we're going to next check for in the tile

        tileLeftEdgeX += TILE_W; // jump horizontal draw position to next tile over by tile width
    }

    tileTopEdgeY += TILE_H; // jump horizontal draw position down by one full tile height
  }
}