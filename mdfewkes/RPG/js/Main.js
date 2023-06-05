let canvasContext;
let canvas;
let screenWidth;
let screenHeight;

let UI;

let debug = false;

let deltaTime = 0;
let lastTime = 0;


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
	colorRect(0, 0, screenWidth, screenHeight, 'black');
	UI = new UIMainInterface(screenWidth, screenHeight);

	SetupCombat();

	window.requestAnimationFrame(gameloop);
}

function gameloop(time) {

	Key.update();

	time /= 1000;
	deltaTime = time - lastTime;
	lastTime = time;

	RunCombat();

	window.requestAnimationFrame(gameloop);
};