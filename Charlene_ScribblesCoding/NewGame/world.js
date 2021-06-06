const W = 10;
const H = 10;
const COLS = 00;
const ROWS = 10;
var grid =
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1,
        1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
        1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1,
        1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1,
        1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 1,
        1, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1,
        1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1,
        1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1,
        1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1,
        1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1,
        1, 1, 0, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1,
        1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1,
        1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1,
        1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
const PATH = 0;
const WALL = 1;

function tileToIndex(tileCol, tileRow) {
    return (tileCol + COLS*tileRow);
  }
  
  function getPixelCoord(pixelX,pixelY) {
    var tileCol = pixelX / W;
    var tileRow = pixelY / H;
    
    // we'll use Math.floor to round down to the nearest whole number
    tileCol = Math.floor( tileCol );
    tileRow = Math.floor( tileRow );
  
    // first check whether the car is within any part of the path wall
    if(tileCol < 0 || tileCol >= COLS ||
       tileRow < 0 || tileRow >= ROWS) {
       return WALL; //avoid invalid array access, treat out of bounds as wall
    }
    
    var pathIndex = tileToIndex(tileCol, tileRow);
    return pathGrid[pathIndex];
  }
  
  function drawWorld() {
    var pathIndex = 0;
    var pathLeftEdgeX = 0;
    var pathTopEdgeY = 0;
    
    for(var eachRow=0; eachRow<path_ROWS; eachRow++) { 
      
      pathLeftEdgeX = 0;
      
      for(var eachCol=0; eachCol<path_COLS; eachCol++) {
  
        var pathTypeHere = pathGrid[ pathIndex ];        
        canvasContext.drawImage(pathPics[pathTypeHere], pathLeftEdgeX, pathTopEdgeY);
        
        pathIndex++;     
        pathLeftEdgeX += path_W; 
      } 
      
      pathTopEdgeY += path_H; 
      
    }    
  } 