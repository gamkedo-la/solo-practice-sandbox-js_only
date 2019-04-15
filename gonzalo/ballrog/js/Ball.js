const BALL_RADIUS = 10;
const INITIAL_SPEED = 8;
const INITIAL_MAX_SPEED = 40;
var ballX;
var ballY;
var ballVelX = 6;
var ballVelY = -4;
var maxSpeed = INITIAL_MAX_SPEED;
var baseSpeed = INITIAL_SPEED;
var minSpeed = baseSpeed;
var ballMissEvent = new CustomEvent('ballMiss');
var ballResetEvent = new CustomEvent('ballReset');
var highestHitRow = BRICK_ROWS;


function ballReset() {
	minSpeed = baseSpeed;
	ballX = paddleX + PADDLE_WIDTH/2;
	ballY = PADDLE_Y - BALL_RADIUS/2;
	updateVelocity(ballVelX, ballVelY > 0 ? -ballVelY : ballVelY);
	updateSpeed(minSpeed);
	highestHitRow = BRICK_ROWS;
	var ballResetEvent = new CustomEvent('ballReset');
	canvas.dispatchEvent(ballResetEvent);
}

function updateVelocity(velX, velY) {
	ballVelX = velX;
	ballVelY = velY;
}

function updateSpeed(speed) {
	if (speed > maxSpeed) {
		speed = maxSpeed;
	}
	var dir = getVelocityDir(ballVelX, ballVelY);
	updateVelocity(speed*dir.x, speed*dir.y);
}

function increaseSpeed(evt) {
	if (evt.detail.row < highestHitRow) {
		highestHitRow = evt.detail.row;
		minSpeed += (BRICK_ROWS - highestHitRow)*0.44;
		if (minSpeed > getSpeedFromVelocity(ballVelX, ballVelY)) {
			updateSpeed(minSpeed);
		}
	}
}

function getSpeedFromVelocity(velX, velY) {
	return Math.sqrt(Math.pow(velX, 2) + Math.pow(velY, 2));
}

function getVelocityDir(velX, velY) {
	var speed = getSpeedFromVelocity(velX, velY);
	return {x: velX/speed, y: velY/speed};
}

function ballMove() {
	if (!ballHeld) {
		ballX += ballVelX;
		ballY += ballVelY;
		if ((ballX > canvas.width && ballVelX > 0) || (ballX < 0 && ballVelX < 0)){
			updateVelocity(-1*ballVelX, ballVelY);
			let wallHitEvent = new CustomEvent('wallHit');
			canvas.dispatchEvent(wallHitEvent);
		}
		if (ballY > PADDLE_Y && ballY < PADDLE_Y + PADDLE_THICKNESS && ballVelY > 0) {
			if (ballX > paddleX && ballX < paddleX + PADDLE_WIDTH) {
				let deltaX = ballX - (paddleX + PADDLE_WIDTH/2);
				updateVelocity(deltaX*0.44, -1*ballVelY);
				let currentSpeed = getSpeedFromVelocity(ballVelX, ballVelY);
				if (currentSpeed < minSpeed) {
					updateSpeed(minSpeed);
				}
				let paddleHitEvent = new CustomEvent('paddleHit');
				canvas.dispatchEvent(paddleHitEvent);
				if (resetBricksOnNextPaddleHit) {
					resetBricks();
					let newLevelEvent = new CustomEvent('newLevel');
					canvas.dispatchEvent(newLevelEvent);
					baseSpeed += 10;
					maxSpeed += 10;
					resetBricksOnNextPaddleHit = false;
				}
			}
		}
		if (ballY > canvas.height) {
			ballReset();
			canvas.dispatchEvent(ballMissEvent);
		}
		if (ballY < 0) {
			updateVelocity(ballVelX, -1*ballVelY);
		}
		breakAndBounceOffBrickAtPixelCoord(ballX, ballY);
	}
}

function breakAndBounceOffBrickAtPixelCoord(pixelX, pixelY) {
	var tileCol = Math.floor(pixelX / BRICK_W);
	var tileRow = Math.floor((pixelY - TOP_MARGIN) / BRICK_H);

	if (tileCol < 0 || tileCol >= BRICK_COLS ||
		tileRow < 0 || tileRow >= BRICK_ROWS) {
		return;
	}

	var brickIndex = brickToTileIndex(tileCol, tileRow);


	if (brickGrid[brickIndex] == 1) {
		var prevBallX = ballX - ballVelX;
		var prevBallY = ballY - ballVelY;
		var prevTileCol = Math.floor(prevBallX / BRICK_W);
		var prevTileRow = Math.floor(prevBallY / BRICK_H);

		var bothTestsFailed = true;

		if (prevTileCol != tileCol) { // must have come in horizontally
		    var adjacentBrickIndex = brickToTileIndex(prevTileCol, tileRow);
		    if (brickGrid[adjacentBrickIndex] != 1) {
				updateVelocity(-1*ballVelX, ballVelY);
				bothTestsFailed = false;
		    }
		}
		if (prevTileRow != tileRow) { // must have come in vertically
		    var adjacentBrickIndex = brickToTileIndex(tileCol, prevTileRow);
		    if (brickGrid[adjacentBrickIndex] != 1) {
				updateVelocity(ballVelX, -1*ballVelY);
				bothTestsFailed = false;
		    }
		}

		if (bothTestsFailed) {
			updateVelocity(-1*ballVelX, -1*ballVelY);
		}

		var brickHitEvent = new CustomEvent('brickHit', {detail: {
			index: brickIndex,
			col: tileCol,
			row: tileRow
		}});
		canvas.dispatchEvent(brickHitEvent);
	}
}

function drawBall() {
	drawBitMap(ballPic, ballX - BALL_RADIUS, ballY - BALL_RADIUS);
}
