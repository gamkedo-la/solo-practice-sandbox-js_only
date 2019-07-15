const BRICK_W = 80;
const BRICK_H = 20;
const BRICK_GAP = 5;
const BRICK_COLS = 10;
const BRICK_ROWS = 14;
const BRICK_SCORE = 100; 

var brickGrid = new Array(BRICK_COLS * BRICK_ROWS);
var bricksLeft = 0;

var highestBrickRowHit = 0;
var lastHighestBrickRowHit = 0;

function rowColToArrayIndex(col, row) {
	return col + BRICK_COLS * row;
}

function brickReset() {
	bricksLeft = 0;
	var i;
	for(i=0;i < 3*BRICK_COLS;i++) {
		brickGrid[i] = false;
	}
	for(;i<BRICK_COLS * BRICK_ROWS;i++) {
		brickGrid[i] = true;
		bricksLeft++;
	}
}

function isBrickAtColRow(col,row) {
	if(col >= 0 && col < BRICK_COLS && 
	   row >= 0 && row < BRICK_ROWS) {
		var brickIndexUnderCoord = rowColToArrayIndex(col, row);
		return brickGrid[brickIndexUnderCoord];
	} else {
		return false;
	}
}

function drawBricks() {

	for(var eachRow=0; eachRow<BRICK_ROWS; eachRow++) {
		for(var eachCol=0; eachCol<BRICK_COLS; eachCol++) {
			
			var arrayIndex = rowColToArrayIndex(eachCol, eachRow);
				
			if(brickGrid[arrayIndex]) {
				drawBitmap(brickPic, BRICK_W*eachCol-BRICK_GAP, BRICK_H*eachRow-BRICK_GAP);
			} // eo if true draw brick
		} // eo for each brick
	}
} // end of drawBricks func

function ballBrickHandling() {
	var ballBrickCol = Math.floor(ballX / BRICK_W);
	var ballBrickRow = Math.floor(ballY / BRICK_H);
	var brickIndexUnderBall = rowColToArrayIndex(ballBrickCol, ballBrickRow);						
	
	if(ballBrickCol >= 0 && ballBrickCol < BRICK_COLS && 
	   ballBrickRow >= 0 && ballBrickRow < BRICK_ROWS) {
		
		if(isBrickAtColRow(ballBrickCol,ballBrickRow)) {
			brickGrid[brickIndexUnderBall] = false;
			if (highestBrickRowHit == 11) {
				// highest brick row hit
			} else if ((ballBrickRow - BRICK_ROWS) < highestBrickRowHit * -1) {
				highestBrickRowHit = (ballBrickRow - BRICK_ROWS) * -1;
			}
			//console.log("highestBrickRowHit: " + highestBrickRowHit);
			varyBallSpeedCheck();

			score += BRICK_SCORE;
			bricksLeft--;
			
			var prevBallX = ballX - ballSpeedX;
			var prevBallY = ballY - ballSpeedY;
			var prevBrickCol = Math.floor(prevBallX / BRICK_W);
			var prevBrickRow = Math.floor(prevBallY / BRICK_H);
			
			var bothTestsFailed = true;
			
			if(prevBrickCol != ballBrickCol) {
				if(isBrickAtColRow(prevBrickCol, ballBrickRow) == false) {
				ballSpeedX *= -1;
				bothTestsFailed = false;
				}
			}
				
			if(prevBrickRow != ballBrickRow) {	
				if(isBrickAtColRow(ballBrickCol, prevBrickRow ) == false) {
				ballSpeedY *= -1;
				bothTestsFailed = false;
				}
			}
			
			if (bothTestsFailed) { //armpit case, prevents ball from going through
				ballSpeedX *= -1;
				ballSpeedY *= -1;
			}
		} //end of brick found
	} // end of column and row valid check
} // end of ballBrickHandling func