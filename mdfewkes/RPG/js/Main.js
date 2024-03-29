let canvasContext;
let canvas;
let screenWidth;
let screenHeight;

let debug = false;

let lastTime = 0;

let mouseJustPressed = false;


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

	SetupCombat();
	SetupExplore();

	window.requestAnimationFrame(gameloop);
}

function gameloop(time) {

	time /= 1000;
	let deltaTime = time - lastTime;
	lastTime = time;
	mouseJustPressed = Key.isJustPressed(Key.MOUSE_LEFT);

	RunCombat(deltaTime);

	window.requestAnimationFrame(gameloop);

	Key.update();
};