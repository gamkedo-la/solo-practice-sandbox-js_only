const PLAYER_RUN_SPEED = 5.5;

var sliderX;
var sliderY;
var distTravelled = 0;
var distTravelledCheck = 60;

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
		distTravelled += (nextX - sliderX) + (nextY - sliderY);
		sliderX = nextX;
		sliderY = nextY;
		//console.log("distTravelled is:" + distTravelled);
	}

	if (distTravelled >= distTravelledCheck || distTravelled <= -distTravelledCheck) {
		distTravelled = 0;
		currentPath = [];
		console.log("player has moved significalty, currentPath reset");
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