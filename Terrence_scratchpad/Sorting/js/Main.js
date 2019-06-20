var canvas, canvasContext;

const FRAMES_PER_SECOND = 30;
var C_WIDTH;
var C_HEIGHT;

var columns;
var rows;

var numOfElements = 10;

window.onload = function() {
	canvas = document.getElementById('gameCanvas');
	canvasContext = canvas.getContext('2d');

	C_WIDTH = canvas.width;
	C_HEIGHT = canvas.height;
	
	if (numOfElements > 300) {
		numOfElements = 300;
		console.log("numOfElements can't exceed 300");
	} else if (numOfElements < 5) {
		numOfElements = 5;
		console.log("numOfElements can't be below 5");
	}

	rows = Math.round(numOfElements/10);
	if (rows > 15) {
		rows = 15;
	}

	columns = numOfElements/rows;

	initInput();
	initBoxes(boxes);

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
	if (!boxesStates.shuffled) {
		shuffleBoxes();
		return;
	}

	if (sortStates.activated) {
		sort(sortStates.selected);
	}

	if (boxesStates.getOriginalShuffle) {
		recallShuffledBoxes();
		boxesStates.getOriginalShuffle = false;
	}
}

function sort(type) {
	switch(type) {
		case BUBBLE_SORT:
			bubbleSort();
			break;
		case INSERTION_SORT:
			insertionSort();
			break;
		default:
			console.log("No sort selected");
			return;
	}
}