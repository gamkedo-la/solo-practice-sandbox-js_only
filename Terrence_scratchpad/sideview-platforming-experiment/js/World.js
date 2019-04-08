const BRICK_W = 40;
const BRICK_H = 40;
const BRICK_GAP = 1;
const BRICK_COLS = 20;
const BRICK_ROWS = 15;

var brickGrid =
  [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1,
    1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1,
    1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1,
    1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 1,
    1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1,
    1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1,
    1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1,
    1, 0, 1, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1,
    1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1,
    1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];

function brickTileToIndex(tileCol, tileRow) {
	return (tileCol + BRICK_COLS*tileRow);
}

function isBrickAtTileCoord(brickTileCol, brickTileRow) {
	var brickIndex = brickTileToIndex(brickTileCol, brickTileRow);
	return (brickGrid[brickIndex] == 1);
}

function isBrickAtPixelCoord(hitPixelX, hitPixelY) {
	var tileCol = hitPixelX / BRICK_W;
	var tileRow = hitPixelY / BRICK_H;

	// using Math.floor to round down to the nearest whole number
	tileCol = Math.floor( tileCol );
	tileRow = Math.floor( tileRow );

	// first check whether the jumper is within any part of the brick wall
	if(tileCol < 0 || tileCol >= BRICK_COLS ||
   	   tileRow < 0 || tileRow >= BRICK_ROWS) {
   		return false;
	}

	var brickIndex = brickTileToIndex(tileCol, tileRow);
	return (brickGrid[brickIndex] == 1);
}

function drawBricks() {
	for(var eachCol=0; eachCol<BRICK_COLS; eachCol++) { // in each column...
		for(var eachRow=0; eachRow<BRICK_ROWS; eachRow++) { // in each row within that col
			if( isBrickAtTileCoord(eachCol, eachRow) ) {
				var brickLeftEdgeX = eachCol * BRICK_W;
				var brickTopEdgeY = eachRow * BRICK_H;
				colorRect(brickLeftEdgeX, brickTopEdgeY,
				BRICK_W - BRICK_GAP, BRICK_H - BRICK_GAP, 'blue' );
			} // end of isBrickAtTileCoord()
		} // end of for eachRow
	} // end of for eachCol
} // end of drawBricks()