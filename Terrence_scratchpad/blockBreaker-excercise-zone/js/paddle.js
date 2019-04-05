const PADDLE_WIDTH = 100;
const PADDLE_THICKNESS = 10;
const PADDLE_DIST_FROM_EDGE = 60;

var score = 0;

var paddleX = 400;

var mouseX = 0;
var mouseY = 0;

var ballHeld = true;

function drawPaddle() {
	drawBitmap(paddlePic, paddleX, canvas.height-PADDLE_DIST_FROM_EDGE);
}

function drawLives() {
	for (var i = 0 ; i < lives; i++) {
		var lifeX = canvas.width-60;
		var lifeY = canvas.height-15;
		lifeX +=40 * i;
		drawBitmapCenteredAtLocation(ballPic, lifeX, lifeY);
	}
}

function updateMousePos(evt) {
	var rect = canvas.getBoundingClientRect();
	var root = document.documentElement;
	
	mouseX = evt.clientX - rect.left - root.scrollLeft;
	mouseY = evt.clientY - rect.top - root.scrollTop;
	
	paddleX = mouseX - PADDLE_WIDTH/2;
}

function ballServe(evt) {
	if (gameScreenStates.mainMenu) {
		gameScreenStates.mainMenu = false;
		return;
	}
	ballHeld = false;
}

function ballPaddleHandling() {
	var paddleTopEdgeY = canvas.height-PADDLE_DIST_FROM_EDGE;
	var paddleBottomEdgeY = paddleTopEdgeY + PADDLE_THICKNESS;
	var paddleLeftEdgeX = paddleX;
	var paddleRightEdgeX = paddleLeftEdgeX + PADDLE_WIDTH;
	if( ballY > paddleTopEdgeY && // below the top of paddle
	    ballY < paddleBottomEdgeY && // above bottom of paddle
		ballX > paddleLeftEdgeX && // right of the left edge
		ballX < paddleRightEdgeX) { // left of the right edge
		
		ballSpeedY *= -1;
		
		var centerOfPaddleX = paddleX + PADDLE_WIDTH/2;
		var ballDisFromPaddleCenterX = ballX - centerOfPaddleX;
		ballSpeedX = ballDisFromPaddleCenterX * 0.35;
		
		if (bricksLeft == 0) {
			brickReset();
		} // reset when out of bricks
	} // ball center inside paddle
} //ballPaddleHandling func