var canvasContext;
var canvas;
var screenWidth;
var screenHeight;

var debug = false;

var deltaTime = window.performance.now();
var lastTime = 0;

window.onload = function() {
	canvas = document.getElementById('gameCanvas');
	canvasContext = canvas.getContext('2d');

	screenWidth = canvas.width;
	screenHeight = canvas.height;

	waitingforgesture();
}

function waitingforgesture() {

	colorRect(0,0,800,600, "black");
	colorText("Press Space to Play", canvas.width/2 - 120, canvas.height/2, "white", "30px Arial");

	if (Key.isDown(Key.SPACE)) {
		gamestart()
	} else {;
		window.requestAnimationFrame(waitingforgesture);
	}

	Key.update();
}

function gamestart() {
	console.log("Start Game");
	colorRect(0, 0, screenWidth, screenHeight, 'black');

	window.requestAnimationFrame(gameloop);
}

function gameloop(time) {

	Key.update();

	time /= 1000;
	deltaTime = time - lastTime;
	lastTime = time;

	if (debug) {

	}


	window.requestAnimationFrame(gameloop);
};