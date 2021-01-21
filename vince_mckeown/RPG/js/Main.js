// save the canvas for dimensions, and its 2d context for drawing to it
var canvas, canvasContext;

var p1 = new warriorClass();
var e1 = new enemyClass();
var pathFindingDisplay = false;

window.onload = function() {
    canvas = document.getElementById('gameCanvas');
    canvasContext = canvas.getContext('2d');

    SetupPathfindingGridData(p1);
    loadImages();
}

function loadingDoneSoStartGame() {
    // these next few lines set up our game logic and render to happen 30 times per second
    var framesPerSecond = 30;
    setInterval(function() {
        moveEverything();
        drawEverything();
    }, 1000 / framesPerSecond);

    p1.init(playerPic, "Blue");
	e1.init(goblinPic, "red");
    initInput();
}

function moveEverything() {
    if (p1.pathfindingNow) {
        PathfindingNextStep(p1);
    }
	if(e1.pathfindingNow){
		PathfindingNextStep(e1);
	}
	p1.move();
	e1.move();
}

function drawEverything() {
    drawRoom();
	if(pathFindingDisplay){
		drawPathingFindingTiles();
    }
	p1.draw();
	e1.draw();
}