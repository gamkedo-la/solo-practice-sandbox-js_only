var canvas, canvasContext;

const FRAMES_PER_SECOND = 30;
var C_WIDTH;
var C_HEIGHT;

var columns;
var rows;
var numOfElements = 100;

var shuffled = false;

window.onload = function() {
	canvas = document.getElementById('gameCanvas');
	canvasContext = canvas.getContext('2d');

	C_WIDTH = canvas.width;
	C_HEIGHT = canvas.height;
	
	rows = Math.round(numOfElements/10);
	columns = numOfElements/rows;
	initInput();
	initBoxes();

	setInterval(function() {
	    update();
	  }, 1000/FRAMES_PER_SECOND);
}

function update() {
	moveEverything();
	drawEverything();
}

function drawEverything() {
	colorRect(0, 0, C_WIDTH, C_HEIGHT, 'black');
	drawBoxes();
}

function moveEverything() {
	if (!shuffled) {
		shuffleBoxes();
	}
}