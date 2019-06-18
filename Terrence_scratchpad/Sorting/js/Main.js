var canvas, canvasContext;

const SET_FRAMES_PER_SECOND = 30;
var C_WIDTH;
var C_HEIGHT;

window.onload = function() {
	canvas = document.getElementById('gameCanvas');
	canvasContext = canvas.getContext('2d');

	C_WIDTH = canvas.width;
	C_HEIGHT = canvas.height;

	initInput();

	// these next few lines set up our game logic and render to happen 30 times per second
	setInterval(function() {
	    update();
	  }, 1000/SET_FRAMES_PER_SECOND);
}

function update() {
	moveEverything();
	drawEverything();
}

function drawEverything() {
	colorRect(0, 0, C_WIDTH, C_HEIGHT, 'black');
	colorText('Centered', C_WIDTH/2,C_HEIGHT/2, 'white','center');
}

function moveEverything() {

}