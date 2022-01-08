// world, room, and tile constants, variables
const ROOM_COLS = 32;
const ROOM_ROWS = 24;

var roomGrid =
    [ 11, 1, 1, 1,35, 1,20,19,20,35, 1, 1, 1, 1, 1, 1,16, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 9,
      11,23,23,23,34,23,21,22,21,34,23,23,23,23,23,23,15,23,23,23,23,23,23,23,23,23,23,23,23,23,23, 9,
      11, 2, 4, 0,33, 0, 0, 0, 0,33,30, 0, 0, 0, 0, 0,15, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9,
      11,31,31,36,31, 0, 0, 0, 4,31,31,36,31,31,31,31,15, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9,      
      11,32,32,37,32, 0, 0, 0, 0,32,32,37,32,32,32,32,15, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9,
      11,40, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,15, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9,
      11,41,43,44, 1, 1, 1,24, 1,43,44,16, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9,
      11,42,49,50,47,23,23,25,23,49,50,15,23,23,23,23,23, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9,
      11, 0,45,46,48,51, 0, 0, 0,46,46,15, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9,
      11, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,15, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9,
      11, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,15, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9,
      11, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,15, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9,
      11, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,15, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9,
      11, 1, 1, 1, 1, 1, 1,24, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9,
      11,23,23,23,23,23,23,25,23,23,23,23, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9,
      11, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9,      
      11, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9,
      11, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9,
      11, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9,
      11, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9,
      11, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9,
      11, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9,
      11, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9,
      17, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7,18];

const TILE_W = 50;
const TILE_H = 50;

//RE-NUMBER PRIOR TO PITCH

const TILE_GROUND = 0;
const TILE_PLAYER = 2;
const TILE_GOAL = 3;
const TILE_DOOR = 5;
const TILE_WALL_1 = 6;
const TILE_WALL_2 = 7;
const TILE_WALL_3 = 8;
const TILE_WALL_4 = 9;
const TILE_WALL_5 = 10;
const TILE_WALL_6 = 11;
const TILE_WALL_7 = 12;
const TILE_WALL_8 = 1;
const TILE_WALL_9 = 14;
const TILE_WALL_10 = 15;
const TILE_WALL_11 = 16;
const TILE_WALL_12 = 17;
const TILE_WALL_13 = 18;
const TILE_WALL_14 = 20;
const TILE_WALL_15 = 21;
const TILE_WALL_16 = 23;
const TILE_KEY = 4;
const TILE_DOOR_YELLOW_FRONT_TOP = 19;
const TILE_DOOR_YELLOW_FRONT_BOTTOM = 22;
const TILE_DOOR_YELLOW_FRONT_TOP_OPEN = 24;
const TILE_DOOR_YELLOW_FRONT_BOTTOM_OPEN = 25;
const TILE_ENEMY = 30;
const TILE_PRISON_WALL_1 = 31;
const TILE_PRISON_WALL_2 = 32;
const TILE_PRISON_WALL_3 = 33;
const TILE_PRISON_WALL_4 = 34;
const TILE_PRISON_WALL_5 = 35;
const TILE_PRISON_GATE_TOP = 36;
const TILE_PRISON_GATE_BOTTOM = 37;
const TILE_PRISON_GATE_TOP_OPEN = 38;
const TILE_PRISON_GATE_BOTTOM_OPEN = 39;
const TILE_DUNGEON_STAIRS_TOP_1 = 40;
const TILE_DUNGEON_STAIRS_MIDDLE_1 = 41;
const TILE_DUNGEON_STAIRS_BOTTOM_1 = 42;
const TILE_CABINET_1_TL = 43;
const TILE_CABINET_1_TR = 44;
const TILE_CABINET_1_BL = 45;
const TILE_CABINET_1_BR = 46;
const TILE_WHISKEY_BARREL_TOP = 47;
TILE_WHISKEY_BARREL_BOTTOM = 48;
const TILE_CABINET_1_ML = 49;
const TILE_CABINET_1_MR = 50;
const TILE_TREASURE_CHEST = 51;
const TILE_TREASURE_CHEST_OPEN = 52;

function roomTileToIndex(tileCol, tileRow) {
  return (tileCol + ROOM_COLS*tileRow);
}

