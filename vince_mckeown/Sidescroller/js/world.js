function drawBackGround() {
    var tileTypeHere = 0;
    var tileIndex = 0;
    var tileLeftEdgeX = 0;
    var tileTopEdgeY = 0;

    for(var eachRow=0; eachRow<BACKGROUND_ROWS; eachRow++){
        tileLeftEdgeX = 0;

        for(var eachCol=0; eachCol<BACKGROUND_COLS; eachCol++){ 
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

            tileTypeHere = levelList[levelNow][tileIndex];

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
    console.log(levelList[levelNow][tileIndex])
    return (levelList[levelNow][tileIndex] == TILE_GRASS_1);
}

function getTileTypeAtPixelCoord(atX, atY) {
	var worldCol = Math.floor(atX / TILE_W);
	var worldRow = Math.floor(atY / TILE_H);
	var worldIndexUnderPlayer = tileToIndex(worldCol, worldRow);

	if(worldCol >= 0 && worldCol < TILE_COLS &&
		worldRow >= 0 && worldRow < TILE_ROWS) {
		return worldIndexUnderPlayer;
	} // end of valid col and row

	return undefined;
} // end of warriorWorldHandling func

function isBrickAtPixelCoord(hitPixelX, hitPixelY) {
    var tileCol = hitPixelX / TILE_W;
    var tileRow = hitPixelY / TILE_H;

    // using Math.floor to round down to the nearest whole number
    tileCol = Math.floor( tileCol );
    tileRow = Math.floor( tileRow );

    // first check whether the jumper is within any part of the brick wall
    if( tileCol < 0 || tileCol >= TILE_COLS ||
        tileRow < 0 || tileRow >= TILE_ROWS) {
        return false;
    }
    
    var tileIndex = tileToIndex(tileCol, tileRow);
    return levelList[levelNow][tileIndex] == TILE_GRASS_1_LE ||
           levelList[levelNow][tileIndex] == TILE_GRASS_1 ||
           levelList[levelNow][tileIndex] == TILE_GRASS_1_RE ||
           levelList[levelNow][tileIndex] == TILE_GRASS_1_L_SIDE ||
           levelList[levelNow][tileIndex] == TILE_GRASS_1_R_SIDE ||
           levelList[levelNow][tileIndex] == TILE_SOLID;
}

function gameReset(){
    console.log("Need a reset function")
  }
  
function resetLevel() {
console.log("LL:"  + levelList[0] + " LN: " + levelNow)
    loadLevel(levelList[levelNow])
}

function nextLevel() {
    levelNow++;
    if(levelNow > levelList.length) {
        levelNow = 0;
    }
    loadLevel(levelList[levelNow]);
}

function loadLevel(whichLevel) {	
    roomGrid = whichLevel.slice();
    player.reset();
    for(var i = 0; i < slimeList.length; i++) {
        slimeList[i].reset();
    }
}
        