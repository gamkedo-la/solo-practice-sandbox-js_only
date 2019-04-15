var canvas, canvasContext;

const SET_FRAMES_PER_SECOND = 30;

window.onload = function() {
	canvas = document.getElementById('gameCanvas');
	canvasContext = canvas.getContext('2d');

	initInput();

	// these next few lines set up our game logic and render to happen 30 times per second
	setInterval(function() {
	    update();
	  }, 1000/SET_FRAMES_PER_SECOND);
	  
	jumperReset();
}

function update() {
	moveEverything();
	drawEverything();
	variableDisplay();
	if (radiusIncrease) {
		jumperRadius++;
		if (jumperRadius > 40) {
			jumperRadius = 40;
			console.log("jumper as big as possible");
		} else {
			console.log("radius increasing");
		}
	}
	if (radiusDecrease) {
		jumperRadius--;
		if (jumperRadius < 1) {
			jumperRadius = 1;
			console.log("jumper as small as possible");
		} else {
			console.log("radius decreasing");
		}
	}
	jumpPower = jumperRadius;
}

function drawEverything() {
	colorRect(0, 0, canvas.width, canvas.height, 'black');

	drawBricks();

	canvasContext.fillStyle = 'white';
	canvasContext.fillText("Arrow keys to run, spacebar to jump",8,14);

	colorCircle(jumperX, jumperY, jumperRadius, 'white');
}

function moveEverything() {
	jumperMove();
}

function variableDisplay() {
	var jumpVariables = [jumperRadius,runSpeed,jumperSpeedX, jumpPower,jumperSpeedY, groundFriction, airResistance, gravity];
	var textXPosition = canvas.width - 140;
	var textYPosition = 14;
	canvasContext.font = "12px Verdana";
	for (var j = 0; j < jumpVariables.length; j++) {
		canvasContext.fillText(jumpVariableNames[j] + " : " + jumpVariables[j],textXPosition,textYPosition);
		textYPosition += 14;
	}
}