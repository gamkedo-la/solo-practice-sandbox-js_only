var ballX = 400 - 15;
var ballY = 580 - PADDLE_DIST_FROM_EDGE - 10;

const BALL_SPEED_INTIAL = 5
var ballSpeedX = BALL_SPEED_INTIAL;
var ballSpeedY = -BALL_SPEED_INTIAL;

var magnitude = 0;
var ballSpeedScalar;

var lives = 2;

function drawBall() {
	drawBitmapCenteredAtLocation(ballPic, ballX, ballY);
}

function ballReset() {
	ballHeld = true;
	lives--;
	gameReset();
}

function varyBallSpeedCheck() { 

	if (lastHighestBrickRowHit != highestBrickRowHit) {
		var underSqrt = (ballSpeedX*ballSpeedX) + (ballSpeedY*ballSpeedY);
		magnitude = Math.sqrt(underSqrt);

		var normalizedBallSpeedX = ballSpeedX / magnitude;
		var normalizedBallSpeedY = ballSpeedY / magnitude;

		ballSpeedScalar = highestBrickRowHit + 5;
		ballSpeedX = normalizedBallSpeedX * ballSpeedScalar;
		ballSpeedY = normalizedBallSpeedY * ballSpeedScalar;
		console.log("ballSpeedX : " + ballSpeedX);
		lastHighestBrickRowHit = highestBrickRowHit;
	}
}

function ballMove() {
	if (ballHeld) {
		ballX = mouseX - 15;
		ballY = canvas.height-PADDLE_DIST_FROM_EDGE-10;
		return;
	} else {
		ballX += ballSpeedX;
		ballY += ballSpeedY;

		if(ballX < 0 && ballSpeedX < 0) { //left
			ballSpeedX *= -1;
		}
		if(ballX > canvas.width && ballSpeedX > 0) { //right
			ballSpeedX *= -1;
		}
		if(ballY < 0 && ballSpeedY < 0) { //top
			ballSpeedY *= -1;
		}
		if(ballY > canvas.height) { //bottom
			ballSpeedY *= -1;
			ballReset();
		} 
	} //eo else 
} // eo ballMove