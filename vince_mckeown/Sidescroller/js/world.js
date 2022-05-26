const TILE_W = 32;
const TILE_H = 32;
const TILE_COLS = 25;
const TILE_ROWS = 19;
const GROUND_FRICTION = 0.8;
const AIR_RESISTANCE = 0.95;
const GRAVITY = 0.6;

var backGroundGrid = 
  [ 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 
    10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
    10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
    10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
    10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 
    10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 
    10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 
    10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 
    10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 
    10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 
    10, 10, 10, 10, 10, 53, 63, 54, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 
    10, 10, 10, 10, 53, 63, 63, 63, 54, 10, 10, 10, 10, 10, 10, 53, 63, 63, 54, 10, 10, 10, 10, 10, 10,
    10, 10, 10, 53, 63, 63, 63, 63, 53, 54, 10, 10, 10, 10, 53, 63, 63, 63, 63, 54, 10, 10, 10, 10, 10, 
    10, 10, 53, 63, 63, 63, 63, 63, 63, 63, 54, 10, 10, 53, 63, 63, 63, 63, 63, 63, 54, 10, 10, 10, 10, 
    61, 62, 63, 63, 63, 63, 63, 63, 63, 63, 63, 64, 62, 63, 63, 63, 63, 63, 63, 63, 63, 64, 61, 61, 61, 
    63, 63, 63, 63, 63, 63, 63, 63, 63, 63, 63, 63, 63, 63, 63, 63, 63, 63, 63, 63, 63, 63, 63, 63, 63, 
    63, 63, 63, 63, 63, 63, 63, 63, 63, 63, 63, 63, 63, 63, 63, 63, 63, 63, 63, 63, 63, 63, 63, 63, 63, 
    63, 63, 63, 63, 63, 63, 63, 63, 63, 63, 63, 63, 63, 63, 63, 63, 63, 63, 63, 63, 63, 63, 63, 63, 63, 
    63, 63, 63, 63, 63, 63, 63, 63, 63, 63, 63, 63, 63, 63, 63, 63, 63, 63, 63, 63, 63, 63, 63, 63, 63];


 var middleGroundGrid =
  [ 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 
    12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12,
    12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12,
    12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12,
    12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 
    12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 
    12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 16, 18, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 
    12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 16, 18, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 
    12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 16, 18, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 
    12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 16, 18, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 
    12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 16, 18, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 
    12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 17, 18, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12,
    12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 17, 18, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 
    12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 17, 18, 12, 12, 12, 17, 12, 12, 12, 12, 12, 12, 12, 12, 
    12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 17, 18, 12, 12, 12, 17, 12, 12, 12, 12, 12, 12, 12, 12, 
    72, 73, 74, 84, 73, 73, 73, 73, 73, 73, 73, 73, 74, 84, 73, 73, 17, 73, 73, 73, 73, 73, 73, 73, 73, 
    82, 82, 82, 82, 82, 82, 82, 82, 82, 82, 82, 82, 82, 82, 82, 82, 82, 82, 82, 82, 82, 82, 82, 82, 82,   
    82, 82, 82, 82, 82, 82, 82, 82, 82, 82, 82, 82, 82, 82, 82, 82, 82, 82, 82, 82, 82, 82, 82, 82, 82,  
    82, 82, 82, 82, 82, 82, 82, 82, 82, 82, 82, 82, 82, 82, 82, 82, 82, 82, 82, 82, 82, 82, 82, 82, 82];


var worldGrid =
  [ 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 
    12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12,
    12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12,
    12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12,
    12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 
    12, 12, 12, 12, 12, 12, 12, 12, 12, 12,  1,  2,  2,  3, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 
    12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 16, 18, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 
    12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 16, 18, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 
    12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 16, 18, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 
    12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 16, 18, 12,  1,  2,  2,  2,  2,  3, 12, 12, 12, 12, 12, 
    12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 16, 18, 12, 12, 16, 17, 17, 18, 12, 12, 12, 12, 12, 12, 
    12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 16, 18, 12, 12, 16, 17, 17, 18, 12, 12, 12, 12, 12, 12,
    12, 12, 12, 12, 12, 12, 12,  1,  2,  2,  2,  3, 18, 12, 12, 16, 17, 17, 18, 12, 12, 12, 12, 12, 12, 
    12, 12, 12, 12, 12, 12, 12, 12, 16, 17, 17, 17, 18, 12, 12, 16, 17, 17, 18, 12, 12, 12, 12, 12, 12, 
    12, 12, 12, 12, 12, 12, 12, 12, 16, 17, 17, 17, 18,  1,  2,  2,  3, 17, 18, 12, 12, 12, 12, 12, 12, 
    12, 21, 12, 12, 21, 12, 12, 21, 16, 17, 17, 17, 18, 12, 16, 17, 17, 17, 18, 21, 12, 12, 12, 21, 12,
   101, 31, 12, 12, 31, 35, 12, 31, 16, 17, 17, 17, 18, 36, 16, 17, 17, 17, 18, 31, 12, 12, 12, 31, 12, 
     2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2, 
    11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11];
    

