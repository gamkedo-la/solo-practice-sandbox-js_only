

// world constants and variables
const WORLD_W = 40;
const WORLD_H = 40;
const WORLD_GAP = 2;
const WORLD_COLS = 20;
const WORLD_ROWS = 15;

// world layout
let levelOne = [ 4, 4, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4,
                  4, 4, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 
                  4, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 
                  1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 
                  1, 0, 0, 0, 1, 1, 1, 4, 4, 4, 4, 4, 1, 1, 1, 1, 1, 0, 0, 1, 
                  1, 0, 0, 1, 1, 0, 0, 1, 4, 4, 4, 1, 0, 0, 0, 0, 1, 0, 0, 1, 
                  1, 0, 0, 1, 0, 0, 0, 0, 1, 4, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 
                  1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 5, 0, 0, 1, 0, 0, 1, 
                  1, 0, 0, 1, 0, 0, 5, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 
                  1, 0, 0, 1, 0, 0, 1, 1, 0, 0, 5, 0, 0, 1, 0, 0, 1, 0, 0, 1, 
                  1, 2, 0, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 5, 0, 0, 1, 
                  1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 
                  0, 3, 0, 0, 0, 0, 1, 4, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 
                  0, 3, 0, 0, 0, 0, 1, 4, 4, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 
                  1, 1, 1, 1, 1, 1, 1, 4, 4, 4, 4, 4, 4, 4, 1, 1, 1, 1, 1, 4];

let worldGrid = [];

const WORLD_FLOOR = 0;
const WORLD_WALL = 1;
const WORLD_PLAYERSTART = 2;
const WORLD_FINISH = 3;
const WORLD_TREE = 4;
const WORLD_FLAG = 5;

function returnTileTypeAtColRow(col, row){
  if(col >= 0 && col < WORLD_COLS && row >= 0 && row < WORLD_ROWS){  
    let worldIndexUnderCoord = rowColToArrayIndex(col, row);
    return worldGrid[worldIndexUnderCoord];
  }else{
    return WORLD_WALL;
  }
}

function warriorWorldHandling(whichWarrior){
  let warriorWorldCol = Math.floor(whichWarrior.x / WORLD_W); //Math.floor removes the decimal places from the cursor. Rounds down.
  let warriorWorldRow = Math.floor(whichWarrior.y / WORLD_H);
  let worldIndexUnderWarrior = rowColToArrayIndex(warriorWorldCol, warriorWorldRow);

  if(warriorWorldCol >= 0 && warriorWorldCol < WORLD_COLS && warriorWorldRow >= 0 && warriorWorldRow < WORLD_ROWS){

    let tileHere = returnTileTypeAtColRow(warriorWorldCol, warriorWorldRow);

    if(tileHere == WORLD_FINISH){
      console.log(whichWarrior.name + " WINS!!");
      loadLevel(levelOne);
      // whichWarrior.speed *= -0.5;
    }else if(tileHere != WORLD_FLOOR){
      // next two lines added to fix a bug.
      // undoes the warrior movement which got it onto the wall.
      whichWarrior.x -= Math.cos(whichWarrior.ang) * whichWarrior.speed;
      whichWarrior.y -= Math.sin(whichWarrior.ang) * whichWarrior.speed;

      whichWarrior.speed *= -0.5;
    } //end of else if
  } // end of valid col and row
} // end of warriorWorldHandling func

function rowColToArrayIndex(col, row){
  return col + WORLD_COLS * row;
  }
  
function drawWorlds(){
  let arrayIndex = 0;
  let drawTileX = 0;
  let drawTileY = 0;

  for(let eachRow = 0; eachRow < WORLD_ROWS; eachRow++){
    for(let eachCol = 0; eachCol < WORLD_COLS; eachCol++){
      let tileKindHere = worldGrid[arrayIndex];
      let useImg = worldPics[tileKindHere];

      canvasContext.drawImage(useImg, drawTileX, drawTileY); 
      drawTileX += WORLD_W;
      arrayIndex++;
    } // end of for each col
    drawTileY += WORLD_H;
    drawTileX = 0;
  } // end of for each row
} // end of drawWorlds function