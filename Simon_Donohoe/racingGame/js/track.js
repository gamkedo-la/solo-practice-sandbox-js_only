

// track constants and variables
const TRACK_W = 40;
const TRACK_H = 40;
const TRACK_GAP = 2;
const TRACK_COLS = 20;
const TRACK_ROWS = 15;

// track layout
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
                  1, 2, 2, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 5, 0, 0, 1, 
                  1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 
                  0, 3, 0, 0, 0, 0, 1, 4, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 
                  0, 3, 0, 0, 0, 0, 1, 4, 4, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 
                  1, 1, 1, 1, 1, 1, 1, 4, 4, 4, 4, 4, 4, 4, 1, 1, 1, 1, 1, 4];

let trackGrid = [];

const TRACK_ROAD = 0;
const TRACK_WALL = 1;
const TRACK_PLAYERSTART = 2;
const TRACK_FINISH = 3;
const TRACK_TREE = 4;
const TRACK_FLAG = 5;

function returnTileTypeAtColRow(col, row){
  if(col >= 0 && col < TRACK_COLS && row >= 0 && row < TRACK_ROWS){  
    let trackIndexUnderCoord = rowColToArrayIndex(col, row);
    return trackGrid[trackIndexUnderCoord];
  }else{
    return TRACK_WALL;
  }
}

function carTrackHandling(whichCar){
  let carTrackCol = Math.floor(whichCar.x / TRACK_W); //Math.floor removes the decimal places from the cursor. Rounds down.
  let carTrackRow = Math.floor(whichCar.y / TRACK_H);
  let trackIndexUnderCar = rowColToArrayIndex(carTrackCol, carTrackRow);

  if(carTrackCol >= 0 && carTrackCol < TRACK_COLS && carTrackRow >= 0 && carTrackRow < TRACK_ROWS){

    let tileHere = returnTileTypeAtColRow(carTrackCol, carTrackRow);

    if(tileHere == TRACK_FINISH){
      console.log(whichCar.name + " WINS!!");
      loadLevel(levelOne);
      // whichCar.speed *= -0.5;
    }else if(tileHere != TRACK_ROAD){
      // next two lines added to fix a bug.
      // undoes the car movement which got it onto the wall.
      whichCar.x -= Math.cos(whichCar.ang) * whichCar.speed;
      whichCar.y -= Math.sin(whichCar.ang) * whichCar.speed;

      whichCar.speed *= -0.5;
    } //end of else if
  } // end of valid col and row
} // end of carTrackHandling func

function rowColToArrayIndex(col, row){
  return col + TRACK_COLS * row;
  }
  
function drawTracks(){
  let arrayIndex = 0;
  let drawTileX = 0;
  let drawTileY = 0;

  for(let eachRow = 0; eachRow < TRACK_ROWS; eachRow++){
    for(let eachCol = 0; eachCol < TRACK_COLS; eachCol++){
      let tileKindHere = trackGrid[arrayIndex];
      let useImg = trackPics[tileKindHere];

      canvasContext.drawImage(useImg, drawTileX, drawTileY); 
      drawTileX += TRACK_W;
      arrayIndex++;
    } // end of for each col
    drawTileY += TRACK_H;
    drawTileX = 0;
  } // end of for each row
} // end of drawTracks function