// A-Star implementation based on http://buildnewgames.com/astar/ 
// by Gamkedo's own Christer "McFunkpants" Kaitila! ツ
// --> www.mcfunkypants.com <--

var canvas, canvasContext;

window.onload = function() {
	canvas = document.getElementById('gameCanvas');
	canvasContext = canvas.getContext('2d');

	initInput();

	// these next few lines set up our game logic and render to happen 30 times per second
	var framesPerSecond = 30;
	setInterval(function() {
		updateGame();
	}, 1000/framesPerSecond);

	sliderReset();
	enemyReset();
	createWorld();
}

function updateGame() {
	drawEverything();
	moveEverything();
}

function drawEverything() {
	colorRect(0, 0, canvas.width, canvas.height, 'black');

    drawBricks();

    sliderDraw();
    enemyDraw();

    canvasContext.fillStyle = 'white';
    canvasContext.fillText("Arrow keys to slide, scrolling demo",8,14);
    canvasContext.fillText("Console log has nifty info in it!",8,28);
}

function moveEverything() {
	sliderMove();
	enemyMove()
}