function drawBackGround() {
    var tileTypeHere = 0;
    var tileIndex = 0;
    var tileLeftEdgeX = 0;
    var tileTopEdgeY = 0;

    for(var eachRow=0; eachRow<TILE_ROWS; eachRow++){
        tileLeftEdgeX = 0;

        for(var eachCol=0; eachCol<TILE_COLS; eachCol++){ 
            tileTypeHere = backGroundGrid[tileIndex];

            let tile_sx = tilePics[tileTypeHere].imgX
            let tile_sy = tilePics[tileTypeHere].imgY;
                
            let brickLeftEdgeX = eachCol * TILE_W;
            let brickTopEdgeY = eachRow * TILE_H;
            canvasContext.drawImage(tilePics[tileTypeHere].img,tile_sx,tile_sy, TILE_W, TILE_H, tileLeftEdgeX, tileTopEdgeY, TILE_W, TILE_H);
            // colorText(tileIndex, tileLeftEdgeX, tileTopEdgeY + 30, "white")

            tileLeftEdgeX += TILE_W; // jump horizontal draw position to next tile over by tile width
            tileIndex++;
        } // end of for eachRow
        tileTopEdgeY += TILE_H;
    } // end of for eachCol
} // end of drawBricks()
        
function drawMiddleGround() {
    var tileTypeHere = 0;
    var tileIndex = 0;
    var tileLeftEdgeX = 0;
    var tileTopEdgeY = 0;

    for(var eachRow=0; eachRow<TILE_ROWS; eachRow++){
        tileLeftEdgeX = 0;

        for(var eachCol=0; eachCol<TILE_COLS; eachCol++){ 
            tileTypeHere = middleGroundGrid[tileIndex];

            let tile_sx = tilePics[tileTypeHere].imgX
            let tile_sy = tilePics[tileTypeHere].imgY;
                
            let brickLeftEdgeX = eachCol * TILE_W;
            let brickTopEdgeY = eachRow * TILE_H;
            canvasContext.drawImage(tilePics[tileTypeHere].img,tile_sx,tile_sy, TILE_W, TILE_H, tileLeftEdgeX, tileTopEdgeY, TILE_W, TILE_H);
            // colorText(tileIndex, tileLeftEdgeX, tileTopEdgeY + 30, "white")

            tileLeftEdgeX += TILE_W; // jump horizontal draw position to next tile over by tile width
            tileIndex++;
        } // end of for eachRow
        tileTopEdgeY += TILE_H;
    } // end of for eachCol
} // end of drawBricks()

function drawBricks() {
    var tileTypeHere = 0;
    var tileIndex = 0;
    var tileLeftEdgeX = 0;
    var tileTopEdgeY = 0;

    for(var eachRow=0; eachRow<TILE_ROWS; eachRow++){
        tileLeftEdgeX = 0;

        for(var eachCol=0; eachCol<TILE_COLS; eachCol++){ 
			tileTypeHere = worldGrid[tileIndex];

            let tile_sx = tilePics[tileTypeHere].imgX
            let tile_sy = tilePics[tileTypeHere].imgY;
             
            let brickLeftEdgeX = eachCol * TILE_W;
            let brickTopEdgeY = eachRow * TILE_H;
            canvasContext.drawImage(tilePics[tileTypeHere].img,tile_sx,tile_sy, TILE_W, TILE_H, tileLeftEdgeX, tileTopEdgeY, TILE_W, TILE_H);
           // colorText(tileIndex, tileLeftEdgeX, tileTopEdgeY + 30, "white")

            tileLeftEdgeX += TILE_W; // jump horizontal draw position to next tile over by tile width
            tileIndex++;
        } // end of for eachRow
        tileTopEdgeY += TILE_H;
    } // end of for eachCol
} // end of drawBricks()
          

function tileToIndex(tileCol, tileRow) {
    return (tileRow * TILE_COLS + tileCol);
}

function isBrickAtTileCoord(brickTileCol, brickTileRow) {
    var tileIndex = tileToIndex(brickTileCol, brickTileRow);
    return (worldGrid[tileIndex] == TILE_GRASS_1);
}

function isBrickAtPixelCoord(hitPixelX, hitPixelY) {
    var tileCol = hitPixelX / TILE_W;
    var tileRow = hitPixelY / TILE_H;

    // using Math.floor to round down to the nearest whole number
    tileCol = Math.floor( tileCol );
    tileRow = Math.floor( tileRow );

    // first check whether the jumper is within any part of the brick wall
    if(tileCol < 0 || tileCol >= TILE_COLS ||
        tileRow < 0 || tileRow >= TILE_ROWS) {
        return false;
    }
    
    var tileIndex = tileToIndex(tileCol, tileRow);
    return (worldGrid[tileIndex] == TILE_GRASS_1_LE ||
            worldGrid[tileIndex] == TILE_GRASS_1 ||
            worldGrid[tileIndex] == TILE_GRASS_1_RE ||
            worldGrid[tileIndex] == TILE_SOLID);
}
        