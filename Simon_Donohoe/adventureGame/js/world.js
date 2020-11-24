// world constants and variables
const WORLD_W = 50;
const WORLD_H = 50;
const WORLD_GAP = 2;
const WORLD_COLS = 16;
const WORLD_ROWS = 12;

// world layout
let levelOne = [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 
                 1, 0, 4, 0, 4, 0, 1, 4, 0, 0, 0, 0, 0, 0, 0, 1, 
                 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 2, 0, 1,  
                 1, 1, 1, 1, 5, 1, 1, 0, 1, 5, 1, 1, 0, 0, 0, 1, 
                 1, 3, 5, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1,  
                 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 4, 1, 0, 0, 0, 1,  
                 1, 4, 0, 5, 0, 0, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1,  
                 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 4, 1,  
                 1, 1, 1, 1, 0, 0, 5, 0, 0, 0, 0, 0, 1, 1, 0, 1, 
                 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 
                 1, 4, 0, 5, 0, 0, 1, 0, 4, 5, 4, 0, 0, 0, 0, 1, 
                 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ];

let worldGrid = [];

const WORLD_FLOOR = 0;
const WORLD_WALL = 1;
const WORLD_PLAYERSTART = 2;
const WORLD_FINISH = 3;
const WORLD_KEY = 4;
const WORLD_DOOR = 5;

function returnTileTypeAtColRow(col, row){
  if(col >= 0 && col < WORLD_COLS && row >= 0 && row < WORLD_ROWS){  
    let worldIndexUnderCoord = rowColToArrayIndex(col, row);
    return worldGrid[worldIndexUnderCoord];
  }else{
    return WORLD_WALL;
  }
}

function warriorWorldCoord(atX, atY){
  let warriorWorldCol = Math.floor(atX / WORLD_W); //Math.floor removes the decimal places from the cursor. Rounds down.
  let warriorWorldRow = Math.floor(atY / WORLD_H);
  let worldIndexUnderWarrior = rowColToArrayIndex(warriorWorldCol, warriorWorldRow);

  if(warriorWorldCol >= 0 && warriorWorldCol < WORLD_COLS && warriorWorldRow >= 0 && warriorWorldRow < WORLD_ROWS){
    //var tileHere = returnTileTypeAtColRow( warriorWorldCol,//warriorWorldRow );// this code was missing
    return worldIndexUnderWarrior;
    //return tileHere;
    //return worldIndexUnderWarrior;
  } // end of valid col and row 
  return undefined; //treat outside the map boundary as solid area
} // end of warriorWorldHandling func

function rowColToArrayIndex(col, row){
  return col + WORLD_COLS * row;
  }
  
function tileTypeHasTransparency (checkTileType){
  return (checkTileType == WORLD_FINISH || checkTileType == WORLD_KEY || checkTileType == WORLD_DOOR);
}

function drawWorlds() {

  let arrayIndex = 0;
  let drawTileX = 0;
  let drawTileY = 0;

  for(let eachRow = 0; eachRow < WORLD_ROWS; eachRow++){
    for(let eachCol = 0; eachCol < WORLD_COLS; eachCol++){

      let arrayIndex =  rowColToArrayIndex(eachCol, eachRow);
      let tileKindHere = worldGrid[arrayIndex];
      let useImg = worldPics[tileKindHere];

      if( tileTypeHasTransparency(tileKindHere) ) {
        canvasContext.drawImage(worldPics[WORLD_FLOOR], drawTileX, drawTileY);
      }
      canvasContext.drawImage(useImg, drawTileX, drawTileY); 
      drawTileX += WORLD_W;
      arrayIndex++;
    } // end of for each col
    drawTileY += WORLD_H;
    drawTileX = 0;
  } // end of for each row

} // end of drawWorlds function