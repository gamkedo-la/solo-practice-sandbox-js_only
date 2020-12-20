// track constants and variables
const TRACK_W = 40;
const TRACK_H = 40;
const TRACK_COLS = 20;
const TRACK_ROWS = 15;
var trackGrid =
    [ 4, 4, 8, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
      4, 8, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4,
      8, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4,
      7, 0, 0, 0, 0, 8, 1, 1, 1, 1, 1, 1, 0, 0, 1,10, 0, 0, 4, 4,
      7, 0, 0, 0, 8, 9, 0, 4, 4, 4, 4, 0, 0, 0, 0,11,10, 0, 4, 4,
      7, 0, 0, 8, 9, 0, 0, 0, 4, 4, 8, 9, 0, 0, 0, 0, 7, 0, 4, 4,
      7, 0, 0, 7, 0, 0, 0, 0, 4, 4, 7, 0, 0, 0, 0, 0, 7, 0, 0, 4,
      7, 0, 0, 7, 0, 0, 0, 0, 0, 0, 6, 0, 0, 0, 0, 0, 6, 0, 0, 4,
      7, 2, 0, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4,
      7, 0, 0, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4,
      6, 0, 0, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 4, 4,
      0, 0, 0, 6, 0, 0, 8, 1,10, 0, 0, 0, 8,10, 0, 0, 4, 0, 4, 4,
      0, 0, 0, 0, 0, 2, 7, 4,11, 1,10, 0, 7, 7, 0, 0, 4, 4, 4, 4,
      0, 0, 0, 0, 0, 0, 7, 4, 4, 4, 7, 0, 7, 7, 0, 0, 0, 4, 4, 4,
      1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
const TRACK_ROAD = 0;
const TRACK_WALL = 1;
const TRACK_PLAYER = 2;
const TRACK_GOAL = 3;
const TRACK_TREE = 4;
const TRACK_FLAG = 5;


//const CITY_WALL_BOTTOM_MIDDLE = 1;
const CITY_WALL_LEFT_SIDE_BOTTOM = 6;
const CITY_WALL_LEFT_SIDE_MIDDLE = 7;
const CITY_WALL_LEFT_SIDE_TOP = 8;
const CITY_WALL_LEFT_SIDE_CONNECTS_ABOVE = 9;
const CITY_WALL_RIGHT_SIDE_TOP = 10;
const CITY_WALL_RIGHT_SIDE_BOTTOM = 11;


function trackTileToIndex(tileCol, tileRow) {
  return (tileCol + TRACK_COLS*tileRow);
}

function getTrackAtPixelCoord(pixelX,pixelY) { 
  var tileCol = pixelX / TRACK_W;
  var tileRow = pixelY / TRACK_H;
  
  // we'll use Math.floor to round down to the nearest whole number
  tileCol = Math.floor( tileCol );
  tileRow = Math.floor( tileRow );

  // first check whether the car is within any part of the track wall
  if(tileCol < 0 || tileCol >= TRACK_COLS ||
     tileRow < 0 || tileRow >= TRACK_ROWS) {
     return TRACK_WALL; // avoid invalid array access, treat out of bounds as wall
  }
  
  var trackIndex = trackTileToIndex(tileCol, tileRow);
  return trackGrid[trackIndex];
}

function drawTracks() {
  var trackIndex = 0;
  var trackLeftEdgeX = 0;
  var trackTopEdgeY = 0;
  
  for(var eachRow=0; eachRow<TRACK_ROWS; eachRow++) { // deal with one row at a time
    
    trackLeftEdgeX = 0; // resetting horizontal draw position for tiles to left edge
    
    for(var eachCol=0; eachCol<TRACK_COLS; eachCol++) { // left to right in each row

      var trackTypeHere = trackGrid[ trackIndex ]; // getting the track code for this tile        
      canvasContext.drawImage(trackPics[trackTypeHere], trackLeftEdgeX, trackTopEdgeY);
      
      trackIndex++; // increment which index we're going to next check for in the track        
      trackLeftEdgeX += TRACK_W; // jump horizontal draw position to next tile over by tile width

    } // end of for eachCol
    
    trackTopEdgeY += TRACK_H; // jump horizontal draw position down by one full tile height
    
  } // end of for eachRow    
} // end of drawTracks()