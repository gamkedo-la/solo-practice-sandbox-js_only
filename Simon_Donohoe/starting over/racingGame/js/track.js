// track variables/constants
const TRACK_W = 40;
const TRACK_H = 40;
// const TRACK_GAP = 1;
const TRACK_COLS = 20;
const TRACK_ROWS = 15;
let trackGrid =
[ 4, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4,
  4, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1,
  1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
  1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1,
  1, 0, 0, 0, 1, 1, 1, 4, 4, 4, 4, 1, 1, 1, 1, 1, 1, 0, 0, 1,
  1, 0, 0, 1, 1, 0, 0, 1, 4, 4, 1, 1, 0, 0, 0, 1, 1, 0, 0, 1,
  1, 0, 0, 1, 0, 0, 0, 0, 1, 4, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1,
  1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1,
  1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 5, 0, 0, 1, 0, 0, 1,
  1, 0, 0, 1, 0, 0, 5, 0, 0, 0, 5, 0, 0, 1, 0, 0, 1, 0, 0, 1,
  1, 2, 0, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 5, 0, 0, 1,
  1, 1, 5, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1,
  0, 3, 0, 0, 0, 0, 1, 4, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1,
  0, 3, 0, 0, 0, 0, 1, 4, 4, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1,
  1, 1, 5, 1, 1, 1, 1, 4, 4, 4, 4, 4, 4, 4, 1, 1, 1, 1, 1, 1];
  const TRACK_ROAD = 0;
  const TRACK_WALL = 1;
  const TRACK_PLAYER = 2;
  const TRACK_GOAL = 3;
  const TRACK_TREE = 4;
  const TRACK_FLAG = 5;

function drawTrack(){
  for(let eachCol = 0; eachCol < TRACK_COLS; eachCol++){
    for(let eachRow = 0; eachRow < TRACK_ROWS; eachRow++){
      let trackLeftEdgeX = eachCol * TRACK_W;
      let trackTopEdgeY = eachRow * TRACK_H;
      let trackIndex = trackTileToIndex(eachCol, eachRow);
      let trackTypeHere = trackGrid[trackIndex];
      // let useImg;

      // switch(trackTypeHere){
      //   case TRACK_ROAD:
      //     useImg = trackPicRoad;
      //     break;
      //   case TRACK_WALL:
      //     useImg = trackPicWall;
      //     break;
      //   case TRACK_GOAL:
      //     useImg = trackPicGoal;
      //     break;
      //   case TRACK_TREE:
      //     useImg = trackPicTree;
      //     break;
      //   case TRACK_FLAG:
      //   default:
      //     useImg = trackPicFlag;
      //     break;
      // }
      
      // canvasContext.drawImage(useImg, trackLeftEdgeX,	trackTopEdgeY);
      canvasContext.drawImage(trackPics[trackTypeHere], trackLeftEdgeX,	trackTopEdgeY);
    }
  }
}

function trackTileToIndex(trackColumn, trackRow){
  return (trackColumn + TRACK_COLS * trackRow);
}

function isWallAtTileCoord(trackTileCol, trackTileRow){
  let trackIndex = trackTileToIndex(trackTileCol, trackTileRow);
  return(trackGrid[trackIndex] == TRACK_WALL);
}

function checkForTrackAtPixelCoord(pixelX, pixelY) {
  // two variables to find out which track was hit
  let trackColumn = pixelX / TRACK_W; 
  let trackRow = pixelY / TRACK_H;

  // using Math.floor to round the number down
  trackColumn = Math.floor(trackColumn); 
  trackRow = Math.floor(trackRow);

  if(trackColumn < 0 || trackColumn >= TRACK_COLS || trackRow < 0 || trackRow >= TRACK_ROWS){
    return false;
  }

  let trackIndex = trackTileToIndex(trackColumn, trackRow);

  return (trackGrid[trackIndex] == TRACK_ROAD);
}