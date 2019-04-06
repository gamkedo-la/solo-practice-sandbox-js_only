function sliderMove() {
	var nextX = sliderX;
	var nextY = sliderY;

	if(holdLeft) {
		nextX += -RUN_SPEED;
	}
	if(holdRight) {
		nextX += RUN_SPEED;
	}
	if(holdUp) {
		nextY += -RUN_SPEED;
	}
	if(holdDown) {
		nextY += RUN_SPEED;
	}

	if(isBrickAtPixelCoord(nextX,nextY) == false) {
		sliderX = nextX;
		sliderY = nextY;
	}
}

function sliderReset() {
	// center slider on screen
	sliderX = canvas.width/2;
	sliderY = canvas.height/2;
}