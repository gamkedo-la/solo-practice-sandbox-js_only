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
	loadImages();
}

function startGame() {
	jumperReset();
}

function update() {
	moveEverything();
	drawEverything();
	variableDisplay();
}

function drawEverything() {
	colorRect(0, 0, canvas.width, canvas.height, 'black');

	drawBricks();
	jumperDraw();

	canvasContext.fillStyle = 'white';
	canvasContext.fillText("Arrow keys to run, spacebar to jump",8,14);
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
		if (jumpVariableNames[j] == "jumperRadius") {
			canvasContext.fillText(jumpVariableNames[j] + " : " + jumpVariables[j]/2,textXPosition,textYPosition);
		} else {
			canvasContext.fillText(jumpVariableNames[j] + " : " + jumpVariables[j],textXPosition,textYPosition);
		}
		textYPosition += 14;
	}
}