function getTileIndexAtPixelCoord(pixelX,pixelY) {
  var tileCol = pixelX / TILE_W;
  var tileRow = pixelY / TILE_H;
  
  // we'll use Math.floor to round down to the nearest whole number
  tileCol = Math.floor( tileCol );
  tileRow = Math.floor( tileRow );

  // first check whether the tile coords fall within valid bounds
  if(tileCol < 0 || tileCol >= ROOM_COLS ||
     tileRow < 0 || tileRow >= ROOM_ROWS) {
     document.getElementById("debugText").innerHTML = "out of bounds:"+pixelX+","+pixelY;
     return undefined;
  }
  
  var tileIndex = roomTileToIndex(tileCol, tileRow);
  return tileIndex;
}

function tileTypeHasTransparency(checkTileType) {
  return (checkTileType == TILE_GOAL ||
          checkTileType == TILE_KEY ||
          checkTileType == TILE_PRISON_WALL_1 ||
          checkTileType == TILE_PRISON_WALL_2 ||
          checkTileType == TILE_PRISON_WALL_3 ||
          checkTileType == TILE_PRISON_GATE_TOP ||
          checkTileType == TILE_PRISON_GATE_BOTTOM ||
          checkTileType == TILE_PRISON_GATE_TOP_OPEN ||
          checkTileType == TILE_PRISON_GATE_BOTTOM_OPEN ||
		      checkTileType == TILE_DOOR_YELLOW_FRONT_BOTTOM ||
          checkTileType == TILE_DOOR_YELLOW_FRONT_TOP ||
          checkTileType == TILE_DOOR_YELLOW_FRONT_BOTTOM_OPEN ||
          checkTileType == TILE_DOOR_YELLOW_FRONT_TOP_OPEN ||
          checkTileType == TILE_WHISKEY_BARREL_BOTTOM ||
          checkTileType == TILE_CABINET_1_BL ||
          checkTileType == TILE_CABINET_1_BR ||
          checkTileType == TILE_TREASURE_CHEST ||
          checkTileType == TILE_TREASURE_CHEST_OPEN ||
          checkTileType == TILE_DOOR);
}

function tileTypeHasDungeonWallBottom(checkTileType){
  return (checkTileType == TILE_CABINET_1_TL ||
          checkTileType == TILE_CABINET_1_TR ||
          checkTileType == TILE_WHISKEY_BARREL_TOP);
}

function tileTypeHasDungeonWallTop(checkTileType){
  return (checkTileType == TILE_CABINET_1_TL ||
          checkTileType == TILE_CABINET_1_TR);
}

function findTileAboveCurrent(currentTile) {
  let tileAbove = currentTile - ROOM_COLS
  return tileAbove;
}

function findTileBelowCurrent(currentTile) {
  let tileBelow = currentTile + ROOM_COLS
  return tileBelow;
}

function drawRoom() {
  var tileIndex = 0;
  var tileLeftEdgeX = 0;
  var tileTopEdgeY = 0;
  
  for(var eachRow=0; eachRow<ROOM_ROWS; eachRow++) { // deal with one row at a time
    
    tileLeftEdgeX = 0; // resetting horizontal draw position for tiles to left edge
    
    for(var eachCol=0; eachCol<ROOM_COLS; eachCol++) { // left to right in each row

      var tileTypeHere = roomGrid[tileIndex]; // getting the tile code for this index
      let tile_sx = tilePics[tileTypeHere].imgX
      let tile_sy = tilePics[tileTypeHere].imgY;
      if( tileTypeHasTransparency(tileTypeHere) ) {
        canvasContext.drawImage(tilePics[TILE_GROUND].img, tileLeftEdgeX, tileTopEdgeY);
      }
      if( tileTypeHasDungeonWallBottom(tileTypeHere) ) {
        canvasContext.drawImage(tilePics[TILE_WALL_16].img,250,50, 50, 50, tileLeftEdgeX, tileTopEdgeY, 50, 50);
      }
      if( tileTypeHasDungeonWallTop(tileTypeHere) ) {
        canvasContext.drawImage(tilePics[TILE_WALL_16].img,350,0, 50, 50, tileLeftEdgeX, tileTopEdgeY, 50, 50);
      }

      canvasContext.drawImage(tilePics[tileTypeHere].img,tile_sx,tile_sy, 50, 50, tileLeftEdgeX, tileTopEdgeY, 50, 50);
      
      tileIndex++; // increment which index we're going to next check for in the room
      tileLeftEdgeX += TILE_W; // jump horizontal draw position to next tile over by tile width

    } // end of for eachCol
    
    tileTopEdgeY += TILE_H; // jump horizontal draw position down by one full tile height
    
  } // end of for eachRow    
} // end of drawRoom()