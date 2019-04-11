const PADDLE_WIDTH = 100;
const PADDLE_THICKNESS = 48;
var paddleX = (800 - PADDLE_WIDTH)/2;
const PADDLE_Y = 540;

function movePaddleOnMouseMove(evt) {
	var mousePos = calculateMousePos(evt);
	paddleX = mousePos.x - (PADDLE_WIDTH/2);
	if (ballHeld) {
		ballX = paddleX + PADDLE_WIDTH/2;
	}
}

function drawPaddle() {
	drawBitMap(paddlePic, paddleX, PADDLE_Y + 5);
}
