const PLAYER_RUN_SPEED = 5.5;

var sliderX;
var sliderY;

function sliderMove() {
	var nextX = sliderX;
	var nextY = sliderY;

	if(holdLeft) {
		nextX += -PLAYER_RUN_SPEED;
	}
	if(holdRight) {
		nextX += PLAYER_RUN_SPEED;
	}
	if(holdUp) {
		nextY += -PLAYER_RUN_SPEED;
	}
	if(holdDown) {
		nextY += PLAYER_RUN_SPEED;
	}

	if(isBrickAtPixelCoord(nextX,nextY) == false) {
		sliderX = nextX;
		sliderY = nextY;
	}
}

function sliderDraw() {
	colorCircle(sliderX, sliderY, 10, 'white');
}

function sliderReset() {
	// center slider on screen
	sliderX = canvas.width/2 + BRICK_SIDE/2;
	sliderY = canvas.height/2;
}