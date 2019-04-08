var ballX;
var ballY;
var ballSpeedX = 6;
var ballSpeedY = -4;
const BALL_RADIUS = 10;
var ballMissEvent = new CustomEvent('ballMiss');
var ballResetEvent = new CustomEvent('ballReset');
var brickHitEvent = new CustomEvent('brickHit');

function ballReset() {
	ballX = paddleX + PADDLE_WIDTH/2;
	ballY = PADDLE_Y - BALL_RADIUS/2;
	ballSpeedY = ballSpeedY > 0 ? -ballSpeedY : ballSpeedY;
	var ballResetEvent = new CustomEvent('ballReset');
	canvas.dispatchEvent(ballResetEvent);
}

function ballMove() {
	if (!ballHeld) {
		ballX += ballSpeedX;
		ballY += ballSpeedY;
		if ((ballX > canvas.width && ballSpeedX > 0) || (ballX < 0 && ballSpeedX < 0)){
			ballSpeedX *= -1;
			// TODO: dispatch ballHitWall event
		}
		if (ballY > PADDLE_Y && ballY < PADDLE_Y + PADDLE_THICKNESS && ballSpeedY > 0) {
			if (ballX > paddleX && ballX < paddleX + PADDLE_WIDTH) {
				ballSpeedY *= -1;
				var deltaX = ballX - (paddleX + PADDLE_WIDTH/2);
				ballSpeedX = deltaX * 0.55;
				if (resetBricksOnNextPaddleHit) {
					resetBricks();
					resetBricksOnNextPaddleHit = false;
				}
			}
		}
		if (ballY > canvas.height) {
			ballReset();
			canvas.dispatchEvent(ballMissEvent);
		}
		if (ballY < 0) {
			ballSpeedY *= -1;
		}
		breakAndBounceOffBrickAtPixelCoord(ballX, ballY);
	}
}

function breakAndBounceOffBrickAtPixelCoord(pixelX, pixelY) {
	var tileCol = Math.floor(pixelX / BRICK_W);
	var tileRow = Math.floor(pixelY / BRICK_H);

	if (tileCol < 0 || tileCol >= BRICK_COLS ||
		tileRow < 0 || tileRow >= BRICK_ROWS) {
		return;
	}

	var brickIndex = brickToTileIndex(tileCol, tileRow);


	if (brickGrid[brickIndex] == 1) {
		var prevBallX = ballX - ballSpeedX;
		var prevBallY = ballY - ballSpeedY;
		var prevTileCol = Math.floor(prevBallX / BRICK_W);
		var prevTileRow = Math.floor(prevBallY / BRICK_H);

		var bothTestsFailed = true;

		if (prevTileCol != tileCol) { // must have come in horizontally
		    var adjacentBrickIndex = brickToTileIndex(prevTileCol, tileRow);
		    if (brickGrid[adjacentBrickIndex] != 1) {
				ballSpeedX *= -1;
				bothTestsFailed = false;
		    }
		}
		if (prevTileRow != tileRow) { // must have come in vertically
		    var adjacentBrickIndex = brickToTileIndex(tileCol, prevTileRow);
		    if (brickGrid[adjacentBrickIndex] != 1) {
				ballSpeedY *= -1;
				bothTestsFailed = false;
		    }
		}

		if (bothTestsFailed) {
		    ballSpeedX *= -1;
		    ballSpeedY *= -1;
		}

		brickGrid[brickIndex] = 0; // remove the brick that got hit
		canvas.dispatchEvent(brickHitEvent);
	}
}

function drawBall() {
	drawBitMap(ballPic, ballX - BALL_RADIUS, ballY - BALL_RADIUS);
}
