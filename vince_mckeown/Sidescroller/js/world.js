const TILE_W = 32;
const TILE_H = 32;
const TILE_COLS = 25;
const TILE_ROWS = 19;
const GROUND_FRICTION = 0.8;
const AIR_RESISTANCE = 0.95;
const GRAVITY = 0.6;
  
var worldGrid =
      [ 1, 1, 1, 1, 1, 2, 1, 1, 1, 2, 1, 1, 1, 1, 2, 1, 2, 1, 1, 2, 2, 1, 1, 1, 1, 
        2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 
        2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 
        2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 
        2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 
        2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
    
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
           
           // console.log("TI: " + tileIndex + " Type: " + tileTypeHere + " t SX: " + tile_sx) 
            
            let brickLeftEdgeX = eachCol * TILE_W;
            let brickTopEdgeY = eachRow * TILE_H;
            canvasContext.drawImage(tilePics[tileTypeHere].img,tile_sx,tile_sy, 32, 32, tileLeftEdgeX, tileTopEdgeY, 32, 32);
            colorText(tileIndex, tileLeftEdgeX, tileTopEdgeY, "white")

            tileLeftEdgeX += TILE_W; // jump horizontal draw position to next tile over by tile width
            tileIndex++;
        } // end of for eachRow
        tileTopEdgeY += TILE_H;
    } // end of for eachCol
} // end of drawBricks()
          

function tileToIndex(tileCol, tileRow) {
    return (tileCol * tileRow + tileRow);
}

function isBrickAtTileCoord(brickTileCol, brickTileRow) {
    var tileIndex = tileToIndex(brickTileCol, brickTileRow);
    return (worldGrid[tileIndex] == 1);
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
    return (worldGrid[tileIndex] == 1);
}
        