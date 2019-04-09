var canvas, canvasContext;

const SET_FRAMES_PER_SECOND = 30;

var frameCount = 0;
var timeAtGameStart = Date.now();
var timeAtFPSCalc = 0;
var FPS = 0;

var previousTime = 0, currentTime = 0;
var deltaTime;

var timerFull = timeInSeconds(2);
var timer = timerFull;

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
	getDeltaTime();
	moveEverything();
	drawEverything();
}

function timeInSeconds(desiredSeconds) {
	return seconds = desiredSeconds * SET_FRAMES_PER_SECOND;
}

function getDeltaTime() {
	frameCount++;
	previousTime = currentTime;
	currentTime = Date.now();
	deltaTime = (currentTime - previousTime)/1000;

	//console.log("deltaTime = " + (deltaTime/1000));
	if (timer <= 0) {
		timeAtFPSCalc = Date.now();
		FPS = ((frameCount/((timeAtFPSCalc - timeAtGameStart)/1000)));
		timer = timerFull;
	} else {
		timer--;
	}
}

function drawEverything() {
	colorRect(0, 0, canvas.width, canvas.height, 'black');

	drawBricks();

	canvasContext.fillStyle = 'white';
	canvasContext.fillText("Arrow keys to run, spacebar to jump",8,14);
	canvasContext.fillText("FPS = " + Math.round(FPS), canvas.width - 50, 14);
	//canvasContext.fillText("deltaTime = " + deltaTime/1000, canvas.width - 100, 24);

	colorCircle(jumperX, jumperY, jumperRadius, 'white');
}

function moveEverything() {
	jumperMove();
}